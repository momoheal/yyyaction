# 鸭鸭鸭行动 3D

独立的浏览器游戏，使用 Three.js 正交相机以 45° 俯视显示战区。大厅可进入新手行动或正式战区。

## 本地启动

在本目录执行：

```powershell
npm ci
npm run dev
```

打开 [http://localhost:5174/](http://localhost:5174/)。浏览器需支持 WebGL 2。运行 `npm run typecheck` 检查类型，运行 `npm run build` 生成本项目的 `dist/`。

电脑端用 WASD 移动，鼠标瞄准，左键开火，E 搜索，Esc 暂停。触屏用左摇杆移动，右摇杆瞄准和开火。

3D 版的仓库、排行榜和语言设置从独立的浏览器存储键读取。切换域名、端口或浏览器会使用该环境下的存档。

## Android APK

Android 版用 Capacitor 将同一个 3D 网页构建放进应用，包名为 `com.duckops.extraction3d`。手机上的游戏存档保存在应用内。从本目录运行 `npm ci` 和 `npm run android:sync`，将当前网页构建同步到 Android 工程。

使用 JDK 21 和 Android SDK 36。在 Windows 上，从 `android/` 运行以下命令构建签名发布包。

```powershell
$signing = Join-Path $env:LOCALAPPDATA 'DuckOps3D/Signing/keystore.properties'
.\gradlew.bat assembleRelease "-PduckopsSigningProperties=$signing"
```

`duckopsSigningProperties` 指向仓库外的 Java properties 文件，包含 `storeFile`、`storePassword`、`keyAlias` 和 `keyPassword`。升级版本时沿用同一签名，并递增 `android/app/build.gradle` 的 `versionCode`。签名包输出为 `android/app/build/outputs/apk/release/app-release.apk`（从 3D 工程目录算起）。

## 当前范围

首个里程碑覆盖完整的新手行动。项目也包含原 TypeScript 工程的六张正式战区，其通关与视觉细节需逐图核对。冰火空军基地、Quick 的附加规则、逐图 3D 美术细化和微信构建列在 [版本基线](BASELINE.md)。
