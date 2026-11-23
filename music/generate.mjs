// Procedural soundtrack generator for 鸭鸭鸭行动.
// Country roots (Karplus-Strong plucked strings, banjo, harmonica) + electronic pulse.
// Pure Node.js, no dependencies. Emits 32 kHz mono WAV loops, then ffmpeg -> small mp3.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SR = 32000;
const OUT = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const TAU = Math.PI * 2;

// ---- deterministic PRNG -------------------------------------------------
let seed = 0x2f6e2b1;
const rnd = () => { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return ((seed >>> 0) / 4294967296) * 2 - 1; };

// ---- helpers ------------------------------------------------------------
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const mk = (sec) => new Float32Array(Math.ceil(sec * SR));
const at = (buf, i, v) => { if (i >= 0 && i < buf.length) buf[i] += v; };

function mix(buf, wet, delaySec, gain) {
  const d = Math.floor(delaySec * SR);
  if (d <= 0) return;
  for (let i = d; i < buf.length; i++) buf[i] += buf[i - d] * gain;
}

function softclip(buf, drive = 0.85) {
  for (let i = 0; i < buf.length; i++) buf[i] = Math.tanh(buf[i] * drive) * 0.92;
}

function writeWav(file, buf) {
  const n = buf.length;
  const b = Buffer.alloc(44 + n * 2);
  b.write('RIFF', 0); b.writeUInt32LE(36 + n * 2, 4); b.write('WAVE', 8);
  b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22); b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28);
  b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write('data', 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.round(clamp(buf[i], -1, 1) * 32767), 44 + i * 2);
  fs.writeFileSync(file, b);
}

// ---- instruments --------------------------------------------------------
// Karplus-Strong plucked string. Averaging filter + loop = natural guitar/banjo decay.
function pluck(buf, t0, freq, dur, amp, damp = 0.996, bright = 0.5) {
  const N = Math.max(2, Math.round(SR / freq));
  const ring = new Float32Array(N);
  let prev = 0;
  for (let i = 0; i < N; i++) {
    const n = rnd();
    prev = prev * bright + n * (1 - bright);
    ring[i] = prev;
  }
  const start = Math.floor(t0 * SR), len = Math.floor(dur * SR);
  let idx = 0;
  for (let s = 0; s < len; s++) {
    const cur = ring[idx];
    const nxt = ring[(idx + 1) % N];
    ring[idx] = (cur + nxt) * 0.5 * damp;
    const env = s < 80 ? s / 80 : Math.exp(-s / (SR * dur * 0.62));
    at(buf, start + s, cur * amp * env);
    idx = (idx + 1) % N;
  }
}

// Warm synth bass: sine fundamental + a touch of 2nd/3rd harmonic.
function bass(buf, t0, freq, dur, amp, wave = 'sine') {
  const start = Math.floor(t0 * SR), len = Math.floor(dur * SR);
  const ph = rnd() * TAU;
  for (let s = 0; s < len; s++) {
    const t = s / SR, x = TAU * freq * t + ph;
    let v = Math.sin(x);
    if (wave === 'saw') v = v * 0.75 + Math.sin(2 * x) * 0.22 + Math.sin(3 * x) * 0.08;
    if (wave === 'pulse') v = Math.sign(Math.sin(x)) * 0.6 + Math.sin(x) * 0.4;
    const env = Math.min(1, s / 90) * Math.exp(-t * 2.2) * (1 - Math.exp(-(dur - t) * 18));
    at(buf, start + s, v * amp * env);
  }
}

// Sustained pad: detuned harmonic stack with slow tremolo.
function pad(buf, t0, notes, dur, amp, tone = 0.5) {
  const start = Math.floor(t0 * SR), len = Math.floor(dur * SR);
  for (let s = 0; s < len; s++) {
    const t = s / SR;
    const env = Math.min(1, t / (0.18 * SR / 100)) * Math.min(1, (dur - t) / 0.25);
    const trem = 0.85 + 0.15 * Math.sin(TAU * 0.32 * t);
    let v = 0;
    for (let k = 0; k < notes.length; k++) {
      const f = midi(notes[k]);
      v += Math.sin(TAU * f * t) * (0.55 + tone * 0.2);
      v += Math.sin(TAU * f * 1.005 * t) * 0.22;
      if (tone > 0.4) v += Math.sin(TAU * f * 2 * t) * 0.1;
    }
    at(buf, start + s, v * amp * env * trem / notes.length);
  }
}

// Harmonica-ish reed lead: square-ish tone with vibrato.
function reed(buf, t0, note, dur, amp) {
  const start = Math.floor(t0 * SR), len = Math.floor(dur * SR), f = midi(note);
  for (let s = 0; s < len; s++) {
    const t = s / SR;
    const vib = 1 + 0.006 * Math.sin(TAU * 5.5 * t);
    const x = TAU * f * vib * t;
    const v = Math.sin(x) * 0.6 + Math.sign(Math.sin(x)) * 0.16 + Math.sin(2 * x) * 0.1;
    const env = Math.min(1, t / 0.05) * Math.min(1, (dur - t) / 0.12);
    at(buf, start + s, v * amp * env);
  }
}

// Bell / mallet for extract and highlights.
function bell(buf, t0, note, dur, amp) {
  const start = Math.floor(t0 * SR), len = Math.floor(dur * SR), f = midi(note);
  for (let s = 0; s < len; s++) {
    const t = s / SR;
    const v = Math.sin(TAU * f * t) * 0.6 + Math.sin(TAU * f * 2.01 * t) * 0.22 + Math.sin(TAU * f * 3.98 * t) * 0.1;
    at(buf, start + s, v * amp * Math.exp(-t * 3.2));
  }
}

// Synth lead: short, articulate electronic melody line.
function synthLead(buf, t0, note, dur, amp, wave = 'saw') {
  const start = Math.floor(t0 * SR), len = Math.floor(dur * SR), f = midi(note);
  const ph = rnd() * TAU;
  for (let s = 0; s < len; s++) {
    const t = s / SR, x = TAU * f * t + ph;
    let v = wave === 'pulse'
      ? Math.sign(Math.sin(x)) * 0.55 + Math.sin(x) * 0.35
      : Math.sin(x) * 0.6 + Math.sin(2 * x) * 0.26 + Math.sin(3 * x) * 0.12;
    const env = Math.min(1, t / 0.012) * Math.exp(-t * 3.1) * Math.min(1, (dur - t) / 0.04);
    at(buf, start + s, v * amp * env);
  }
}

function kick(buf, t0, amp = 0.7) {
  const start = Math.floor(t0 * SR), len = Math.floor(0.22 * SR);
  let ph = 0;
  for (let s = 0; s < len; s++) {
    const t = s / SR;
    const f = 48 + 110 * Math.exp(-t * 28);
    ph += TAU * f / SR;
    at(buf, start + s, Math.sin(ph) * amp * Math.exp(-t * 16));
  }
}
function snare(buf, t0, amp = 0.35, brush = false) {
  const start = Math.floor(t0 * SR), len = Math.floor((brush ? 0.16 : 0.13) * SR);
  let lp = 0;
  for (let s = 0; s < len; s++) {
    const t = s / SR, n = rnd();
    lp = lp * (brush ? 0.45 : 0.2) + n * (brush ? 0.55 : 0.8);
    const body = Math.sin(TAU * 190 * t) * (brush ? 0.08 : 0.22);
    at(buf, start + s, (lp + body) * amp * Math.exp(-t * (brush ? 22 : 30)));
  }
}
function hat(buf, t0, amp = 0.12, open = false) {
  const start = Math.floor(t0 * SR), len = Math.floor((open ? 0.16 : 0.045) * SR);
  let prev = 0;
  for (let s = 0; s < len; s++) {
    const t = s / SR, n = rnd();
    const hp = n - prev; prev = n;
    at(buf, start + s, hp * amp * Math.exp(-t * (open ? 20 : 85)));
  }
}

// ---- song config --------------------------------------------------------
// chords: semitone offsets from key for each 2-bar segment (8 bars = 4 chords)
// scale: 0 = major pentatonic, 1 = minor pentatonic
const T = {
  menu: {
    name: '选角大厅 · 晨光点名', bpm: 100, key: 60, scale: 0,
    chords: [0, 5, 9, 7], pattern: 'arpeggio', banjo: 0.3, reed: 0, pad: 0.45,
    bassWave: 'sine', drums: { kick: [1, 0, 0, 0, 1, 0, 0, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.5 },
    bassSeq: [0, 7, 0, 4, 0, 7, 0, 5], arpOrder: [0, 1, 2, 3],
    lead: { type: 'pluck', seq: [0, 2, 4, 2, 1, 0, 2, 4], bars: [0,1,2,3,4,5,6,7], count: 8, start: 0, gap: 0.5, len: 0.5, amp: 0.07, octave: 12 },
    arp: 0.14, bell: 0, mood: 'bright',
  },
  island: {
    name: '鸭鸭岛 · 谷仓与风', bpm: 92, key: 55, scale: 0,
    chords: [0, 7, 5, 7], pattern: 'arpeggio', banjo: 0.8, reed: 0, pad: 0.4,
    bassWave: 'sine', drums: { kick: [1, 0, 0, 0, 1, 0, 0, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.35, brush: true },
    bassSeq: [0, 0, 7, 0, 0, 0, 5, 0], arpOrder: [0, 2, 3, 1],
    lead: { type: 'reed', seq: [0, 0, 2, 4, 2, 0, 4, 2], bars: [1,3,5,7], count: 4, start: 0.5, gap: 1, len: 0.9, amp: 0.1, octave: 12 },
    arp: 0.08, bell: 0, mood: 'country',
  },
  harbor: {
    name: '盐雾货港 · 潮汐慢拍', bpm: 88, key: 57, scale: 1,
    chords: [0, 3, 5, 7], pattern: 'arpeggio', banjo: 0.35, reed: 0, pad: 0.7,
    bassWave: 'sine', drums: { kick: [1, 0, 0, 0, 0, 0, 1, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.28, brush: true },
    bassSeq: [0, 0, 3, 0, 0, 7, 0, 3], arpOrder: [0, 2, 3, 1],
    lead: { type: 'pluck', seq: [0, 2, 3, 2, 0, 4, 3, 2], bars: [0,2,4,6], count: 4, start: 0.5, gap: 1, len: 1.1, amp: 0.055, octave: 12 },
    arp: 0.16, bell: 0.12, mood: 'mellow',
  },
  foundry: {
    name: '赤炉工厂 · 齿轮脉搏', bpm: 100, key: 52, scale: 1,
    chords: [0, 5, 3, 7], pattern: 'strum', banjo: 0.2, reed: 0, pad: 0.45,
    bassWave: 'pulse', drums: { kick: [1, 0, 0, 0, 1, 0, 1, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.42 },
    bassSeq: [0, 0, 7, 3, 0, 0, 5, 0], arpOrder: [3, 1, 2, 0],
    lead: { type: 'synth', seq: [0, 0, 3, 0, 2, 0, 3, 2], bars: [0,1,2,3,4,5,6,7], count: 8, start: 0, gap: 0.5, len: 0.42, amp: 0.045, wave: 'pulse', octave: 12 },
    arp: 0.2, bell: 0, mood: 'industrial',
  },
  islandFight: {
    name: '鸭鸭岛 · 谷仓追击', bpm: 124, key: 55, scale: 0,
    chords: [0, 9, 5, 7], pattern: 'strum', banjo: 0.85, reed: 0, pad: 0.28,
    bassWave: 'saw', drums: { kick: [1, 0, 0, 0, 1, 0, 0, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.7 },
    bassSeq: [0, 7, 0, 7, 0, 7, 5, 7], arpOrder: [0, 2, 1, 3],
    lead: { type: 'reed', seq: [4, 2, 0, 2, 4, 3, 2, 0], bars: [0,1,2,3,4,5,6,7], count: 8, start: 0, gap: 0.5, len: 0.44, amp: 0.055, octave: 12 },
    arp: 0.14, bell: 0, mood: 'fight',
  },
  harborFight: {
    name: '盐雾货港 · 码头交火', bpm: 118, key: 57, scale: 1,
    chords: [0, 7, 5, 3], pattern: 'arpeggio', banjo: 0.6, reed: 0, pad: 0.35,
    bassWave: 'saw', drums: { kick: [1, 0, 0, 1, 0, 0, 1, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.65 },
    bassSeq: [0, 0, 7, 0, 3, 0, 7, 5], arpOrder: [0, 3, 1, 2],
    lead: { type: 'synth', seq: [0, 2, 4, 2, 3, 1, 2, 0], bars: [0,1,2,3,4,5,6,7], count: 8, start: 0.25, gap: 0.5, len: 0.38, amp: 0.045, wave: 'pulse', octave: 12 },
    arp: 0.26, bell: 0, mood: 'fight',
  },
  foundryFight: {
    name: '赤炉工厂 · 炉前压制', bpm: 132, key: 52, scale: 1,
    chords: [0, 3, 5, 2], pattern: 'strum', banjo: 0.25, reed: 0, pad: 0.3,
    bassWave: 'pulse', drums: { kick: [1, 0, 0, 0, 1, 0, 1, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.8 },
    bassSeq: [0, 0, 0, 7, 0, 3, 0, 7], arpOrder: [0, 1, 3, 2],
    lead: { type: 'synth', seq: [0, 0, 2, 3, 0, 0, 4, 3], bars: [0,1,2,3,4,5,6,7], count: 8, start: 0, gap: 0.5, len: 0.4, amp: 0.048, octave: 12 },
    arp: 0.32, bell: 0, mood: 'fight',
  },
  bossGoose: {
    name: 'Boss · 鹅老大震地进行曲', bpm: 110, key: 50, scale: 1,
    chords: [0, 3, 7, 5], pattern: 'strum', banjo: 0.3, reed: 0.24, pad: 0.6,
    bassWave: 'pulse', drums: { kick: [1, 0, 0, 0, 1, 0, 1, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.4 },
    arp: 0.1, bell: 0.08, mood: 'boss',
  },
  bossCaptain: {
    name: 'Boss · 铁钩船长航海曲', bpm: 126, key: 57, scale: 1,
    chords: [0, 7, 5, 3], pattern: 'banjo', banjo: 1.0, reed: 0, pad: 0.35,
    bassWave: 'saw', drums: { kick: [1, 0, 0, 0, 1, 0, 0, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.55 },
    bassSeq: [0, 7, 0, 5, 0, 7, 0, 3], arpOrder: [0, 2, 3, 1],
    lead: { type: 'reed', seq: [4, 3, 2, 0, 2, 3, 4, 2], bars: [0,1,2,3,4,5,6,7], count: 4, start: 0, gap: 1, len: 0.7, amp: 0.075, octave: 12 },
    arp: 0.18, bell: 0, mood: 'boss',
  },
  bossFoundry: {
    name: 'Boss · 炉心监工热浪', bpm: 138, key: 52, scale: 1,
    chords: [0, 3, 5, 7], pattern: 'strum', banjo: 0.15, reed: 0, pad: 0.55,
    bassWave: 'pulse', drums: { kick: [1, 0, 1, 0, 1, 0, 1, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.9 },
    arp: 0.4, bell: 0, mood: 'boss',
  },
  extract: {
    name: '成功撤离 · 归途号角', bpm: 92, key: 60, scale: 0,
    chords: [0, 9, 2, 7], pattern: 'arpeggio', banjo: 0.2, reed: 0, pad: 0.7,
    bassWave: 'sine', drums: { kick: [1, 0, 0, 0, 1, 0, 0, 0], snare: [0, 0, 1, 0, 0, 0, 1, 0], hat: 0.25, brush: true },
    bassSeq: [0, 0, 5, 0, 0, 7, 0, 4], arpOrder: [0, 3, 2, 1],
    lead: { type: 'bell', seq: [0, 1, 2, 3, 4, 3, 2, 0], bars: [0,1,2,3,4,5,6,7], count: 4, start: 0, gap: 1, len: 1.3, amp: 0.085, octave: 12 },
    arp: 0.08, bell: 0, mood: 'warm',
  },
};

const PENT = [[0, 2, 4, 7, 9], [0, 3, 5, 7, 10]];

function render(cfg) {
  const bars = 8, spb = 60 / cfg.bpm, barLen = spb * 4;
  const total = bars * barLen;
  const buf = mk(total + 0.9); // tail for wrap-around reverb
  const scale = PENT[cfg.scale];
  const chordMaj = [0, 4, 7, 11], chordMin = [0, 3, 7, 10];

  for (let bar = 0; bar < bars; bar++) {
    const seg = Math.floor(bar / 2);
    const root = cfg.key + cfg.chords[seg];
    const ctype = cfg.scale === 0 ? chordMaj : chordMin;
    const cnotes = ctype.map((x) => root + x);
    const t0 = bar * barLen;

    // pad on chord change
    if (bar % 2 === 0 && cfg.pad) {
      pad(buf, t0, [root, root + (cfg.scale ? 3 : 4), root + 7], barLen * 2 + 0.1, cfg.pad * (cfg.mood === 'mellow' ? 0.14 : 0.1), cfg.mood === 'industrial' ? 0.9 : 0.4);
    }

    // bass on the pulse pattern
    const kp = cfg.drums.kick;
    for (let b = 0; b < 8; b++) {
      if (b % 2 === 0 || cfg.mood === 'fight' || cfg.mood === 'boss') {
        const seq = cfg.bassSeq || [0, 0, 7, 0, 0, 0, 7, 0];
        const n = root + seq[b % seq.length];
        bass(buf, t0 + b * spb / 2, midi(n) / 2, spb * (cfg.mood === 'boss' ? 0.42 : 0.55), cfg.mood === 'fight' ? 0.3 : 0.24, cfg.bassWave);
      }
    }

    // chord comping: arpeggio (country fingerpicking) or strum
    if (cfg.pattern === 'arpeggio' || cfg.pattern === 'banjo') {
      const steps = cfg.pattern === 'banjo'
        ? [0, 2, 3, 4, 6, 7, 10, 12]
        : [0, 3, 6, 8, 11, 14, 17, 19];
      for (let i = 0; i < steps.length; i++) {
        const t = t0 + steps[i] * spb / 4;
        const n = cnotes[i % cnotes.length] + (i >= 4 ? 12 : 0);
        pluck(buf, t, midi(n), 1.1, cfg.pattern === 'banjo' ? 0.13 : 0.1, cfg.pattern === 'banjo' ? 0.993 : 0.996, cfg.pattern === 'banjo' ? 0.3 : 0.6);
      }
    } else {
      // strums on beats 1 and 3 (and a push on 4.5 in fight/boss)
      const hits = cfg.mood === 'fight' || cfg.mood === 'boss' ? [0, 1.5, 2, 3.5] : [0, 2, 3.5];
      for (const h of hits) {
        for (let k = 0; k < 3; k++) {
          pluck(buf, t0 + h * spb + k * 0.012, midi(cnotes[k]), 0.9, 0.085, 0.995, 0.5);
        }
      }
    }

    // banjo layer (additional rolling accents)
    if (cfg.banjo && cfg.pattern !== 'banjo') {
      for (const s of [1, 5, 9, 13]) {
        pluck(buf, t0 + s * spb / 4, midi(cnotes[(s / 4) % 3 | 0] + 12), 0.55, 0.075 * cfg.banjo, 0.992, 0.25);
      }
    }

    // reed lead on a simple pentatonic motif, 2 phrases per song
    if (cfg.reed && (bar % 4 === 1 || bar % 4 === 3)) {
      const motif = [0, 2, 1, 3, 2, 0, 1, 0];
      for (let i = 0; i < 4; i++) {
        const d = scale[motif[(bar + i) % motif.length] % scale.length];
        reed(buf, t0 + (0.5 + i) * spb, root + 12 + d, spb * 0.8, 0.09 * cfg.reed * 4);
      }
    }

    // Per-song lead motif: each track has its own melodic contour and phrasing.
    if (cfg.lead && cfg.lead.bars.includes(bar)) {
      const L = cfg.lead;
      for (let i = 0; i < L.count; i++) {
        const deg = L.seq[(bar * 3 + i) % L.seq.length];
        const note = root + (L.octave ?? 12) + scale[deg % scale.length];
        const t = t0 + (L.start + i * L.gap) * spb;
        const dur = spb * L.len;
        if (L.type === 'reed') reed(buf, t, note, dur, L.amp);
        else if (L.type === 'bell') bell(buf, t, note, dur, L.amp);
        else if (L.type === 'pluck') pluck(buf, t, midi(note), dur, L.amp, 0.996, 0.6);
        else synthLead(buf, t, note, dur, L.amp, L.wave || 'saw');
      }
    }

    // electronic arpeggio: bright triangle-ish plucks on offbeats
    if (cfg.arp) {
      const order = cfg.arpOrder || [0, 2, 1, 3];
      for (let i = 0; i < 8; i++) {
        const t = t0 + (i + 0.5) * spb / 2;
        const n = cnotes[order[i % order.length]] + 12;
        const f = midi(n), st = Math.floor(t * SR), len = Math.floor(spb * 0.32 * SR);
        for (let s = 0; s < len; s++) {
          const tt = s / SR;
          const v = Math.sin(TAU * f * tt) * 0.7 + Math.sin(TAU * f * 2 * tt) * 0.18;
          at(buf, st + s, v * cfg.arp * Math.exp(-tt * 7));
        }
      }
    }

    // bell sparkles
    if (cfg.bell && (bar % 2 === 1 || cfg.mood === 'warm')) {
      bell(buf, t0 + spb * 2.5, root + 24 + scale[bar % scale.length], 1.1, cfg.bell * 0.13);
      if (cfg.mood === 'warm') bell(buf, t0 + spb * 3.5, root + 19, 0.9, cfg.bell * 0.1);
    }

    // drums
    for (let b = 0; b < 8; b++) {
      const t = t0 + b * spb / 2;
      if (kp[b % kp.length]) kick(buf, t, cfg.mood === 'boss' ? 0.8 : 0.6);
      if (cfg.drums.snare[b % 8]) snare(buf, t, 0.28, !!cfg.drums.brush);
      if (b % 2 === 0 || cfg.mood === 'fight' || cfg.mood === 'boss') {
        hat(buf, t, cfg.drums.hat * 0.16, false);
      }
    }
    // end-of-phrase fill
    if (bar === 3 || bar === 7) {
      for (let i = 0; i < 4; i++) snare(buf, t0 + 3 * spb + i * spb / 4, 0.16 + i * 0.04, !!cfg.drums.brush);
    }
  }

  // fold the reverb tail back to the beginning for a seamless loop
  const loopN = Math.floor(total * SR);
  const tailN = Math.min(buf.length - loopN, Math.floor(0.9 * SR));
  for (let i = 0; i < tailN; i++) buf[i] += buf[loopN + i] * (1 - i / tailN);
  const out = buf.subarray(0, loopN);
  mix(out, out, 0.19, cfg.mood === 'mellow' || cfg.mood === 'warm' ? 0.2 : 0.13);
  softclip(out, 0.9);
  // gentle edge fade at 8 ms to avoid clicks on single play
  const fade = Math.floor(0.008 * SR);
  for (let i = 0; i < fade; i++) {
    const g = i / fade;
    out[i] *= g; out[out.length - 1 - i] *= g;
  }
  return out;
}

// ---- run ---------------------------------------------------------------
const entries = Object.entries(T);
const wavDir = path.join(OUT, '.wav');
fs.mkdirSync(wavDir, { recursive: true });
for (const [id, cfg] of entries) {
  seed = 0x2f6e2b1 + id.length * 7919 + id.charCodeAt(0) * 131;
  const wav = path.join(wavDir, id + '.wav');
  const mp3 = path.join(OUT, id + '.mp3');
  writeWav(wav, render(cfg));
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wav, '-ac', '1', '-ar', '32000', '-b:a', '56k', mp3]);
  const kb = (fs.statSync(mp3).size / 1024).toFixed(0);
  console.log(`${id.padEnd(13)} ${cfg.name.padEnd(28)} ${kb} KB`);
}
fs.rmSync(wavDir, { recursive: true, force: true });
