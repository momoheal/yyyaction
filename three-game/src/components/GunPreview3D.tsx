// 武器 3D 预览：独立 WebGL 场景，复用展厅同源灯光/展台与程序化枪械模型。
// 用于商店/军械库与配装页，慢速旋转查看当前武器。
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WEAPONS } from '../game/data';
import { buildGunModel, hasGunModel, type GunModel } from '../game/gun-models';

interface PreviewState {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  pedestal: THREE.Group;
  model: GunModel | null;
  /** 本组件生命周期内构建过的模型，按武器 id 缓存复用，避免拖动预算时反复建/销毁几何体。 */
  models: Map<string, GunModel>;
  frame: number;
  observer?: ResizeObserver;
  contextLost: boolean;
}

function disposeGroup(group: THREE.Object3D) {
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
  });
}

export default function GunPreview3D({ weaponId, className }: { weaponId: string; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef<PreviewState | null>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // WebGL 不可用时保留底层 SVG 回退
    }
    // 预览与游戏大场景共用 GPU：关阴影、限 DPR、精简灯光，降低真机显存压力。
    renderer.setPixelRatio(1);
    renderer.shadowMap.enabled = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:none;cursor:grab;';
    el.appendChild(renderer.domElement);
    let dragging = false, lastX = 0, lastY = 0, draggingAngle = 0, draggingTilt = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true; lastX = e.clientX; lastY = e.clientY;
      renderer.domElement.setPointerCapture(e.pointerId);
      renderer.domElement.style.cursor = 'grabbing';
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || !state.current?.model) return;
      draggingAngle += (e.clientX - lastX) * 0.011;
      draggingTilt = THREE.MathUtils.clamp(draggingTilt + (e.clientY - lastY) * 0.005, -0.7, 0.7);
      lastX = e.clientX; lastY = e.clientY;
      const group = state.current.model.group;
      group.userData.dragAngle = draggingAngle;
      group.userData.dragTilt = draggingTilt;
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      renderer.domElement.style.cursor = 'grab';
      if (renderer.domElement.hasPointerCapture(e.pointerId)) renderer.domElement.releasePointerCapture(e.pointerId);
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('pointercancel', onUp);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(4.6, 2.4, 6.4);

    const key = new THREE.DirectionalLight(0xfff1dd, 2.6);
    key.position.set(5, 8, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xffc37a, 1.1);
    rim.position.set(-6, 3.5, -5); scene.add(rim);
    scene.add(new THREE.HemisphereLight(0x8d97a5, 0x1a1c17, 0.75));

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(16, 48),
      new THREE.MeshStandardMaterial({ color: 0x191c1f, roughness: 0.95, metalness: 0 }),
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const pedestal = new THREE.Group();
    const pedTop = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.05, 0.32, 28),
      new THREE.MeshStandardMaterial({ color: 0x232528, roughness: 0.72, metalness: 0.35, flatShading: true }));
    pedTop.position.y = 0.72;
    const pedBase = new THREE.Mesh(new THREE.CylinderGeometry(2.15, 2.35, 0.58, 28),
      new THREE.MeshStandardMaterial({ color: 0x222428, roughness: 0.7, metalness: 0.4, flatShading: true }));
    pedBase.position.y = 0.29;
    const pedRing = new THREE.Mesh(new THREE.TorusGeometry(2.02, 0.035, 8, 48),
      new THREE.MeshStandardMaterial({ color: 0xe2a63d, roughness: 0.35, metalness: 0.8, emissive: 0x59390a }));
    pedRing.rotation.x = Math.PI / 2; pedRing.position.y = 0.885;
    pedestal.add(pedTop, pedBase, pedRing);
    scene.add(pedestal);

    const st: PreviewState = { renderer, scene, camera, pedestal, model: null, models: new Map(), frame: 0, contextLost: false };
    state.current = st;

    // 移动端显存紧张时可能丢失上下文；阻止默认行为并标记，恢复后继续渲染。
    // 丢失期间隐藏画布，让底层 SVG 图标顶上，避免出现黑块。
    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      st.contextLost = true;
      renderer.domElement.style.opacity = '0';
    });
    renderer.domElement.addEventListener('webglcontextrestored', () => {
      st.contextLost = false;
      renderer.domElement.style.opacity = '1';
    });

    const resize = () => {
      const w = Math.max(1, el.clientWidth), h = Math.max(1, el.clientHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    st.observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : undefined;
    st.observer?.observe(el);
    resize();

    const clock = new THREE.Clock();
    const tick = () => {
      st.frame = requestAnimationFrame(tick);
      if (st.contextLost) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (st.model) {
        const group = st.model.group;
        const dragAngle = Number(group.userData.dragAngle || 0);
        const dragTilt = Number(group.userData.dragTilt || 0);
        if (!dragging) group.userData.autoAngle = (Number(group.userData.autoAngle || 0) + dt * 0.42);
        group.rotation.y = (Number(group.userData.autoAngle || 0)) + dragAngle;
        group.rotation.z = dragTilt;
        if (st.model.spin) st.model.spin.rotation.x += dt * 7;
      }
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(st.frame);
      st.observer?.disconnect();
      renderer.domElement.removeEventListener('pointerdown', onDown);
      renderer.domElement.removeEventListener('pointermove', onMove);
      renderer.domElement.removeEventListener('pointerup', onUp);
      renderer.domElement.removeEventListener('pointercancel', onUp);
      for (const model of st.models.values()) {
        scene.remove(model.group);
        disposeGroup(model.group);
      }
      st.models.clear();
      disposeGroup(pedestal);
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
      if (state.current === st) state.current = null;
    };
  }, []);

  useEffect(() => {
    const st = state.current;
    if (!st) return;
    const id = hasGunModel(weaponId) ? weaponId : 'rifle';
    // 复用已构建的模型：只切换可见性，不销毁重建，避免拖动预算时反复分配显存。
    if (st.model && st.model === st.models.get(id)) {
      st.model.group.visible = true;
    } else {
      if (st.model) st.model.group.visible = false;
      let model = st.models.get(id);
      if (!model) {
        model = buildGunModel(id);
        model.group.position.y = 1.25;
        st.models.set(id, model);
        st.scene.add(model.group);
        // 最多缓存 6 把：拖过很多预算档位时不无限占用显存。
        if (st.models.size > 6) {
          const oldest = st.models.keys().next().value as string | undefined;
          if (oldest && oldest !== id) {
            const stale = st.models.get(oldest);
            if (stale) { st.scene.remove(stale.group); disposeGroup(stale.group); }
            st.models.delete(oldest);
          }
        }
      }
      model.group.visible = true;
      st.model = model;
    }

    const len = WEAPONS[id]?.len ?? 25;
    const pr = THREE.MathUtils.clamp(len * 0.105 * 0.55, 0.62, 1.35);
    st.pedestal.scale.set(pr, 1, pr);
    let dist = THREE.MathUtils.clamp(len * 0.105 * 2.1, 4.6, 9.5);
    const aspect = (host.current?.clientWidth || 1) / Math.max(1, host.current?.clientHeight || 1);
    if (aspect < 1.15) dist *= Math.min(2.1, 1.12 / Math.max(aspect, 0.45));
    st.camera.position.set(dist * 0.58, 2.4, dist * 0.8);
    st.camera.lookAt(0, 1.25, 0);
  }, [weaponId]);

  return <div ref={host} className={className} aria-hidden="true" />;
}
