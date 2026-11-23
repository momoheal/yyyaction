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
  ctx.fillStyle = 'rgba(15,22,10,0.3)';
  ctx.beginPath();
  ctx.ellipse(4, 7, ship ? 30 : 42, ship ? 48 : 40, 0, 0, TAU);
  ctx.fill();
  if (!ship) { ctx.beginPath(); ctx.ellipse(4, 7, 44, 30, 0, 0, TAU); ctx.fill(); }

  drawAsset(ctx, p.kind);
  ctx.restore();
}
