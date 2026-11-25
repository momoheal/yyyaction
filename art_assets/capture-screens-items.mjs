/**
 * Generate 3 item-system screenshots (28-30): backpack loot grid, search loot
 * list with multiple rarities, and throwable smoke/fire effects in combat.
 * Uses the built single-file game via CDP + window.__duck debug handle.
 *
 * Usage: node art_assets/capture-screens-items.mjs
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'art_assets/screenshots');
const HTML = `file:///${resolve(ROOT, 'dist/index.html').replace(/\\/g, '/')}`;
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9335;
const W = 1280, H = 720;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdpConnect() {
  let targets;
  for (let i = 0; i < 80; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      targets = await r.json();
      if (targets.some((t) => t.type === 'page')) break;
    } catch { /* not ready */ }
    await sleep(150);
  }
  const page = targets.find((t) => t.type === 'page');
  if (!page) throw new Error('Chrome page target not found');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((ok, bad) => { ws.onopen = ok; ws.onerror = bad; });
  let seq = 0;
  const waiting = new Map();
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && waiting.has(msg.id)) {
      const { ok, bad } = waiting.get(msg.id);
      waiting.delete(msg.id);
      msg.error ? bad(new Error(JSON.stringify(msg.error))) : ok(msg.result);
    }
  };
  const send = (method, params = {}) => new Promise((ok, bad) => {
    const id = ++seq;
    waiting.set(id, { ok, bad });
    ws.send(JSON.stringify({ id, method, params }));
  });
  return { ws, send };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + resolve(ROOT, 'art_assets/.chrome-profile-items'),
    `--window-size=${W},${H}`, '--hide-scrollbars', '--no-first-run',
    '--disable-extensions', '--mute-audio', '--no-sandbox',
    '--force-device-scale-factor=1', 'about:blank',
  ], { stdio: 'ignore' });

  let bridge;
  try {
    bridge = await cdpConnect();
    const { send } = bridge;
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: HTML });
    await sleep(3200);

    const evalJs = async (expression) => {
      const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + JSON.stringify(r.exceptionDetails.exception?.description ?? ''));
      return r.result.value;
    };
    const clickText = async (text) => {
      const ok = await evalJs(`(() => {
        const el = [...document.querySelectorAll('button')].find(e => e.textContent && e.textContent.includes(${JSON.stringify(text)}));
        if (!el) return false; el.scrollIntoView({block:'center'}); el.click(); return true;
      })()`);
      if (!ok) throw new Error('button not found: ' + text);
      await sleep(450);
    };
    const shot = async (name) => {
      await sleep(700);
      const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      await writeFile(resolve(OUT, name + '.png'), Buffer.from(r.data, 'base64'));
      console.log('shot', name);
    };

    await evalJs(`(() => {
      localStorage.setItem('duckops.save.v1', JSON.stringify({
        stash: 500000, trainingCompleted: true, firstRun: false, debugMode: true,
        raids: 12, extracts: 9, bestValue: 640000,
        warehouse: { items: [], supplies: { bandages: 5, medkits: 2, throwables: { grenade: 3, smoke: 2, flash: 2, fire: 1 } }, selected: {} },
        scores: [],
      }));
      return true;
    })()`);
    await send('Page.reload', { ignoreCache: true });
    await sleep(3000);

    await evalJs(`window.__duck && (window.__duck.mode = 'demo')`);
    await clickText('开始行动');
    await sleep(1400);

    // --- 28: backpack full of varied-rarity items -------------------------
    const bag = await evalJs(`(() => {
      const g = window.__duck, p = g.player;
      if (!g || !p) return false;
      g.enemies.forEach(e => e.dead = true);
      const it = (id, name, icon, rarity, value, kind) => ({ def: { id, name, icon, rarity, value, kind }, revealed: true, taken: true, at: 0 });
      p.backpack = [
        it('crown', '鸭王王冠', '👑', 4, 168000, 'loot'),
        it('gold', '一袋金币', '💰', 4, 135000, 'loot'),
        it('chip', '加密芯片', '💾', 3, 42000, 'loot'),
        it('tablet', '军用平板', '📱', 3, 36000, 'loot'),
        it('radio', '军用对讲机', '📻', 2, 12500, 'loot'),
        it('chem', '化学试剂', '🧪', 2, 15500, 'loot'),
        it('battery', '电池', '🔋', 1, 4200, 'loot'),
        it('can', '午餐肉罐头', '🥫', 1, 3200, 'loot'),
        it('bandage', '绷带', '🩹', 0, 1500, 'bandage'),
        it('medkit', '急救针', '💉', 2, 9000, 'medkit'),
        it('grenade', '破片手雷', '💣', 1, 4000, 'grenade'),
        it('smoke', '烟雾弹', '🌫️', 1, 6000, 'grenade'),
        it('flash', '闪光弹', '✨', 2, 7500, 'grenade'),
        it('fire', '燃烧瓶', '🔥', 2, 8500, 'grenade'),
      ];
      g.banner = null; g.bagOpen = true;
      return p.backpack.length;
    })()`);
    await sleep(500);
    await shot('28-system-items-backpack');
    console.log('backpack items', bag);
    await evalJs(`window.__duck && (window.__duck.bagOpen = false)`);

    // --- 29: search panel revealing mixed-rarity loot --------------------
    const loot = await evalJs(`(() => {
      const g = window.__duck, p = g.player;
      if (!g) return 0;
      const it = (id, name, icon, rarity, value, kind) => ({ def: { id, name, icon, rarity, value, kind }, revealed: true, taken: false, at: 0 });
      const c = g.containers[0];
      if (!c) return 0;
      c.name = '武器箱 · 战利品';
      c.items = [
        it('heart', '鸭之心', '💎', 5, 980000, 'loot'),
        it('crown', '鸭王王冠', '👑', 4, 168000, 'loot'),
        it('chip', '加密芯片', '💾', 3, 42000, 'loot'),
        it('radio', '军用对讲机', '📻', 2, 12500, 'loot'),
        it('battery', '电池', '🔋', 1, 4200, 'loot'),
      ];
      c.revealed = c.items.length;
      p.x = c.x - 40; p.y = c.y - 40;
      g.cam.x = p.x; g.cam.y = p.y;
      g.nearC = c; g.search = { c, t: 0.5, tick: 0 };
      g.banner = null;
      return c.items.length;
    })()`);
    await sleep(500);
    await shot('29-system-items-loot-tiers');
    console.log('loot items', loot);
    await evalJs(`window.__duck && (window.__duck.search = null)`);

    // --- 30: throwables in combat (smoke + fire + grenade arc) -----------
    const fx = await evalJs(`(() => {
      const g = window.__duck, p = g.player;
      if (!g) return false;
      g.search = null; g.bagOpen = false; g.tutorialT = 0;
      const types = ['bandit','bandit','elite'];
      const spots = [[280,-90],[-240,130],[360,200]];
      types.forEach((t,i) => {
        const [dx,dy] = spots[i];
        const e = g.spawnEnemy(t, p.x+dx, p.y+dy, 'hunt');
        e.huntT = 60; e.alertT = 5; e.canSee = true; e.state = 'hunt';
      });
      // Smoke screen and burning zone via the game's own effect arrays.
      g.smokes.push({ x: p.x+150, y: p.y-40, r: 190, t: 3, dur: 9, pulse: 1.2 });
      g.fires.push({ x: p.x-120, y: p.y+120, r: 135, t: 2, dur: 6, tick: 0 });
      g.grenades.push({ x: p.x+300, y: p.y-160, y0: p.y-160, z: 60, vz: -120, vx: 40, vy: 30,
        kind: 'grenade', fuse: 0.7, spin: 0.4, from: 0, dmg: 135, r: 150, src: null });
      g.banner = null; g.cam.trauma = 0; g.slowT = 0;
      return { smokes: g.smokes.length, fires: g.fires.length, grenades: g.grenades.length };
    })()`);
    await sleep(350);
    await shot('30-system-items-throwables');
    console.log('throwable fx', JSON.stringify(fx));

    console.log('done');
  } finally {
    bridge?.ws.close();
    chrome.kill('SIGTERM');
  }
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
