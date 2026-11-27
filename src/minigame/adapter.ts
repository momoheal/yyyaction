/**
 * Browser-compatibility layer for the WeChat Mini Game runtime.
 * Allows the existing Canvas/Input/Sfx/Storage modules to run unchanged.
 */
type AnyCtx = Record<string, unknown> & { stroke?: (...args: unknown[]) => void };

class MiniPath2D {
  private ops: { op: 'moveTo' | 'lineTo'; x: number; y: number }[] = [];
  moveTo(x: number, y: number) { this.ops.push({ op: 'moveTo', x, y }); }
  lineTo(x: number, y: number) { this.ops.push({ op: 'lineTo', x, y }); }
  replay(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    for (const o of this.ops) {
      if (o.op === 'moveTo') ctx.moveTo(o.x, o.y);
      else ctx.lineTo(o.x, o.y);
    }
  }
}

function patchCanvasContext(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d') as unknown as AnyCtx | null;
  if (!ctx || ctx.__miniPatched) return;
  ctx.__miniPatched = true;
  const stroke = ctx.stroke;
  ctx.stroke = (...args: unknown[]) => {
    if (args[0] instanceof MiniPath2D) {
      (args[0] as MiniPath2D).replay(ctx as unknown as CanvasRenderingContext2D);
      (stroke as (...a: unknown[]) => void).call(ctx);
    } else {
      (stroke as (...a: unknown[]) => void).apply(ctx, args);
    }
  };
}

function createCanvas(): HTMLCanvasElement {
  const canvas = wx.createCanvas();
  patchCanvasContext(canvas);
  return canvas;
}

const listeners = new Map<string, ((e: never) => void)[]>();

function on(target: string, type: string, fn: (e: never) => void) {
  const key = `${target}:${type}`;
  const arr = listeners.get(key) ?? [];
  arr.push(fn);
  listeners.set(key, arr);
}

function off(target: string, type: string, fn: (e: never) => void) {
  const key = `${target}:${type}`;
  const arr = listeners.get(key) ?? [];
  const i = arr.indexOf(fn);
  if (i >= 0) arr.splice(i, 1);
}

function dispatch(target: string, type: string, e: unknown) {
  for (const fn of listeners.get(`${target}:${type}`) ?? []) (fn as (x: unknown) => void)(e);
}

/** Synthesize a PointerEvent-like object from a wx touch point. */
function pointerLike(t: WxTouch, pointerType: 'touch' | 'mouse') {
  return {
    pointerId: t.identifier,
    pointerType,
    clientX: t.clientX,
    clientY: t.clientY,
    button: 0,
    cancelable: false,
    movementX: 0,
    movementY: 0,
    preventDefault() { /* no-op */ },
  };
}

export const fakeWindow = {
  devicePixelRatio: 1,
  innerWidth: 1,
  innerHeight: 1,
  ontouchstart: true,
  matchMedia: () => ({ matches: false, addListener() {}, removeListener() {} }),
  addEventListener(type: string, fn: (e: never) => void) { on('window', type, fn); },
  removeEventListener(type: string, fn: (e: never) => void) { off('window', type, fn); },
  AudioContext: undefined as unknown as typeof AudioContext,
  webkitAudioContext: undefined as unknown as typeof AudioContext,
};

export const fakeElement = {
  addEventListener(type: string, fn: (e: never) => void) { on('el', type, fn); },
  removeEventListener(type: string, fn: (e: never) => void) { off('el', type, fn); },
  setPointerCapture() { /* no-op */ },
  releasePointerCapture() { /* no-op */ },
};

/**
 * 往全局对象注入浏览器垫片。
 * 真机上这些名字都不存在，直接赋值即可；但微信开发者工具的模拟器里
 * window / navigator / document 是只读访问器（"which has only a getter"），
 * 直接赋值会抛 TypeError 让整包在加载期挂掉。所以这里按三级降级：
 * 赋值 → defineProperty 覆盖 → 逐属性打到已有对象上。
 */
function installGlobal(name: string, value: unknown) {
  const g = globalThis as unknown as Record<string, unknown>;
  try {
    g[name] = value;
    if (g[name] === value) return;
  } catch { /* 只读访问器，继续降级 */ }
  try {
    Object.defineProperty(g, name, { value, configurable: true, writable: true });
    if (g[name] === value) return;
  } catch { /* 不可配置，继续降级 */ }
  const target = g[name];
  if (target && typeof target === 'object' && value && typeof value === 'object') {
    for (const key of Object.keys(value as Record<string, unknown>)) {
      try { (target as Record<string, unknown>)[key] = (value as Record<string, unknown>)[key]; } catch { /* 单个属性也只读，放弃 */ }
    }
  }
}

export function installAdapter() {
  const g = globalThis as unknown as Record<string, unknown>;
  const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
  fakeWindow.devicePixelRatio = info.pixelRatio || 1;
  fakeWindow.innerWidth = info.windowWidth;
  fakeWindow.innerHeight = info.windowHeight;
  fakeWindow.AudioContext = wx.createWebAudioContext as unknown as typeof AudioContext;
  fakeWindow.webkitAudioContext = fakeWindow.AudioContext;

  installGlobal('window', fakeWindow);
  installGlobal('document', {
    createElement(tag: string) {
      if (tag === 'canvas') return createCanvas();
      return { style: {}, appendChild() {}, setAttribute() {} };
    },
    addEventListener() {},
    removeEventListener() {},
    hidden: false,
    documentElement: { requestFullscreen: undefined, style: {} },
    fullscreenElement: null,
  });
  installGlobal('navigator', { maxTouchPoints: 5 });
  installGlobal('localStorage', {
    getItem(key: string) { try { return wx.getStorageSync<string>(key) ?? null; } catch { return null; } },
    setItem(key: string, value: string) { try { wx.setStorageSync(key, value); } catch { /* ignore */ } },
    removeItem(key: string) { try { wx.removeStorageSync(key); } catch { /* ignore */ } },
  });
  installGlobal('Path2D', MiniPath2D);
  // 小游戏没有 DOM Image。不补这一层，任何 new Image() 都会抛
  // ReferenceError: Can't find variable: Image，且在启动期就中断，整局卡在加载页。
  if (typeof g.Image !== 'function') {
    installGlobal('Image', function MiniImage() {
      return wx.createImage();
    });
  }
  installGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 16) as unknown as number);
  installGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id));
  if (!g.performance) installGlobal('performance', { now: () => Date.now() });

  wx.onTouchStart((e) => {
    for (const t of e.changedTouches) dispatch('el', 'pointerdown', pointerLike(t, 'touch'));
    dispatch('el', 'touchstart', e);
  });
  wx.onTouchMove((e) => {
    for (const t of e.changedTouches) dispatch('window', 'pointermove', pointerLike(t, 'touch'));
  });
  const end = (e: WxTouchEvent) => {
    for (const t of e.changedTouches) dispatch('window', 'pointerup', pointerLike(t, 'touch'));
  };
  wx.onTouchEnd(end);
  wx.onTouchCancel(end);
}

// Installed at module evaluation time so all dependent modules see browser globals.
installAdapter();
