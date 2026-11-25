# 鸭鸭鸭行动 · 代码包

## 说明
这不是原始的 React 源码工程。原始源码（.tsx/.jsx 组件、package.json 等）不在我手上：你发来的 HTML 是打包工具（Vite）构建后的产物，里面没有 source map，
变量名都已经被压缩成 a、l、Zs 之类的短名字。所以只能从构建产物里把代码拆出来，无法还原成原来的组件文件。

## 文件
- `index.html`：入口页面，加载下面两个文件。需要用本地服务器打开（例如 `npx serve .`），直接双击打开浏览器会拦截模块脚本。
- `assets/game.bundle.js`：完整的运行代码 = React 19 运行库 + 游戏代码 + 所有优化改动，和优化版 HTML 里的完全一致。
- `assets/styles.css`：Tailwind 生成的样式。
- `assets/game.only.js`：只含游戏部分的代码（从 React 运行库之后开始），压缩格式，**不能单独运行**。
- `assets/game.readable.js`：和 game.only.js 内容相同，排版成多行缩进（约 2.1 万行），**推荐阅读这个**。同样不能单独运行；已验证语法正确。

## 代码里的主要位置（在 game.readable.js 里搜索）
- `jc=[`：地图列表（名称、解锁条件、首领、生成函数）
- `function Z1(` / `dy(` / `hy(` / `my(` / `yy(` / `ab(` / `py(`：鸭鸭岛 / 货港 / 工厂 / 孵化场 / 哨站 / 空军基地 / 陵寝 的地图生成
- `Yn={`：所有敌人和首领的数值与技能配置
- `ht={`：武器数值
- `Aa={`：搜刮箱类型
- `bossPrep(` / `bossNew(`：首领新技能
- `function Ry(`：所有地图素材的绘制
- `class Gy{`：渲染器；`class Ay{`：游戏逻辑
- `__LT=`：各地图专属战利品
