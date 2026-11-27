# WebView 套壳与无 Mac 云构建方案（3D 版）

目标：把 `three-game/dist-en/index.html`（英文单文件）包装成 iOS App，在**没有 Mac** 的情况下构建、签名并上传到 App Store Connect。

## 一、为什么这个方案可行

- `three-game/dist/index.html` / `dist-en/index.html` 是 Vite + `vite-plugin-singlefile` 产出的**单文件**：JS、CSS、图片、音频全部内联，无外部资源、无网络请求。
- 游戏已完整支持触屏双摇杆、横竖屏自适应、程序化音频（无 mp3），非常适合 WebView 套壳。
- Capacitor 把这份 HTML 放进一个原生 iOS 壳（WKWebView），生成可提交 App Store 的 Xcode 工程。
- 构建和签名交给云端 macOS 机器完成，本地 Windows 只需准备网页文件和配置。

## 二、方案 A：Codemagic（推荐，最省事）

Codemagic 提供云端 macOS 构建机，内置代码签名管理和 App Store Connect 集成，**不需要自己的 Mac**。

费用（2026-11 官网价格）：
- 个人方案（For individuals）：单用户、不限应用数，**每月 500 分钟免费构建额度**，每月刷新。一次 iOS 构建通常 5–15 分钟，足够前期使用。
- 按量付费：Mac mini M2 `$0.095/分钟`，M4 `$0.114/分钟`。
- 固定套餐：M2 `$3,990/年`（黑五有时 `$5,400` 档做活动，以官网为准）。

需要你准备（都在你的 Apple 账号下）：
1. Apple Developer Program 会员（个人 $99/年 或组织 $199/年）。
2. App Store Connect 中创建一个 App 记录，拿到 Bundle ID（如 `com.yourteam.duckduck3d`）。
3. App Store Connect API Key（.p8 文件 + Key ID + Issuer ID），用于云端免交互上传。
4. 分发证书（Distribution Certificate）和 App Store 描述文件（Provisioning Profile）——Codemagic 可代管，按它指引上传。

流程：
1. 把项目推到 GitHub/GitLab 私有仓库（ Capacitor 配置见下文）。
2. 在 Codemagic 连接该仓库，选 iOS workflow，添加 `codemagic.yaml`。
3. 在 Codemagic 后台填 Apple 凭证（API Key、证书、描述文件）。
4. 推送代码触发构建 → 自动签名 → 自动上传到 App Store Connect 的测试轨道。
5. 在 App Store Connect 里添加构建版本、填商店信息（见 `01-英文商店文案.md`）、提交审核。

## 三、方案 B：GitHub Actions（macOS runner）

GitHub 官方提供 macOS 云 runner（macos-14/macos-15），可在 Actions 里跑 `xcodebuild` 归档并导出 IPA。

- 费用：公开仓库免费；私有仓库 macOS runner 按分钟计费（比 Linux 贵，具体看账户额度）。
- 需要把 Apple 签名证书、描述文件、API Key 作为 GitHub Secrets 上传。
- 用 `fastlane` 或 `xcodebuild -exportArchive` 导出 IPA，再用 `xcrun altool` / App Store Connect API 上传。
- 配置复杂度高于 Codemagic，但如果你已有 GitHub Actions 经验，可控性更强。

> 结论：没有 Mac 的前提下，优先用 **Codemagic 个人方案（每月 500 免费分钟）** 起步，等上架流程跑通再决定是否换固定套餐。

## 四、Capacitor 集成步骤（在本地 Windows 完成）

在 `three-game/` 目录下执行：

```bash
# 1. 安装 Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/ios

# 2. 初始化（appId 换成你的 Bundle ID）
npx cap init "Duck Duck Extraction 3D" com.yourteam.duckduck3d --web-dir=dist-en

# 3. 构建英文单文件包
npm run build:en

# 4. 添加 iOS 平台（这一步会生成 ios/ 目录，无需 Mac；但同步原生依赖需要 Mac）
npx cap add ios

# 5. 每次网页更新后同步
npx cap sync ios
```

> 注意：`cap add ios` 在 Windows 上可生成原生工程骨架，但 `pod install` / `xcodebuild` 必须在 macOS 上跑——交给 Codemagic 即可。

### Capacitor 配置建议（`capacitor.config.json`）

```json
{
  "appId": "com.yourteam.duckduck3d",
  "appName": "Duck Duck Extraction 3D",
  "webDir": "dist-en",
  "bundledWebRuntime": false,
  "ios": {
    "contentInset": "always",
    "allowsInlineMediaPlayback": true,
    "backgroundColor": "#0d0f12"
  }
}
```

## 五、iOS 原生层必须处理的点

1. **横竖屏**：游戏本身自适应，但 iOS 默认可能限制方向。在 Xcode 工程 Target → Deployment Info 勾选 Portrait / Landscape Left / Landscape Right（或按你想做的方向）。若要强制横屏，在 `AppDelegate` 实现 `application(_:supportedInterfaceOrientationsFor:)` 返回 `.landscape`。
2. **全屏/安全区**：游戏用 `100vh` + `overscroll-behavior:none`，Capacitor 默认 WKWebView 从状态栏下方开始。建议 `contentInset: always` 让内容避开刘海和状态栏，或按需要设置 `contentInset: never` 并在 HTML 里处理安全区。
3. **音频解锁**：iOS 要求用户手势后才能播放音频。游戏在首次点击/按键时调用 `AudioContext.resume()`（`Sfx.unlock()`），符合规则。确认真机上「开始行动」按钮点击后音频正常。
4. **屏幕常亮**：游戏调用 `navigator.wakeLock.request('screen')`，WKWebView 支持；如需更稳，可在原生层设置 `UIApplication.shared.isIdleTimerDisabled = true`。
5. **本地存档**：游戏用 `localStorage`（键 `duckops3d.save.v1`、`duckops3d-locale`）。WKWebView 的 localStorage 默认持久化在 App 沙盒内，卸载 App 才清除，符合"进度留在本机"的隐私说明。
6. **返回键/退出**：iOS 没有物理返回键，游戏内有暂停菜单，无需额外处理。
7. **ATS / 网络**：游戏零网络请求，不需要在 Info.plist 配 NSAppTransportSecurity 例外。

## 六、Info.plist 关键项（Xcode 里核对）

- `CFBundleDisplayName`: Duck Duck Extraction 3D
- `CFBundleVersion` / `CFBundleShortVersionString`: 1.0.0 / 1
- `UILaunchScreen`（iOS 14+）：用启动屏 storyboard 或配置纯色启动页，避免黑屏。
- 不要申请任何权限（无相机、麦克风、定位、相册、通知）——隐私标签填"不收集数据"时才自洽。

## 七、提交审核前核对

- [ ] 从英文包（`dist-en`）出的 IPA，界面为英文（只有右上角"简中"切换按钮，属正常功能）。
- [ ] 真机测试：启动、新手引导、搜刮、交火、撤离、切后台再回来、横竖屏切换、音频。
- [ ] 无调试入口、无测试后门。（`three-game/` 当前源码已移除 `debugMode`，仅保留一行旧存档兼容代码；`window.__duck` 是开发引用，不联网、不影响玩法，但如介意可在上架构建中移除 `GameView.tsx:70` 的暴露。）
- [ ] 隐私政策 URL、支持 URL 已托管为公开 HTTPS 页面（见 `02`、`03`）。
- [ ] App Store Connect 隐私标签按"不收集数据"填写（见 `05`）。

## 八、参考链接

- Capacitor 入门：https://capacitorjs.dev/docs/getting-started/
- Capacitor iOS：https://capacitorjs.dev/docs/ios/
- Codemagic 价格：https://codemagic.io/pricing/
- Codemagic iOS 代码签名：https://docs.codemagic.io/
