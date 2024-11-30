/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { resolve } from 'path'
// vue3
import vue from '@vitejs/plugin-vue'
// vue2
import { createVuePlugin } from 'vite-plugin-vue2'
// vue-demi判断vue版本
import { isVue2, isVue3 } from 'vue-demi'
// 打包后生成d.ts文件（只对于vue3才生成）
import dts from 'vite-plugin-dts'

const name = isVue2 ? 'vue2' : 'vue3'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    isVue2 ? createVuePlugin() : vue(),
    isVue3 && dts({ tsconfigPath: './tsconfig.app.json' })
  ],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  build: {
    outDir: `dist/${name}`,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'code-blocks-ui',
      fileName: 'code-blocks-ui'
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'], // 排除宿主依赖
      output: {
        globals: {
          // 别名，在umd模式下，将自动添加到全局变量中
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      // 配置 mixin.scss 混合文件的全局引入
      scss: {
        additionalData: `@import "@/assets/styles/index.scss";`,
        api: 'modern-compiler'
      }
    }
  },
  // vitest配置
  test: {
    // 如果不在浏览器中运行，则指定运行环境(默认值: node)
    environment: 'jsdom',
    coverage: {
      include: ['src/components/**/*'], // 哪些文件需要做覆盖率测试
      exclude: ['src/**/schame.ts'] // 排除哪些文件
    }
  }
})
