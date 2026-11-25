/**
 * Generate EXTRA unique in-game screenshots (16-27) so every upload set can use
 * a distinct image. Drives the built single-file game through Chrome CDP and
 * the `window.__duck` debug handle, so every shot is real rendered gameplay.
 *
 * Usage: node art_assets/capture-screens-extra.mjs
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'art_assets/screenshots');
const HTML = `file:///${resolve(ROOT, 'dist/index.html').replace(/\\/g, '/')}`;
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9334;
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
    '--user-data-dir=' + resolve(ROOT, 'art_assets/.chrome-profile-extra'),
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
        const els = [...document.querySelectorAll('button')];
        const el = els.find(e => e.textContent && e.textContent.includes(${JSON.stringify(text)}));
        if (!el) return false;
        el.scrollIntoView({block:'center'});
        el.click();
        return true;
      })()`);
      if (!ok) throw new Error('button not found: ' + text);
      await sleep(450);
    };
    const shot = async (name) => {
      await sleep(650);
      const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      await writeFile(resolve(OUT, name + '.png'), Buffer.from(r.data, 'base64'));
      console.log('shot', name);
    };

    // Unlock everything so any map can be started.
    await evalJs(`(() => {
      const s = { stash: 8800000, trainingCompleted: true, firstRun: false, debugMode: true,
        raids: 28, extracts: 19, bestValue: 1240000,
        warehouse: { items: [], supplies: { bandages: 6, medkits: 3, throwables: { grenade: 4, smoke: 3, flash: 2, fire: 2 } }, selected: {} },
        scores: [] };
      localStorage.setItem('duckops.save.v1', JSON.stringify(s));
      return true;
    })()`);
    await send('Page.reload', { ignoreCache: true });
    await sleep(3000);

    // Enter the in-game view first (demo mode), otherwise menus cover the canvas.
    await evalJs(`window.__duck && (window.__duck.mode = 'demo')`);
    await clickText('开始行动');
    await sleep(1500);
    console.log('entered game view', JSON.stringify(await evalJs(`({ mode: window.__duck?.mode })`)));

    const beginRaid = async (mapId) => {
      await evalJs(`window.__duck && window.__duck.startRaid('assault', false, ${JSON.stringify(mapId)}, 'duck')`);
      await sleep(1300);
    };

    // Regular combat on each of the five maps not yet shown in set 05.
    const stageMapFight = async (mapId, name) => {
      await beginRaid(mapId);
      const info = await evalJs(`(() => {
        const g = window.__duck, p = g.player;
        if (!g || !p) return { ok: false };
        g.enemies.forEach(e => e.dead = true);
        const types = ['bandit','elite','shield','lookout','armored'];
        const spots = [[300,-120],[-260,160],[480,220],[-420,-260],[140,380]];
        types.forEach((t,i) => {
          const [dx,dy] = spots[i % spots.length];
          const e = g.spawnEnemy(t, p.x+dx, p.y+dy, 'hunt');
          e.huntT = 60; e.alertT = 5; e.canSee = true; e.state = 'hunt';
        });
        for (let i=0;i<10;i++) {
          const a=(i/10)*Math.PI*2;
          g.bullets.push({x:p.x+Math.cos(a)*120,y:p.y+Math.sin(a)*120,ox:p.x,oy:p.y,
            vx:Math.cos(a)*900,vy:Math.sin(a)*900,dmg:24,life:0.6,from:0,pierce:0,src:null,w:2.3,crit:false});
        }
        for (let i=0;i<12;i++) {
          const a=(i/12)*Math.PI*2,d=90+(i%3)*55;
          g.particles.push({x:p.x+Math.cos(a)*d,y:p.y+Math.sin(a)*d,vx:Math.cos(a)*60,vy:Math.sin(a)*60,
            life:0.7,max:1,r:3+Math.random()*4,color:'#ffcf4a',kind:'spark'});
        }
        g.hitstop=0; g.slowT=0; g.cam.trauma=0; g.banner=null;
        return { ok: true, enemies: g.enemies.filter(e=>!e.dead).length };
      })()`);
      await sleep(260);
      await shot(name);
      console.log('map fight', name, JSON.stringify(info));
    };

    // Focus a specific boss (by index) on a map.
    const focusBossAt = async (mapId, idx, name) => {
      await beginRaid(mapId);
      const info = await evalJs(`(() => {
        const g = window.__duck, p = g.player;
        if (!g || !p) return { boss: 0 };
        const bs = g.enemies.filter(e => e.def && e.def.boss);
        const b = bs[${idx}];
        if (!b) return { boss: 0, total: bs.length };
        p.x = b.x - 300; p.y = b.y + 40;
        g.cam.x = p.x; g.cam.y = p.y; g.cam.sx = 0; g.cam.sy = 0;
        b.x = p.x + 300; b.y = p.y;
        b.state = 'hunt'; b.huntT = 90; b.alertT = 9; b.canSee = true; b.vis = 1; b.visA = 1;
        g.boss = b;
        p.aim = Math.atan2(b.y - p.y, b.x - p.x);
        for (let i=0;i<14;i++) { const a=(i/14)*Math.PI*2;
          g.bullets.push({x:p.x+Math.cos(a)*90,y:p.y+Math.sin(a)*90,ox:p.x,oy:p.y,
            vx:Math.cos(a)*920,vy:Math.sin(a)*920,dmg:28,life:0.7,from:0,pierce:0,src:null,w:2.4,crit:i%4===0}); }
        g.banner=null; g.cam.trauma=0; g.slowT=0;
        return { boss: 1, name: b.def.name, hp: Math.round(b.hp), total: bs.length };
      })()`);
      await sleep(300);
      await shot(name);
      console.log('boss', name, JSON.stringify(info));
    };

    await stageMapFight('harbor', '16-scene-combat-harbor');
    await stageMapFight('foundry', '17-scene-combat-foundry');
    await stageMapFight('hatchery', '18-scene-combat-hatchery');
    await stageMapFight('outpost', '19-scene-combat-outpost');
    await stageMapFight('mausoleum', '20-scene-combat-mausoleum');

    await focusBossAt('island', 0, '21-scene-boss-goose');
    await focusBossAt('harbor', 0, '22-scene-boss-captain');
    await focusBossAt('foundry', 0, '23-scene-boss-foundry');
    await focusBossAt('hatchery', 0, '24-scene-boss-broodqueen');
    await focusBossAt('outpost', 0, '25-scene-boss-frostmarshal');
    await focusBossAt('outpost', 1, '26-scene-boss-ironguard');

    // Defeat screen (distinct from the successful-extraction result).
    await beginRaid('island');
    const dead = await evalJs(`(() => {
      const g = window.__duck;
      if (!g) return false;
      g.player.hp = 0;
      if (typeof g.finish === 'function') g.finish('dead');
      return true;
    })()`);
    await sleep(1900);
    await shot('27-system-raid-dead');
    console.log('dead screen', dead);

    console.log('done');
  } finally {
    bridge?.ws.close();
    chrome.kill('SIGTERM');
  }
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
