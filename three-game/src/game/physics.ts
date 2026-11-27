import { F_MOVE, type Solid } from './map';

export interface Hit { t: number; s: Solid | null; nx: number; ny: number }

const OX = -256;
const OY = -256;

const segOut = { t: 0, nx: 0, ny: 0 };

function segRect(x0: number, y0: number, dx: number, dy: number, s: Solid): boolean {
  let tmin = 0, tmax = 1, nx = 0, ny = 0;
  if (Math.abs(dx) < 1e-9) {
    if (x0 < s.x || x0 > s.x + s.w) return false;
  } else {
    const inv = 1 / dx;
    let t1 = (s.x - x0) * inv, t2 = (s.x + s.w - x0) * inv;
    let n = -1;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; n = 1; }
    if (t1 > tmin) { tmin = t1; nx = n; ny = 0; }
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return false;
  }
  if (Math.abs(dy) < 1e-9) {
    if (y0 < s.y || y0 > s.y + s.h) return false;
  } else {
    const inv = 1 / dy;
    let t1 = (s.y - y0) * inv, t2 = (s.y + s.h - y0) * inv;
    let n = -1;
    if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; n = 1; }
    if (t1 > tmin) { tmin = t1; nx = 0; ny = n; }
    if (t2 < tmax) tmax = t2;
    if (tmin > tmax) return false;
  }
  if (nx === 0 && ny === 0) {
    if (Math.abs(dx) > Math.abs(dy)) nx = dx > 0 ? -1 : 1; else ny = dy > 0 ? -1 : 1;
  }
  segOut.t = tmin; segOut.nx = nx; segOut.ny = ny;
  return true;
}

export function segCircle(x0: number, y0: number, dx: number, dy: number, cx: number, cy: number, r: number): number {
  const fx = x0 - cx, fy = y0 - cy;
  const a = dx * dx + dy * dy;
  if (a < 1e-9) return -1;
  const c = fx * fx + fy * fy - r * r;
  if (c < 0) return 0;
  const b = 2 * (fx * dx + fy * dy);
  const disc = b * b - 4 * a * c;
  if (disc < 0) return -1;
  const t = (-b - Math.sqrt(disc)) / (2 * a);
  return t >= 0 && t <= 1 ? t : -1;
}

export class Grid {
  cs = 64;
  cols: number;
  rows: number;
  cells: Solid[][];
  stamp = 1;
  private tmp: Solid[] = [];

  constructor(w: number, h: number, solids: Solid[]) {
    this.cols = Math.ceil((w - OX * 2) / this.cs);
    this.rows = Math.ceil((h - OY * 2) / this.cs);
    this.cells = [];
    for (let i = 0; i < this.cols * this.rows; i++) this.cells.push([]);
    for (const s of solids) {
      const x0 = s.t === 0 ? s.x : s.x - s.r, y0 = s.t === 0 ? s.y : s.y - s.r;
      const x1 = s.t === 0 ? s.x + s.w : s.x + s.r, y1 = s.t === 0 ? s.y + s.h : s.y + s.r;
      const c0 = this.cx(x0), c1 = this.cx(x1), r0 = this.cy(y0), r1 = this.cy(y1);
      for (let cy = r0; cy <= r1; cy++) for (let cx = c0; cx <= c1; cx++) this.cells[cy * this.cols + cx].push(s);
    }
  }

  cx(x: number) { return Math.max(0, Math.min(this.cols - 1, Math.floor((x - OX) / this.cs))); }
  cy(y: number) { return Math.max(0, Math.min(this.rows - 1, Math.floor((y - OY) / this.cs))); }

  query(x0: number, y0: number, x1: number, y1: number, mask: number, out: Solid[]): number {
    const st = ++this.stamp;
    let n = 0;
    const c0 = this.cx(x0), c1 = this.cx(x1), r0 = this.cy(y0), r1 = this.cy(y1);
    for (let cy = r0; cy <= r1; cy++) {
      for (let cx = c0; cx <= c1; cx++) {
        const cell = this.cells[cy * this.cols + cx];
        for (let i = 0; i < cell.length; i++) {
          const s = cell[i];
          if (s.stamp === st || s.dead || (s.f & mask) === 0) continue;
          s.stamp = st;
          out[n++] = s;
        }
      }
    }
    return n;
  }

  raycast(x0: number, y0: number, x1: number, y1: number, mask: number, hit: Hit): boolean {
    const dx = x1 - x0, dy = y1 - y0;
    const st = ++this.stamp;
    const cs = this.cs;
    let best = 2, bs: Solid | null = null, bnx = 0, bny = 0;
    let cx = Math.floor((x0 - OX) / cs), cy = Math.floor((y0 - OY) / cs);
    const ex = Math.floor((x1 - OX) / cs), ey = Math.floor((y1 - OY) / cs);
    const stepX = dx > 0 ? 1 : -1, stepY = dy > 0 ? 1 : -1;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    const tdx = adx > 1e-9 ? cs / adx : Infinity, tdy = ady > 1e-9 ? cs / ady : Infinity;
    const lx = x0 - OX - cx * cs, ly = y0 - OY - cy * cs;
    let tmx = adx > 1e-9 ? (dx > 0 ? cs - lx : lx) / adx : Infinity;
    let tmy = ady > 1e-9 ? (dy > 0 ? cs - ly : ly) / ady : Infinity;
    for (let guard = 0; guard < 600; guard++) {
      if (cx >= 0 && cy >= 0 && cx < this.cols && cy < this.rows) {
        const cell = this.cells[cy * this.cols + cx];
        for (let i = 0; i < cell.length; i++) {
          const s = cell[i];
          if (s.stamp === st || s.dead || (s.f & mask) === 0) continue;
          s.stamp = st;
          if (s.t === 0) {
            if (segRect(x0, y0, dx, dy, s) && segOut.t < best) { best = segOut.t; bs = s; bnx = segOut.nx; bny = segOut.ny; }
          } else {
            const t = segCircle(x0, y0, dx, dy, s.x, s.y, s.r);
            if (t >= 0 && t < best) {
              best = t; bs = s;
              const hx = x0 + dx * t - s.x, hy = y0 + dy * t - s.y;
              const l = Math.hypot(hx, hy) || 1;
              bnx = hx / l; bny = hy / l;
            }
          }
        }
      }
      if (best <= Math.min(tmx, tmy)) break;
      if (cx === ex && cy === ey) break;
      if (tmx < tmy) { tmx += tdx; cx += stepX; } else { tmy += tdy; cy += stepY; }
    }
    if (bs && best <= 1) {
      hit.t = best; hit.s = bs; hit.nx = bnx; hit.ny = bny;
      return true;
    }
    return false;
  }

  private losHit: Hit = { t: 0, s: null, nx: 0, ny: 0 };
  los(x0: number, y0: number, x1: number, y1: number, mask: number): boolean {
    return !this.raycast(x0, y0, x1, y1, mask, this.losHit);
  }

  /** push a circle out of solids. returns true if collided */
  resolve(e: { x: number; y: number }, r: number, mask: number): boolean {
    let hit = false;
    const tmp = this.tmp;
    for (let iter = 0; iter < 3; iter++) {
      const n = this.query(e.x - r, e.y - r, e.x + r, e.y + r, mask, tmp);
      let any = false;
      for (let i = 0; i < n; i++) {
        const s = tmp[i];
        if (s.t === 0) {
          const qx = Math.max(s.x, Math.min(e.x, s.x + s.w));
          const qy = Math.max(s.y, Math.min(e.y, s.y + s.h));
          const dx = e.x - qx, dy = e.y - qy;
          const d2 = dx * dx + dy * dy;
          if (d2 < r * r) {
            if (d2 > 1e-8) {
              const d = Math.sqrt(d2);
              const p = r - d;
              e.x += (dx / d) * p; e.y += (dy / d) * p;
            } else {
              const l = e.x - s.x, rr = s.x + s.w - e.x, tp = e.y - s.y, bt = s.y + s.h - e.y;
              const m = Math.min(l, rr, tp, bt);
              if (m === l) e.x = s.x - r; else if (m === rr) e.x = s.x + s.w + r; else if (m === tp) e.y = s.y - r; else e.y = s.y + s.h + r;
            }
            any = true;
          }
        } else {
          const dx = e.x - s.x, dy = e.y - s.y;
          const rr = r + s.r;
          const d2 = dx * dx + dy * dy;
          if (d2 < rr * rr) {
            const d = Math.sqrt(d2) || 0.001;
            const p = rr - d;
            e.x += (dx / d) * p; e.y += (dy / d) * p;
            any = true;
          }
        }
      }
      if (!any) break;
      hit = true;
    }
    return hit;
  }
}

const DIRS = [
  [1, 0, 10], [-1, 0, 10], [0, 1, 10], [0, -1, 10],
  [1, 1, 14], [1, -1, 14], [-1, 1, 14], [-1, -1, 14],
];

export class Nav {
  cs = 32;
  cols: number;
  rows: number;
  blocked: Uint8Array;
  dist: Float32Array;
  private hi: Int32Array;
  private hv: Float32Array;
  private hn = 0;

  constructor(w: number, h: number, grid: Grid) {
    this.cols = Math.ceil(w / this.cs);
    this.rows = Math.ceil(h / this.cs);
    const N = this.cols * this.rows;
    this.blocked = new Uint8Array(N);
    this.dist = new Float32Array(N).fill(1e9);
    this.hi = new Int32Array(N * 8);
    this.hv = new Float32Array(N * 8);
    const tmp: Solid[] = [];
    const inf = 13;
    for (let cy = 0; cy < this.rows; cy++) {
      for (let cx = 0; cx < this.cols; cx++) {
        const x = (cx + 0.5) * this.cs, y = (cy + 0.5) * this.cs;
        const n = grid.query(x - inf, y - inf, x + inf, y + inf, F_MOVE, tmp);
        let b = 0;
        for (let i = 0; i < n && !b; i++) {
          const s = tmp[i];
          if (s.t === 0) {
            const qx = Math.max(s.x, Math.min(x, s.x + s.w)), qy = Math.max(s.y, Math.min(y, s.y + s.h));
            if ((x - qx) ** 2 + (y - qy) ** 2 < inf * inf) b = 1;
          } else if (Math.hypot(x - s.x, y - s.y) < s.r + inf) b = 1;
        }
        this.blocked[cy * this.cols + cx] = b;
      }
    }
  }

  idx(x: number, y: number) {
    const cx = Math.max(0, Math.min(this.cols - 1, Math.floor(x / this.cs)));
    const cy = Math.max(0, Math.min(this.rows - 1, Math.floor(y / this.cs)));
    return cy * this.cols + cx;
  }

  isOpen(x: number, y: number) {
    if (x < 20 || y < 20 || x > this.cols * this.cs - 20 || y > this.rows * this.cs - 20) return false;
    return this.blocked[this.idx(x, y)] === 0;
  }

  nearestOpen(x: number, y: number): { x: number; y: number } {
    if (this.isOpen(x, y)) return { x, y };
    for (let r = 1; r < 12; r++) {
      for (let a = 0; a < 16; a++) {
        const ang = (a / 16) * Math.PI * 2;
        const px = x + Math.cos(ang) * r * this.cs, py = y + Math.sin(ang) * r * this.cs;
        if (this.isOpen(px, py)) {
          const i = this.idx(px, py);
          return { x: ((i % this.cols) + 0.5) * this.cs, y: (Math.floor(i / this.cols) + 0.5) * this.cs };
        }
      }
    }
    return { x, y };
  }

  private push(i: number, v: number) {
    let k = this.hn++;
    const hi = this.hi, hv = this.hv;
    while (k > 0) {
      const p = (k - 1) >> 1;
      if (hv[p] <= v) break;
      hi[k] = hi[p]; hv[k] = hv[p];
      k = p;
    }
    hi[k] = i; hv[k] = v;
  }

  private pop(): number {
    const hi = this.hi, hv = this.hv;
    const top = hi[0];
    const n = --this.hn;
    if (n > 0) {
      const li = hi[n], lv = hv[n];
      let k = 0;
      for (;;) {
        let c = 2 * k + 1;
        if (c >= n) break;
        if (c + 1 < n && hv[c + 1] < hv[c]) c++;
        if (hv[c] >= lv) break;
        hi[k] = hi[c]; hv[k] = hv[c];
        k = c;
      }
      hi[k] = li; hv[k] = lv;
    }
    return top;
  }

  compute(tx: number, ty: number) {
    const { cols, rows, blocked, dist } = this;
    dist.fill(1e9);
    const t = this.nearestOpen(tx, ty);
    const s = this.idx(t.x, t.y);
    dist[s] = 0;
    this.hn = 0;
    this.push(s, 0);
    const cap = this.hi.length - 8;
    while (this.hn > 0) {
      const d0 = this.hv[0];
      const i = this.pop();
      if (d0 > dist[i]) continue;
      const cx = i % cols, cy = (i / cols) | 0;
      for (let k = 0; k < 8; k++) {
        const nx = cx + DIRS[k][0], ny = cy + DIRS[k][1];
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        const ni = ny * cols + nx;
        if (blocked[ni]) continue;
        if (k >= 4 && (blocked[cy * cols + nx] || blocked[ny * cols + cx])) continue;
        const nd = d0 + DIRS[k][2];
        if (nd < dist[ni]) {
          dist[ni] = nd;
          if (this.hn < cap) this.push(ni, nd);
        }
      }
    }
  }

  /** direction to follow the flow field from (x,y). returns false if no route */
  dir(x: number, y: number, out: { x: number; y: number }): boolean {
    const { cols, rows, blocked, dist, cs } = this;
    const cx = Math.max(0, Math.min(cols - 1, Math.floor(x / cs)));
    const cy = Math.max(0, Math.min(rows - 1, Math.floor(y / cs)));
    const i = cy * cols + cx;
    let best = dist[i], bi = -1;
    for (let k = 0; k < 8; k++) {
      const nx = cx + DIRS[k][0], ny = cy + DIRS[k][1];
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      const ni = ny * cols + nx;
      if (blocked[ni]) continue;
      if (k >= 4 && (blocked[cy * cols + nx] || blocked[ny * cols + cx])) continue;
      if (dist[ni] < best) { best = dist[ni]; bi = ni; }
    }
    if (bi < 0) return false;
    // look one more step ahead for smoother paths
    let ti = bi;
    const bx = bi % cols, by = (bi / cols) | 0;
    let best2 = dist[bi];
    for (let k = 0; k < 8; k++) {
      const nx = bx + DIRS[k][0], ny = by + DIRS[k][1];
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      const ni = ny * cols + nx;
      if (blocked[ni]) continue;
      if (k >= 4 && (blocked[by * cols + nx] || blocked[ny * cols + bx])) continue;
      if (dist[ni] < best2) { best2 = dist[ni]; ti = ni; }
    }
    // only use look-ahead if straight line to it is not blocked (check midpoint cell)
    const tx = ((ti % cols) + 0.5) * cs, ty = (((ti / cols) | 0) + 0.5) * cs;
    const mx = (x + tx) / 2, my = (y + ty) / 2;
    let gx = tx, gy = ty;
    if (blocked[this.idx(mx, my)]) { gx = (bx + 0.5) * cs; gy = (by + 0.5) * cs; }
    const dx = gx - x, dy = gy - y;
    const l = Math.hypot(dx, dy) || 1;
    out.x = dx / l; out.y = dy / l;
    return true;
  }

  distAt(x: number, y: number) { return this.dist[this.idx(x, y)]; }
}
