// Procedural background music: every track is synthesised with WebAudio at
// runtime. No mp3 files, no network requests — so the single-file web build and
// the WeChat Mini Game (which has no HTMLAudio) play the same music.

export type MusicKey =
  | 'menu' | 'extract'
  | 'island' | 'islandFight'
  | 'harbor' | 'harborFight'
  | 'foundry' | 'foundryFight'
  | 'hatchery' | 'hatcheryFight'
  | 'outpost' | 'outpostFight'
  | 'mausoleum' | 'mausoleumFight'
  | 'bossGoose' | 'bossCaptain' | 'bossFoundry'
  | 'bossBrood' | 'bossFrost' | 'bossIron' | 'bossDuckKing';

const MAJ = [0, 2, 4, 5, 7, 9, 11];
const MIN = [0, 2, 3, 5, 7, 8, 10];
const DOR = [0, 2, 3, 5, 7, 9, 10];
const PHR = [0, 1, 3, 5, 7, 8, 10];
const HARM = [0, 2, 3, 5, 7, 8, 11];
const LYD = [0, 2, 4, 6, 7, 9, 11];
const PENT = [0, 2, 4, 7, 9];

export interface TrackSpec {
  bpm: number;
  /** Root note as MIDI number. */
  root: number;
  /** Semitone offsets of the scale. */
  scale: number[];
  /** One chord (scale degrees) per bar. */
  chords: number[][];
  /** 16th-note melody, degrees relative to the chord root; null is a rest. */
  lead: (number | null)[];
  /** 16th-note bass line, degrees relative to the chord root. */
  bass: (number | null)[];
  /** 16th-note drum pattern: K kick, S snare, H open hat, h closed hat. */
  drums: string;
  wave: OscillatorType;
  filter: number;
  pad: boolean;
  arp: boolean;
  bell: boolean;
  swing: number;
  leadVol: number;
  bassVol: number;
  padVol: number;
  drumVol: number;
}

type TrackInput = Pick<TrackSpec, 'bpm' | 'root' | 'scale' | 'chords' | 'lead' | 'bass' | 'drums'> & Partial<TrackSpec>;

function track(input: TrackInput): TrackSpec {
  return {
    wave: 'triangle', filter: 2400, pad: true, arp: false, bell: false, swing: 0,
    leadVol: 0.13, bassVol: 0.17, padVol: 0.05, drumVol: 0.5,
    ...input,
  };
}

/** Parse a 16-step pattern string; '.' means rest. */
const notes = (s: string): (number | null)[] =>
  s.trim().split(/\s+/).map((v) => (v === '.' ? null : Number(v)));

export const TRACKS: Record<MusicKey, TrackSpec> = {
  menu: track({
    bpm: 108, root: 62, scale: PENT, wave: 'triangle', filter: 2800, swing: 0.06, arp: true,
    chords: [[0, 2, 4], [3, 5, 7], [4, 6, 8], [2, 4, 6]],
    lead: notes('0 . 2 4 . 2 1 . 3 . 4 5 . 4 2 .'),
    bass: notes('0 . . 0 . . 4 . 3 . . 3 . . 2 .'),
    drums: 'K..hS..hK..hS.hh',
  }),
  extract: track({
    bpm: 122, root: 65, scale: MAJ, wave: 'triangle', filter: 3200, arp: true, bell: true,
    chords: [[0, 2, 4], [4, 6, 8], [5, 7, 9], [3, 5, 7]],
    lead: notes('4 . 5 6 . 5 4 . 2 . 4 5 . 4 2 .'),
    bass: notes('0 . . 0 . . 4 . 1 . . 1 . . 3 .'),
    drums: 'K..hS..hK..hS..h',
  }),
  island: track({
    bpm: 96, root: 60, scale: MAJ, wave: 'triangle', filter: 2400, padVol: 0.06,
    chords: [[0, 2, 4], [5, 7, 9], [3, 5, 7], [4, 6, 8]],
    lead: notes('4 . . 2 . 1 . 0 2 . 4 . . 2 . .'),
    bass: notes('0 . . . 4 . . . 3 . . . 2 . . .'),
    drums: 'K.....S...K...S.',
  }),
  islandFight: track({
    bpm: 134, root: 60, scale: MIN, wave: 'square', filter: 1800, drumVol: 0.62,
    chords: [[0, 2, 4], [5, 7, 9], [3, 5, 7], [4, 6, 8]],
    lead: notes('0 2 4 . 2 0 . 1 3 4 . 3 2 . 1 .'),
    bass: notes('0 . 0 . 4 . 4 . 3 . 3 . 2 . 2 .'),
    drums: 'K.hhS.hhK.hhS.hK',
  }),
  harbor: track({
    bpm: 102, root: 57, scale: DOR, wave: 'sawtooth', filter: 1500, swing: 0.1, arp: true,
    chords: [[0, 2, 4], [3, 5, 7], [5, 7, 9], [4, 6, 8]],
    lead: notes('0 . 2 3 . 2 . 0 4 . 3 . 2 . 1 .'),
    bass: notes('0 . . 0 . . 3 . 5 . . 5 . . 4 .'),
    drums: 'K..h.S..hK..hS.h',
  }),
  harborFight: track({
    bpm: 142, root: 57, scale: MIN, wave: 'sawtooth', filter: 1900, drumVol: 0.66,
    chords: [[0, 2, 4], [3, 5, 7], [4, 6, 8], [2, 4, 6]],
    lead: notes('0 2 3 4 . 3 2 0 4 5 . 4 3 . 2 .'),
    bass: notes('0 . 0 . 0 . 3 . 4 . 4 . 2 . 2 .'),
    drums: 'K.hKS.hhK.hKS.KK',
  }),
  foundry: track({
    bpm: 112, root: 50, scale: MIN, wave: 'square', filter: 1000, drumVol: 0.68,
    chords: [[0, 2, 4], [0, 2, 4], [5, 7, 9], [3, 5, 7]],
    lead: notes('0 . 0 2 . 4 . 2 0 . 5 . 4 . 2 .'),
    bass: notes('0 . 0 . 0 . 0 . 5 . 5 . 3 . 3 .'),
    drums: 'K.K.S..KK.K.S.KK',
  }),
  foundryFight: track({
    bpm: 152, root: 50, scale: MIN, wave: 'sawtooth', filter: 1400, drumVol: 0.78,
    chords: [[0, 2, 4], [0, 2, 4], [5, 7, 9], [4, 6, 8]],
    lead: notes('0 0 2 4 0 2 4 5 3 3 5 4 2 1 0 .'),
    bass: notes('0 . 0 0 0 . 0 0 5 . 5 5 4 . 4 4'),
    drums: 'K.KKS.KKK.KKS.KK',
  }),
  // 腐叶孵化场：弗里几亚音阶 + 稀疏水滴式铃音，突出潮湿与虫巢感。
  hatchery: track({
    bpm: 92, root: 55, scale: PHR, wave: 'sine', filter: 1300, arp: true, bell: true,
    padVol: 0.075, leadVol: 0.11,
    chords: [[0, 2, 4], [1, 3, 5], [0, 2, 4], [5, 0, 2]],
    lead: notes('0 . . 1 . . 2 . 3 . . 2 . 1 . .'),
    bass: notes('0 . . . 1 . . . 0 . . . 5 . . .'),
    drums: 'K.....hS....h..K',
  }),
  hatcheryFight: track({
    bpm: 138, root: 55, scale: PHR, wave: 'sawtooth', filter: 1700, drumVol: 0.72, arp: true,
    chords: [[0, 2, 4], [1, 3, 5], [0, 2, 4], [5, 0, 2]],
    lead: notes('0 1 2 . 1 0 1 2 3 . 2 1 0 1 . 2'),
    bass: notes('0 . 0 0 1 . 1 1 0 . 0 0 5 . 5 5'),
    drums: 'K.KKS..KK.KKS.KK',
  }),
  // 霜锋哨站：利底亚音阶 + 冷色铃音，留白多、节奏慢，像风扫过冰面。
  outpost: track({
    bpm: 84, root: 62, scale: LYD, wave: 'sine', filter: 2200, bell: true, padVol: 0.075,
    chords: [[0, 2, 4], [4, 6, 8], [1, 3, 5], [0, 2, 4]],
    lead: notes('4 . . . 2 . . 3 5 . . . 4 . . .'),
    bass: notes('0 . . . 4 . . . 1 . . . 0 . . .'),
    drums: 'K.......S.......',
  }),
  outpostFight: track({
    bpm: 130, root: 62, scale: LYD, wave: 'triangle', filter: 2600, drumVol: 0.7, arp: true,
    chords: [[0, 2, 4], [4, 6, 8], [1, 3, 5], [0, 2, 4]],
    lead: notes('4 5 6 . 5 4 2 . 3 4 5 . 4 2 1 .'),
    bass: notes('0 . 0 . 4 . 4 . 1 . 1 . 0 . 0 .'),
    drums: 'K.hhS.hhK.hhS.hK',
  }),
  // 鸭王陵寝：和声小调 + 管风琴式长音和钟声，庄严而压迫。
  mausoleum: track({
    bpm: 72, root: 48, scale: HARM, wave: 'sawtooth', filter: 800, bell: true, padVol: 0.085, leadVol: 0.1,
    chords: [[0, 2, 4], [5, 0, 2], [3, 5, 0], [4, 6, 1]],
    lead: notes('0 . . . 2 . . . 4 . . 3 . 2 . .'),
    bass: notes('0 . . . 5 . . . 3 . . . 4 . . .'),
    drums: 'K.......S.......',
  }),
  mausoleumFight: track({
    bpm: 126, root: 48, scale: HARM, wave: 'sawtooth', filter: 1200, drumVol: 0.8, arp: true,
    chords: [[0, 2, 4], [5, 0, 2], [3, 5, 0], [4, 6, 1]],
    lead: notes('0 2 4 5 4 2 0 1 3 5 6 5 3 2 1 0'),
    bass: notes('0 . 0 0 5 . 5 5 3 . 3 3 4 . 4 4'),
    drums: 'K.KKS.KKK.KKS.KK',
  }),
  bossGoose: track({
    bpm: 140, root: 58, scale: MIN, wave: 'square', filter: 2100, drumVol: 0.7,
    chords: [[0, 2, 4], [3, 5, 7], [4, 6, 8], [0, 2, 4]],
    lead: notes('0 2 4 . 5 4 2 . 0 2 4 . 5 . 2 .'),
    bass: notes('0 . 0 . 3 . 3 . 4 . 4 . 0 . 0 .'),
    drums: 'K.hKS.hhK.hKS.KK',
  }),
  bossCaptain: track({
    bpm: 136, root: 53, scale: DOR, wave: 'sawtooth', filter: 1800, drumVol: 0.72,
    chords: [[0, 2, 4], [5, 7, 9], [3, 5, 7], [4, 6, 8]],
    lead: notes('0 2 3 4 . 3 2 0 5 . 4 3 2 . 1 .'),
    bass: notes('0 . 0 0 5 . 5 5 3 . 3 3 4 . 4 4'),
    drums: 'K.hKS.hhK.hKS.KK',
  }),
  bossFoundry: track({
    bpm: 150, root: 50, scale: MIN, wave: 'square', filter: 1300, drumVol: 0.82,
    chords: [[0, 2, 4], [0, 2, 4], [4, 6, 8], [3, 5, 7]],
    lead: notes('0 0 2 4 0 2 4 5 4 4 2 1 0 1 2 .'),
    bass: notes('0 0 0 0 0 0 0 0 4 4 4 4 3 3 3 3'),
    drums: 'K.KKS.KKK.KKS.KK',
  }),
  // 持续召怪的鸭后：更快的虫鸣式琶音与密集鼓点。
  bossBrood: track({
    bpm: 154, root: 55, scale: PHR, wave: 'sawtooth', filter: 1600, drumVol: 0.8, arp: true,
    chords: [[0, 2, 4], [1, 3, 5], [0, 2, 4], [5, 0, 2]],
    lead: notes('0 1 2 1 0 1 2 3 4 3 2 1 0 1 2 .'),
    bass: notes('0 0 0 0 1 1 1 1 0 0 0 0 5 5 5 5'),
    drums: 'KKSKKKSKKKSKKKSK',
  }),
  // 双首领：霜锋元帅的冷冽主题。
  bossFrost: track({
    bpm: 132, root: 62, scale: LYD, wave: 'triangle', filter: 2700, bell: true, drumVol: 0.72,
    chords: [[0, 2, 4], [4, 6, 8], [1, 3, 5], [0, 2, 4]],
    lead: notes('4 5 6 . 5 4 2 3 5 6 . 5 4 2 1 .'),
    bass: notes('0 . 0 0 4 . 4 4 1 . 1 1 0 . 0 0'),
    drums: 'K.hhS.hhK.hhS.hK',
  }),
  // 铁壁统领：更重的低频进行曲。
  bossIron: track({
    bpm: 126, root: 45, scale: MIN, wave: 'square', filter: 900, drumVol: 0.85,
    chords: [[0, 2, 4], [0, 2, 4], [5, 7, 9], [3, 5, 7]],
    lead: notes('0 . 2 4 . 0 2 . 5 . 4 2 . 1 0 .'),
    bass: notes('0 0 0 . 0 0 0 . 5 5 5 . 3 3 3 .'),
    drums: 'K.KKS..KK.KKS.KK',
  }),
  // 最终鸭王：全曲最快，四小节和弦轮换对应四招。
  bossDuckKing: track({
    bpm: 144, root: 48, scale: HARM, wave: 'sawtooth', filter: 1500, drumVol: 0.85, arp: true, bell: true,
    chords: [[0, 2, 4], [5, 0, 2], [3, 5, 0], [4, 6, 1]],
    lead: notes('0 2 4 5 6 5 4 2 0 1 3 5 6 5 3 2'),
    bass: notes('0 0 0 0 5 5 5 5 3 3 3 3 4 4 4 4'),
    drums: 'KKSKKKSKKKSKKKSK',
  }),
};

function midiFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function degreeFreq(spec: TrackSpec, degree: number): number {
  const scale = spec.scale;
  const octave = Math.floor(degree / scale.length);
  const index = ((degree % scale.length) + scale.length) % scale.length;
  return midiFreq(spec.root + scale[index] + octave * 12);
}

interface Player {
  key: MusicKey;
  spec: TrackSpec;
  bus: GainNode;
  step: number;
  bar: number;
  next: number;
  /** Fade-out finish time; the player is removed once reached. */
  dead: number;
}

const FADE = 0.55;

/** Runtime WebAudio sequencer shared by the web build and the mini game. */
export class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private timer: ReturnType<typeof setInterval> | null = null;
  private players: Player[] = [];
  private current: MusicKey | null = null;
  private vol = 0.34;
  private muted = false;
  private paused = false;
  private started = false;

  /** Must be called from a user gesture (browser autoplay policy). */
  unlock() {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const master = ctx.createGain();
        master.gain.value = this.muted || this.paused ? 0 : this.vol;
        // A gentle limiter keeps stacked synth voices from clipping.
        if (typeof ctx.createDynamicsCompressor === 'function') {
          const comp = ctx.createDynamicsCompressor();
          comp.threshold.value = -18;
          comp.knee.value = 12;
          comp.ratio.value = 6;
          comp.attack.value = 0.004;
          comp.release.value = 0.18;
          master.connect(comp);
          comp.connect(ctx.destination);
        } else master.connect(ctx.destination);
        const len = Math.floor(ctx.sampleRate * 0.7);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
        this.ctx = ctx;
        this.master = master;
        this.noise = buf;
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      if (!this.started) {
        this.started = true;
        this.timer = setInterval(() => this.tick(), 25);
      }
    } catch {
      /* audio unsupported */
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    this.applyMaster();
  }

  setPaused(p: boolean) {
    if (this.paused === p) return;
    this.paused = p;
    this.applyMaster();
    if (!p && this.ctx) {
      const now = this.ctx.currentTime;
      for (const player of this.players) if (!player.dead) player.next = now + 0.04;
    }
  }

  private applyMaster() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    const target = this.muted || this.paused ? 0 : this.vol;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(target, now + 0.12);
  }

  stop() {
    const ctx = this.ctx;
    if (ctx) {
      const now = ctx.currentTime;
      for (const p of this.players) {
        p.bus.gain.cancelScheduledValues(now);
        p.bus.gain.setValueAtTime(0, now);
      }
    }
    this.players = [];
    this.current = null;
  }

  dispose() {
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
    this.stop();
    this.started = false;
  }

  /** Crossfade to a track; repeated calls with the same key do nothing. */
  play(key: MusicKey) {
    if (!this.started || !this.ctx || !this.master || this.current === key) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    for (const p of this.players) {
      if (p.dead) continue;
      p.bus.gain.cancelScheduledValues(now);
      p.bus.gain.setValueAtTime(p.bus.gain.value, now);
      p.bus.gain.linearRampToValueAtTime(0, now + FADE);
      p.dead = now + FADE + 0.04;
    }
    const spec = TRACKS[key];
    const bus = ctx.createGain();
    bus.gain.setValueAtTime(0, now);
    bus.gain.linearRampToValueAtTime(1, now + FADE);
    bus.connect(this.master);
    this.players.push({ key, spec, bus, step: 0, bar: 0, next: now + 0.03, dead: 0 });
    this.current = key;
  }

  private tick() {
    const ctx = this.ctx;
    if (!ctx || this.paused || this.muted) return;
    const now = ctx.currentTime;
    this.players = this.players.filter((p) => {
      if (p.dead && now >= p.dead) {
        p.bus.disconnect();
        return false;
      }
      return true;
    });
    const horizon = now + 0.2;
    for (const p of this.players) {
      // After a long tab suspension, skip back into the present instead of
      // dumping a burst of stale notes into the audio graph.
      if (p.next < now - 0.25) p.next = now + 0.03;
      const stepDur = 60 / p.spec.bpm / 4;
      let guard = 0;
      while (p.next < horizon && guard++ < 24) {
        this.scheduleStep(p, stepDur);
        p.next += stepDur;
        p.step++;
        if (p.step >= 16) { p.step = 0; p.bar++; }
      }
    }
  }

  private env(g: GainNode, t: number, attack: number, dur: number, peak: number) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }

  private tone(t: number, freq: number, dur: number, vol: number, type: OscillatorType, dest: AudioNode, filter?: number, detune = 0) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (detune) o.detune.setValueAtTime(detune, t);
    const g = ctx.createGain();
    this.env(g, t, Math.min(0.03, dur * 0.2), dur, vol);
    if (filter) {
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.setValueAtTime(filter, t);
      o.connect(f);
      f.connect(g);
    } else o.connect(g);
    g.connect(dest);
    o.start(t);
    o.stop(t + dur + 0.04);
  }

  private noiseHit(t: number, dur: number, type: BiquadFilterType, freq: number, q: number, vol: number, dest: AudioNode) {
    const ctx = this.ctx!;
    if (!this.noise) return;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    f.Q.setValueAtTime(q, t);
    const g = ctx.createGain();
    this.env(g, t, 0.002, dur, vol);
    src.connect(f);
    f.connect(g);
    g.connect(dest);
    src.start(t);
    src.stop(t + dur + 0.03);
  }

  private kick(t: number, vol: number, dest: AudioNode) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(46, t + 0.16);
    const g = ctx.createGain();
    this.env(g, t, 0.003, 0.2, vol);
    o.connect(g);
    g.connect(dest);
    o.start(t);
    o.stop(t + 0.24);
  }

  private scheduleStep(p: Player, stepDur: number) {
    const spec = p.spec;
    const step = p.step;
    const bar = p.bar % spec.chords.length;
    const chord = spec.chords[bar];
    const swing = p.step % 2 ? stepDur * spec.swing : 0;
    const t = p.next + swing;
    const bus = p.bus;

    // Pad: one sustained chord per bar, three slightly detuned voices.
    if (spec.pad && step === 0) {
      const barDur = stepDur * 16;
      for (let i = 0; i < chord.length; i++) {
        const f = degreeFreq(spec, chord[i] + 7);
        this.tone(t, f, barDur * 0.94, spec.padVol, 'sine', bus, spec.filter * 0.6, -5);
        this.tone(t, f, barDur * 0.94, spec.padVol * 0.7, 'triangle', bus, spec.filter * 0.6, 5);
      }
    }

    const lead = spec.lead[step];
    if (lead !== null && lead !== undefined) {
      const f = degreeFreq(spec, chord[0] + lead + 7);
      const dur = stepDur * 2.2;
      if (spec.bell) {
        this.tone(t, f, dur, spec.leadVol, 'sine', bus);
        this.tone(t, f * 2.76, dur * 0.5, spec.leadVol * 0.28, 'sine', bus);
      } else {
        this.tone(t, f, dur, spec.leadVol, spec.wave, bus, spec.filter);
      }
    }

    const bass = spec.bass[step];
    if (bass !== null && bass !== undefined) {
      const f = degreeFreq(spec, chord[0] + bass - 7);
      this.tone(t, f, stepDur * 1.8, spec.bassVol, 'triangle', bus, spec.filter * 0.5);
    }

    if (spec.arp && step % 2 === 1) {
      const f = degreeFreq(spec, chord[(p.step >> 1) % chord.length] + 14);
      this.tone(t, f, stepDur * 0.9, spec.leadVol * 0.42, 'sine', bus);
    }

    const drum = spec.drums[step] ?? '.';
    if (drum === 'K') this.kick(p.next, 0.9 * spec.drumVol, bus);
    else if (drum === 'S') {
      this.noiseHit(t, 0.13, 'bandpass', 1800, 0.8, 0.42 * spec.drumVol, bus);
      this.tone(t, 180, 0.07, 0.16 * spec.drumVol, 'triangle', bus);
    } else if (drum === 'H' || drum === 'h') {
      this.noiseHit(t, drum === 'H' ? 0.08 : 0.035, 'highpass', 7000, 0.7, (drum === 'H' ? 0.16 : 0.1) * spec.drumVol, bus);
    }
  }
}
