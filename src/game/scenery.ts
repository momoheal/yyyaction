/**
 * 俯视角场景道具的 Canvas 程序化绘制。
 * 与 art_assets/generate.py 审查图共用同一套几何与配色（取自 render.ts），
 * 资产车头/船头默认朝上，调用方通过 rot 旋转、scale 缩放。
 * 纯 Canvas 2D 基础 API，兼容网页版与微信小游戏，无需外部图片资源。
 */
import type { SceneryProp } from './map';

const TAU = Math.PI * 2;

// 与 render.ts 一致的调色板
const TIRE = '#1d1f22', GLASS = '#2a3440';
const HI = 'rgba(255,255,255,0.19)';
const RED = '#c0392b', RED_LT = '#d9583a';
const BLUE = '#2e6fb5', BLUE_LT = '#3b82c9', BLUE_DK = '#245a93';
const YELLOW = '#d9a21b', YEL_DK = '#b8861b';
const METAL = '#7f8a94', METAL_D = '#4a5057';
const WOOD = '#a3835a', WOOD_L = '#c4ad7e', WOOD_D = '#5c4126';
const CREAM = '#e8e2d4', RUST = '#a8492f';

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string, sw = 1) {
  const q = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + q, y);
  ctx.arcTo(x + w, y, x + w, y + h, q);
  ctx.arcTo(x + w, y + h, x, y + h, q);
  ctx.arcTo(x, y + h, x, y, q);
  ctx.arcTo(x, y, x + w, y, q);
  ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = sw; ctx.stroke(); }
}

function rc(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string) {
  ctx.fillStyle = fill; ctx.fillRect(x, y, w, h);
}

function el(ctx: CanvasRenderingContext2D, cx: number, cy: number, rx: number, ry: number, fill: string, stroke?: string, sw = 1) {
  ctx.beginPath();
  ctx.ellipse(cx, cy, Math.max(0.01, rx), Math.max(0.01, ry), 0, 0, TAU);
  ctx.fillStyle = fill; ctx.fill();
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = sw; ctx.stroke(); }
}

function pg(ctx: CanvasRenderingContext2D, pts: number[][], fill: string) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fillStyle = fill; ctx.fill();
}

function ln(ctx: CanvasRenderingContext2D, pts: number[][], fill: string, width: number) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = fill; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.stroke();
}

/** 把逻辑坐标 0..128 的资产画到以 (0,0) 为中心、边长 128 的局部空间。 */
function drawAsset(ctx: CanvasRenderingContext2D, kind: SceneryProp['kind']) {
  ctx.translate(-64, -64);
  switch (kind) {
    case 'delivery_truck': {
      for (const wx of [36, 82]) for (const wy of [34, 88]) rr(ctx, wx, wy, 10, 20, 3, TIRE);
      rr(ctx, 38, 56, 52, 58, 5, CREAM, '#b9b2a0', 1.5);
      rc(ctx, 42, 60, 7, 50, HI);
      ln(ctx, [[64, 60], [64, 110]], '#c9c2b2', 2);
      for (const gy of [72, 88, 102]) ln(ctx, [[44, gy], [84, gy]], '#d6d0c1', 1);
      rr(ctx, 42, 20, 44, 38, 9, RED);
      rr(ctx, 47, 21, 34, 13, 4, RED_LT);
      rr(ctx, 48, 34, 32, 13, 3, GLASS);
      rr(ctx, 50, 36, 13, 3, 1, 'rgba(255,255,255,0.28)');
      rr(ctx, 62, 49, 4, 8, 1, 'rgba(255,255,255,0.24)');
      rr(ctx, 36, 35, 6, 9, 2, METAL_D); rr(ctx, 86, 35, 6, 9, 2, METAL_D);
      rr(ctx, 46, 15, 36, 5, 2, METAL_D);
      break;
    }
    case 'pickup_truck': {
      for (const wx of [36, 84]) for (const wy of [40, 88]) rr(ctx, wx, wy, 10, 19, 3, TIRE);
      rr(ctx, 42, 22, 44, 84, 10, BLUE);
      rr(ctx, 47, 24, 34, 19, 5, BLUE_LT);
      rr(ctx, 48, 44, 32, 12, 3, GLASS);
      rr(ctx, 50, 46, 12, 3, 1, 'rgba(255,255,255,0.28)');
      rr(ctx, 46, 68, 36, 33, 4, BLUE_DK);
      for (const gy of [74, 82, 90]) ln(ctx, [[49, gy], [79, gy]], '#3a7fc0', 2);
      rr(ctx, 50, 24, 4, 76, 2, 'rgba(255,255,255,0.17)');
      break;
    }
    case 'dump_truck': {
      for (const wx of [36, 82]) for (const wy of [36, 88]) rr(ctx, wx, wy, 10, 20, 3, TIRE);
      rr(ctx, 38, 54, 52, 60, 4, YEL_DK);
      rr(ctx, 41, 57, 46, 52, 3, YELLOW);
      for (let i = 0; i < 5; i++) ln(ctx, [[44 + i * 9, 104], [50 + i * 9, 60]], 'rgba(0,0,0,0.12)', 6);
      rr(ctx, 42, 18, 44, 38, 9, RED);
      rr(ctx, 47, 20, 34, 12, 4, RED_LT);
      rr(ctx, 48, 32, 32, 13, 3, GLASS);
      rr(ctx, 50, 34, 13, 3, 1, 'rgba(255,255,255,0.28)');
      rr(ctx, 46, 14, 36, 5, 2, METAL_D);
      break;
    }
    case 'container_truck': {
      for (const wx of [38, 84]) for (const wy of [84, 106]) rr(ctx, wx, wy, 9, 17, 2, TIRE);
      rr(ctx, 40, 50, 54, 44, 3, '#8f402d');
      rr(ctx, 43, 53, 48, 38, 2, RUST);
      for (let i = 0; i < 9; i++) ln(ctx, [[46 + i * 5.4, 55], [46 + i * 5.4, 89]], 'rgba(0,0,0,0.14)', 2);
      rr(ctx, 43, 22, 42, 36, 8, BLUE);
      rr(ctx, 48, 25, 32, 12, 3, BLUE_LT);
      rr(ctx, 49, 38, 30, 12, 3, GLASS);
      rr(ctx, 51, 40, 12, 3, 1, 'rgba(255,255,255,0.28)');
      rr(ctx, 47, 17, 36, 5, 2, METAL_D);
      break;
    }
    case 'flatbed': {
      for (const wx of [34, 84]) for (const wy of [54, 94]) rr(ctx, wx, wy, 10, 18, 3, TIRE);
      rr(ctx, 36, 42, 56, 66, 4, METAL_D);
      rr(ctx, 39, 45, 50, 60, 3, METAL);
      for (const gy of [52, 62, 72, 82, 92]) ln(ctx, [[41, gy], [87, gy]], '#939ca5', 2);
      rr(ctx, 59, 20, 10, 24, 3, '#5f6a73');
      el(ctx, 64, 20, 6, 5, METAL);
      break;
    }
    case 'rowboat': {
      pg(ctx, [[64, 12], [84, 40], [86, 88], [64, 116], [42, 88], [44, 40]], WOOD_D);
      pg(ctx, [[64, 20], [78, 44], [80, 84], [64, 106], [48, 84], [50, 44]], WOOD);
      el(ctx, 64, 64, 12, 29, '#6b5438');
      rr(ctx, 50, 50, 28, 7, 2, WOOD_L); rr(ctx, 50, 78, 28, 7, 2, WOOD_L);
      ln(ctx, [[40, 74], [88, 58]], WOOD_L, 3);
      el(ctx, 38, 75, 5, 3, WOOD_L); el(ctx, 90, 57, 5, 3, WOOD_L);
      break;
    }
    case 'fishing_boat': {
      pg(ctx, [[64, 10], [86, 36], [90, 92], [64, 118], [38, 92], [42, 36]], '#9aa1a8');
      pg(ctx, [[64, 15], [82, 39], [85, 89], [64, 112], [43, 89], [46, 39]], CREAM);
      pg(ctx, [[64, 20], [77, 43], [79, 85], [64, 105], [49, 85], [51, 43]], '#cfc9ba');
      rr(ctx, 52, 42, 24, 28, 4, '#f2eee2', '#b9b2a0', 1);
      rr(ctx, 55, 46, 18, 12, 2, GLASS);
      el(ctx, 64, 88, 8, 8, METAL_D); el(ctx, 64, 88, 4, 4, '#5f6a73');
      ln(ctx, [[64, 28], [64, 40]], METAL_D, 2); el(ctx, 64, 26, 3, 3, METAL);
      break;
    }
    case 'speedboat': {
      pg(ctx, [[64, 8], [82, 34], [86, 86], [64, 120], [42, 86], [46, 34]], '#1f5a75');
      pg(ctx, [[64, 14], [78, 38], [81, 83], [64, 112], [47, 83], [50, 38]], '#e8ecee');
      el(ctx, 64, 62, 12, 27, '#d3d9dc'); el(ctx, 64, 58, 9, 18, GLASS);
      rr(ctx, 58, 88, 12, 12, 3, METAL_D);
      rr(ctx, 56, 30, 16, 4, 2, BLUE); rr(ctx, 60, 22, 8, 6, 2, BLUE);
      break;
    }
    case 'barrels': {
      for (const [cx, cy] of [[46, 52], [82, 52], [64, 86]]) {
        el(ctx, cx, cy, 16, 16, '#7d2019');
        el(ctx, cx, cy - 1, 14, 14, '#b3342a');
        el(ctx, cx - 4, cy - 5, 5, 4, 'rgba(255,255,255,0.25)');
        pg(ctx, [[cx, cy - 6], [cx + 5, cy + 4], [cx - 5, cy + 4]], '#f2c230');
      }
      break;
    }
    case 'bollard': {
      el(ctx, 64, 66, 24, 19, '#2f3338');
      el(ctx, 64, 62, 21, 16, METAL_D);
      el(ctx, 64, 58, 16, 12, METAL);
      el(ctx, 58, 54, 6, 3, 'rgba(255,255,255,0.22)');
      rc(ctx, 62, 44, 4, 32, '#3d4248');
      break;
    }
    case 'crane': {
      rr(ctx, 40, 42, 48, 48, 6, METAL_D);
      rr(ctx, 45, 47, 38, 38, 4, METAL);
      el(ctx, 64, 66, 18, 18, '#8f98a1'); el(ctx, 64, 66, 11, 11, '#5f6a73');
      rr(ctx, 62, 58, 48, 13, 3, YELLOW);
      for (let i = 0; i < 4; i++) ln(ctx, [[66 + i * 11, 60], [72 + i * 11, 70]], 'rgba(0,0,0,0.16)', 2);
      rr(ctx, 30, 61, 30, 8, 2, YEL_DK); rr(ctx, 30, 58, 10, 14, 2, METAL_D);
      el(ctx, 108, 64, 4, 4, METAL_D);
      break;
    }
    case 'fountain': {
      // Simple round stone basin with a calm pool and a small duck-head medallion.
      el(ctx, 64, 68, 48, 34, '#555b57', '#353c39', 2);
      el(ctx, 64, 65, 43, 30, '#b4b0a1', '#73756e', 1.6);
      el(ctx, 64, 63, 36, 23, '#3e7885', '#39606a', 1);
      el(ctx, 64, 62, 30, 18, '#68a8b3');
      ctx.strokeStyle = 'rgba(221,248,243,0.78)'; ctx.lineWidth = 1.8; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.ellipse(64, 62, 22, 11, 0, Math.PI * 1.12, Math.PI * 1.88); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(64, 65, 14, 7, 0, Math.PI * 0.12, Math.PI * 0.88); ctx.stroke();
      el(ctx, 64, 48, 16, 15, '#777b73', '#454b47', 1.5);
      el(ctx, 64, 47, 12, 11, '#e0d8c1', '#77766a', 1);
      el(ctx, 64, 47, 8.5, 8, '#ffd95d');
      el(ctx, 61, 45, 1, 1.2, '#303637'); el(ctx, 67, 45, 1, 1.2, '#303637');
      el(ctx, 64, 49, 4.2, 2.1, '#d1843f');
      break;
    }
    case 'duck_king_statue': {
      el(ctx, 64, 92, 40, 18, '#77796f', '#454a45', 2);
      rr(ctx, 34, 67, 60, 29, 7, '#b4b0a1', '#6e7168', 1.5);
      rr(ctx, 40, 72, 48, 18, 5, '#cfbf91', '#8c7951', 1);
      el(ctx, 64, 57, 30, 30, '#9a9a8d', '#686d66', 1.5);
      el(ctx, 64, 49, 20, 20, '#c4bfad', '#777a70', 1.3);
      el(ctx, 64, 48, 15, 15, '#ddd5be');
      el(ctx, 60, 46, 1.6, 1.8, '#40423d'); el(ctx, 68, 46, 1.6, 1.8, '#40423d');
      el(ctx, 64, 52, 6.8, 3.5, '#ad8251', '#735a3d', 1);
      rr(ctx, 48, 32, 32, 6, 3, '#aa8950', '#75603b', 1);
      for (const x of [53, 64, 75]) el(ctx, x, 30, 3.8, 4.2, '#c4a260', '#75603b', 0.8);
      el(ctx, 47, 59, 6, 8, '#aaa797'); el(ctx, 81, 59, 6, 8, '#aaa797');
      break;
    }
    case 'egg_nest': {
      // A low, readable nest built from broad rings and three clean egg shapes.
      el(ctx, 64, 79, 48, 27, '#62452e', '#3b3025', 2);
      el(ctx, 64, 75, 41, 21, '#a77745', '#68492f', 2);
      el(ctx, 64, 72, 32, 15, '#523d2c');
      ctx.strokeStyle = '#c59a5e'; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.ellipse(64, 75, 36, 17, 0, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
      for (const [x, y, r] of [[51, 67, 8], [66, 63, 9], [78, 70, 7]] as const) {
        el(ctx, x, y, r * 0.72, r, '#f0e6ca', '#ad966d', 1);
        el(ctx, x - 2, y - 3, 1.5, 2.2, 'rgba(255,255,255,0.7)');
      }
      break;
    }
    case 'ice_beacon': {
      // Broad blue crystal on a low base; the silhouette reads at map scale.
      el(ctx, 64, 96, 35, 14, '#34474b', '#26383b', 2);
      rr(ctx, 38, 83, 52, 17, 5, '#73858a', '#415459', 2);
      pg(ctx, [[64, 13], [84, 43], [79, 78], [64, 88], [49, 78], [44, 43]], '#72cddd');
      pg(ctx, [[64, 13], [64, 88], [49, 78], [44, 43]], '#388ca7');
      pg(ctx, [[64, 18], [78, 45], [71, 75], [64, 81]], '#a8f1f0');
      ln(ctx, [[50, 46], [61, 33], [61, 67]], 'rgba(223,255,255,0.72)', 2);
      el(ctx, 64, 16, 4, 4, '#e5ffff');
      break;
    }
    case 'king_vault_gate': {
      // A rounded stone frame with evenly spaced gold bars, avoiding thin spikes.
      rr(ctx, 14, 18, 100, 90, 14, '#393632', '#242624', 2);
      rr(ctx, 21, 24, 86, 83, 12, '#a99b7b', '#625947', 2);
      rr(ctx, 31, 34, 66, 73, 10, '#353536', '#514a3e', 1.5);
      rr(ctx, 36, 39, 56, 68, 8, '#20272a');
      for (const x of [44, 58, 72, 86]) rr(ctx, x - 3, 43, 6, 59, 3, '#d4b66a', '#725c34', 1);
      rr(ctx, 31, 31, 66, 13, 5, '#d7bd77', '#78653b', 1.4);
      el(ctx, 64, 37, 5, 5, '#f3df9e', '#78653b', 1);
      break;
    }
    case 'billboard': {
      rr(ctx, 28, 77, 18, 18, 4, '#555c58', '#303635', 1.3);
      rr(ctx, 82, 77, 18, 18, 4, '#555c58', '#303635', 1.3);
      rr(ctx, 22, 89, 29, 9, 4, '#434a47', '#303635', 1);
      rr(ctx, 77, 89, 29, 9, 4, '#434a47', '#303635', 1);
      rr(ctx, 17, 20, 94, 57, 7, '#382e35', '#232a2b', 2);
      rr(ctx, 22, 24, 84, 47, 5, '#e1b957', '#765a2e', 1.5);
      rr(ctx, 26, 27, 76, 39, 3, '#42645b', '#2d4642', 1);
      el(ctx, 38, 47, 12, 12, '#f0d485', '#8f7038', 1);
      el(ctx, 38, 47, 7.5, 8, '#f6c94f', '#715c35', 1);
      el(ctx, 35, 45, 0.9, 1, '#263335'); el(ctx, 41, 45, 0.9, 1, '#263335');
      el(ctx, 38, 50, 4.5, 2.4, '#d98436', '#71533a', 0.8);
      ctx.fillStyle = '#fff1c6'; ctx.font = 'bold 8px sans-serif'; ctx.textAlign = 'left';
      ctx.fillText('鸭鸭补给', 54, 43);
      rr(ctx, 54, 49, 34, 2.2, 1, '#d2b56b');
      rr(ctx, 54, 55, 25, 2.2, 1, '#d2b56b');
      break;
    }
    case 'vending_machine': {
      pg(ctx, [[40, 10], [88, 10], [96, 16], [96, 107], [88, 114], [40, 114]], '#263c40');
      pg(ctx, [[88, 10], [96, 16], [96, 107], [88, 114]], '#182a2e');
      rr(ctx, 42, 14, 45, 98, 5, '#44656a', '#152629', 1.5);
      rr(ctx, 46, 20, 28, 54, 3, '#182f35', '#91b5b3', 1);
      const drinkColors = ['#d9684e', '#e3bd5b', '#68a9a0'];
      for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
        const x = 49 + col * 8.3, y = 24 + row * 15;
        rr(ctx, x, y, 5.5, 11.5, 1.7, drinkColors[(row + col) % drinkColors.length], '#1e3335', 0.7);
        rr(ctx, x + 1.2, y + 2.3, 3, 1, 0.5, '#fff0cd');
      }
      rr(ctx, 77, 20, 8, 54, 2, '#cad0bd', '#263839', 1);
      for (let y = 27; y <= 65; y += 9) el(ctx, 81, y, 1.4, 1.4, '#e0bd67');
      rr(ctx, 47, 79, 35, 13, 2.5, '#26383a', '#a9b6a6', 1);
      rr(ctx, 55, 97, 19, 7, 2, '#18292b', '#789494', 1);
      el(ctx, 87, 99, 4, 4.5, '#83d39b', '#24483d', 1);
      break;
    }
    case 'bed': {
      rr(ctx, 22, 15, 84, 96, 8, WOOD_D, '#282d2b', 2);
      rr(ctx, 26, 18, 77, 89, 7, WOOD, '#644a32', 1.5);
      rr(ctx, 30, 23, 68, 81, 5, '#e3dfd2', '#77776c', 1);
      rr(ctx, 31, 24, 66, 13, 4, '#b18a5b', '#765438', 1);
      rr(ctx, 37, 39, 54, 18, 5, '#f2ede0', '#b0ad9e', 1);
      ln(ctx, [[42, 48], [86, 48]], '#d6d1c4', 0.8);
      rr(ctx, 33, 59, 61, 40, 6, '#738268', '#4d5b4b', 1.2);
      rr(ctx, 37, 62, 53, 33, 4.5, '#849176');
      ln(ctx, [[41, 65], [86, 65]], '#9ba48a', 1);
      for (const [x, y] of [[30, 25], [98, 25], [30, 102], [98, 102]]) el(ctx, x, y, 1.5, 1.5, '#d0aa70');
      break;
    }
    case 'table_map_cup':
    case 'table_field_kit': {
      for (const [x, y] of [[34, 32], [94, 32], [34, 90], [94, 90]]) rr(ctx, x - 5, y - 5, 10, 10, 2, '#493625');
      rr(ctx, 25, 23, 78, 76, 8, '#60442d', '#33281f', 2);
      rr(ctx, 29, 27, 70, 68, 6, '#b58a59', '#755334', 1.5);
      rr(ctx, 34, 31, 60, 60, 4, '#c39a67');
      for (const y of [44, 59, 74]) ln(ctx, [[36, y], [92, y]], 'rgba(91,58,31,0.36)', 1.2);
      // Folded map: clear paper silhouette, a route, a compass mark and one landmark.
      rr(ctx, 39, 39, 32, 39, 2, '#ece4cc', '#75644b', 1);
      ln(ctx, [[55, 41], [55, 76]], '#c0b59a', 0.8);
      ln(ctx, [[41, 58], [69, 58]], '#c0b59a', 0.8);
      ln(ctx, [[43, 70], [48, 63], [56, 66], [66, 48]], '#5c8a71', 1.6);
      el(ctx, 66, 48, 2.2, 2.2, '#c85d45');
      el(ctx, 44, 45, 2.7, 2.7, '#d5a84e');
      if (kind === 'table_map_cup') {
        el(ctx, 82, 63, 9, 9, '#cbb58e', '#6e5739', 1);
        rr(ctx, 75, 53, 14, 17, 3, '#ede6d4', '#776448', 1.2);
        rr(ctx, 88, 57, 7, 9, 3, '#cbb58e', '#776448', 1.2);
        el(ctx, 82, 55, 5.3, 2.2, '#6c4934');
        ctx.strokeStyle = 'rgba(239,238,220,0.8)'; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(80, 49); ctx.quadraticCurveTo(77, 44, 81, 40); ctx.stroke();
      } else {
        rr(ctx, 76, 45, 15, 24, 3, '#354943', '#293731', 1.2);
        rr(ctx, 79, 49, 9, 9, 1.5, '#bbd0b6', '#4b6256', 0.8);
        ln(ctx, [[83.5, 47], [88, 41]], '#c49b58', 1.5);
        el(ctx, 80, 64, 1.8, 1.8, '#e0c36c'); el(ctx, 86, 64, 1.8, 1.8, '#75cb91');
        rr(ctx, 77, 76, 15, 8, 2, '#8c6e48', '#61482f', 0.8);
      }
      break;
    }
    case 'wood_chair': {
      // Plain top-down dining chair: a slatted back, square seat and four exposed legs.
      for (const [x, y] of [[37, 38], [91, 38], [37, 91], [91, 91]]) rr(ctx, x - 4, y - 4, 8, 8, 2, '#443223', '#291f18', 1);
      rr(ctx, 31, 15, 66, 28, 5, '#5e422d', '#30251d', 2);
      rr(ctx, 36, 19, 56, 20, 3, '#bd925d', '#725236', 1.2);
      for (const x of [49, 64, 79]) ln(ctx, [[x, 21], [x, 37]], '#78573a', 2);
      rr(ctx, 37, 43, 54, 48, 5, '#6b4a30', '#30251d', 2);
      rr(ctx, 42, 48, 44, 38, 3, '#c39a67', '#795939', 1.2);
      ln(ctx, [[45, 56], [83, 56]], '#d2ad7a', 1.2);
      ln(ctx, [[45, 77], [83, 77]], '#a67d50', 1.1);
      break;
    }
    case 'bedside_cabinet': {
      for (const [x, y] of [[35, 30], [93, 30], [35, 94], [93, 94]]) rr(ctx, x - 4, y - 4, 8, 8, 2, WOOD_D, '#302a24', 1);
      rr(ctx, 25, 21, 78, 77, 7, WOOD_D, '#302a24', 2);
      rr(ctx, 30, 25, 68, 69, 5.5, WOOD, '#674a31', 1);
      rr(ctx, 35, 31, 58, 27, 4, '#c39762', '#765438', 1);
      rr(ctx, 35, 62, 58, 26, 4, '#b78957', '#765438', 1);
      el(ctx, 64, 44, 2.5, 2.5, '#574331'); el(ctx, 64, 75, 2.5, 2.5, '#574331');
      break;
    }
    case 'potted_flower': {
      el(ctx, 64, 64, 36, 34, '#475a45', '#283b34', 1.5);
      el(ctx, 64, 64, 31, 29, '#66805a');
      for (const [x, y, rx, ry, color] of [[54, 54, 13, 10, '#81996b'], [75, 63, 13, 10, '#8ba06e'], [54, 75, 12, 9, '#91a374'], [74, 45, 10, 9, '#738b62']] as const) el(ctx, x, y, rx, ry, color, '#566d4c', 1);
      el(ctx, 64, 64, 11, 11, '#edc85d', '#9b763d', 1);
      for (const [x, y] of [[64, 49], [64, 79], [48, 64], [80, 64]]) el(ctx, x, y, 6, 4.5, '#f0d77a', '#a88545', 0.7);
      el(ctx, 64, 64, 4, 4, '#c67a43', '#7c4e32', 1);
      break;
    }
  }
}

/** 绘制单件道具：深色底座投影 + 主体（与游戏其它物体一致的投影画法）。 */
export function drawScenery(ctx: CanvasRenderingContext2D, p: SceneryProp) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rot);
  ctx.scale(p.scale, p.scale);

  // 底座投影：水面小船投影略窄，车辆偏长，统一用椭圆近似
  const ship = p.kind === 'rowboat' || p.kind === 'fishing_boat' || p.kind === 'speedboat';
  const bed = p.kind === 'bed';
  const compact = p.kind === 'table_map_cup' || p.kind === 'table_field_kit' || p.kind === 'wood_chair' || p.kind === 'bedside_cabinet' || p.kind === 'potted_flower' || p.kind === 'egg_nest' || p.kind === 'ice_beacon';
  const gate = p.kind === 'king_vault_gate';
  ctx.fillStyle = 'rgba(15,22,10,0.3)';
  ctx.beginPath();
  ctx.ellipse(4, 7, ship ? 30 : compact ? 34 : gate ? 48 : 42, ship ? 48 : bed ? 48 : compact ? 29 : gate ? 38 : 40, 0, 0, TAU);
  ctx.fill();
  if (!ship && !compact && !bed && !gate) { ctx.beginPath(); ctx.ellipse(4, 7, 44, 30, 0, 0, TAU); ctx.fill(); }

  drawAsset(ctx, p.kind);
  ctx.restore();
}
