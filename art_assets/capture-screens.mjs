/**
 * Capture real in-game screenshots for WeChat mini-game filing / promotion.
 * Drives the built single-file game through Chrome DevTools Protocol and the
 * `window.__duck` debug handle so every shot is actual rendered gameplay.
 *
 * Usage: node art_assets/capture-screens.mjs
 */
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = resolve(ROOT, 'art_assets/screenshots');
const HTML = `file:///${resolve(ROOT, 'dist/index.html').replace(/\\/g, '/')}`;
const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9333;
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
    '--user-data-dir=' + resolve(ROOT, 'art_assets/.chrome-profile'),
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: W, height: H, deviceScaleFactor: 1, mobile: false,
    });
    await send('Page.navigate', { url: HTML });
    await sleep(3200);

    const evalJs = async (expression) => {
      const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.text + ' :: ' + JSON.stringify(r.exceptionDetails.exception?.description ?? ''));
      return r.result.value;
    };

    // --- helpers ---------------------------------------------------------
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
      await sleep(700);
      const r = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      const file = resolve(OUT, name + '.png');
      await writeFile(file, Buffer.from(r.data, 'base64'));
      console.log('shot', name);
    };
    const setSave = async (patch) => evalJs(`(() => {
      const raw = localStorage.getItem('duckops.save.v1');
      const s = raw ? JSON.parse(raw) : {};
      Object.assign(s, ${JSON.stringify(patch)});
      localStorage.setItem('duckops.save.v1', JSON.stringify(s));
      return true;
    })()`);
    const reload = async () => { await send('Page.reload', { ignoreCache: true }); await sleep(3000); };

    // Rich save: training done, plenty of cash, all maps unlocked, scores for ranking.
    await setSave({
      stash: 8800000,
      trainingCompleted: true,
      firstRun: false,
      debugMode: true,
      raids: 28,
      extracts: 19,
      bestValue: 1240000,
      warehouse: {
        items: [
          { id: 'w_ak', tuned: false, count: 2 },
          { id: 'w_shotgun', tuned: true, mods: ['choke', 'quick'], count: 1 },
          { id: 'w_rpg', tuned: true, mods: ['blast'], count: 1 },
          { id: 'w_m4legend', tuned: true, mods: ['damage', 'mag', 'quick'], count: 1 },
          { id: 'armor4', tuned: false, count: 1 },
          { id: 'armor6', tuned: true, armorMods: ['plate', 'cap'], count: 1 },
        ],
        supplies: { bandages: 6, medkits: 3, throwables: { grenade: 4, smoke: 3, flash: 2, fire: 2 } },
        selected: {},
      },
      scores: [
        { score: 1240000, outcome: 'extract', value: 1240000, kills: 17, time: 214, date: Date.now(), kit: 'assault', mapId: 'mausoleum', characterId: 'duck', best: '黄金奖杯' },
        { score: 963000, outcome: 'extract', value: 963000, kills: 12, time: 181, date: Date.now() - 86400000, kit: 'assault', mapId: 'outpost', characterId: 'tank', best: '六级护甲' },
        { score: 742000, outcome: 'extract', value: 742000, kills: 9, time: 246, date: Date.now() - 172800000, kit: 'scout', mapId: 'hatchery', characterId: 'scout', best: '玄铁破壁者' },
      ],
    });
    await reload();

    // ===== SCENE 1: 选角大厅 ==============================================
    await shot('01-scene-lobby-overview');
    await clickText('铁头');
    await shot('02-scene-character-tank');
    await clickText('快羽');
    await shot('03-scene-character-scout');
    await clickText('小黄');

    // ===== SCENE 2: 战区选择 ==============================================
    await clickText('选择战区');
    await shot('04-scene-map-picker');
    await clickText('关闭');

    // ===== SYSTEM 1: 金币系统 / 仓库 ======================================
    const warehouseBtns = await evalJs(`[...document.querySelectorAll('button')].filter(e=>e.textContent&&e.textContent.includes('仓库 ·')).map(e=>e.textContent.trim())`);
    console.log('warehouse buttons', JSON.stringify(warehouseBtns));
    if (warehouseBtns.length) {
      await clickText('仓库 ·');
      await shot('10-system-warehouse-overview');
      const tabs = await evalJs(`[...document.querySelectorAll('button')].filter(e=>e.textContent&&/拥有的装备|药品与投掷物|购买装备|角色强化/.test(e.textContent)).map(e=>e.textContent.trim())`);
      console.log('armory tabs', JSON.stringify(tabs));
      const clickExact = async (text) => {
        const ok = await evalJs(`(() => {
          const el=[...document.querySelectorAll('button')].find(e=>e.textContent&&e.textContent.trim()===${JSON.stringify(text)});
          if(!el)return false; el.click(); return true;
        })()`);
        if (!ok) throw new Error('tab not found: ' + text);
        await sleep(500);
      };
      await clickExact('药品与投掷物');
      await shot('11-system-supplies');
      await clickExact('购买装备');
      await shot('13-system-shop');
      await clickExact('角色强化');
      await shot('14-system-upgrades');
    }

    // Close armory / dialogs
    await evalJs(`(() => { const b=[...document.querySelectorAll('button')].find(e=>e.textContent&&/关闭|×|✕/.test(e.textContent)); if(b)b.click(); return true; })()`);
    await sleep(350);

    // ===== SCENE 3: 游戏战斗画面 ==========================================
    await evalJs(`window.__duck && (window.__duck.mode='demo')`);
    await clickText('开始行动');
    await sleep(1800);
    const started = await evalJs(`({ mode: window.__duck?.mode, map: window.__duck?.mapId, enemies: window.__duck?.enemies?.length, containers: window.__duck?.containers?.length })`);
    console.log('raid started', JSON.stringify(started));

    // Populate a lively fight near the player: visible enemies + gunfire + loot.
    const stageFight = async (mapId, types) => {
      await evalJs(`(() => {
        const g = window.__duck;
        if (!g) return false;
        const p = g.player;
        g.mode = 'raid';
        g.enemies.forEach(e => e.dead = true);
        const types = ${JSON.stringify(types)};
        const spots = [[300,-120],[-260,160],[480,220],[-420,-260],[140,380]];
        types.forEach((t,i) => {
          const [dx,dy] = spots[i % spots.length];
          const e = g.spawnEnemy(t, p.x+dx, p.y+dy, 'hunt');
          e.huntT = 60; e.alertT = 5; e.canSee = true; e.state='hunt';
        });
        // Tracer fire and impacts to make the action readable in a still frame.
        for (let i=0;i<10;i++) {
          const a = (i/10)*Math.PI*2;
          g.bullets.push({x:p.x+Math.cos(a)*120, y:p.y+Math.sin(a)*120, ox:p.x, oy:p.y,
            vx:Math.cos(a)*900, vy:Math.sin(a)*900, dmg:24, life:0.6, from:0, pierce:0,
            src:null, w:2.3, crit:false});
        }
        for (let i=0;i<12;i++) {
          const a = (i/12)*Math.PI*2, d = 90+(i%3)*55;
          g.particles.push({x:p.x+Math.cos(a)*d, y:p.y+Math.sin(a)*d, vx:Math.cos(a)*60, vy:Math.sin(a)*60,
            life:0.5+Math.random()*0.4, max:1, r:3+Math.random()*4, color:'#ffcf4a', kind:'spark'});
        }
        g.hitstop = 0; g.slowT = 0; g.cam.trauma = 0;
        g.banner = null;
        return true;
      })()`);
      await sleep(220);
    };

    await stageFight('island', ['bandit', 'bandit', 'shield']);
    await shot('05-scene-combat-island');

    // Boss battle: switch map by starting a new raid with a boss map.
    const focusBoss = async (mapId, count, name) => {
      await evalJs(`window.__duck && window.__duck.startRaid('assault', false, ${JSON.stringify(mapId)}, 'duck')`);
      await sleep(1500);
      const info = await evalJs(`(() => {
        const g=window.__duck,p=g.player;
        const bs=g.enemies.filter(e=>e.def&&e.def.boss).slice(0,${count});
        if(!bs.length) return {boss:0};
        // Move the player next to the boss so the camera follows both into frame.
        const b=bs[0];
        p.x=b.x-300; p.y=b.y+40;
        g.cam.x=p.x; g.cam.y=p.y; g.cam.sx=0; g.cam.sy=0;
        bs.forEach((e,i)=>{
          e.x=p.x+280+i*150; e.y=p.y+(i%2?-110:110);
          e.state='hunt'; e.huntT=90; e.alertT=9; e.canSee=true; e.vis=1; e.visA=1;
        });
        g.boss=bs[0];
        p.aim=Math.atan2(bs[0].y-p.y, bs[0].x-p.x);
        for(let i=0;i<14;i++){const a=(i/14)*Math.PI*2;
          g.bullets.push({x:p.x+Math.cos(a)*90,y:p.y+Math.sin(a)*90,ox:p.x,oy:p.y,
            vx:Math.cos(a)*920,vy:Math.sin(a)*920,dmg:28,life:0.7,from:0,pierce:0,src:null,w:2.4,crit:i%4===0});}
        g.banner=null; g.cam.trauma=0; g.slowT=0;
        return {boss:bs.length, hp:Math.round(bs[0].hp), px:Math.round(p.x), bx:Math.round(bs[0].x)};
      })()`);
      console.log('boss stage', name, JSON.stringify(info));
      await sleep(320);
      await shot(name);
    };
    await focusBoss('mausoleum', 1, '06-scene-boss-duckking');
    await focusBoss('outpost', 2, '07-scene-double-boss');

    // ===== GAMEPLAY: 搜刮 / 撤离 =========================================
    await evalJs(`window.__duck && window.__duck.startRaid('assault', false, 'harbor', 'duck')`);
    await sleep(1500);
    await evalJs(`(() => {
      const g=window.__duck,p=g.player;
      g.enemies.forEach(e=>e.dead=true);
      const c=g.containers[0];
      if(c){p.x=c.x-40;p.y=c.y-40;g.cam.x=p.x;g.cam.y=p.y;g.nearC=c;g.search={c,t:0.5,tick:0};}
      g.banner=null; return !!c;
    })()`);
    await shot('08-gameplay-looting');

    const exInfo = await evalJs(`(() => {
      const g=window.__duck,p=g.player;
      const z=(g.extracts||[])[0];
      if(z){p.x=z.x;p.y=z.y;g.cam.x=p.x;g.cam.y=p.y;g.cam.sx=0;g.cam.sy=0;g.exZone=z;g.exProg=3.2;}
      g.search=null;g.banner=null;g.cam.trauma=0;
      return {zone:!!z, extracts:(g.extracts||[]).length};
    })()`);
    console.log('extraction', JSON.stringify(exInfo));
    await shot('09-gameplay-extraction');

    // ===== SYSTEM 2: 结算与排行榜 ========================================
    // Let the game finish naturally so the result screen receives full data.
    await evalJs(`(() => {
      const g=window.__duck,p=g.player;
      g.exProg=7; g.exZone=g.extracts[0];
      p.hp=p.maxHp; p.armor=p.armorMax;
      return true;
    })()`);
    await sleep(2200);
    // If the extract trigger didn't fire, force the private finish path.
    await evalJs(`(() => {
      const g=window.__duck;
      if(!g.ended && typeof g.finish==='function') g.finish('extract');
      return g.ended;
    })()`);
    await sleep(2600);
    await shot('12-system-raid-result');

    await clickText('返回大厅');
    await sleep(600);
    const rankBtns = await evalJs(`[...document.querySelectorAll('button')].filter(e=>e.textContent&&/排行榜/.test(e.textContent)).map(e=>e.textContent.trim())`);
    console.log('rank buttons', JSON.stringify(rankBtns));
    if (rankBtns.length) { await clickText('🏆 排行榜'); await shot('15-system-leaderboard'); }

    console.log('done');
  } finally {
    bridge?.ws.close();
    chrome.kill('SIGTERM');
  }
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
