import { STARTING_STASH } from './data';

export interface ScoreEntry {
  score: number;
  outcome: 'extract' | 'dead' | 'mia';
  value: number;
  kills: number;
  time: number;
  date: number;
  kit: string;
  best?: string;
  bestIcon?: string;
  bestR?: number;
}

export interface SaveData {
  stash: number;
  scores: ScoreEntry[];
  kit: string;
  muted: boolean;
  raids: number;
  extracts: number;
  bestValue: number;
  firstRun: boolean;
  trainingCompleted: boolean;
}

const KEY = 'duckops.save.v1';

export function defaultSave(): SaveData {
  return { stash: STARTING_STASH, scores: [], kit: 'assault', muted: false, raids: 0, extracts: 0, bestValue: 0, firstRun: true, trainingCompleted: false };
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
