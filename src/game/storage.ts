import { STARTING_STASH, UPGRADE_MAX, getCharacter, type CharacterId, type CharacterUpgrades, type UpgradeKey } from './data';
import type { RaidMapId } from './map';
import { readWarehouse, starterSupplies, type Warehouse } from './warehouse';

export interface ScoreEntry {
  score: number;
  outcome: 'extract' | 'dead' | 'mia';
  value: number;
  kills: number;
  time: number;
  date: number;
  kit: string;
  mapId?: RaidMapId;
  characterId?: CharacterId;
  best?: string;
  bestIcon?: string;
  bestR?: number;
}

export interface SaveData {
  stash: number;
  scores: ScoreEntry[];
  kit: string;
  characterId: CharacterId;
  muted: boolean;
  raids: number;
  extracts: number;
  bestValue: number;
  firstRun: boolean;
  trainingCompleted: boolean;
  debugMode: boolean;
  warehouse: Warehouse;
  upgrades: CharacterUpgrades;
}

const KEY = 'duckops.save.v1';
const UPGRADE_KEYS: UpgradeKey[] = ['capacity', 'rollCd', 'speed'];

function readUpgrades(value: unknown): CharacterUpgrades {
  const raw = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const out = { capacity: 0, rollCd: 0, speed: 0 };
  for (const key of UPGRADE_KEYS) {
    const n = raw[key];
    if (typeof n === 'number' && Number.isFinite(n)) out[key] = Math.max(0, Math.min(UPGRADE_MAX, Math.floor(n)));
  }
  return out;
}

export function defaultSave(): SaveData {
  return { stash: STARTING_STASH, scores: [], kit: 'assault', characterId: 'duck', muted: false, raids: 0, extracts: 0, bestValue: 0, firstRun: true, trainingCompleted: false, debugMode: false, warehouse: { items: [], supplies: starterSupplies(), selected: {} }, upgrades: { capacity: 0, rollCd: 0, speed: 0 } };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw) as Partial<SaveData>;
      const base = defaultSave();
      return {
        ...base,
        ...d,
        debugMode: d.debugMode === true,
        characterId: getCharacter(d.characterId).id,
        warehouse: readWarehouse(d.warehouse),
        upgrades: readUpgrades(d.upgrades),
        scores: Array.isArray(d.scores) ? d.scores.filter((s) => s && typeof s.score === 'number').slice(0, 10) : [],
        stash: typeof d.stash === 'number' && isFinite(d.stash) ? Math.max(0, d.stash) : base.stash,
      };
    }
  } catch {
    /* ignore corrupted save */
  }
  return defaultSave();
}

export function writeSave(d: SaveData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {
    /* storage unavailable */
  }
}

export function insertScore(list: ScoreEntry[], entry: ScoreEntry): { list: ScoreEntry[]; rank: number } {
  const all = [...list, entry].sort((a, b) => b.score - a.score || a.date - b.date);
  const rank = all.indexOf(entry);
  return { list: all.slice(0, 10), rank: rank < 10 ? rank : -1 };
}
