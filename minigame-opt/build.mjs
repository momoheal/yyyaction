// 优化版（quick 改动）微信小游戏一键构建脚本
// 用法：node minigame-opt/build.mjs
// 步骤：vite 构建 -> 复制小游戏配置 -> 语法/内容/浏览器API残留校验
import { execFileSync } from 'node:child_process';
import { copyFileSync, readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = resolve(__dirname, 'dist');
const fail = (msg) => { console.error('✗ 构建校验失败:', msg); process.exit(1); };

// 1. vite 构建（outDir=minigame-opt/dist，emptyOutDir 会清空 dist）
console.log('[1/4] vite 构建优化版小游戏...');
execFileSync('npx', ['vite', 'build', '--config', 'vite.minigame-opt.config.ts'], {
  cwd: ROOT, stdio: 'inherit', shell: true,
});

// 2. 复制小游戏配置（vite 清空 dist 后必须重新放回去）
console.log('[2/4] 写入小游戏配置...');
for (const f of ['project.config.json', 'game.json']) {
  copyFileSync(resolve(__dirname, f), resolve(DIST, f));
}

// 3. 校验 game.js
console.log('[3/4] 校验 game.js...');
const gameJsPath = resolve(DIST, 'game.js');
if (!existsSync(gameJsPath)) fail('缺少 game.js');
const js = readFileSync(gameJsPath, 'utf8');

// 3a. 微信解析器不认新语法，编译后不得残留（es2017 target 应已转译）
const dblQuestion = (js.match(/\?\?/g) || []).length;
if (dblQuestion > 0) fail(`残留 ${dblQuestion} 处 ?? 运算符，微信上传会被拒`);

// 3b. 小游戏环境没有这些浏览器 API（曾导致真机卡启动页）
for (const [name, re] of [
  ['new URL(', /new URL\(/g],
  ['import.meta', /import\.meta/g],
  ['document.currentScript', /currentScript/g],
  ['document.baseURI', /baseURI/g],
]) {
  const n = (js.match(re) || []).length;
  if (n > 0) fail(`残留 ${n} 处 ${name}，小游戏环境不支持`);
}

// 3c. 关键新内容必须打进包（确认 quick 改动生效）
for (const kw of ['冰火空军基地', '烈焰王牌', '冰霜雷达官', '补给箱', '鸭王陵寝']) {
  if (!js.includes(kw)) fail(`关键内容缺失: ${kw}`);
}

// 3d. 语法校验
execFileSync(process.execPath, ['--check', gameJsPath], { stdio: 'inherit' });

// 4. 完成
console.log('[4/4] 全部校验通过');
const size = (js.length / 1024).toFixed(1);
console.log(`✓ 优化版小游戏构建完成: game.js ${size} KB`);
console.log('  产物目录:', DIST);
console.log('  下一步：用微信开发者工具打开该目录上传，或真机调试验证');
