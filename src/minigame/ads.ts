import { AD_UNITS, isAdConfigured } from './config';

type AdKind = keyof typeof AD_UNITS;
type CloseHandler = (res: { isEnded?: boolean }) => void;

const instances = new Map<AdKind, RewardedVideoAd | null>();

function getAd(kind: AdKind): RewardedVideoAd | null {
  if (instances.has(kind)) return instances.get(kind)!;
  const id = AD_UNITS[kind];
  if (!isAdConfigured(id)) {
    instances.set(kind, null);
    wx.showToast({ title: '广告位尚未配置', icon: 'none' });
    return null;
  }
  try {
    const ad = wx.createRewardedVideoAd({ adUnitId: id });
    ad.load().catch(() => { /* load on demand */ });
    instances.set(kind, ad);
    return ad;
  } catch {
    instances.set(kind, null);
    wx.showToast({ title: '广告初始化失败', icon: 'none' });
    return null;
  }
}

/** Show a rewarded video; resolves true only when the user watched it to the end. */
export function showRewarded(kind: AdKind): Promise<boolean> {
  return new Promise((resolve) => {
    const ad = getAd(kind);
    if (!ad) { resolve(false); return; }
    let done = false;
    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      ad.offClose(onClose);
      resolve(ok);
    };
    const onClose: CloseHandler = (res) => finish(!!res?.isEnded);
    ad.onClose(onClose);
    ad.show().catch(() => {
      ad.load().then(() => ad.show()).catch(() => {
        wx.showToast({ title: '广告加载失败，请稍后再试', icon: 'none' });
        finish(false);
      });
    });
  });
}
