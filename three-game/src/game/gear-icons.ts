import { RARITY_COLORS, WEAPONS } from './data';

/**
 * Weapon icons drawn as small, stylised side-view SVGs in a 144x88 box.
 * Every gun has its own silhouette so the prototype is recognisable at a glance:
 * slide & angled grip for the pistol, banana mag for the AK, drum for the AA12,
 * six barrels for the minigun, flared tube for the RPG, and so on.
 * Coordinates: receiver around y=34..48, muzzle to the right, stock to the left.
 */

const WOOD = '#8b5e34';
const WOOD_LIGHT = '#a97643';
const POLY = '#2c3430';
const POLY_LIGHT = '#39433d';
const STEEL = '#b4beb3';
const DARK = '#171e1b';

// --- reusable building blocks -------------------------------------------------
const arBody = (stock: string, rail: string) => `
  <path d="M14 38h34l5-5h34l6 4h33v5H93l-6 5H51l-5 4H14z"/>
  <path d="M14 34h32v6H14z" fill="${stock}"/>
  <path d="M48 29h40v4H48z" fill="${rail}"/>
  <path d="M61 48h14l-3 19H64z" fill="${POLY}"/>
  <path d="M114 30h4v9h-4z"/>
  <path d="M121 36h12v4h-12z" fill="${STEEL}"/>
  <path d="M54 33h28v2H54z" fill="#8d998f" stroke="none"/>`;

const akBody = `
  <path d="M8 34 40 33l9 4h56l8-4h21v6h-21l-8 5H52l-11 5H8z"/>
  <path d="M8 32h32v5H8z" fill="${WOOD}"/>
  <path d="M40 32h20v5H40z" fill="${WOOD_LIGHT}"/>
  <path d="M66 46q3 10 12 17l-8 5q-11-8-13-20z" fill="#70472d"/>
  <path d="M52 28h17v5H52z"/>
  <path d="M113 32h22l4 4-4 3h-22z" fill="${STEEL}"/>
  <path d="M45 35h20v2H45z" fill="#6b4a2a" stroke="none"/>`;

const mp9Body = `
  <path d="M20 38h28l5-5h34l5 4h18v6H91l-5 5H50l-5 4H20z"/>
  <path d="M18 34h13v11H18z" fill="${POLY_LIGHT}"/>
  <path d="M61 47h14l-1 16H63z" fill="${POLY}"/>
  <rect x="64" y="26" width="16" height="8" rx="2" fill="${DARK}" stroke-width="1.8"/>
  <circle cx="72" cy="30" r="1.8" fill="#e0524b" stroke="none"/>
  <path d="M94 36h12v4H94z" fill="${STEEL}"/>
  <path d="M34 34h42v2H34z" fill="#8d998f" stroke="none"/>`;

const sniperBody = `
  <path d="M8 34 40 32l8 5h66l10-5h12v6h-14l-9 5H51l-11 5H8z"/>
  <path d="M8 31h32v5H8z" fill="#4f5a4e"/>
  <rect x="52" y="22" width="30" height="9" rx="4" fill="${DARK}"/>
  <path d="M50 26h34" stroke="#b7c1b6" stroke-width="2"/>
  <path d="M70 48h12l-2 14H71z" fill="${POLY}"/>
  <path d="M48 32h6l-3 8h-5z" fill="#6c7669"/>
  <path d="M124 32h14v7h-14z" fill="${STEEL}"/>`;

const GUN_ART: Record<string, string> = {
  m1911: `
    <path d="M25 31h79v12H69l-9 6H29l-4-7z"/>
    <path d="M52 46h19l-8 25H46z" fill="${WOOD}"/>
    <path d="M67 45h17l-5 10H67" fill="none"/>
    <path d="M42 31v8m5-8v8m5-8v8M87 32h12" stroke="${STEEL}"/>`,
  revolver: `
    <path d="M34 36h24l11-7h43v9H74l-7 10H39z"/>
    <path d="M35 45h17l-5 24H32l-6-5z" fill="${WOOD}"/>
    <ellipse cx="63" cy="41" rx="10" ry="8" fill="#a8a091"/>
    <path d="M62 36v9m-4-9v9M71 29h38" stroke="${STEEL}"/>
    <path d="M51 47q7 14 15 0" fill="none"/>`,
  s12k: `
    ${akBody}
    <path d="M61 45h21l-1 23H65z" fill="${POLY_LIGHT}"/>
    <path d="M86 34h37v10H86z" fill="#697660"/>
    <path d="M91 36h22m-22 4h22" stroke="${DARK}"/>`,
  mini14: `
    <path d="M10 46l6-12h42l10-3h55v7H93l-12 9H47l-9 8H13z" fill="${WOOD_LIGHT}"/>
    <path d="M58 30h39v8H58zM103 29h33v4h-33z"/>
    <path d="M68 45h13l-1 14H70z" fill="${POLY}"/>
    <path d="M51 30h6v-6h3v6m57 0v-6h4v6" stroke="${STEEL}"/>`,
  sr25: `
    ${arBody('#555d60', '#242d35')}
    <rect x="49" y="21" width="38" height="10" rx="3" fill="${DARK}"/>
    <path d="M55 23h24m-18 8v4m18-4v4" stroke="${STEEL}"/>
    <path d="m94 43-8 14m10-14 8 12" stroke="#879694"/>`,
  m79: `
    <path d="M12 42l8-11h44l9 6v11H47l-12 10H13z" fill="${WOOD}"/>
    <path d="M62 30h58v16H62z"/><path d="M114 29h10v18h-10z" fill="${DARK}"/>
    <path d="M75 32h35m-33 9h21" stroke="${STEEL}"/>
    <path d="M59 48q7 14 18 0M93 28v-8h9v8" fill="none"/>`,
  m32: `
    <path d="M11 34h33l10 5h59v-8h16v12h-22l-10 6H38l-10-6H11z"/>
    <path d="M55 46h11l-6 18H49z" fill="${POLY}"/>
    <rect x="67" y="36" width="30" height="24" rx="8" fill="#68765e"/>
    <path d="M71 43h22m-22 7h22m-19 6h16M50 30h49" stroke="${DARK}"/>
    <path d="M107 34h17" stroke="${STEEL}"/>`,

  // M9 — short slide, exposed muzzle, angled grip, open trigger guard
  pistol: `
    <path d="M27 33 88 31l7 4h13v6h-15l-5 4H52l-5-3H27z"/>
    <path d="M54 46h17l-3 6h-11z" fill="${POLY}"/>
    <path d="M57 51h14l-4 18H54z" fill="#3b332c"/>
    <path d="M53 50q-8 1-8 8l4 2 1-7h9z" fill="none" stroke-width="2.4"/>
    <path d="M32 32h50v3H32z" fill="${STEEL}"/>
    <path d="M88 35h18v3H88z" fill="#d3dad0"/>
    <circle cx="104" cy="36.5" r="1.8" fill="#0d1210" stroke="none"/>
    <path d="M36 38h4m4 0h4" stroke="#6d786f" stroke-width="1.4"/>`,

  // MP5 — slim receiver, long barrel, curved magazine, front sight
  smg: `
    <path d="M12 40h24l5-5h38l6 4h30v5H85l-6 5H39l-5 4H12z"/>
    <path d="M12 36h24v5H12z" fill="${POLY_LIGHT}"/>
    <path d="M60 49q2 12 10 18l-8 2q-8-9-8-19z" fill="${POLY}"/>
    <path d="M92 30h4v9h-4z"/>
    <path d="M69 28h13v5H69z" fill="${POLY_LIGHT}"/>
    <path d="M116 36h12v4h-12z" fill="${STEEL}"/>
    <path d="M30 35h44v2H30z" fill="#8d998f" stroke="none"/>`,

  // MP9 — micro SMG, side-folding stock, red-dot sight, short mag
  mp9: mp9Body,

  // M870 — pump shotgun: barrel + magazine tube, wooden pump and stock
  shotgun: `
    <path d="M9 34 38 32l8 5h72l9-4h14v6h-16l-8 5H49l-10-4H9z"/>
    <path d="M9 31 38 30l3 4H9z" fill="${WOOD}"/>
    <path d="M48 46h62v5H48z" fill="#6f4a2a"/>
    <path d="M48 46h62v2H48z" fill="${WOOD_LIGHT}"/>
    <path d="M50 51h58v4H50z" fill="#5a3a22"/>
    <path d="M31 33h13v5H31z" fill="${WOOD}"/>
    <path d="M115 33h17v3h-17z" fill="${STEEL}"/>
    <path d="M46 35h59v2H46z" fill="#8d998f" stroke="none"/>`,

  // M4A1 — flat-top rail, collapsible stock, STANAG mag, front sight post
  rifle: arBody(POLY_LIGHT, '#3b443f'),

  // AK47 — wood furniture, curved banana magazine, slanted muzzle brake
  ak: akBody,

  // AWM — bolt-action, long heavy barrel, large scope, bolt handle
  sniper: sniperBody,

  // M249 — belt-fed LMG, carry handle, box magazine, bipod
  lmg: `
    <path d="M10 35h32l7-5h34l6 4h31v6H89l-6 5H49l-7 4H10z"/>
    <path d="M10 32h30v5H10z" fill="${POLY_LIGHT}"/>
    <path d="M43 27h34v6H43z" fill="${POLY}"/>
    <path d="M60 47h24v18H60z" fill="${POLY}"/>
    <path d="M64 50h16m-16 4h16m-16 4h16" stroke="#6e7a6d" stroke-width="1.6"/>
    <path d="M108 45l-6 18m14-18 6 18" stroke="${STEEL}" stroke-width="2.6"/>
    <path d="M122 34h14v5h-14z" fill="${STEEL}"/>
    <path d="M46 34h33v2H46z" fill="#8d998f" stroke="none"/>`,

  // SVD — Dragunov: thumbhole wood stock, scope, short curved magazine
  dmr: `
    <path d="M12 34 40 32l8 5h54l8-4h22v6h-22l-8 5H51l-10 5H12z"/>
    <path d="M12 32h28v5H12z" fill="${WOOD}"/>
    <path d="M44 31h22v5H44z" fill="${WOOD_LIGHT}"/>
    <rect x="52" y="22" width="28" height="8" rx="3" fill="${DARK}"/>
    <path d="M50 26h32" stroke="#b7c1b6" stroke-width="2"/>
    <path d="M68 47q2 9 8 13l-6 4q-8-6-9-15z" fill="#70472d"/>
    <path d="M114 31h4v8h-4z"/>
    <path d="M124 33h12v4h-12z" fill="${STEEL}"/>`,

  // Gradient-shadow M4A1 — same profile, gold filigree
  m4legend: arBody('#4a3a5e', '#6a4e8a'),

  // Dragon AWM — same profile, gold dragon inlay
  awmlegend: sniperBody,

  // M134 — six rotating barrels, drum housing, ammo box
  minigun: `
    <path d="M36 32h58l8-6h20v18h-20l-8-6H36z"/>
    <circle cx="42" cy="36" r="10" fill="#4a5349"/>
    <path d="M47 28h74v3H47zM47 33h78v3H47zM47 38h78v3H47z" fill="#889486" stroke-width="1.6"/>
    <path d="M120 26h14v22h-14z" fill="${DARK}"/>
    <circle cx="127" cy="37" r="8" fill="#222b26"/>
    <circle cx="127" cy="37" r="3.2" fill="#0d1210" stroke="none"/>
    <path d="M60 45h14l-3 14H62z" fill="${POLY}"/>
    <path d="M68 50h28v10H68z" fill="#242b26"/>
    <path d="M85 45h4v12h-4z" fill="${STEEL}"/>`,

  // RPG-7 — long tube, flared muzzle, warhead, pistol grip
  rpg: `
    <path d="M20 34h76l20 4-20 4H20z"/>
    <path d="M96 29 116 33l16 5-16 5-20 4z" fill="#b8a06c"/>
    <path d="M20 33h9v12h-9z" fill="#283027"/>
    <path d="M40 45h16l-3 14H43z" fill="#2f382f"/>
    <path d="M60 33h14v4H60z" fill="#4b5746"/>
    <path d="M30 30h10v4H30z"/>
    <path d="M112 31v14" stroke="#ded4aa" stroke-width="2"/>`,

  // Frost MP9 — ice-blue micro SMG with crystal shards
  frostmp9: mp9Body,

  // 玄铁破壁者 — heavy iron anti-material rifle, oversized brake, red core
  ironbreaker: `
    <path d="M6 34h36l8-5h46l8 5h28v8H98l-8 5H50l-10 5H6z"/>
    <path d="M6 31h34v6H6z" fill="#2a2024"/>
    <path d="M46 26h42v7H46z" fill="#1a1418"/>
    <rect x="58" y="20" width="26" height="10" rx="3" fill="#171014"/>
    <path d="M62 46h22v20H62z" fill="#1b1013"/>
    <path d="M66 49h14m-14 4h14m-14 4h14" stroke="#8f1d1d" stroke-width="1.6"/>
    <path d="M120 30h18v12h-18z" fill="#2a1416"/>
    <path d="m72 30 5 6 9 1-7 6 2 9-9-5-9 5 2-9-7-6 9-1z" fill="#c0262b" stroke="#ffb3a3" stroke-width="1.2"/>`,

  // AA12 — automatic shotgun with signature drum magazine
  aa12: `
    <path d="M14 37h32l6-5h44l6 4h24v6H98l-6 5H48l-6 4H14z"/>
    <path d="M14 34h30v5H14z" fill="${POLY_LIGHT}"/>
    <path d="M44 29h46v5H44z" fill="${POLY}"/>
    <ellipse cx="70" cy="58" rx="16" ry="13" fill="${POLY}"/>
    <circle cx="70" cy="58" r="7" fill="#171d1a" stroke="#5c685d" stroke-width="1.6"/>
    <path d="M118 34h14v5h-14z" fill="${STEEL}"/>
    <path d="M46 34h45v2H46z" fill="#8d998f" stroke="none"/>`,

  // HK416 — raised continuous rail, angular stock, short barrel
  hk416: `
    <path d="M12 38h36l5-5h32l6 4h35v5H91l-6 5H50l-6 4H12z"/>
    <path d="M12 34h34v6H12z" fill="#2f3833"/>
    <path d="M46 27h44v5H46z" fill="#38423c"/>
    <path d="M52 33h30v2H52z" fill="#8d998f" stroke="none"/>
    <path d="M64 48h13l-3 18H67z" fill="${POLY}"/>
    <path d="M110 30h4v9h-4z"/>
    <path d="M120 36h14v4h-14z" fill="${STEEL}"/>
    <path d="M52 42h8v2h-8z" fill="#1d2421" stroke="none"/>`,

  // Barrett M82 — anti-material rifle, huge muzzle brake, scope, bipod
  barrett: `
    <path d="M10 35h34l8-5h52l8 5h20v8h-22l-8 5H52l-10 5H10z"/>
    <path d="M10 32h32v6H10z" fill="#4b554d"/>
    <rect x="48" y="21" width="34" height="10" rx="4" fill="${DARK}"/>
    <path d="M46 25h38" stroke="#b7c1b6" stroke-width="2"/>
    <path d="M72 48h12l-2 15H74z" fill="${POLY}"/>
    <path d="M116 30h20v14h-20z" fill="${STEEL}"/>
    <path d="M118 33h16m-16 4h16" stroke="#4a5349" stroke-width="2"/>
    <path d="M98 46l-8 18m16-18 8 18" stroke="${STEEL}" stroke-width="2.4"/>`,
};

// Signature overlays for boss / legendary skins, drawn over the base silhouette.
const SKIN_ART: Record<string, string> = {
  frostmp9: '<path d="m58 22 4-7 4 7 7 2-7 3-4 7-4-7-7-3z" fill="#c9f5ff" stroke="#6094a2" stroke-width="1.5"/><path d="m88 42 3-5 3 5 5 2-5 2-3 5-3-5-5-2z" fill="#dffaff"/>',
  ironbreaker: '<path d="M70 33 78 43l11 1-8 7 3 11-11-6-11 6 3-11-8-7 11-1z" fill="#c0262b" stroke="#ffb3a3" stroke-width="1.2"/>',
  m4legend: '<path d="M49 40q10-13 19-1t19-1" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".95"/><path d="M55 45q9-8 17 0t17 0" fill="none" stroke="#c77ee0" stroke-width="1.6" opacity=".85"/>',
  awmlegend: '<path d="M44 39q11-14 24-3t28-2" fill="none" stroke="#e0b45c" stroke-width="2.4" opacity=".95"/><path d="m58 38 5 4 7-2 5 5" fill="none" stroke="#ffdf8a" stroke-width="1.6"/>',
  aa12: '<path d="M50 40q9-12 18-2t18-2" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".9"/>',
  hk416: '<path d="M50 39q9-12 18-2t18-2" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".9"/>',
  barrett: '<path d="M45 39q11-13 21-2t22-2" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".9"/>',
};

/** Small, data-driven hand-painted SVG props shared by the web UI and Canvas renderer. */
export function weaponIconSvg(id: string): string {
  const weapon = WEAPONS[id];
  const color = weapon?.color ?? '#3d4640';
  const rarity = RARITY_COLORS[weapon?.rarity ?? 0];
  const legend = (weapon?.rarity ?? 0) >= 5;
  const art = GUN_ART[id] ?? GUN_ART.rifle;
  const skin = SKIN_ART[id] ?? '';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#c3cdc0"/><stop offset=".24" stop-color="${color}"/><stop offset="1" stop-color="#171c1a"/></linearGradient></defs><g transform="rotate(-8 72 44)" stroke="#121715" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round">${art}${skin}</g>${legend ? `<path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="${rarity}"/>` : ''}</svg>`;
}

export function weaponIconDataUrl(id: string): string {
  return `data:image/svg+xml,${encodeURIComponent(weaponIconSvg(id))}`;
}
