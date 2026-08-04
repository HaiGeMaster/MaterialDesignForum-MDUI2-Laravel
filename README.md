# MaterialDesignForum（MDUI2 版本）

基于 **Vue 3 + MDUI 2 + Laravel** 构建的 Material Design 风格社区论坛，支持 Web 端和 Tauri 桌面端。

<img src="https://www.xbedrock.com/assets/info_content/md3/device_info_template_auto.png" alt="MDUI2主题预览图" width="100%">

## 技术栈

| 类别       | 技术                                |
| ---------- | ----------------------------------- |
| 前端框架   | Vue 3 + Vite 8                      |
| UI 框架    | MDUI 2（Material Design 2）         |
| 状态管理   | Pinia + pinia-plugin-persistedstate |
| 路由       | Vue Router 5                        |
| 国际化     | vue-i18n                            |
| 富文本编辑 | Tiptap                              |
| 轮播       | Swiper                              |
| 后端       | Laravel（PHP）                      |
| 桌面端     | Tauri 2                             |
| 测试       | Vitest + Playwright                 |
| 代码检查   | ESLint + Oxlint + Prettier          |

## 环境要求

- **Node.js** ^22.18.0 或 >=24.12.0
- **pnpm**（推荐）或 npm
- **Rust**（仅 Tauri 打包需要）：[rustup.rs](https://rustup.rs/)
- **Tauri 系统依赖**：[Tauri 前置准备](https://v2.tauri.app/start/prerequisites/)

## 安装

```bash
# 克隆项目后进入目录
cd MaterialDesignForum-MDUI2-Laravel

# 安装依赖
pnpm install
```

## 开发

```bash
# 启动前端开发服务器（带热更新）
pnpm dev
```

开发服务器通过 Vite 代理访问 Laravel 后端 API。

## 构建前端（Web 部署）

```bash
# 构建生产版本
pnpm build
```

构建产物默认输出到 `../MaterialDesignForum-Laravel/public/themes/MaterialDesignForum-MDUI2/`，配合 Laravel 后端部署。

> **环境自动切换说明**：构建时 `vite.config.js` 会自动检测是否为 Tauri 打包：
>
> - **Web 构建**（`pnpm build`）：`base` 为 `/themes/MaterialDesignForum-MDUI2/`，输出到 Laravel 的 public 目录
> - **Tauri 构建**（`pnpm tauri:build`）：`base` 为 `./`，输出到默认 `dist` 目录
>
> 运行时代码（`global.js`）会自动通过 `window.__TAURI_INTERNALS__` 检测当前环境，无需手动切换配置。

## 构建 Tauri 桌面应用

### 前置准备

确保已安装 Rust 和 Tauri 系统依赖，参考 [Tauri 官方文档](https://v2.tauri.app/start/prerequisites/)。

### Tauri 开发模式

```bash
# 启动 Tauri 开发窗口（带热更新）
pnpm tauri:dev
```

此命令会自动设置 `TAURI_BUILD=1` 环境变量，使 Vite 使用 Tauri 专用的构建配置。

### Tauri 生产打包

```bash
# 生产打包（优化体积）
pnpm tauri:build

# Debug 打包（方便调试，保留更多信息）
pnpm tauri:build:debug
```

打包产物位于 `src-tauri/target/release/` 或 `src-tauri/target/debug/` 目录下。

### Tauri CLI 通用命令

```bash
# 直接调用 tauri CLI（已自动注入 TAURI_BUILD）
pnpm tauri
```

## 测试

```bash
# 运行单元测试（Vitest）
pnpm test:unit

# 安装 Playwright 浏览器（仅首次）
npx playwright install

# 运行端到端测试
pnpm test:e2e

# 仅在 Chromium 上运行
pnpm test:e2e --project=chromium

# 运行指定测试文件
pnpm test:e2e tests/example.spec.ts

# Debug 模式运行
pnpm test:e2e --debug
```

## 代码检查与格式化

```bash
# 运行所有 Lint 检查并自动修复
pnpm lint

# 代码格式化
pnpm format
```

## 其他脚本

| 命令           | 说明                     |
| -------------- | ------------------------ |
| `pnpm preview` | 预览构建结果             |
| `pnpm lint`    | Oxlint + ESLint 检查修复 |
| `pnpm format`  | Prettier 格式化代码      |

## 项目结构

```
MaterialDesignForum-MDUI2-Laravel/
├── src/                    # 前端源码
│   ├── api/                # API 请求与全局配置
│   │   └── global.js       # 环境自动检测（Tauri/Electron/MobileApp）
│   ├── components/         # Vue 组件
│   ├── layouts/            # 布局组件
│   ├── locales/            # 国际化语言文件
│   ├── pages/              # 页面组件
│   ├── plugins/            # MDUI、i18n 等插件
│   ├── router/             # 路由配置
│   ├── stores/             # Pinia 状态管理
│   └── styles/             # 全局样式
├── src-tauri/              # Tauri 后端（Rust）
├── tests/                  # 测试文件
│   ├── unit/               # 单元测试
│   └── e2e/                # 端到端测试
├── vite.config.js          # Vite 构建配置
├── package.json            # 项目依赖与脚本
└── pnpm-lock.yaml          # 依赖锁定文件
```

## 许可证

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2026 HaiGeMaster
