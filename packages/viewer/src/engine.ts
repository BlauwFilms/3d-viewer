/**
 * Engine — the Three.js side of the viewer.
 *
 * This file is only imported dynamically by WebViewer.start(), which means
 * Vite code-splits it into a separate chunk. A page that embeds three
 * viewers but where nobody clicks play will never download Three.js at all.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface EngineOptions {
  transparent: boolean;
  autoRotate: boolean;
}

export class Engine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private mixer?: THREE.AnimationMixer;
  private clock = new THREE.Clock();
  private rafId = 0;
  private running = false;
  private resizeObserver?: ResizeObserver;
  private model?: THREE.Object3D;
  private initialCamera?: {
    position: THREE.Vector3;
    target: THREE.Vector3;
  };

  constructor(
    private canvas: HTMLCanvasElement,
    options: EngineOptions,
  ) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: options.transparent,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;

    this.scene = new THREE.Scene();
    if (!options.transparent) {
      // Match the frame background so the canvas edges vanish.
      this.scene.background = new THREE.Color(0xececec);
    }

    // Neutral PBR environment so glTF materials look correct out of the box.
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    pmrem.compileEquirectangularShader();
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    this.scene.environment = envTex;
    pmrem.dispose();

    this.camera = new THREE.PerspectiveCamera(40, 1, 0.01, 1000);
    this.camera.position.set(2, 1.4, 3);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.autoRotate = options.autoRotate;
    this.controls.autoRotateSpeed = 0.9;
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = true;

    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    const host = canvas.parentElement ?? canvas;
    this.resizeObserver.observe(host);
  }

  private resize(): void {
    const parent = this.canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    if (w === 0 || h === 0) return;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  async load(
    url: string,
    onProgress?: (fraction: number) => void,
  ): Promise<void> {
    const loader = new GLTFLoader();
    // Note: Draco / KTX2 loaders will be wired in Phase 4. For Phase 1 we
    // load plain glTF/GLB only.

    const gltf = await new Promise<any>((resolve, reject) => {
      loader.load(
        url,
        resolve,
        (evt) => {
          if (onProgress && evt.lengthComputable && evt.total > 0) {
            onProgress(evt.loaded / evt.total);
          }
        },
        reject,
      );
    });

    const root = gltf.scene as THREE.Object3D;
    this.model = root;
    this.scene.add(root);

    this.frameModel(root);

    if (gltf.animations && gltf.animations.length > 0) {
      this.mixer = new THREE.AnimationMixer(root);
      const action = this.mixer.clipAction(gltf.animations[0]);
      action.play();
    }

    onProgress?.(1);
  }

  /** Auto-frame the camera so the whole model is nicely visible. */
  private frameModel(obj: THREE.Object3D): void {
    const box = new THREE.Box3().setFromObject(obj);
    if (box.isEmpty()) return;

    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const fov = (this.camera.fov * Math.PI) / 180;
    const fitDist = maxDim / (2 * Math.tan(fov / 2));
    // Pull back a touch + offset upward for a three-quarter view.
    const distance = fitDist * 1.35;

    this.camera.position
      .copy(center)
      .add(new THREE.Vector3(distance * 0.75, distance * 0.45, distance));
    this.camera.near = distance / 500;
    this.camera.far = distance * 500;
    this.camera.updateProjectionMatrix();

    this.controls.target.copy(center);
    this.controls.minDistance = distance * 0.15;
    this.controls.maxDistance = distance * 6;
    this.controls.update();

    this.initialCamera = {
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
    };
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.clock.start();
    const tick = (): void => {
      if (!this.running) return;
      this.rafId = requestAnimationFrame(tick);
      const dt = this.clock.getDelta();
      this.mixer?.update(dt);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };
    tick();
  }

  stop(): void {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = 0;
  }

  resetCamera(): void {
    if (!this.initialCamera) return;
    this.camera.position.copy(this.initialCamera.position);
    this.controls.target.copy(this.initialCamera.target);
    this.controls.update();
  }

  toggleAutoRotate(): boolean {
    this.controls.autoRotate = !this.controls.autoRotate;
    return this.controls.autoRotate;
  }

  destroy(): void {
    this.stop();
    this.resizeObserver?.disconnect();
    this.controls.dispose();

    if (this.model) {
      this.scene.remove(this.model);
      disposeHierarchy(this.model);
    }

    if (this.scene.environment) {
      this.scene.environment.dispose?.();
    }

    this.renderer.dispose();
  }
}

/** Depth-first resource disposal for a loaded glTF subtree. */
function disposeHierarchy(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.geometry?.dispose();
      const mat = mesh.material;
      if (Array.isArray(mat)) {
        mat.forEach(disposeMaterial);
      } else if (mat) {
        disposeMaterial(mat);
      }
    }
  });
}

function disposeMaterial(mat: THREE.Material): void {
  // Dispose any textures held on the material.
  for (const key of Object.keys(mat) as (keyof THREE.Material)[]) {
    const value = (mat as any)[key];
    if (value && typeof value === 'object' && 'isTexture' in value && value.isTexture) {
      (value as THREE.Texture).dispose();
    }
  }
  mat.dispose();
}
