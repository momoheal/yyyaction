// 加固后打包：把小游戏配置复制进加固产物目录，并做基础校验。
// 用法：node minigame-opt/after-fortify.mjs
import { copyFileSync, existsSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, 'dist');
const OUT = resolve(__dirname, 'fortify-output');
const fail = (msg) => { console.error('✗ 加固打包失败:', msg); process.exit(1); };

if (!existsSync(resolve(OUT, 'game.js'))) fail(`缺少加固后的 game.js：${OUT}`);
if (!existsSync(resolve(OUT, 'game.js.map'))) console.warn('! 未发现 game.js.map，请确认加固服务是否返回 sourcemap');

// 加固 CLI 会留下 game.js.bak（加固前的原始代码），绝不能打进上传包。
const bak = resolve(OUT, 'game.js.bak');
if (existsSync(bak)) { rmSync(bak); console.log('✓ 删除加固备份 game.js.bak'); }

for (const f of ['game.json', 'project.config.json']) {
  copyFileSync(resolve(SRC, f), resolve(OUT, f));
  console.log(`✓ 复制 ${f}`);
}

const js = readFileSync(resolve(OUT, 'game.js'), 'utf8');
if (js.includes('code.fortify.config.json')) fail('加固产物里残留了加固配置文件路径');
execFileSync(process.execPath, ['--check', resolve(OUT, 'game.js')], { stdio: 'inherit' });

const files = readdirSync(OUT).sort();
console.log('✓ 加固打包完成，目录内容:', files.join(', '));
console.log('  下一步：用微信开发者工具打开 minigame-opt/fortify-output 上传');
