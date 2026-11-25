/**
 * 鸭鸭鸭行动 · 优化版单文件构建
 *
 * 把 src/ 里的外链资源（game.bundle.js / styles.css）内联进 index.html，
 * 产出一个零外部依赖、可直接分享的单文件 HTML。
 *
 * 用法：node optimized/scripts/build.mjs
 * 输出：dist/鸭鸭鸭行动-优化版.html（同时覆盖 dist/index.html 供部署用）
 */
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');
const SRC = resolve(__dirname, '..', 'src');
const DIST = resolve(ROOT, 'dist');

const html = await readFile(resolve(SRC, 'index.html'), 'utf8');
const js = await readFile(resolve(SRC, 'game.bundle.js'), 'utf8');
const css = await readFile(resolve(SRC, 'styles.css'), 'utf8');

// 用内联 style 替换外链 stylesheet
let out = html.replace(
  /<link[^>]*href=["']\.\/assets\/styles\.css["'][^>]*>/,
  () => `<style rel="stylesheet">\n${css}\n</style>`,
);
// 用内联 module script 替换外链 script
out = out.replace(
  /<script[^>]*src=["']\.\/assets\/game\.bundle\.js["'][^>]*><\/script>/,
  () => `<script type="module">\n${js}\n</script>`,
);

// 只检查 HTML 标签层面的外链（内联的 JS 代码里可能含 ./assets/ 字符串，属正常）
if (/<(?:link|script)[^>]+(?:href|src)=["']\.\/assets\//.test(out)) {
  throw new Error('仍有未内联的 ./assets/ 外链标签，构建中止');
}

await mkdir(DIST, { recursive: true });
const primary = resolve(DIST, '鸭鸭鸭行动-优化版.html');
await writeFile(primary, out, 'utf8');
await writeFile(resolve(DIST, 'index.html'), out, 'utf8');
await copyFile(primary, resolve(DIST, '鸭鸭鸭行动.html'));

console.log('构建完成：');
console.log('  ', primary, `(${(Buffer.byteLength(out) / 1024).toFixed(0)} KB)`);
console.log('  ', resolve(DIST, 'index.html'));
console.log('  ', resolve(DIST, '鸭鸭鸭行动.html'));
