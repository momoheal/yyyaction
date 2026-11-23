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

export function installAdapter() {
  const g = globalThis as unknown as Record<string, unknown>;
  const info = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
  fakeWindow.devicePixelRatio = info.pixelRatio || 1;
  fakeWindow.innerWidth = info.windowWidth;
  fakeWindow.innerHeight = info.windowHeight;
  fakeWindow.AudioContext = wx.createWebAudioContext as unknown as typeof AudioContext;
  fakeWindow.webkitAudioContext = fakeWindow.AudioContext;

  g.window = fakeWindow;
  g.document = {
    createElement(tag: string) {
      if (tag === 'canvas') return createCanvas();
      return { style: {}, appendChild() {}, setAttribute() {} };
    },
    addEventListener() {},
    removeEventListener() {},
    hidden: false,
    documentElement: { requestFullscreen: undefined, style: {} },
    fullscreenElement: null,
  };
  g.navigator = { maxTouchPoints: 5 };
  g.localStorage = {
    getItem(key: string) { try { return wx.getStorageSync<string>(key) ?? null; } catch { return null; } },
    setItem(key: string, value: string) { try { wx.setStorageSync(key, value); } catch { /* ignore */ } },
    removeItem(key: string) { try { wx.removeStorageSync(key); } catch { /* ignore */ } },
  };
  g.Path2D = MiniPath2D;
  g.requestAnimationFrame = (cb: FrameRequestCallback) => setTimeout(() => cb(Date.now()), 16) as unknown as number;
  g.cancelAnimationFrame = (id: number) => clearTimeout(id);
  g.performance = g.performance ?? { now: () => Date.now() };

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
