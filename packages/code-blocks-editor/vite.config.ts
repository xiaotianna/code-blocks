import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import { visualizer } from 'rollup-plugin-visualizer'
import externalGlobals from 'rollup-plugin-external-globals'
import importCDNPlugin from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    // visualizer({
    //   emitFile: false,
    //   open: true,
    //   filename: 'stats.html', //分析图生成的文件名
    //   gzipSize: true, // 收集 gzip 大小并将其显示
    //   brotliSize: true // 收集 brotli 大小并将其显示
    // }),
    importCDNPlugin({
      modules: [
        {
          name: 'highlight.js',
          var: 'hljs',
          path: 'https://cdn.bootcdn.net/ajax/libs/highlight.js/11.10.0/highlight.min.js'
        }
      ]
    })
  ],
  build: {
    minify: 'terser',
    rollupOptions: {
      external: ['highlight.js'],
      plugins: [
        externalGlobals({
          'highlight.js': 'hljs'
        })
      ],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return extractPackageName(id)
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})

// 从路径中提取包名
function extractPackageName(id: string): string {
  // 检查是否包含 .pnpm
  if (id.includes('.pnpm')) {
    const pnpmMatch = id.match(/\.pnpm\/([^/@]+)/)
    if (pnpmMatch && pnpmMatch[1]) {
      return pnpmMatch[1]
    }
  }

  // 对于其他包管理工具（如 npm 或 yarn）
  const nodeModulesMatch = id.match(/node_modules\/([^/@]+)/)
  if (nodeModulesMatch && nodeModulesMatch[1]) {
    return nodeModulesMatch[1]
  }

  return 'vendor'
}
