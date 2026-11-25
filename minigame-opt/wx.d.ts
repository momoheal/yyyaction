// Minimal typings for the WeChat mini game runtime used by this port.
interface WxTouch {
  identifier: number;
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
}

interface WxTouchEvent {
  touches: WxTouch[];
  changedTouches: WxTouch[];
  timeStamp: number;
}

interface RewardedVideoAd {
  load(): Promise<unknown>;
  show(): Promise<unknown>;
  destroy(): void;
  onClose(cb: (res: { isEnded?: boolean; errMsg?: string }) => void): void;
  offClose(cb: (res: { isEnded?: boolean; errMsg?: string }) => void): void;
  onError(cb: (err: { errMsg?: string }) => void): void;
  offError(cb: (err: { errMsg?: string }) => void): void;
}

interface WxMiniGame {
  createCanvas(): HTMLCanvasElement;
  createWebAudioContext(): AudioContext;
  getSystemInfoSync(): { windowWidth: number; windowHeight: number; pixelRatio: number; platform: string };
  getWindowInfo?(): { windowWidth: number; windowHeight: number; pixelRatio: number };
  setStorageSync(key: string, value: unknown): void;
  getStorageSync<T = unknown>(key: string): T;
  removeStorageSync(key: string): void;
  createRewardedVideoAd(opts: { adUnitId: string }): RewardedVideoAd;
  onTouchStart(cb: (e: WxTouchEvent) => void): void;
  onTouchMove(cb: (e: WxTouchEvent) => void): void;
  onTouchEnd(cb: (e: WxTouchEvent) => void): void;
  onTouchCancel(cb: (e: WxTouchEvent) => void): void;
  onShow(cb: () => void): void;
  onHide(cb: () => void): void;
  showToast(opts: { title: string; icon?: 'success' | 'error' | 'none'; duration?: number }): void;
  vibrateShort?(opts?: { type?: 'light' | 'medium' | 'heavy' }): void;
  triggerGC?(): void;
}

declare const wx: WxMiniGame;
