import * as THREE from 'three';
import type { Game } from './game';
import { ROAD_EDGE_WIDTH, ROYAL_PLAZA_BORDER_WIDTH } from './map';

const biome = {
  island: ['#75885a', '#bbab80'], harbor: ['#71827e', '#a7a99b'],
  foundry: ['#817a63', '#a39b7f'], hatchery: ['#6c784e', '#94835e'],
  outpost: ['#bdcfd3', '#879ca1'], mausoleum: ['#81816e', '#afa38c'],
  airbase: ['#6d6a62', '#585c60'], vehicleRange: ['#78815f', '#8d9280'],
};

function paintLavaGround(c: CanvasRenderingContext2D, floor: Game['map']['floors'][number], noise: () => number) {
  const { x, y, w, h } = floor;
  const cx = x + w * .47, cy = y + h * .52;
  c.save();
  c.translate(cx, cy);
  c.scale(w * .58, h * .78);
  const soil = c.createRadialGradient(-.09, .05, .08, 0, 0, 1);
  soil.addColorStop(0, '#3c2727');
  soil.addColorStop(.68, '#433333');
  soil.addColorStop(1, 'rgba(47,36,38,0)');
  c.fillStyle = soil;
  c.fillRect(-1, -1, 2, 2);
  c.restore();
  // Broken slabs and branching veins baked below roads and structures.
  for (let i = 0; i < 310; i++) {
    const a = noise() * Math.PI * 2, radius = Math.sqrt(noise());
    const sx = cx + Math.cos(a) * radius * w * .46, sy = cy + Math.sin(a) * radius * h * .55;
    const size = 2 + noise() * 14;
    c.fillStyle = i % 7 === 0 ? 'rgba(133,74,58,.46)' : i % 3 ? 'rgba(38,28,33,.45)' : 'rgba(112,90,88,.42)';
    c.beginPath();
    c.moveTo(sx - size, sy);
    c.lineTo(sx - size * .24, sy - size * .43);
    c.lineTo(sx + size, sy - size * .13);
    c.lineTo(sx + size * .38, sy + size * .49);
    c.closePath(); c.fill();
  }
  c.lineCap = 'round';
  c.lineJoin = 'round';
  for (let i = 0; i < 17; i++) {
    const sx = x + 35 + noise() * (w - 80), sy = y + 30 + noise() * (h - 50);
    const direction = (noise() - .5) * 2;
    const points = [[sx, sy]];
    for (let j = 1; j <= 5; j++) points.push([sx + j * (7 + noise() * 6), sy + j * direction * 9 + (noise() - .5) * 19]);
    c.beginPath(); c.moveTo(sx, sy);
    for (const [px, py] of points.slice(1)) c.lineTo(px, py);
    const [bx, by] = points[2];
    c.moveTo(bx, by);
    c.lineTo(bx + 10, by + (i % 2 ? 12 : -12));
    c.lineTo(bx + 15, by + (i % 2 ? 18 : -19));
    c.lineWidth = 5; c.strokeStyle = '#2e2227'; c.stroke();
    if (i % 3 !== 0) {
      c.lineWidth = 1.8; c.strokeStyle = i % 2 ? '#94452e' : '#ae5736'; c.stroke();
    }
  }
}

/** Bake stationary ground markings once per map. The moving world stays geometric. */
export function createTerrain(game: Game) {
  const map = game.map;
  const canvas = document.createElement('canvas');
  const density = Math.min(1.4, (map.gauntlet ? 3072 : 2048) / Math.max(map.w, map.h));
  canvas.width = Math.ceil(map.w * density);
  canvas.height = Math.ceil(map.h * density);
  const c = canvas.getContext('2d')!;
  c.scale(canvas.width / map.w, canvas.height / map.h);
  const [grass, road] = biome[game.mapId];
  c.fillStyle = game.training ? '#78886a' : grass;
  c.fillRect(0, 0, map.w, map.h);
  // Repeatable grain independent of the simulation random stream.
  let seed = 951;
  const noise = () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < map.w * map.h / 155; i++) {
    c.fillStyle = noise() > 0.5 ? 'rgba(245,238,194,.105)' : 'rgba(27,49,28,.105)';
    c.fillRect(noise() * map.w, noise() * map.h, 2 + noise() * 10, 1 + noise() * 3);
  }
  for (const p of map.pads) {
    if (p.type === 'nest_ground') continue;
    if (p.type === 'royal_plaza') {
      const x = p.x + p.w / 2, y = p.y + p.h / 2;
      c.beginPath(); c.ellipse(x, y, p.w / 2, p.h / 2, 0, 0, Math.PI * 2);
      c.fillStyle = '#b7ad94'; c.fill();
      c.lineWidth = ROYAL_PLAZA_BORDER_WIDTH; c.strokeStyle = '#716b58'; c.stroke();
      c.beginPath(); c.ellipse(x, y, p.w / 2 - 25, p.h / 2 - 25, 0, 0, Math.PI * 2);
      c.lineWidth = 5; c.strokeStyle = '#d6c6a3'; c.stroke();
      c.save(); c.clip();
      c.strokeStyle = 'rgba(80,68,50,.16)'; c.lineWidth = 1.4; c.beginPath();
      for (let py = p.y; py < p.y + p.h; py += 54) { c.moveTo(p.x, py); c.lineTo(p.x + p.w, py); }
      for (let px = p.x; px < p.x + p.w; px += 54) { c.moveTo(px, p.y); c.lineTo(px, p.y + p.h); }
      c.stroke(); c.restore();
      c.beginPath(); c.arc(x, y, 131, 0, Math.PI * 2);
      c.fillStyle = '#8b7471'; c.fill(); c.lineWidth = 7; c.strokeStyle = '#ccb38a'; c.stroke();
      continue;
    }
    if (p.type === 'royal_garden') {
      c.fillStyle = '#777260';
      c.fillRect(p.x, p.y, p.w, p.h);
      c.fillStyle = '#8d9970';
      c.fillRect(p.x + 7, p.y + 7, p.w - 14, p.h - 14);
      const center = p.x + p.w / 2;
      c.fillStyle = '#c9b992';
      c.fillRect(center - 52, p.y + 4, 104, p.h - 8);
      c.fillRect(p.x + 8, p.y + p.h - 80, p.w - 16, 25);
      for (const side of [-1, 1]) {
        const x = center + side * (p.w * .29);
        const y = p.y + p.h * .55;
        c.fillStyle = '#a59c80';
        c.beginPath(); c.ellipse(x, y, 90, 36, 0, 0, Math.PI * 2); c.fill();
        c.fillStyle = '#526b4e';
        c.beginPath(); c.ellipse(x, y, 84, 31, 0, 0, Math.PI * 2); c.fill();
        for (let i = 0; i < 31; i++) {
          const angle = i * Math.PI * 2 / 31;
          c.fillStyle = i % 2 ? '#cc905e' : '#c798b2';
          c.beginPath(); c.arc(x + Math.cos(angle) * 73, y + Math.sin(angle) * 24, 2.4, 0, Math.PI * 2); c.fill();
        }
      }
      continue;
    }
    c.fillStyle = p.type === 'field' ? '#93764d' : p.type === 'dock' ? '#a18a67' : '#9f9c8b';
    c.fillRect(p.x,p.y,p.w,p.h);
  }
  // Airbase: charred lava ground SW, packed snow SE, then the runway on top.
  if (game.mapId === 'airbase') {
    for (const f of map.floors) {
      if (f.name === '熔岩焦土') {
        paintLavaGround(c, f, noise);
      } else if (f.name === '冰霜雪原') {
        c.fillStyle = '#cfdde2'; c.fillRect(f.x, f.y, f.w, f.h);
      }
    }
    for (let i = 0; i < 220; i++) {
      const x = noise() * map.w, y = noise() * map.h;
      if (y < map.h * 0.6) continue;
      const lava = x < map.w / 2;
      c.fillStyle = lava
        ? (noise() > 0.6 ? 'rgba(226,110,61,.5)' : 'rgba(26,16,12,.4)')
        : (noise() > 0.6 ? 'rgba(250,253,255,.6)' : 'rgba(150,178,190,.35)');
      c.fillRect(x, y, 3 + noise() * 12, 1.5 + noise() * 4);
    }
  }
  const paintFloor = (f: Game['map']['floors'][number]) => {
    const wood = f.type === 'wood';
    const themeColors = {
      air: ['#6b6760', '#d3a259'],
      radar: ['#72838a', '#9bc4ce'],
      frost: ['#a0b5ba', '#d2e2e6'],
      guard: ['#727c6d', '#aca77a'],
      royal: ['#b59f83', '#72585e'],
    } as const;
    const theme = f.theme ? themeColors[f.theme] : undefined;
    c.fillStyle = theme?.[0] ?? (wood ? '#b69b71' : f.type === 'tile' ? '#ccd0bc' : '#a7aca0');
    c.fillRect(f.x,f.y,f.w,f.h);
    if (theme) {
      const center = f.x + f.w / 2;
      const sideDye = f.theme === 'royal' ? 36 : 28;
      c.fillStyle = theme[1];
      c.fillRect(f.x + sideDye, f.y + 24, 9, f.h - 48);
      c.fillRect(f.x + f.w - sideDye - 9, f.y + 24, 9, f.h - 48);
      if (f.theme === 'royal') {
        c.fillRect(center - 54, f.y + 14, 108, f.h - 28);
        c.fillStyle = '#c69564';
        c.fillRect(center - 49, f.y + 18, 3, f.h - 36);
        c.fillRect(center + 46, f.y + 18, 3, f.h - 36);
      } else if (f.theme === 'air' || f.theme === 'guard') {
        for (const side of [-1, 1]) for (let y = f.y + 44; y < f.y + f.h - 30; y += 34) {
          c.save(); c.translate(center + side * 240, y); c.rotate(side * -.40);
          c.fillRect(-12, -3, 24, 6); c.restore();
        }
      } else {
        c.globalAlpha = .36;
        for (const side of [-1, 1]) c.fillRect(center + side * 293 - 28, f.y + 34, 56, f.h - 68);
        c.globalAlpha = 1;
      }
    }
    c.strokeStyle = 'rgba(50,54,45,.21)'; c.lineWidth = 1.3; c.beginPath();
    for (let y = f.y; y <= f.y + f.h; y += wood ? 15 : 52) { c.moveTo(f.x,y); c.lineTo(f.x+f.w,y); }
    for (let x = f.x; x <= f.x + f.w; x += wood ? 94 : 52) { c.moveTo(x,f.y); c.lineTo(x,f.y+f.h); }
    c.stroke();
    if (game.training) {
      c.save(); c.strokeStyle = '#edc869'; c.lineWidth = 3; c.setLineDash([15,9]); c.strokeRect(f.x+8,f.y+8,f.w-16,f.h-16); c.restore();
      c.fillStyle = 'rgba(52,58,45,.6)'; c.font = 'bold 15px sans-serif';
      c.fillText(f.name,f.x+20,f.y+32);
    }
  };
  // Outdoor squares are the base layer so street exits remain visible on the paving.
  for (const f of map.floors) {
    if (f.roofed || (game.mapId === 'airbase' && (f.name === '熔岩焦土' || f.name === '冰霜雪原'))) continue;
    paintFloor(f);
  }
  c.lineCap = c.lineJoin = 'round';
  const strokeRoads = () => {
    c.beginPath();
    for (const path of map.roads) {
      c.moveTo(path[0],path[1]);
      for (let i = 2; i < path.length; i += 2) c.lineTo(path[i],path[i+1]);
    }
    c.stroke();
  };
  // Paint the complete road network in layers so later road edges cannot cut
  // dark seams through earlier pavement at crossings.
  c.lineWidth = ROAD_EDGE_WIDTH; c.strokeStyle = '#65634f'; strokeRoads();
  c.lineWidth = 60; c.strokeStyle = road; strokeRoads();
  c.setLineDash([15,22]); c.lineWidth = 2; c.strokeStyle = '#d7cba4'; strokeRoads(); c.setLineDash([]);
  const junctions: {x:number;y:number}[] = [];
  for (let a=0;a<map.roads.length;a++)for(let b=a+1;b<map.roads.length;b++) {
    const first=map.roads[a],second=map.roads[b];
    for(let i=0;i+3<first.length;i+=2)for(let j=0;j+3<second.length;j+=2) {
      const ax=first[i],ay=first[i+1], rx=first[i+2]-ax,ry=first[i+3]-ay;
      const bx=second[j],by=second[j+1], sx=second[j+2]-bx,sy=second[j+3]-by;
      const denominator=rx*sy-ry*sx;
      if(Math.abs(denominator)<.001)continue;
      const qx=bx-ax,qy=by-ay,t=(qx*sy-qy*sx)/denominator,u=(qx*ry-qy*rx)/denominator;
      if(t<0||t>1||u<0||u>1)continue;
      const point={x:ax+t*rx,y:ay+t*ry};
      if(!junctions.some(junction=>Math.hypot(junction.x-point.x,junction.y-point.y)<12))junctions.push(point);
    }
  }
  // Leave a clean, uninterrupted patch through each junction without center dashes.
  c.fillStyle=road;
  for(const junction of junctions) {
    c.beginPath(); c.arc(junction.x,junction.y,19,0,Math.PI*2); c.fill();
  }
  const waterPath = () => {
    c.beginPath();
    for (const lake of map.water) {
      if (lake.w && lake.h) c.rect(lake.x-lake.w/2,lake.y-lake.h/2,lake.w,lake.h);
      else c.moveTo(lake.x+lake.r,lake.y), c.arc(lake.x,lake.y,lake.r,0,Math.PI*2);
    }
  };
  // Stroke every component first, then fill the complete union. The fill hides
  // shorelines where lake shapes overlap while retaining only the outer coast.
  c.strokeStyle = '#87c2b3'; c.lineWidth = 8;
  waterPath(); c.stroke();
  c.fillStyle = '#4e9397'; waterPath(); c.fill();
  c.save(); waterPath(); c.clip();
  c.fillStyle = '#7cb5ae';
  for (let i=0;i<Math.max(60,map.water.length*60);i++) {
    const x=noise()*map.w,y=noise()*map.h;
    c.fillRect(x,y,5+noise()*15,1.6);
  }
  c.restore();
  for (const track of map.tracks) {
    c.fillStyle = '#645b48'; for(let x=0;x<map.w;x+=22)c.fillRect(x,track-16,9,32);
    c.fillStyle = '#b7b9ae'; c.fillRect(0,track-12,map.w,3); c.fillRect(0,track+9,map.w,3);
  }
  // Runway & helipad markings.
  if (game.mapId === 'airbase' || game.mapId === 'vehicleRange') {
    for (const p of map.pads) {
      if (p.type === 'runway') {
        c.fillStyle = '#43464a'; c.fillRect(p.x, p.y, p.w, p.h);
        c.fillStyle = 'rgba(240,240,235,.85)';
        for (let x = p.x + 26; x < p.x + p.w - 26; x += 90) c.fillRect(x, p.y + p.h / 2 - 3, 46, 6);
        c.fillRect(p.x + 8, p.y + 6, p.w - 16, 3); c.fillRect(p.x + 8, p.y + p.h - 9, p.w - 16, 3);
      } else if (p.type === 'helipad') {
        c.fillStyle = '#4a4d51'; c.beginPath(); c.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2 - 4, 0, Math.PI * 2); c.fill();
        c.strokeStyle = 'rgba(240,240,235,.85)'; c.lineWidth = 4;
        c.beginPath(); c.arc(p.x + p.w / 2, p.y + p.h / 2, p.w / 2 - 14, 0, Math.PI * 2); c.stroke();
        c.fillStyle = 'rgba(240,240,235,.9)'; c.font = `bold ${Math.round(p.h * 0.52)}px sans-serif`;
        c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillText('H', p.x + p.w / 2, p.y + p.h / 2 + 2);
      }
    }
  }
  for (const f of map.floors) if (f.roofed) paintFloor(f);
  for (const p of map.pads) {
    if (p.type !== 'nest_ground') continue;
    const rx = p.w / 2, ry = p.h / 2;
    c.save();
    c.translate(p.x + rx, p.y + ry);
    c.scale(rx, ry);
    const mud = c.createRadialGradient(0, 0, .16, 0, 0, 1);
    mud.addColorStop(0, '#4b3e32');
    mud.addColorStop(.68, '#63513d');
    mud.addColorStop(1, 'rgba(97,83,60,0)');
    c.fillStyle = mud;
    c.beginPath(); c.arc(0, 0, 1, 0, Math.PI * 2); c.fill();
    for (let i = 0; i < 410; i++) {
      const angle = noise() * Math.PI * 2;
      const distance = Math.sqrt(noise()) * .96;
      const x = Math.cos(angle) * distance, y = Math.sin(angle) * distance;
      c.fillStyle = noise() < .58 ? '#9b8154' : '#5d623c';
      c.globalAlpha = (1 - distance) * .48;
      c.beginPath();
      c.ellipse(x, y, .008 + noise() * .033, .004 + noise() * .012, angle + .8, 0, Math.PI * 2);
      c.fill();
    }
    c.restore();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(map.w,map.h),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));
  mesh.rotation.x = -Math.PI/2; mesh.position.set(map.w/2,0,map.h/2);
  return mesh;
}
