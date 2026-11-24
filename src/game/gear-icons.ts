import { RARITY_COLORS, WEAPONS } from './data';

type WeaponShape = 'pistol' | 'compact' | 'shotgun' | 'rifle' | 'sniper' | 'lmg' | 'ak' | 'dmr' | 'minigun' | 'rpg' | 'ironbreaker';

const SHAPES: Record<string, WeaponShape> = {
  pistol: 'pistol', smg: 'compact', mp9: 'compact', frostmp9: 'compact', shotgun: 'shotgun',
  rifle: 'rifle', m4legend: 'rifle', sniper: 'sniper', awmlegend: 'sniper', lmg: 'lmg',
  ak: 'ak', dmr: 'dmr', minigun: 'minigun', rpg: 'rpg', ironbreaker: 'ironbreaker',
};

/** Small, data-driven hand-painted SVG props shared by the web UI and Canvas renderer. */
export function weaponIconSvg(id: string): string {
  const weapon = WEAPONS[id];
  const shape = SHAPES[id] ?? 'rifle';
  const color = weapon?.color ?? '#3d4640';
  const rarity = RARITY_COLORS[weapon?.rarity ?? 0];
  const legend = (weapon?.rarity ?? 0) >= 5;
  const special = id === 'frostmp9'
    ? '<path d="m62 29 4-7 4 7 7 2-7 3-4 7-4-7-7-3z" fill="#c9f5ff" stroke="#6094a2" stroke-width="1.5"/><path d="m89 36 3-5 3 5 5 2-5 2-3 5-3-5-5-2z" fill="#dffaff"/>'
    : id === 'ironbreaker'
      ? '<path d="m70 22 5 10 11 1-8 7 3 11-11-6-11 6 3-11-8-7 11-1z" fill="#c0262b" stroke="#ffb3a3" stroke-width="1.5"/><circle cx="70" cy="34" r="3" fill="#ff5a4a"/>'
      : id === 'm4legend' || id === 'awmlegend'
        ? '<path d="M49 39q9-13 18-1t18-1" fill="none" stroke="#e0b45c" stroke-width="2" opacity=".9"/><circle cx="68" cy="36" r="2.2" fill="#ffe69a"/>'
        : '';

  let silhouette = '';
  if (shape === 'pistol') {
    silhouette = '<path d="M29 36h16l4-7h31l9 5h25v8H88l-8 6H49l-4-5H29z"/><path d="M68 46h13l-3 18H65z"/><path d="M91 34h27v5H91z"/><path d="M47 31h29v3H47z" fill="#9da7a0"/>';
  } else if (shape === 'compact') {
    silhouette = '<path d="M17 33h17l6 4h53l9-5h26v8h-25l-8 6H43l-8-5H17z"/><path d="M65 44h14l-3 18H63z"/><path d="M39 31h42v3H39z" fill="#9da7a0"/><path d="M20 30h21v3H20z" fill="#b1b9b1"/><path d="M97 32h27v4H97z"/>';
  } else if (shape === 'shotgun') {
    silhouette = '<path d="M9 35h27l8 4h62l9-5h17v7h-21l-9 5H45l-10-5H9z"/><path d="M64 45h14l-2 18H62z"/><path d="M37 33h13v3H37z" fill="#b98a54"/><path d="M51 46h40v5H51z" fill="#7f552f"/><path d="M51 49h39v3H51z" fill="#c39a62"/>';
  } else if (shape === 'sniper' || shape === 'dmr') {
    silhouette = `<path d="M8 34h28l9 4h72l11-5h14v7h-17l-10 5H46l-11-5H8z"/><path d="M68 44h15l-3 19H66z"/><path d="M48 27h30v5H48z"/><rect x="54" y="22" width="20" height="7" rx="3" fill="#18201e" stroke="#111714" stroke-width="2"/><path d="M49 25h28" stroke="#aebbb5" stroke-width="1.5"/><path d="M33 32h17v3H33z" fill="#c0c8bf"/>${shape === 'sniper' ? '<path d="M23 34h19v4H23z" fill="#66765a"/><path d="M92 44 96 61h3l-2-17z" fill="#87928b"/>' : '<path d="M73 44h10l3 14H71z" fill="#202726"/>'}`;
  } else if (shape === 'lmg') {
    silhouette = '<path d="M7 34h33l8 4h72l10-5h12v7h-16l-10 5H48l-10-5H7z"/><path d="M66 44h15l-3 17H64z"/><path d="M44 28h31v5H44z"/><path d="M50 45h23v16H50z" fill="#242b26" stroke="#131815" stroke-width="2"/><path d="M53 48h17M53 52h17M53 56h17" stroke="#7b8779" stroke-width="1.5"/><path d="M35 31h15v3H35z" fill="#c1c9bd"/>';
  } else if (shape === 'ak') {
    silhouette = '<path d="M9 35h29l9 4h71l10-5h14v7h-18l-9 5H48l-11-5H9z"/><path d="M64 45h15l-3 19H62z"/><path d="M10 32h29v5H10z" fill="#8a5b35"/><path d="M40 32h19v4H40z" fill="#9b663c"/><path d="M65 45q6 1 13 1l7 20-11-2-7-12z" fill="#70472d"/><path d="M90 33h26v3H90z" fill="#bdc2b6"/>';
  } else if (shape === 'ironbreaker') {
    silhouette = '<path d="M6 33h34l9 5h73l11-5h14v8h-18l-10 5H49l-11-5H6z"/><path d="M64 44h18l-4 18H60z"/><path d="M40 27h34v6H40z" fill="#241a1e"/><path d="M52 45h25v18H52z" fill="#180f12" stroke="#8f1d1d" stroke-width="2"/><path d="M57 48h15M57 53h15M57 58h15" stroke="#b3262c" stroke-width="1.5"/><path d="M33 30h18v5H33z" fill="#5a171b"/><path d="M98 33h26v4H98z" fill="#3a1014"/>';
  } else if (shape === 'minigun') {
    silhouette = '<path d="M38 37h52l8-5h20v8H97l-8 5H40z"/><path d="M46 30h71v3H46zM45 35h75v3H45zM45 40h75v3H45z"/><path d="M115 28h10v17h-10z" fill="#151a18"/><path d="M62 45h15l-4 14H60z"/><circle cx="44" cy="36.5" r="9" fill="#596052" stroke="#151a18" stroke-width="3"/><path d="M47 46h34v7H47z" fill="#252c28"/><path d="M57 54h4v12h-4zM75 54h4v12h-4z" fill="#a8b09b"/>';
  } else if (shape === 'rpg') {
    silhouette = '<path d="M17 33h78l12 5-12 5H17z"/><path d="M95 31h17l15 7-15 7H95z" fill="#b8a06c"/><path d="M20 35h73v6H20z" fill="#78845a"/><path d="M34 30h13v16H34z" fill="#3e4938"/><path d="M55 43h17l-2 13H53z"/><path d="M16 32h7v18h-7z" fill="#283027"/><path d="M112 32v11" stroke="#ded4aa" stroke-width="2"/>';
  } else {
    silhouette = '<path d="M10 34h26l9 4h74l10-5h13v7h-17l-9 5H47l-11-5H10z"/><path d="M66 44h15l-3 19H64z"/><path d="M41 30h36v4H41z" fill="#a9b4aa"/><path d="M89 33h27v3H89z"/>';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 88" fill="none"><defs><linearGradient id="g" x1="20" y1="24" x2="112" y2="62" gradientUnits="userSpaceOnUse"><stop stop-color="#aeb9ad"/><stop offset=".22" stop-color="${color}"/><stop offset="1" stop-color="#171c1a"/></linearGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="${rarity}" stop-opacity=".5"/></linearGradient></defs><g transform="rotate(-9 72 44)" stroke="#121715" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><g fill="#1b201e">${silhouette}</g><g fill="url(#g)" stroke-width="2">${silhouette}</g><path d="M28 35h17m30 1h19M46 41h7" stroke="url(#a)" stroke-width="1.7"/>${special}</g>${legend ? `<path d="m117 15 2.5 6.5L126 24l-6.5 2.5L117 33l-2.5-6.5L108 24l6.5-2.5z" fill="#fff0a8"/><circle cx="28" cy="62" r="2" fill="${rarity}"/>` : ''}</svg>`;
}

export function weaponIconDataUrl(id: string): string {
  return `data:image/svg+xml,${encodeURIComponent(weaponIconSvg(id))}`;
}
