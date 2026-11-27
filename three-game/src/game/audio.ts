// Procedural WebAudio sound effects — no assets required.

const GAPS: Record<string, number> = {
  eshot: 0.03, hit: 0.025, tick: 0.07, armor: 0.03, smg: 0.02, lmg: 0.02, rifle: 0.02, quack: 0.3, cluck: 0.18,
  peck: 0.05, bounce: 0.06, crit: 0.03, kill: 0.03, hurt: 0.06, explosion: 0.04, beep: 0.05, step: 0.08,
};

export class Sfx {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  noiseBuf: AudioBuffer | null = null;
  muted = false;
  lx = 0;
  ly = 0;
  private last = new Map<string, number>();

  unlock() {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        this.ctx = ctx;
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -16;
        comp.knee.value = 10;
        comp.ratio.value = 6;
        comp.attack.value = 0.003;
        comp.release.value = 0.2;
        const master = ctx.createGain();
        master.gain.value = this.muted ? 0 : 0.65;
        master.connect(comp);
        comp.connect(ctx.destination);
        this.master = master;
        const len = Math.floor(ctx.sampleRate * 1.0);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        this.noiseBuf = buf;
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch {
      /* audio unsupported */
    }
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.65;
  }

  private out(pan: number, vol: number): AudioNode {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.gain.value = vol;
    if (pan !== 0 && typeof ctx.createStereoPanner === 'function') {
      const p = ctx.createStereoPanner();
      p.pan.value = pan;
      g.connect(p);
      p.connect(this.master!);
    } else g.connect(this.master!);
    return g;
  }

  private env(t: number, dur: number, vol: number, attack: number): GainNode {
    const g = this.ctx!.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    return g;
  }

  private noise(t: number, dur: number, type: BiquadFilterType, f0: number, f1: number, q: number, vol: number, dest: AudioNode, attack = 0.002) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) f.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    f.Q.value = q;
    const g = this.env(t, dur, vol, attack);
    src.connect(f);
    f.connect(g);
    g.connect(dest);
    src.start(t, Math.random() * 0.4);
    src.stop(t + dur + 0.05);
  }

  private tone(t: number, dur: number, type: OscillatorType, f0: number, f1: number, vol: number, dest: AudioNode, attack = 0.003, filt?: [BiquadFilterType, number, number]) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    if (f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = this.env(t, dur, vol, attack);
    if (filt) {
      const f = ctx.createBiquadFilter();
      f.type = filt[0];
      f.frequency.value = filt[1];
      f.Q.value = filt[2];
      o.connect(f);
      f.connect(g);
    } else o.connect(g);
    g.connect(dest);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  beep(freq: number, vol = 0.18) {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + 0.005;
    const d = this.out(0, vol);
    this.tone(t, 0.09, 'sine', freq, freq, 1, d);
    this.tone(t, 0.05, 'triangle', freq * 2, freq * 2, 0.3, d);
  }

  play(name: string, x?: number, y?: number, vol = 1) {
    const ctx = this.ctx;
    if (!ctx || this.muted || !this.master || !this.noiseBuf) return;
    const now = ctx.currentTime;
    const gap = GAPS[name] ?? 0.012;
    const lt = this.last.get(name);
    if (lt !== undefined && now - lt < gap) return;
    this.last.set(name, now);
    let pan = 0;
    if (x !== undefined && y !== undefined) {
      const d = Math.hypot(x - this.lx, y - this.ly);
      const att = Math.max(0, 1 - d / 1500);
      if (att < 0.04) return;
      vol *= att * att * 0.85 + att * 0.15;
      pan = Math.max(-0.85, Math.min(0.85, (x - this.lx) / 800));
    }
    const o = this.out(pan, vol);
    const t = now + 0.004;
    switch (name) {
      case 'pistol':
        this.noise(t, 0.1, 'bandpass', 2400, 900, 0.9, 0.9, o);
        this.tone(t, 0.08, 'square', 260, 70, 0.16, o);
        this.tone(t, 0.12, 'sine', 150, 45, 0.6, o);
        break;
      case 'smg':
        this.noise(t, 0.075, 'bandpass', 2800, 1200, 0.8, 0.7, o);
        this.tone(t, 0.06, 'sine', 170, 60, 0.45, o);
        break;
      case 'rifle':
        this.noise(t, 0.14, 'lowpass', 5000, 700, 0.7, 0.85, o);
        this.tone(t, 0.12, 'sine', 130, 40, 0.7, o);
        this.tone(t, 0.04, 'square', 900, 300, 0.08, o);
        break;
      case 'lmg':
        this.noise(t, 0.13, 'lowpass', 4200, 600, 0.7, 0.85, o);
        this.tone(t, 0.12, 'sine', 115, 36, 0.75, o);
        break;
      case 'shotgun':
        this.noise(t, 0.32, 'lowpass', 3200, 250, 0.6, 1.0, o);
        this.tone(t, 0.25, 'sine', 95, 32, 0.9, o);
        this.noise(t + 0.38, 0.06, 'bandpass', 1500, 1500, 2, 0.25, o);
        this.noise(t + 0.5, 0.05, 'bandpass', 2200, 2200, 2, 0.25, o);
        break;
      case 'sniper':
        this.noise(t, 0.5, 'lowpass', 6000, 300, 0.6, 1.0, o);
        this.tone(t, 0.4, 'sine', 110, 28, 1.0, o);
        this.noise(t + 0.15, 0.45, 'lowpass', 1200, 200, 0.5, 0.25, o);
        break;
      case 'eshot':
        this.noise(t, 0.09, 'bandpass', 1700, 600, 0.8, 0.55, o);
        this.tone(t, 0.08, 'sine', 140, 50, 0.35, o);
        break;
      case 'hit':
        this.tone(t, 0.035, 'square', 1500, 900, 0.1, o);
        this.noise(t, 0.05, 'highpass', 2500, 2500, 0.7, 0.22, o);
        break;
      case 'crit':
        this.tone(t, 0.05, 'square', 1900, 1300, 0.12, o);
        this.tone(t + 0.02, 0.09, 'sine', 2600, 2600, 0.12, o);
        break;
      case 'armor':
        this.tone(t, 0.07, 'triangle', 2400, 1900, 0.16, o);
        break;
      case 'shield':
        this.noise(t, 0.18, 'highpass', 3000, 1500, 0.7, 0.35, o);
        this.tone(t, 0.22, 'triangle', 1700, 500, 0.2, o);
        break;
      case 'kill':
        this.tone(t, 0.09, 'sine', 880, 880, 0.3, o);
        this.tone(t + 0.06, 0.16, 'sine', 1320, 1320, 0.26, o);
        this.noise(t, 0.12, 'bandpass', 900, 400, 1, 0.25, o);
        break;
      case 'hurt':
        this.tone(t, 0.16, 'sawtooth', 320, 120, 0.2, o, 0.003, ['lowpass', 1400, 1]);
        this.noise(t, 0.12, 'lowpass', 900, 200, 0.7, 0.5, o);
        break;
      case 'quack':
        for (let i = 0; i < 2; i++) this.tone(t + i * 0.13, 0.11, 'sawtooth', 460, 330, 0.35, o, 0.006, ['bandpass', 1150, 2.5]);
        break;
      case 'cluck':
        for (let i = 0; i < 3; i++) this.tone(t + i * 0.07, 0.05, 'square', 950, 650, 0.14, o, 0.003, ['bandpass', 1500, 3]);
        break;
      case 'honk':
        this.tone(t, 0.5, 'sawtooth', 300, 220, 0.55, o, 0.01, ['bandpass', 800, 1.4]);
        this.tone(t, 0.5, 'square', 304, 224, 0.2, o, 0.01, ['bandpass', 1300, 2]);
        this.tone(t + 0.55, 0.35, 'sawtooth', 280, 210, 0.45, o, 0.01, ['bandpass', 800, 1.4]);
        break;
      case 'peck':
        this.noise(t, 0.05, 'bandpass', 1800, 900, 2, 0.4, o);
        break;
      case 'explosion':
        this.noise(t, 1.1, 'lowpass', 1800, 60, 0.5, 1.2, o, 0.004);
        this.tone(t, 0.7, 'sine', 80, 25, 1.0, o);
        this.noise(t, 0.25, 'highpass', 1500, 600, 0.5, 0.35, o);
        break;
      case 'reload':
        this.noise(t, 0.04, 'bandpass', 3200, 3200, 3, 0.3, o);
        this.tone(t + 0.09, 0.03, 'square', 700, 500, 0.08, o);
        break;
      case 'reloadEnd':
        this.noise(t, 0.03, 'bandpass', 2500, 2500, 3, 0.35, o);
        this.noise(t + 0.07, 0.04, 'bandpass', 4000, 4000, 3, 0.35, o);
        break;
      case 'empty':
        this.tone(t, 0.025, 'square', 1800, 1500, 0.1, o);
        break;
      case 'roll':
        this.noise(t, 0.22, 'bandpass', 700, 250, 1.2, 0.35, o, 0.03);
        break;
      case 'open':
        this.noise(t, 0.18, 'bandpass', 500, 300, 2, 0.3, o, 0.02);
        this.tone(t, 0.12, 'triangle', 220, 160, 0.12, o);
        break;
      case 'tick':
        this.tone(t, 0.025, 'sine', 1400, 1400, 0.05, o);
        break;
      case 'r0':
        this.tone(t, 0.12, 'sine', 660, 660, 0.14, o);
        break;
      case 'r1':
        this.tone(t, 0.14, 'sine', 784, 784, 0.16, o);
        this.tone(t + 0.06, 0.14, 'sine', 988, 988, 0.12, o);
        break;
      case 'r2':
        [880, 1175].forEach((f, i) => this.tone(t + i * 0.07, 0.22, 'triangle', f, f, 0.18, o));
        break;
      case 'r3':
        [880, 1109, 1319, 1760].forEach((f, i) => this.tone(t + i * 0.06, 0.28, 'triangle', f, f, 0.18, o));
        break;
      case 'r4':
        [1047, 1319, 1568, 2093].forEach((f, i) => this.tone(t + i * 0.055, 0.4, 'triangle', f, f, 0.2, o));
        this.noise(t, 0.7, 'highpass', 6000, 6000, 0.5, 0.12, o, 0.05);
        this.tone(t, 0.5, 'sine', 131, 131, 0.3, o);
        break;
      case 'r5':
        [523, 659, 784, 1047].forEach((f) => this.tone(t, 1.3, 'triangle', f, f, 0.13, o, 0.02));
        [1047, 1319, 1568, 2093, 2637].forEach((f, i) => this.tone(t + 0.1 + i * 0.07, 0.45, 'sine', f, f, 0.16, o));
        this.tone(t, 1.0, 'sine', 65, 55, 0.6, o);
        this.noise(t, 1.2, 'highpass', 5000, 5000, 0.5, 0.15, o, 0.1);
        break;
      case 'extract':
        [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(t + i * 0.09, 0.45, 'triangle', f, f, 0.2, o));
        this.tone(t + 0.45, 0.9, 'sine', 1047, 1047, 0.2, o);
        break;
      case 'heal':
        this.tone(t, 0.3, 'sine', 500, 900, 0.15, o);
        this.tone(t + 0.1, 0.3, 'sine', 750, 1200, 0.1, o);
        break;
      case 'throw':
        this.tone(t, 0.02, 'square', 2200, 2200, 0.06, o);
        this.noise(t + 0.03, 0.14, 'bandpass', 900, 500, 1, 0.25, o, 0.01);
        break;
      case 'bounce':
        this.tone(t, 0.03, 'square', 420, 300, 0.07, o);
        break;
      case 'swap':
        this.noise(t, 0.05, 'bandpass', 2000, 2000, 2, 0.25, o);
        this.noise(t + 0.08, 0.04, 'bandpass', 3000, 3000, 2, 0.25, o);
        break;
      case 'alarm':
        [0, 0.24].forEach((dd) => {
          this.tone(t + dd, 0.16, 'square', 620, 620, 0.07, o);
          this.tone(t + dd + 0.1, 0.12, 'square', 830, 830, 0.07, o);
        });
        break;
      case 'death':
        this.tone(t, 0.9, 'sawtooth', 420, 70, 0.22, o, 0.01, ['lowpass', 1200, 1]);
        this.noise(t, 0.6, 'lowpass', 1200, 100, 0.6, 0.5, o);
        break;
      case 'ui':
        this.tone(t, 0.05, 'triangle', 900, 900, 0.12, o);
        break;
      case 'deploy':
        this.tone(t, 0.45, 'sawtooth', 160, 640, 0.12, o, 0.02, ['lowpass', 1800, 1]);
        this.noise(t, 0.5, 'bandpass', 400, 2400, 0.8, 0.2, o, 0.1);
        break;
      case 'stun':
        this.noise(t, 0.4, 'lowpass', 900, 100, 0.7, 0.8, o);
        this.tone(t, 0.3, 'sine', 90, 40, 0.6, o);
        break;
      case 'step':
        this.noise(t, 0.04, 'lowpass', 600, 300, 0.7, 0.08, o);
        break;
    }
  }
}
