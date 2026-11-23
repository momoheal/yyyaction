// 重新打包道具预览页使用的绘制代码（与游戏内完全同一份 scenery.ts）。
// 用法：npm run art:props  →  生成 art_assets/props-bundle.js
// 然后直接用浏览器打开 art_assets/props-gallery.html 查看/导出。
import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const entry = resolve(root, '.props-gallery-entry.ts');
writeFileSync(entry, [
  "import { drawScenery, SCENERY_KINDS } from './src/game/scenery';",
  'declare global { interface Window { drawScenery: typeof drawScenery; SCENERY_KINDS: typeof SCENERY_KINDS } }',
  'window.drawScenery = drawScenery;',
  'window.SCENERY_KINDS = SCENERY_KINDS;',
  '',
].join('\n'));

await build({
  entryPoints: [entry],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  outfile: resolve(here, 'props-bundle.js'),
});

console.log('已生成 art_assets/props-bundle.js，打开 art_assets/props-gallery.html 查看。');
