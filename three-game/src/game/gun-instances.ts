// 把程序化枪模的众多零件合并成单一带顶点色的几何体，供 InstancedMesh 批渲染。
// 这样同屏每把枪仍是 1 个 draw call，保持俯视大战场的性能。
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { buildGunModel, hasGunModel } from './gun-models';

const cache = new Map<string, THREE.BufferGeometry>();
const white = new THREE.Color('#ffffff');

/** 合并某把枪的全部零件：烘焙世界变换与材质颜色到顶点色。 */
export function gunGeometry(id: string): THREE.BufferGeometry {
  const hit = cache.get(id);
  if (hit) return hit;
  const useId = hasGunModel(id) ? id : 'rifle';
  const model = buildGunModel(useId);
  model.group.updateMatrixWorld(true);
  const parts: THREE.BufferGeometry[] = [];
  model.group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    const geo = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
    geo.applyMatrix4(mesh.matrixWorld);
    const material = mesh.material as THREE.MeshStandardMaterial;
    const col = material?.color ?? white;
    const count = geo.attributes.position.count;
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      colors[i * 3] = col.r; colors[i * 3 + 1] = col.g; colors[i * 3 + 2] = col.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    // 合并要求所有几何属性集合一致；仅保留 position/normal/uv/color。
    for (const key of Object.keys(geo.attributes)) {
      if (key !== 'position' && key !== 'normal' && key !== 'uv' && key !== 'color') geo.deleteAttribute(key);
    }
    if (!geo.attributes.uv) geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
    parts.push(geo);
  });
  const merged = parts.length ? mergeGeometries(parts, false) : new THREE.BufferGeometry();
  parts.forEach((p) => p.dispose());
  model.group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (mesh.isMesh && mesh.geometry) mesh.geometry.dispose();
  });
  const geometry = merged ?? new THREE.BufferGeometry();
  cache.set(id, geometry);
  return geometry;
}

/** 枪械统一材质：顶点色 + 平面着色，近似展厅的金属/哑光混合质感。 */
export function gunMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.55, metalness: 0.32 });
}
