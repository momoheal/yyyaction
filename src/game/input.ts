export type Action = 'reload' | 'interact' | 'grenade' | 'throwableNext' | 'heal' | 'swap' | 'roll' | 'slot1' | 'slot2' | 'bag' | 'dropLowest';

export interface Btn { id: string; x: number; y: number; r: number; label: string }

export interface BagSlot { x: number; y: number; w: number; h: number; index: number }
export interface BagUi {
  x: number; y: number; w: number; h: number;
  slots: BagSlot[];
  dropLowest: { x: number; y: number; w: number; h: number };
  close: { x: number; y: number; w: number; h: number };
}

/** Shared geometry so the renderer and input hit-testing agree on bag panel positions. */
export function bagUi(W: number, H: number, u: number): BagUi {
  const cols = 5, rows = 4, gap = 6 * u;
  const cell = Math.min(58 * u, (W - 44) / cols - gap);
  const gridW = cols * cell + (cols - 1) * gap;
  const gridH = rows * cell + (rows - 1) * gap;
  const w = Math.min(W - 24, gridW + 28 * u);
  const h = Math.min(H - 24, gridH + 92 * u);
  const x = (W - w) / 2, y = (H - h) / 2;
  const gx = x + (w - gridW) / 2, gy = y + 34 * u;
  const slots: BagSlot[] = [];
  for (let i = 0; i < 20; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    slots.push({ x: gx + c * (cell + gap), y: gy + r * (cell + gap), w: cell, h: cell, index: i });
  }
  const by = gy + gridH + 10 * u, bw = (gridW - gap) / 2, bh = 32 * u;
  return { x, y, w, h, slots, dropLowest: { x: gx, y: by, w: bw, h: bh }, close: { x: gx + bw + gap, y: by, w: bw, h: bh } };
}

export interface TouchLayout {
  u: number;
  stickR: number;
  btns: Btn[];
  interact: Btn;
  pause: Btn;
  moveHint: { x: number; y: number };
  aimHint: { x: number; y: number };
  mm: number; // minimap width
}

export function hudScale(W: number, H: number, touch: boolean) {
  if (touch) return Math.max(0.78, Math.min(1.15, Math.min(W, H) / 430));
  return Math.max(0.8, Math.min(1.25, Math.min(W, H) / 820));
}

export function touchLayout(W: number, H: number): TouchLayout {
  const u = hudScale(W, H, true);
  const inset = 8;
  const button = (id: string, label: string, x: number, y: number, r: number): Btn =>
    ({ id, label, x: W - inset - x * u, y: H - inset - y * u, r: r * u });
  const mm = Math.round(132 * u);
  // LOLM-style cluster: action buttons form a spaced arc around the aim stick.
  // The bag sits high on the right edge, far from the firing thumb, to avoid
  // accidental opens mid-fire. Distances are from the bottom-right corner in `u`.
  return {
    u,
    stickR: 48 * u,
    btns: [
      button('roll', '翻滚', 26, 50, 25),      // bottom-left of aim stick, within thumb reach
      button('reload', '换弹', 150, 30, 21),   // bottom-right corner
      button('heal', '治疗', 96, 196, 21),     // directly above aim stick
      button('grenade', '投掷', 170, 148, 20), // right column, mid — clear of aim stick
      button('throwableNext', '切雷', 170, 108, 17), // above throw button — cycle among carried types
      button('swap', '切枪', 170, 220, 20),    // right column, high
      button('bag', 'Bag', 96, 268, 21),      // top, far from firing thumb; short label fits the circle
    ],
    interact: button('interact', '搜索', 214, 78, 25),
    pause: W >= 600
      ? { id: 'pause', label: 'II', x: W - 14 - mm - 30 * u, y: 14 + 20 * u, r: 18 * u }
      : { id: 'pause', label: 'II', x: W - 14 - 24 * u, y: 14 + mm * 0.75 + 30 * u, r: 18 * u },
    moveHint: { x: 92 * u, y: H - 100 * u },
    aimHint: { x: W - inset - 92 * u, y: H - inset - 104 * u },
    mm,
  };
}

interface Stick { id: number; ox: number; oy: number; x: number; y: number }

export class Input {
  keys = new Set<string>();
  private pressed = new Set<string>();
  mouseX = -1000;
  mouseY = -1000;
  mouseDown = false;
  touchMode = false;
  moveS: Stick = { id: -1, ox: 0, oy: 0, x: 0, y: 0 };
  aimS: Stick = { id: -1, ox: 0, oy: 0, x: 0, y: 0 };
  btnPointers = new Map<number, string>();
  held = new Set<string>();
  W = 1;
  H = 1;
  layout: TouchLayout = touchLayout(1, 1);
  interactVisible = false;
  hasHealing = false;
  hasGrenade = false;
  hasThrowableNext = false;
  hasSecondWeapon = false;
  enabled = false;
  bagOpen = false;
  dropLowestEnabled = false;
  onPause: () => void = () => {};
  onMute: () => void = () => {};
  onBagDrop: (index: number) => void = () => {};
  onBagDropLowest: () => void = () => {};
  onBagClose: () => void = () => {};
  private el: HTMLElement;
  private cleanup: (() => void)[] = [];

  constructor(el: HTMLElement) {
    this.el = el;
    this.touchMode = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0) && !window.matchMedia('(pointer: fine)').matches;
    const on = <K extends keyof WindowEventMap>(t: EventTarget, type: K | string, fn: (e: never) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn as EventListener, opts);
      this.cleanup.push(() => t.removeEventListener(type, fn as EventListener, opts));
    };
    on(window, 'keydown', (e: KeyboardEvent) => this.onKey(e, true));
    on(window, 'keyup', (e: KeyboardEvent) => this.onKey(e, false));
    on(window, 'blur', () => this.reset());
    on(el, 'pointerdown', (e: PointerEvent) => this.onDown(e), { passive: false });
    on(window, 'pointermove', (e: PointerEvent) => this.onMove(e), { passive: false });
    on(window, 'pointerup', (e: PointerEvent) => this.onUp(e));
    on(window, 'pointercancel', (e: PointerEvent) => this.onUp(e));
    on(el, 'contextmenu', (e: Event) => e.preventDefault());
    on(el, 'wheel', (e: WheelEvent) => { if (this.enabled && Math.abs(e.deltaY) > 4) this.press('swap'); }, { passive: true });
    on(el, 'touchstart', (e: TouchEvent) => { if (e.cancelable) e.preventDefault(); }, { passive: false });
  }

  destroy() { this.cleanup.forEach((f) => f()); this.cleanup = []; }

  setSize(W: number, H: number) {
    this.W = W; this.H = H;
    this.layout = touchLayout(W, H);
  }

  private press(a: string) { if (this.enabled) this.pressed.add(a); }

  consume(a: Action): boolean {
    if (this.pressed.has(a)) { this.pressed.delete(a); return true; }
    return false;
  }

  reset() {
    this.keys.clear();
    this.pressed.clear();
    this.mouseDown = false;
    this.moveS.id = -1;
    this.aimS.id = -1;
    this.btnPointers.clear();
    this.held.clear();
  }

  private onKey(e: KeyboardEvent, down: boolean) {
    const c = e.code;
    if (down) {
      if (this.enabled && ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(c)) e.preventDefault();
      if (c === 'KeyM' && !e.repeat) this.onMute();
      if (e.repeat) return;
      this.keys.add(c);
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(c)) this.touchMode = false;
      switch (c) {
        case 'KeyR': this.press('reload'); break;
        case 'KeyE': case 'KeyF': this.press('interact'); break;
        case 'KeyG': this.press('grenade'); break;
        case 'KeyT': this.press('throwableNext'); break;
        case 'KeyH': case 'KeyX': this.press('heal'); break;
        case 'KeyQ': this.press('swap'); break;
        case 'KeyB': this.press('bag'); break;
        case 'KeyV': this.press('dropLowest'); break;
        case 'Digit1': this.press('slot1'); break;
        case 'Digit2': this.press('slot2'); break;
        case 'Space': case 'ShiftLeft': case 'ShiftRight': this.press('roll'); break;
      }
    } else {
      this.keys.delete(c);
    }
  }

  buttonAvailable(id: string) {
    if (id === 'heal') return this.hasHealing;
    if (id === 'grenade') return this.hasGrenade;
    if (id === 'throwableNext') return this.hasThrowableNext;
    if (id === 'swap') return this.hasSecondWeapon;
    if (id === 'dropLowest') return this.dropLowestEnabled;
    return true;
  }

  private hitBtn(x: number, y: number): string | null {
    const L = this.layout;
    if (Math.hypot(x - L.pause.x, y - L.pause.y) < L.pause.r * 1.5) return 'pause';
    if (this.interactVisible && Math.hypot(x - L.interact.x, y - L.interact.y) < L.interact.r * 1.25) return 'interact';
    for (const b of L.btns) if (this.buttonAvailable(b.id) && Math.hypot(x - b.x, y - b.y) < b.r * 1.16) return b.id;
    return null;
  }

  private onDown(e: PointerEvent) {
    if (this.bagOpen) {
      if (e.cancelable) e.preventDefault();
      const x = e.clientX, y = e.clientY;
      const ui = bagUi(this.W, this.H, this.layout.u);
      const inRect = (r: { x: number; y: number; w: number; h: number }) =>
        x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
      if (inRect(ui.dropLowest)) this.onBagDropLowest();
      else if (inRect(ui.close) || !inRect(ui)) this.onBagClose();
      else {
        const slot = ui.slots.find(inRect);
        if (slot) this.onBagDrop(slot.index);
      }
      return;
    }
    if (e.pointerType === 'mouse') {
      this.touchMode = false;
      this.mouseX = e.clientX; this.mouseY = e.clientY;
      if (e.button === 0) this.mouseDown = true;
      if (e.button === 2) this.press('roll');
      try { this.el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
      return;
    }
    if (e.cancelable) e.preventDefault();
    this.touchMode = true;
    const x = e.clientX, y = e.clientY;
    const b = this.hitBtn(x, y);
    if (b) {
      this.btnPointers.set(e.pointerId, b);
      this.held.add(b);
      if (b === 'pause') { if (this.enabled) this.onPause(); }
      else if (b === 'bag') { if (this.enabled) this.press('bag'); }
      else this.press(b);
      return;
    }
    if (x < this.W * 0.5) {
      if (this.moveS.id < 0) this.moveS = { id: e.pointerId, ox: x, oy: y, x, y };
    } else if (this.aimS.id < 0) {
      this.aimS = { id: e.pointerId, ox: x, oy: y, x, y };
    }
    try { this.el.setPointerCapture(e.pointerId); } catch { /* ignore */ }
  }

  private follow(s: Stick, x: number, y: number) {
    s.x = x; s.y = y;
    const R = this.layout.stickR;
    const dx = x - s.ox, dy = y - s.oy;
    const d = Math.hypot(dx, dy);
    if (d > R * 1.25) {
      const k = (d - R * 1.25) / d;
      s.ox += dx * k; s.oy += dy * k;
    }
  }

  private onMove(e: PointerEvent) {
    if (e.pointerType === 'mouse') {
      this.mouseX = e.clientX; this.mouseY = e.clientY;
      if (e.movementX !== 0 || e.movementY !== 0) this.touchMode = false;
      return;
    }
    if (e.pointerId === this.moveS.id) this.follow(this.moveS, e.clientX, e.clientY);
    else if (e.pointerId === this.aimS.id) this.follow(this.aimS, e.clientX, e.clientY);
  }

  private onUp(e: PointerEvent) {
    if (e.pointerType === 'mouse') {
      if (e.button === 0) this.mouseDown = false;
      return;
    }
    if (e.pointerId === this.moveS.id) this.moveS.id = -1;
    if (e.pointerId === this.aimS.id) this.aimS.id = -1;
    const b = this.btnPointers.get(e.pointerId);
    if (b) { this.btnPointers.delete(e.pointerId); this.held.delete(b); }
  }

  moveVec(out: { x: number; y: number }) {
    let x = 0, y = 0;
    const k = this.keys;
    if (k.has('KeyA') || k.has('ArrowLeft')) x -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) x += 1;
    if (k.has('KeyW') || k.has('ArrowUp')) y -= 1;
    if (k.has('KeyS') || k.has('ArrowDown')) y += 1;
    if (x !== 0 || y !== 0) {
      const l = Math.hypot(x, y);
      out.x = x / l; out.y = y / l;
      return;
    }
    if (this.moveS.id >= 0) {
      const R = this.layout.stickR;
      let dx = (this.moveS.x - this.moveS.ox) / R, dy = (this.moveS.y - this.moveS.oy) / R;
      const l = Math.hypot(dx, dy);
      if (l < 0.12) { out.x = 0; out.y = 0; return; }
      const m = Math.min(1, (l - 0.12) / 0.6);
      dx /= l; dy /= l;
      out.x = dx * m; out.y = dy * m;
      return;
    }
    out.x = 0; out.y = 0;
  }

  aimMag(): number {
    if (this.aimS.id < 0) return 0;
    return Math.min(1, Math.hypot(this.aimS.x - this.aimS.ox, this.aimS.y - this.aimS.oy) / this.layout.stickR);
  }

  aimActive(): boolean { return this.touchMode && this.aimS.id >= 0 && this.aimMag() > 0.15; }

  aimAngle(): number { return Math.atan2(this.aimS.y - this.aimS.oy, this.aimS.x - this.aimS.ox); }

  firing(): boolean {
    if (this.touchMode) return this.aimS.id >= 0 && this.aimMag() > 0.42;
    return this.mouseDown;
  }
}
