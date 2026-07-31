import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     vue({
//       template: {
//         compilerOptions: {
//           // 所有以 mdui- 开头的标签名都是 mdui 组件
//           isCustomElement: (tag) => tag.startsWith('mdui-'),
//         },
//       },
//     }),
//     // vueJsx(),
//     vueDevTools(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//     },
//   },
// })

// 生成打包日期版本号，格式：YYYY.MM.DD
const getBuildVersion = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}.${m}.${d}`
}

export default defineConfig(({ mode }) => {
  // 开发环境配置
  const isDev = mode === 'development'
  // 生产环境配置
  const isProd = mode === 'production'

  const buildVersion = getBuildVersion()

  // 基础配置
  const config = {
    plugins: [
      vue({
        template: {
          compilerOptions: {
            // 所有以 mdui- 开头的标签名都是 mdui 组件
            isCustomElement: (tag) => tag.startsWith('mdui-'),
          },
        },
      }),
      // vueJsx(),
      vueDevTools(),
      // 构建时写入 theme.json 和 package.json，自动更新版本号
      {
        name: 'write-build-version',
        apply: 'build',
        writeBundle() {
          const fs = require('fs')
          const path = require('path')
          const themePath = path.resolve(__dirname, 'public/theme.json')
          if (fs.existsSync(themePath)) {
            try {
              const raw = fs.readFileSync(themePath, 'utf-8')
              // 检查文件是否损坏（全是空字节等情况）
              if (!raw || raw.charCodeAt(0) === 0) {
                throw new Error('theme.json appears to be corrupted')
              }
              const theme = JSON.parse(raw)
              theme.version = buildVersion
              fs.writeFileSync(themePath, JSON.stringify(theme, null, 2) + '\n')
            } catch (e) {
              console.warn('[write-build-version] theme.json 跳过: ' + e.message)
            }
          }
          const pkgPath = path.resolve(__dirname, 'package.json')
          if (fs.existsSync(pkgPath)) {
            try {
              const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
              pkg.version = buildVersion
              fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
            } catch (e) {
              console.warn('[write-build-version] package.json 跳过: ' + e.message)
            }
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    define: {
      __BUILD_VERSION__: JSON.stringify(buildVersion),
    },
  }

  // 生产环境特定配置
  if (isProd) {
    // config.base = '/themes/MaterialDesignForum-MDUI2/' // 打包 web 专用1
    // 如需打包其他平台，可根据环境变量或模式进行切换
    config.base = './' // 打包 tauri、electron、mobileapp 专用2

    config.build = {
      // cssCodeSplit: false, // 避免样式被拆分
      //去除console.log
      sourcemap: false,

      // outDir: '../MaterialDesignForum-Laravel/public/themes/MaterialDesignForum-MDUI2', // 打包 web 专用3

      // outDir: '../MaterialDesignForum-Server/public/themes/MaterialDesignForum-Vuetify4', // 打包 web 专用
      // outDir: '../MaterialDesignForum-ElectronBuildPack/dist/MaterialDesignForum-Vuetify4', // 打包 electron 专用
    }
  }

  return config
})
