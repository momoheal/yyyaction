// 低多边形枪械程序化模型（移植自用户搭建的「Dark Ops 低多边形枪械展厅」）。
// 所有模型：+X 为枪口方向，Y 向上，单位约为“米”；调用 buildGunModel(id) 得到 { group, muzzle, spin }。
// 源建模代码为原样移植，使用宽松类型（ts-nocheck）以保留原有几何细节。
// @ts-nocheck
import * as THREE from 'three';

export interface GunModel {
  group: THREE.Group;
  muzzle?: THREE.Object3D;
  spin?: THREE.Group;
}

const GUN_COLORS: Record<string, string> = {
  pistol: '#2b2b2e', smg: '#303338', mp9: '#33373d', shotgun: '#5a3d26',
  rifle: '#3a3f36', ak: '#4a3324', sniper: '#4a5a3a', dmr: '#3c4631',
  lmg: '#2f3230', frostmp9: '#7fd8ef', m4legend: '#8e5bd6',
  awmlegend: '#c0392b', minigun: '#6b4a1e', ironbreaker: '#8f1d1d',
  rpg: '#4d5238', aa12: '#2d5a52', hk416: '#2f3d4a', barrett: '#5a5f45',
};

/* ============ 建模工具 ============ */
      var _matCache = {};
      function mat(color, rough, metal, extra) {
        var k = color + "|" + rough + "|" + metal + "|" + (extra ? JSON.stringify(extra) : "");
        if (_matCache[k]) return _matCache[k];
        var o = { color: new THREE.Color(color), roughness: rough, metalness: metal, flatShading: true };
        if (extra) for (var p in extra) o[p] = extra[p];
        var m = new THREE.MeshStandardMaterial(o);
        _matCache[k] = m;
        return m;
      }
      function shade(hex, f) {
        var c = new THREE.Color(hex);
        c.multiplyScalar(f);
        return "#" + c.getHexString();
      }
      /* 零件登记：记录原位与分解方向 */
      function reg(mesh, ex, ey, ez) {
        mesh.userData.home = mesh.position.clone();
        mesh.userData.exp = new THREE.Vector3(ex || 0, ey || 0, ez || 0);
        mesh.castShadow = true;
        return mesh;
      }
      function B(parent, w, h, d, color, x, y, z, o) {
        o = o || {};
        var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d),
          o.mat || mat(color, o.rough != null ? o.rough : 0.62, o.metal != null ? o.metal : 0.35));
        m.position.set(x, y, z);
        if (o.rx) m.rotation.x = o.rx;
        if (o.ry) m.rotation.y = o.ry;
        if (o.rz) m.rotation.z = o.rz;
        parent.add(m);
        return reg(m, o.ex, o.ey, o.ez);
      }
      /* 圆柱：默认沿 X 轴（枪管方向） */
      function CY(parent, r1, r2, len, color, x, y, z, o) {
        o = o || {};
        var m = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, len, o.seg || 10),
          o.mat || mat(color, o.rough != null ? o.rough : 0.5, o.metal != null ? o.metal : 0.55));
        m.position.set(x, y, z);
        m.rotation.z = Math.PI / 2;
        if (o.rx) m.rotation.x = o.rx;
        if (o.ry) m.rotation.y = o.ry;
        if (o.rz) m.rotation.z = Math.PI / 2 + o.rz;
        if (o.axis === "y") m.rotation.set(0, 0, 0);
        if (o.axis === "z") m.rotation.set(Math.PI / 2, 0, 0);
        parent.add(m);
        return reg(m, o.ex, o.ey, o.ez);
      }
      function CO(parent, r, h, color, x, y, z, o) {
        o = o || {};
        var m = new THREE.Mesh(new THREE.ConeGeometry(r, h, o.seg || 10),
          o.mat || mat(color, 0.55, 0.4));
        m.position.set(x, y, z);
        m.rotation.z = -Math.PI / 2; /* 尖朝 +X */
        if (o.rz != null) m.rotation.z = o.rz;
        if (o.rx) m.rotation.x = o.rx;
        parent.add(m);
        return reg(m, o.ex, o.ey, o.ez);
      }
      var STEEL = "#777d84", DARKMETAL = "#1d1e20", BLACKPOLY = "#26282b";

      /* 通用零件：握把（向后倾）、扳机护圈、前倾弹匣、瞄具 */
      function grip(g, x, y, color, len) {
        var grp = new THREE.Group(); grp.position.set(x, y, 0); g.add(grp);
        B(grp, 0.17, len || 0.52, 0.2, color, 0, -(len || 0.52) / 2 + 0.04, 0, { rz: -0.32, ey: -0.7 });
        return grp;
      }
      function triggerGuard(g, x, y, color) {
        B(g, 0.3, 0.05, 0.06, color, x, y, 0, { ey: -0.4 });
        B(g, 0.05, 0.16, 0.05, color, x - 0.13, y + 0.08, 0, { ey: -0.4 });
        B(g, 0.05, 0.15, 0.05, shade(color, 0.8), x + 0.02, y + 0.09, 0, { rz: 0.25, ey: -0.4 });
      }
      /* 弹匣：贴合机匣近竖直下插，只留极轻微前倾；弧形弹匣靠分段顺弧呈现弯曲，
         倾角不随匣长放大，长弹匣也不会看着斜插 */
      function magFwd(g, x, y, len, w, color, curve) {
        var grp = new THREE.Group(); grp.position.set(x, y, 0); grp.rotation.z = curve ? 0.05 : 0.03; g.add(grp);
        reg(grp, 0.1, -1, 0);
        if (curve) {
          B(grp, w, len * 0.55, w * 1.15, color, 0, -len * 0.27, 0, {});
          var low = new THREE.Group(); low.position.set(0.01, -len * 0.52, 0); low.rotation.z = 0.07; grp.add(low);
          B(low, w * 0.96, len * 0.55, w * 1.1, shade(color, 0.92), 0, -len * 0.26, 0, {});
          B(low, w * 1.05, 0.07, w * 1.2, shade(color, 0.7), 0.01, -len * 0.55, 0, {});
        } else {
          B(grp, w, len, w * 1.15, color, 0, -len / 2, 0, {});
          B(grp, w * 1.08, 0.07, w * 1.25, shade(color, 0.7), 0, -len - 0.02, 0, {});
        }
        return grp;
      }
      function scopeTube(g, x, y, len, r, color, ex) {
        var grp = new THREE.Group(); grp.position.set(x, y, 0); g.add(grp); reg(grp, 0, 1, 0);
        CY(grp, r, r, len, color, 0, 0, 0, { seg: 12 });
        CY(grp, r * 1.35, r * 1.35, len * 0.22, shade(color, 0.8), -len * 0.36, 0, 0, { seg: 12 });
        CY(grp, r * 1.2, r * 1.2, len * 0.16, shade(color, 0.8), len * 0.4, 0, 0, { seg: 12 });
        CY(grp, r * 0.7, r * 0.7, 0.03, "#9fd4e8", len * 0.49, 0, 0, { seg: 12, mat: mat("#9fd4e8", 0.15, 0.1, { emissive: 0x2a4a5a }) });
        B(grp, 0.07, 0.16, 0.07, shade(color, 0.75), -len * 0.22, -r - 0.06, 0, {});
        B(grp, 0.07, 0.16, 0.07, shade(color, 0.75), len * 0.22, -r - 0.06, 0, {});
        return grp;
      }
      function bipod(g, x, y, color) {
        [-1, 1].forEach(function (s) {
          var leg = B(g, 0.05, 0.62, 0.05, color, x + 0.05, y - 0.3, s * 0.13, { rx: s * 0.28, rz: 0.12, ey: -0.6, ez: s * 0.5 });
          leg.castShadow = true;
          B(g, 0.12, 0.04, 0.09, shade(color, 0.8), x + 0.12, y - 0.6, s * 0.21, { ey: -0.6, ez: s * 0.5 });
        });
        B(g, 0.12, 0.1, 0.3, shade(color, 0.8), x, y + 0.02, 0, { ey: -0.5 });
      }
      function muzzleBrake(g, x, y, r, color) {
        CY(g, r * 1.25, r * 1.25, 0.34, color, x, y, 0, { seg: 10, ex: 1.2 });
        CY(g, r * 0.8, r * 0.8, 0.1, DARKMETAL, x + 0.2, y, 0, { seg: 8, ex: 1.2 });
      }
      function muzzleRef(g, x, y) {
        var o = new THREE.Object3D(); o.position.set(x, y, 0); g.add(o); return o;
      }

      /* ============ 各枪建模（+X 为枪口方向） ============ */
      function buildPistol(w) {
        var g = new THREE.Group();
        var base = w.color, slide = shade(base, 1.5), dark = shade(base, 0.6);
        B(g, 1.45, 0.15, 0.19, dark, 0.08, -0.06, 0, { ex: -0.2, ey: -0.3 });            // 套筒座/底把
        B(g, 1.3, 0.15, 0.085, slide, 0.16, 0.13, 0.068, { ex: 0.3, ey: 0.7 });          // 套筒左壁（开放式）
        B(g, 1.3, 0.15, 0.085, slide, 0.16, 0.13, -0.068, { ex: 0.3, ey: 0.7 });
        CY(g, 0.052, 0.052, 1.34, STEEL, 0.18, 0.13, 0, { seg: 10, ex: 1 });            // 外露枪管
        CY(g, 0.07, 0.07, 0.16, dark, 0.88, 0.13, 0, { seg: 10, ex: 1.2 });             // 枪口套
        B(g, 0.09, 0.12, 0.1, dark, -0.52, 0.16, 0, { ey: 0.8 });                        // 后瞄
        B(g, 0.06, 0.09, 0.06, dark, 0.78, 0.17, 0, { ey: 0.8 });                        // 前瞄
        B(g, 0.1, 0.14, 0.12, dark, -0.66, 0.1, 0, { rz: 0.5, ex: -0.8, ey: 0.4 });      // 击锤
        grip(g, -0.52, -0.12, base, 0.62);
        B(g, 0.2, 0.66, 0.23, shade(base, 1.25), -0.585, -0.42, 0, { rz: -0.32, ey: -0.7 }); // 握把片
        B(g, 0.24, 0.07, 0.22, dark, -0.68, -0.76, 0, { rz: -0.32, ey: -1 });           // 弹匣底托
        triggerGuard(g, 0.22, -0.22, dark);
        B(g, 0.16, 0.06, 0.21, slide, -0.2, 0.03, 0, { ey: 0.5 });                      // 套筒后段
        return { g: g, muzzle: muzzleRef(g, 1.0, 0.13) };
      }

      function buildMP5(w) {
        var g = new THREE.Group();
        var base = w.color, dark = shade(base, 0.62), lite = shade(base, 1.3);
        CY(g, 0.155, 0.155, 1.75, base, 0.15, 0.1, 0, { seg: 12, ex: 0.2 });            // 机匣管
        B(g, 1.15, 0.2, 0.22, dark, 0.05, -0.1, 0, { ey: -0.3 });                       // 下机匣
        CY(g, 0.05, 0.05, 0.62, dark, 1.28, 0.1, 0, { seg: 8, ex: 1 });                 // 枪管
        CY(g, 0.062, 0.062, 0.9, lite, 0.62, 0.24, 0, { seg: 8, ey: 0.5 });             // 拉机柄管
        B(g, 0.8, 0.3, 0.33, dark, 0.78, 0.02, 0, { ex: 0.7 });                          // 护木
        [-0.18, 0, 0.18].forEach(function (dx) {
          B(g, 0.06, 0.32, 0.35, shade(base, 0.75), 0.78 + dx, 0.02, 0, { ex: 0.7 });   // 护木肋
        });
        B(g, 0.07, 0.3, 0.07, dark, 1.32, 0.26, 0, { ey: 0.8 });                         // 前瞄柱
        CY(g, 0.075, 0.075, 0.05, dark, 1.32, 0.44, 0, { axis: "z", seg: 10, ey: 0.9 }); // 前瞄环
        CY(g, 0.11, 0.11, 0.14, dark, -0.68, 0.3, 0, { axis: "y", seg: 10, ey: 0.8 });   // 后瞄鼓
        B(g, 0.88, 0.36, 0.21, base, -1.15, 0.02, 0, { ex: -1 });                       // 实心枪托
        B(g, 0.09, 0.44, 0.23, dark, -1.6, 0.0, 0, { ex: -1.2 });                       // 托底板
        B(g, 0.3, 0.1, 0.2, dark, -0.72, 0.16, 0, { ey: 0.5 });                         // 机匣尾
        B(g, 0.24, 0.2, 0.25, dark, 0.13, -0.2, 0, { rz: 0.05, ey: -0.4 });             // 弹匣井座
        /* MP5 弧形弹匣：三段顺弧逐段加大前弯角，段与段交错搭接不断层，
           匣身越往下越向前弯，是 MP5 标志性的香蕉形弧线，不再套用通用弹匣 */
        var mag5 = new THREE.Group(); mag5.position.set(0.14, -0.24, 0); g.add(mag5); reg(mag5, 0.1, -1, 0);
        var segTilt = [0.05, 0.14, 0.23], stepX = 0, stepY = 0;
        for (var mi = 0; mi < 3; mi++) {
          var seg = new THREE.Group(); seg.position.set(stepX, stepY, 0); seg.rotation.z = segTilt[mi]; mag5.add(seg);
          B(seg, 0.16, 0.34, 0.18, mi === 1 ? shade(lite, 0.92) : lite, 0, -0.16, 0, {});
          stepX += Math.sin(segTilt[mi]) * 0.3; stepY -= Math.cos(segTilt[mi]) * 0.3;
        }
        var magTip = new THREE.Group(); magTip.position.set(stepX, stepY, 0); magTip.rotation.z = segTilt[2]; mag5.add(magTip);
        B(magTip, 0.18, 0.07, 0.2, dark, 0, -0.02, 0, {});                               // 弹匣底托（顺末段弧线）
        grip(g, -0.42, -0.16, dark, 0.5);
        triggerGuard(g, -0.05, -0.3, dark);
        return { g: g, muzzle: muzzleRef(g, 1.62, 0.1) };
      }

      function buildMP9(w, frost) {
        var g = new THREE.Group();
        var base = frost ? "#a8e2f2" : w.color;
        var body = frost ? "#8fd4ec" : base;
        var dark = frost ? "#5ba8c4" : shade(base, 0.6);
        var lite = frost ? "#e8faff" : shade(base, 1.35);
        var accent = frost ? "#ffffff" : shade(base, 1.6);
        B(g, 1.5, 0.42, 0.3, body, 0, 0.05, 0, { ey: 0.2 });                             // 方正机匣
        B(g, 1.1, 0.08, 0.34, dark, 0.05, 0.3, 0, { ey: 0.7 });                         // 顶导轨
        B(g, 0.22, 0.16, 0.2, dark, -0.3, 0.42, 0, { ey: 0.9 });                        // 小型瞄具
        CY(g, 0.045, 0.045, 0.34, DARKMETAL, 0.9, 0.08, 0, { seg: 8, ex: 1 });          // 枪管
        CY(g, 0.105, 0.105, 0.52, dark, 1.28, 0.08, 0, { seg: 10, ex: 1.2 });           // 消音器式枪口
        B(g, 0.66, 0.15, 0.17, body, -1.02, 0.22, 0, { ex: -0.9, ey: 0.4 });            // 折叠托杆
        B(g, 0.09, 0.42, 0.2, dark, -1.36, 0.08, 0, { ex: -1.2 });                      // 托底板
        B(g, 0.13, 0.42, 0.15, dark, 0.42, -0.32, 0, { rz: 0.1, ey: -0.7 });            // 前握把
        magFwd(g, -0.08, -0.16, 0.62, 0.14, lite, false);                               // 直弹匣（前倾）
        grip(g, -0.55, -0.14, dark, 0.48);
        triggerGuard(g, 0.12, -0.28, dark);
        B(g, 0.3, 0.2, 0.32, accent, 0.55, -0.05, 0, { ez: 0.6 });                      // 侧板点缀
        if (frost) {
          CO(g, 0.09, 0.34, "#eafcff", 0.28, 0.52, 0, { rz: 0, ey: 1 });      // 冰晶（朝上）
          CO(g, 0.07, 0.26, "#eafcff", -0.05, 0.5, 0.1, { rz: 0.4, ey: 1 });
          CO(g, 0.07, 0.26, "#dff6ff", 0.5, 0.48, -0.08, { rz: -0.4, ey: 1 });
          CO(g, 0.06, 0.22, "#eafcff", -1.3, 0.36, 0, { rz: 1.0, ey: 0.8 });
          B(g, 0.5, 0.1, 0.32, "#ffffff", -0.45, 0.24, 0, { ey: 0.6 });                 // 积雪顶盖
        }
        return { g: g, muzzle: muzzleRef(g, 1.58, 0.08) };
      }

      function buildShotgun(w) {
        var g = new THREE.Group();
        var wood = "#6e4a2c", woodDark = "#54371f", metal = "#2c2c2e", dark = "#1e1e20";
        B(g, 1.05, 0.3, 0.22, metal, -0.15, 0.05, 0, { ey: 0.2 });                      // 机匣
        CY(g, 0.062, 0.062, 2.3, dark, 1.35, 0.14, 0, { seg: 10, ex: 0.8 });            // 枪管
        CY(g, 0.055, 0.055, 1.95, shade(metal, 1.3), 1.15, -0.03, 0, { seg: 10, ex: 0.6 }); // 弹仓管
        var pump = new THREE.Group(); pump.position.set(0.95, -0.03, 0); g.add(pump); reg(pump, 0.5, -0.3, 0);
        B(pump, 0.58, 0.21, 0.27, wood, 0, 0, 0, {});                                   // 泵动护木
        [-0.16, 0, 0.16].forEach(function (dx) {
          B(pump, 0.05, 0.23, 0.29, woodDark, dx, 0, 0, {});
        });
        CY(g, 0.075, 0.075, 0.14, dark, 2.52, 0.14, 0, { seg: 8, ex: 1.2 });            // 枪口
        B(g, 0.05, 0.08, 0.05, STEEL, 2.45, 0.24, 0, { ey: 0.8 });                      // 准星珠座
        /* 木枪托：按 M870 侧面轮廓挤出成型——贴腮面自机匣平直向后微降，
           托腹从握把颈向下收成楔形、托尾最高，不再是一块等高方木向上斜放 */
        var stockShape = new THREE.Shape();
        stockShape.moveTo(-0.5, 0.17);
        stockShape.lineTo(-1.62, 0.09);
        stockShape.lineTo(-1.67, -0.42);
        stockShape.lineTo(-1.08, -0.31);
        stockShape.lineTo(-0.7, -0.21);
        stockShape.lineTo(-0.52, -0.05);
        stockShape.closePath();
        var stockMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(stockShape, { depth: 0.18, bevelEnabled: false }),
          mat(wood, 0.72, 0.05));
        stockMesh.position.z = -0.09;
        g.add(stockMesh); reg(stockMesh, -1, 0, 0);
        B(g, 0.52, 0.06, 0.2, woodDark, -1.22, 0.09, 0, { rz: 0.07, ey: 0.5 });          // 贴腮面衬木（顺托顶斜面）
        B(g, 0.07, 0.56, 0.21, woodDark, -1.69, -0.17, 0, { rz: -0.07, ex: -1.2 });     // 托底板（顺托尾斜面）
        B(g, 0.4, 0.08, 0.14, dark, -0.1, -0.14, 0, { ey: -0.5 });                      // 装弹口盖
        triggerGuard(g, -0.28, -0.18, dark);
        return { g: g, muzzle: muzzleRef(g, 2.62, 0.14) };
      }

      function buildM4(w, legend) {
        var g = new THREE.Group();
        var base = legend ? "#7a4cc4" : w.color;
        var dark = legend ? "#4c2a86" : shade(base, 0.6);
        var lite = legend ? "#a678ee" : shade(base, 1.3);
        var gold = "#d9a441";
        B(g, 1.3, 0.34, 0.24, base, 0, 0.05, 0, { ey: 0.2 });                           // 机匣
        B(g, 0.5, 0.2, 0.26, dark, -0.35, -0.06, 0, { ey: -0.2 });                      // 下机匣
        if (legend) {
          B(g, 1.25, 0.07, 0.14, dark, 0.1, 0.28, 0, { ey: 0.7 });                      // 平顶导轨
          B(g, 0.24, 0.2, 0.22, DARKMETAL, 0.28, 0.42, 0, { ey: 0.9 });                 // 红点瞄具
          CY(g, 0.045, 0.045, 0.05, "#ff5a4a", 0.28, 0.44, 0.12, { axis: "z", seg: 8, mat: mat("#ff5a4a", 0.3, 0, { emissive: 0x8a1408 }) });
          B(g, 1.35, 0.3, 0.3, lite, 1.15, 0.05, 0, { ex: 0.7 });                       // 修长悬浮护木
          for (var i = 0; i < 4; i++) B(g, 0.07, 0.32, 0.32, gold, 0.68 + i * 0.3, 0.05, 0, { ex: 0.7, mat: mat(gold, 0.35, 0.85) });
          B(g, 0.12, 0.36, 0.13, dark, 0.72, -0.3, 0, { rz: 0.18, ey: -0.7 });          // 斜前握把
        } else {
          B(g, 0.95, 0.09, 0.13, dark, 0.05, 0.3, 0, { ey: 0.7 });                      // 提把
          B(g, 0.1, 0.12, 0.13, dark, -0.35, 0.22, 0, { ey: 0.7 });
          B(g, 0.1, 0.12, 0.13, dark, 0.45, 0.22, 0, { ey: 0.7 });
          B(g, 1.05, 0.36, 0.33, dark, 1.05, 0.05, 0, { ex: 0.7 });                     // 圆护木
          [-0.36, -0.12, 0.12, 0.36].forEach(function (dx) {
            B(g, 0.07, 0.38, 0.35, shade(base, 0.8), 1.05 + dx, 0.05, 0, { ex: 0.7 });  // 护木肋
          });
          B(g, 0.07, 0.34, 0.06, dark, 1.72, 0.24, 0, { ey: 0.8 });                     // 三角准星柱
          B(g, 0.16, 0.07, 0.06, dark, 1.72, 0.42, 0, { ey: 0.8 });
        }
        CY(g, 0.05, 0.05, legend ? 0.6 : 0.72, DARKMETAL, legend ? 2.05 : 1.95, 0.08, 0, { seg: 8, ex: 1 });
        CY(g, 0.085, 0.085, 0.24, dark, legend ? 2.38 : 2.36, 0.08, 0, { seg: 8, ex: 1.2 }); // 鸟笼枪口
        CY(g, 0.07, 0.07, 0.5, dark, -0.85, 0.08, 0, { seg: 8, ex: -0.7 });             // 缓冲管
        B(g, 0.58, 0.36, 0.2, base, -1.32, 0.02, 0, { ex: -1 });                        // 伸缩托
        B(g, 0.08, 0.42, 0.22, DARKMETAL, -1.62, 0.0, 0, { ex: -1.2 });                 // 托底板
        magFwd(g, 0.08, -0.14, 0.74, 0.15, legend ? gold : lite, true);                 // 弹匣（前倾）
        grip(g, -0.48, -0.12, dark, 0.52);
        triggerGuard(g, -0.12, -0.26, dark);
        B(g, 0.2, 0.14, 0.05, dark, 0.1, 0.1, 0.14, { ez: 0.7 });                       // 抛壳窗
        return { g: g, muzzle: muzzleRef(g, 2.52, 0.08) };
      }

      function buildAK(w) {
        var g = new THREE.Group();
        var wood = "#6b4426", woodLite = "#7d5230", metal = "#2e2a26", dark = "#201d1a";
        B(g, 1.35, 0.3, 0.22, metal, 0, 0.05, 0, { ey: 0.2 });                          // 机匣
        B(g, 1.0, 0.36, 0.19, wood, -1.15, -0.02, 0, { ex: -1 });                       // 木枪托
        B(g, 0.08, 0.42, 0.21, dark, -1.66, -0.03, 0, { ex: -1.2 });                    // 托底板
        B(g, 0.72, 0.3, 0.29, wood, 0.95, 0.02, 0, { ex: 0.6 });                        // 木护木
        CY(g, 0.055, 0.055, 0.62, woodLite, 0.95, 0.26, 0, { seg: 8, ey: 0.6 });        // 导气管木盖
        CY(g, 0.045, 0.045, 1.35, dark, 1.85, 0.1, 0, { seg: 8, ex: 0.9 });             // 枪管
        CY(g, 0.028, 0.028, 1.1, shade(metal, 1.5), 1.75, -0.06, 0, { seg: 6, ex: 0.7 }); // 通条
        B(g, 0.07, 0.36, 0.06, dark, 2.32, 0.26, 0, { ey: 0.8 });                       // 准星柱
        B(g, 0.05, 0.14, 0.16, dark, 2.32, 0.42, 0, { ey: 0.8 });                       // 准星护耳
        CY(g, 0.075, 0.075, 0.22, dark, 2.6, 0.1, 0, { seg: 8, ex: 1.2 });              // 枪口帽（与枪管同轴，不再斜切）
        B(g, 0.14, 0.1, 0.1, dark, -0.55, 0.24, 0, { ey: 0.7 });                        // 后瞄座
        magFwd(g, 0.18, -0.12, 0.88, 0.15, "#7a4a26", true);                            // 香蕉弹匣（顺弧弯曲，近竖直下插）
        grip(g, -0.42, -0.12, wood, 0.52);
        triggerGuard(g, -0.08, -0.26, dark);
        B(g, 0.34, 0.06, 0.05, dark, -0.3, 0.24, 0.13, { rz: -0.15, ez: 0.6 });         // 拉机柄
        return { g: g, muzzle: muzzleRef(g, 2.74, 0.1) };
      }
      function buildAWM(w, legend) {
        var g = new THREE.Group();
        var base = legend ? "#a92c20" : w.color;
        var dark = legend ? "#6e1a12" : shade(base, 0.6);
        var lite = legend ? "#cf4433" : shade(base, 1.3);
        var gold = "#d9a441", goldMat = mat(gold, 0.32, 0.85);
        B(g, 1.55, 0.4, 0.22, base, -0.85, -0.02, 0, { ex: -0.7 });                      // 枪托身
        B(g, 0.55, 0.16, 0.2, dark, -1.05, -0.16, 0, { ex: -0.7, ey: -0.4 });           // 握把凹口下沿
        B(g, 0.5, 0.14, 0.24, lite, -1.15, 0.26, 0, { ey: 0.6 });                       // 贴腮板
        B(g, 0.09, 0.46, 0.24, dark, -1.64, -0.02, 0, { ex: -1.2 });                    // 托底板
        B(g, 0.95, 0.3, 0.25, dark, 0.28, 0.08, 0, { ey: 0.2 });                        // 机匣
        CY(g, 0.055, 0.055, 1.95, legend ? "#7e1d14" : "#3a3f36", 1.65, 0.12, 0, { seg: 10, ex: 0.8 }); // 枪管
        if (legend) {
          [1.05, 1.5, 1.95].forEach(function (x) {
            CY(g, 0.075, 0.075, 0.09, gold, x, 0.12, 0, { seg: 10, ex: 0.9, mat: goldMat }); // 金箍
          });
          for (var s = 0; s < 5; s++) {
            B(g, 0.16, 0.16, 0.03, gold, -1.35 + s * 0.24, 0.02, 0.125, { rz: Math.PI / 4, ez: 0.7, mat: goldMat }); // 龙鳞
          }
        }
        muzzleBrake(g, 2.72, 0.12, 0.075, DARKMETAL);
        scopeTube(g, 0.15, 0.48, 1.0, 0.115, legend ? "#5e130c" : "#24261f");
        CY(g, 0.035, 0.035, 0.3, dark, -0.05, 0.05, 0.2, { axis: "z", seg: 8, ez: 0.7 }); // 拉机柄
        B(g, 0.11, 0.11, 0.11, dark, -0.05, 0.05, 0.38, { ez: 0.9 });                   // 枪栓球
        magFwd(g, 0.32, -0.14, 0.5, 0.17, lite, false);                                 // 盒式弹匣（前倾）
        grip(g, -0.42, -0.14, dark, 0.46);
        triggerGuard(g, -0.02, -0.26, dark);
        bipod(g, 2.05, -0.02, dark);
        if (legend) B(g, 0.7, 0.08, 0.26, gold, -0.85, 0.22, 0, { ey: 0.7, mat: goldMat }); // 金顶线
        return { g: g, muzzle: muzzleRef(g, 2.95, 0.12) };
      }

      function buildSVD(w) {
        var g = new THREE.Group();
        var wood = "#74522f", woodDark = "#573d21", metal = "#33382c", dark = "#22251e";
        B(g, 1.1, 0.28, 0.21, metal, 0, 0.06, 0, { ey: 0.2 });                          // 机匣
        B(g, 0.9, 0.27, 0.28, wood, 1.0, 0.03, 0, { ex: 0.6 });                         // 木护木
        [-0.25, 0, 0.25].forEach(function (dx) {
          B(g, 0.09, 0.1, 0.3, woodDark, 1.0 + dx, 0.1, 0, { ex: 0.6 });                // 散热孔
        });
        CY(g, 0.042, 0.042, 1.55, dark, 2.2, 0.1, 0, { seg: 8, ex: 0.9 });              // 细长枪管
        B(g, 0.16, 0.2, 0.16, dark, 1.55, 0.08, 0, { ey: 0.3 });                        // 导气箍
        B(g, 0.06, 0.34, 0.06, dark, 2.85, 0.26, 0, { ey: 0.8 });                       // 准星柱
        CY(g, 0.062, 0.062, 0.3, dark, 3.05, 0.1, 0, { seg: 8, ex: 1.2 });              // 开槽枪口
        var stock = new THREE.Group(); stock.position.set(-0.5, 0.04, 0); g.add(stock); reg(stock, -1, 0, 0);
        B(stock, 1.05, 0.15, 0.19, wood, -0.5, 0.12, 0, {});                            // 镂空托上梁
        B(stock, 0.95, 0.13, 0.19, wood, -0.48, -0.24, 0, { rz: 0.1 });                 // 镂空托下梁
        B(stock, 0.09, 0.52, 0.21, woodDark, -1.0, -0.05, 0, {});                       // 托底板
        B(stock, 0.42, 0.13, 0.23, woodDark, -0.72, 0.26, 0, {});                       // 贴腮板
        scopeTube(g, -0.05, 0.44, 0.72, 0.095, "#26281f");                              // PSO 瞄具
        B(g, 0.3, 0.14, 0.1, dark, -0.05, 0.26, 0.1, { ey: 0.5 });                      // 瞄具侧座
        magFwd(g, 0.22, -0.1, 0.62, 0.14, shade(metal, 1.35), true);                    // 弧形弹匣（前倾）
        grip(g, -0.4, -0.1, woodDark, 0.44);
        triggerGuard(g, -0.05, -0.22, dark);
        return { g: g, muzzle: muzzleRef(g, 3.22, 0.1) };
      }

      function buildM249(w) {
        var g = new THREE.Group();
        var base = w.color, dark = shade(base, 0.6), lite = shade(base, 1.35);
        B(g, 1.6, 0.44, 0.3, base, 0, 0.06, 0, { ey: 0.2 });                            // 大机匣
        B(g, 1.3, 0.13, 0.33, dark, -0.05, 0.34, 0, { ey: 0.7 });                       // 上机匣盖
        B(g, 0.08, 0.14, 0.08, dark, -0.55, 0.44, 0, { ey: 0.8 });                      // 提把脚
        B(g, 0.08, 0.14, 0.08, dark, 0.3, 0.44, 0, { ey: 0.8 });
        B(g, 1.0, 0.08, 0.1, dark, -0.12, 0.54, 0, { ey: 0.9 });                        // 提把
        B(g, 0.95, 0.4, 0.22, base, -1.25, 0.02, 0, { ex: -1 });                        // 枪托
        B(g, 0.09, 0.46, 0.24, dark, -1.74, 0.0, 0, { ex: -1.2 });                      // 托底板
        CY(g, 0.055, 0.055, 1.6, DARKMETAL, 1.55, 0.12, 0, { seg: 8, ex: 0.9 });        // 枪管
        B(g, 0.85, 0.27, 0.29, lite, 1.0, 0.1, 0, { ex: 0.7 });                         // 隔热护筒
        [-0.28, 0, 0.28].forEach(function (dx) {
          B(g, 0.08, 0.12, 0.31, dark, 1.0 + dx, 0.1, 0, { ex: 0.7 });                  // 护筒孔
        });
        CY(g, 0.08, 0.08, 0.2, dark, 2.4, 0.12, 0, { seg: 8, ex: 1.2 });                // 枪口
        B(g, 0.06, 0.26, 0.06, dark, 2.1, 0.3, 0, { ey: 0.8 });                         // 准星
        var ammo = new THREE.Group(); ammo.position.set(0.28, -0.42, 0); g.add(ammo); reg(ammo, 0.2, -1, 0);
        B(ammo, 0.66, 0.52, 0.38, "#3d4438", 0, 0, 0, {});                              // 弹链箱
        B(ammo, 0.68, 0.09, 0.4, dark, 0, 0.28, 0, {});                                 // 箱盖
        for (var i = 0; i < 4; i++) {
          B(g, 0.11, 0.09, 0.06, "#c8a24a", 0.42 + i * 0.1, -0.12 + i * 0.02, 0.17, { rz: -0.35, ez: 0.6, mat: mat("#c8a24a", 0.35, 0.8) }); // 弹链
        }
        grip(g, -0.5, -0.14, dark, 0.5);
        triggerGuard(g, -0.15, -0.28, dark);
        bipod(g, 1.85, -0.04, dark);
        return { g: g, muzzle: muzzleRef(g, 2.55, 0.12) };
      }

      function buildMinigun(w) {
        var g = new THREE.Group();
        var brass = w.color, dark = "#3a2c14", metal = "#4c4c4c";
        B(g, 1.45, 0.6, 0.52, shade(brass, 0.85), -0.25, 0.08, 0, { ey: 0.2 });         // 机匣壳
        CY(g, 0.27, 0.27, 0.55, dark, -1.2, 0.08, 0, { seg: 12, ex: -0.8 });            // 后部电机
        B(g, 0.08, 0.16, 0.08, dark, -0.6, 0.46, 0, { ey: 0.8 });                       // 提把脚
        B(g, 0.08, 0.16, 0.08, dark, 0.15, 0.46, 0, { ey: 0.8 });
        B(g, 0.9, 0.09, 0.11, dark, -0.22, 0.57, 0, { ey: 0.9 });                       // 顶部提把
        var spin = new THREE.Group(); spin.position.set(0.45, 0.08, 0); g.add(spin); reg(spin, 1, 0, 0);
        for (var i = 0; i < 6; i++) {
          var a = (i / 6) * Math.PI * 2;
          CY(spin, 0.052, 0.052, 1.7, metal, 0.85, Math.cos(a) * 0.17, Math.sin(a) * 0.17, { seg: 8 });
        }
        CY(spin, 0.26, 0.26, 0.14, dark, 0.25, 0, 0, { seg: 14 });                       // 管束环（前）
        CY(spin, 0.26, 0.26, 0.14, dark, 1.45, 0, 0, { seg: 14 });                      // 管束环（后）
        CY(spin, 0.07, 0.07, 1.75, shade(metal, 1.3), 0.85, 0, 0, { seg: 8 });          // 中心轴
        var drum = new THREE.Group(); drum.position.set(-0.35, -0.15, -0.48); g.add(drum); reg(drum, 0, -0.3, -1);
        CY(drum, 0.36, 0.36, 0.26, shade(brass, 1.1), 0, 0, 0, { axis: "z", seg: 16 }); // 侧弹鼓
        CY(drum, 0.14, 0.14, 0.3, dark, 0, 0, 0, { axis: "z", seg: 10 });
        B(g, 0.5, 0.18, 0.2, dark, -0.3, 0.12, -0.3, { ry: 0.5, ez: -0.7 });             // 输弹槽
        B(g, 0.14, 0.5, 0.12, dark, -1.05, -0.3, 0.18, { rz: -0.4, rx: 0.3, ey: -0.7 }); // 左握柄
        B(g, 0.14, 0.5, 0.12, dark, -1.05, -0.3, -0.18, { rz: -0.4, rx: -0.3, ey: -0.7 }); // 右握柄
        B(g, 0.12, 0.1, 0.5, dark, -1.22, -0.52, 0, { ey: -0.8 });                      // 握柄横杆
        B(g, 0.06, 0.2, 0.06, dark, 0.6, 0.5, 0, { ey: 0.8 });                          // 前瞄
        return { g: g, spin: spin, muzzle: muzzleRef(g, 2.2, 0.08) };
      }

      function buildIronbreaker(w) {
        var g = new THREE.Group();
        var iron = "#2b2b2f", dark = "#1b1b1e", red = w.color, redLite = "#b02a24";
        B(g, 1.7, 0.5, 0.34, iron, 0, 0.06, 0, { ey: 0.2 });                            // 玄铁机匣
        B(g, 1.0, 0.14, 0.36, red, -0.2, 0.36, 0, { ey: 0.7 });                         // 红色顶盖
        B(g, 0.08, 0.13, 0.08, dark, -0.6, 0.48, 0, { ey: 0.8 });
        B(g, 0.08, 0.13, 0.08, dark, 0.25, 0.48, 0, { ey: 0.8 });
        B(g, 1.0, 0.08, 0.1, dark, -0.17, 0.58, 0, { ey: 0.9 });                        // 提把
        B(g, 1.15, 0.36, 0.36, shade(iron, 1.25), 1.35, 0.08, 0, { ex: 0.7 });          // 枪管护罩
        [-0.35, 0, 0.35].forEach(function (dx) {
          B(g, 0.1, 0.14, 0.38, dark, 1.35 + dx, 0.08, 0, { ex: 0.7 });                 // 护罩散热槽
        });
        CY(g, 0.06, 0.06, 0.55, DARKMETAL, 2.15, 0.08, 0, { seg: 8, ex: 1 });
        muzzleBrake(g, 2.5, 0.08, 0.08, dark);
        B(g, 0.95, 0.46, 0.26, iron, -1.3, 0.0, 0, { ex: -1 });                         // 重型枪托
        B(g, 0.09, 0.52, 0.28, red, -1.8, -0.01, 0, { ex: -1.2 });                      // 红托底板
        /* 红星徽记（挤出星形） */
        var starShape = new THREE.Shape();
        for (var i = 0; i < 10; i++) {
          var ang = (i / 10) * Math.PI * 2 - Math.PI / 2;
          var rr = i % 2 === 0 ? 0.19 : 0.08;
          var px = Math.cos(ang) * rr, py = Math.sin(ang) * rr;
          if (i === 0) starShape.moveTo(px, py); else starShape.lineTo(px, py);
        }
        starShape.closePath();
        var star = new THREE.Mesh(new THREE.ExtrudeGeometry(starShape, { depth: 0.04, bevelEnabled: false }),
          mat(redLite, 0.4, 0.3, { emissive: 0x4a0d0a }));
        star.position.set(-0.15, 0.08, 0.18); g.add(star); reg(star, 0, 0, 1);
        var ammoBox = new THREE.Group(); ammoBox.position.set(0.35, -0.1, -0.36); g.add(ammoBox); reg(ammoBox, 0, -0.4, -1);
        B(ammoBox, 0.72, 0.42, 0.26, "#3a3d42", 0, 0, 0, {});                            // 侧弹箱
        B(ammoBox, 0.74, 0.08, 0.28, red, 0, 0.22, 0, {});                              // 箱盖红线
        for (var bIdx = 0; bIdx < 7; bIdx++) {
          var t = bIdx / 6;
          B(g, 0.11, 0.09, 0.06, "#c8a24a", 0.62 - t * 0.35, 0.28 + Math.sin(t * Math.PI) * 0.14, -0.3 + t * 0.28,
            { rz: -0.3 + t * 0.5, ez: 0.5, mat: mat("#c8a24a", 0.35, 0.8) });             //  draped 弹链
        }
        B(g, 0.13, 0.4, 0.14, dark, 1.15, -0.32, 0, { rz: 0.12, ey: -0.7 });            // 前握把
        grip(g, -0.55, -0.16, dark, 0.52);
        triggerGuard(g, -0.18, -0.3, dark);
        return { g: g, muzzle: muzzleRef(g, 2.72, 0.08) };
      }

      function buildRPG(w) {
        var g = new THREE.Group();
        var olive = w.color, dark = shade(olive, 0.6), wood = "#7a5a34";
        CY(g, 0.145, 0.145, 3.3, olive, -0.3, 0.1, 0, { seg: 12, ex: -0.2 });           // 发射筒
        CY(g, 0.16, 0.16, 0.5, dark, -1.75, 0.1, 0, { seg: 12, ex: -0.6 });             // 筒身环
        CY(g, 0.15, 0.27, 0.55, dark, -2.2, 0.1, 0, { seg: 12, ex: -1 });               // 尾喷口（外张）
        B(g, 1.05, 0.35, 0.35, wood, -0.75, 0.08, 0, { ex: -0.3 });                     // 木质隔热段
        CY(g, 0.05, 0.05, 0.55, STEEL, 1.6, 0.1, 0, { seg: 8, ex: 0.9 });               // 战斗部连接杆
        CY(g, 0.21, 0.21, 0.55, "#5d6248", 2.05, 0.1, 0, { seg: 12, ex: 1 });           // 战斗部筒
        CO(g, 0.21, 0.8, "#6d7256", 2.7, 0.1, 0, { seg: 12, ex: 1.2 });                 // 锥形弹头
        CY(g, 0.03, 0.03, 0.22, DARKMETAL, 3.18, 0.1, 0, { seg: 6, ex: 1.3 });          // 引信尖
        B(g, 0.07, 0.3, 0.07, dark, 1.05, 0.38, 0, { ey: 0.8 });                        // 前瞄柱
        B(g, 0.2, 0.22, 0.06, dark, -0.35, 0.36, 0, { ey: 0.8 });                       // 后瞄框
        grip(g, -0.15, -0.05, dark, 0.5);                                               // 主握把
        B(g, 0.12, 0.36, 0.13, dark, 0.55, -0.2, 0, { rz: 0.15, ey: -0.7 });            // 前握把
        triggerGuard(g, 0.12, -0.18, dark);
        B(g, 0.3, 0.1, 0.2, dark, -1.35, 0.3, 0, { ey: 0.6 });                           // 肩托垫
        return { g: g, muzzle: muzzleRef(g, 3.3, 0.1) };
      }

      var BUILDERS = {
        pistol: function (w) { return buildPistol(w); },
        smg: function (w) { return buildMP5(w); },
        mp9: function (w) { return buildMP9(w, false); },
        shotgun: function (w) { return buildShotgun(w); },
        rifle: function (w) { return buildM4(w, false); },
        ak: function (w) { return buildAK(w); },
        sniper: function (w) { return buildAWM(w, false); },
        dmr: function (w) { return buildSVD(w); },
        lmg: function (w) { return buildM249(w); },
        frostmp9: function (w) { return buildMP9(w, true); },
        m4legend: function (w) { return buildM4(w, true); },
        awmlegend: function (w) { return buildAWM(w, true); },
        minigun: function (w) { return buildMinigun(w); },
        ironbreaker: function (w) { return buildIronbreaker(w); },
        rpg: function (w) { return buildRPG(w); }
      };

/* ===== 游戏额外三把：基于同源零件改造，保持同一美术语言 ===== */
function buildAA12(w) {
  const r = buildShotgun({ ...w, color: '#2d5a52' });
  const g = r.group;
  const steel = '#3f4a45', drumDark = '#1f2a27';
  CY(g, 0.34, 0.34, 0.3, steel, 0.16, -0.34, 0, { axis: 'z', seg: 14 });       // 大弹鼓
  CY(g, 0.14, 0.14, 0.34, drumDark, 0.16, -0.34, 0, { axis: 'z', seg: 12 });
  B(g, 0.9, 0.14, 0.28, '#24443f', 0.05, 0.32, 0, { ey: 0.7 });               // 顶部导轨
  B(g, 0.2, 0.16, 0.2, drumDark, 0.4, 0.44, 0, { ey: 0.9 });                  // 红点
  return r;
}
function buildHK416(w) {
  const r = buildM4({ ...w, color: '#37424e' }, false);
  const g = r.group;
  B(g, 1.3, 0.08, 0.15, '#20272f', 0.05, 0.33, 0, { ey: 0.7 });               // 加高平顶导轨
  B(g, 0.22, 0.2, 0.22, '#1a1f24', 0.3, 0.47, 0, { ey: 0.9 });
  CY(g, 0.05, 0.05, 0.05, '#ff6a4a', 0.3, 0.49, 0.12,
    { axis: 'z', seg: 8, mat: mat('#ff6a4a', 0.3, 0, { emissive: 0x8a1408 }) });
  B(g, 0.16, 0.38, 0.17, '#20272f', -0.5, -0.13, 0, { rz: 0.18, ey: -0.7 }); // 斜前握把
  return r;
}
function buildBarrett(w) {
  const r = buildAWM({ ...w, color: '#5a5f45' }, false);
  const g = r.group;
  CY(g, 0.085, 0.085, 2.1, '#4b5140', 1.62, 0.12, 0, { seg: 10, ex: 0.8 });  // 加粗重型枪管
  muzzleBrake(g, 2.85, 0.12, 0.105, '#24271f');
  B(g, 0.42, 0.12, 0.3, '#3e4436', -0.85, 0.32, 0, { ey: 0.7 });             // 重型顶部提把
  B(g, 0.1, 0.4, 0.1, '#3e4436', -1.0, 0.16, 0, {});
  return { ...r, muzzle: muzzleRef(g, 3.08, 0.12) };
}
BUILDERS.aa12 = function (w) { return buildAA12(w); };
BUILDERS.hk416 = function (w) { return buildHK416(w); };
BUILDERS.barrett = function (w) { return buildBarrett(w); };

/** 统一入口：按武器 id 构建一把可独立放入场景的枪。 */
export function buildGunModel(id: string, colorOverride?: string): GunModel {
  const def = { color: colorOverride || GUN_COLORS[id] || GUN_COLORS.rifle };
  const build = BUILDERS[id] || BUILDERS.rifle;
  const built = build(def);
  // 展厅原函数返回 { g, muzzle, spin }；统一为对外接口 { group, ... }。
  return { group: built.g ?? built.group, muzzle: built.muzzle, spin: built.spin };
}

/** 该 id 是否有专属模型。 */
export function hasGunModel(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(BUILDERS, id);
}
