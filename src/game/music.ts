// Background music player: HTMLAudio based, crossfades between scene tracks.
// Tracks are small (96-150 KB) and shipped as static files under public/music/.
import type { RaidMapId } from './map';

export type MusicKey =
  | 'menu' | 'island' | 'harbor' | 'foundry'
  | 'islandFight' | 'harborFight' | 'foundryFight'
  | 'bossGoose' | 'bossCaptain' | 'bossFoundry' | 'extract';

const PATHS: Record<MusicKey, string> = {
  menu: 'menu.mp3',
  island: 'island.mp3',
  harbor: 'harbor.mp3',
  foundry: 'foundry.mp3',
  islandFight: 'islandFight.mp3',
  harborFight: 'harborFight.mp3',
  foundryFight: 'foundryFight.mp3',
  bossGoose: 'bossGoose.mp3',
  bossCaptain: 'bossCaptain.mp3',
  bossFoundry: 'bossFoundry.mp3',
  extract: 'extract.mp3',
};

const FADE = 0.65; // seconds

export class Music {
  private els = new Map<MusicKey, HTMLAudioElement>();
  private current: MusicKey | null = null;
  private target: MusicKey | null = null;
  private fading = 0;
  private fadeT = 0;
  private fadeFrom: MusicKey | null = null;
  private muted = false;
  private paused = false;
  private vol = 0.42; // music sits below the sound effects
  private started = false;
  private lastAttempt = 0;

  private el(key: MusicKey): HTMLAudioElement {
    let a = this.els.get(key);
    if (!a) {
      a = new Audio(PATHS[key]);
      a.loop = true;
      a.preload = 'auto';
      a.volume = 0;
      this.els.set(key, a);
    }
    return a;
  }

  unlock() {
    this.started = true;
  }

  setMuted(m: boolean) {
    this.muted = m;
    for (const a of this.els.values()) a.muted = m;
  }

  setPaused(p: boolean) {
    this.paused = p;
    if (p) {
      for (const a of this.els.values()) if (!a.paused) a.pause();
    } else if (this.current) {
      void this.el(this.current).play().catch(() => {});
    }
  }

  /** Request a track. Repeated calls with the same key are ignored. */
  play(key: MusicKey) {
    if (!this.started || this.paused) return;
    if (this.target === key && this.current === key) return;
    this.target = key;
    if (this.current === key) {
      const a = this.el(key);
      if (a.paused) void a.play().catch(() => {});
      return;
    }
    // Rapid flip guard: if we just left this track, hold for a moment,
    // but keep `target` so a later call can still return to it.
    const now = performance.now();
    if (this.fadeFrom === key && now - this.lastAttempt < 900) return;
    this.lastAttempt = now;
    // Settle any half-finished fade before starting a new one.
    if (this.fadeFrom && this.fadeFrom !== this.current) {
      const old = this.el(this.fadeFrom);
      old.pause();
      old.volume = 0;
    }
    this.fadeFrom = this.current;
    this.current = key;
    const incoming = this.el(key);
    incoming.volume = this.muted ? 0 : 0.0001;
    if (incoming.paused) void incoming.play().catch(() => {});
    this.fading = 1;
    this.fadeT = 0;
  }

  stop() {
    this.fading = 0;
    this.current = null;
    this.target = null;
    for (const a of this.els.values()) {
      a.pause();
      a.volume = 0;
    }
  }

  /** Called every animation frame with real (unscaled) delta time. */
  update(dt: number) {
    if (this.fading > 0) {
      this.fadeT += dt;
      const k = Math.min(1, this.fadeT / FADE);
      if (this.current) this.el(this.current).volume = this.muted ? 0 : this.vol * k;
      if (this.fadeFrom && this.fadeFrom !== this.current) {
        this.el(this.fadeFrom).volume = this.muted ? 0 : this.vol * (1 - k);
      }
      if (k >= 1) {
        if (this.fadeFrom && this.fadeFrom !== this.current) {
          const a = this.el(this.fadeFrom);
          a.pause();
          a.volume = 0;
        }
        this.fadeFrom = null;
        this.fading = 0;
      }
    }
  }
}

/** Choose the music for the current game state. */
export function trackFor(
  mode: 'demo' | 'raid',
  mapId: RaidMapId,
  bossType: string | null,
  fighting: boolean,
  extracting: boolean,
): MusicKey {
  if (extracting) return 'extract';
  if (bossType === 'goose' || bossType === 'broodQueen') return 'bossGoose';
  if (bossType === 'harborBoss' || bossType === 'frostMarshal' || bossType === 'ironGuard') return 'bossCaptain';
  if (bossType === 'foundryBoss' || bossType === 'duckKing') return 'bossFoundry';
  if (mode === 'demo') return 'menu';
  const intense = mapId === 'harbor' || mapId === 'foundry' || mapId === 'hatchery' || mapId === 'outpost' || mapId === 'mausoleum';
  if (fighting) return intense ? (mapId === 'harbor' ? 'harborFight' : 'foundryFight') : 'islandFight';
  return intense ? (mapId === 'harbor' ? 'harbor' : 'foundry') : 'island';
}
