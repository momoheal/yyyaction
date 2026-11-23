// Scene-driven background music. All tracks are synthesised at runtime by
// MusicEngine, so the single-file web build and the WeChat Mini Game never
// depend on external mp3 files.
import type { RaidMapId } from './map';
import { MusicEngine, type MusicKey } from './music-engine';

export type { MusicKey } from './music-engine';

const CALM: Record<RaidMapId, MusicKey> = {
  island: 'island', harbor: 'harbor', foundry: 'foundry',
  hatchery: 'hatchery', outpost: 'outpost', mausoleum: 'mausoleum',
};

const FIGHT: Record<RaidMapId, MusicKey> = {
  island: 'islandFight', harbor: 'harborFight', foundry: 'foundryFight',
  hatchery: 'hatcheryFight', outpost: 'outpostFight', mausoleum: 'mausoleumFight',
};

/** Small facade so callers don't need to know about the synth. */
export class Music {
  private engine = new MusicEngine();

  unlock() { this.engine.unlock(); }
  setMuted(muted: boolean) { this.engine.setMuted(muted); }
  setPaused(paused: boolean) { this.engine.setPaused(paused); }
  play(key: MusicKey) { this.engine.play(key); }
  stop() { this.engine.stop(); }
  /** Kept for the existing animation loop; WebAudio runs its own clock. */
  update(_dt: number) { /* no-op */ }
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
  switch (bossType) {
    case 'goose': return 'bossGoose';
    case 'harborBoss': return 'bossCaptain';
    case 'foundryBoss': return 'bossFoundry';
    case 'broodQueen': return 'bossBrood';
    case 'frostMarshal': return 'bossFrost';
    case 'ironGuard':
    case 'ironWarden': return 'bossIron';
    case 'duckKing': return 'bossDuckKing';
  }
  if (mode === 'demo') return 'menu';
  return fighting ? FIGHT[mapId] : CALM[mapId];
}
