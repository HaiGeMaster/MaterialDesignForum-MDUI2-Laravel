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

export default defineConfig(({ mode }) => {
  // 开发环境配置
  const isDev = mode === 'development'
  // 生产环境配置
  const isProd = mode === 'production'

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
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }

  // 生产环境特定配置
  if (isProd) {
    config.base = '/themes/MaterialDesignForum-MDUI2/' // 打包 web 专用1
    // 如需打包其他平台，可根据环境变量或模式进行切换
    // config.base = './'; // 打包 tauri、electron、mobileapp 专用2

    config.build = {
      // cssCodeSplit: false, // 避免样式被拆分
      //去除console.log
      sourcemap: false,

      outDir: '../MaterialDesignForum-Laravel/public/themes/MaterialDesignForum-MDUI2', // 打包 web 专用3

      // outDir: '../MaterialDesignForum-Server/public/themes/MaterialDesignForum-Vuetify4', // 打包 web 专用
      // outDir: '../MaterialDesignForum-ElectronBuildPack/dist/MaterialDesignForum-Vuetify4', // 打包 electron 专用
    }
  }

  return config
})
