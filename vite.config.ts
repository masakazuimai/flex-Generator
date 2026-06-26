import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/generator/flex/',
  build: {
    rollupOptions: {
      input: {
        // 日本語ページ（/generator/flex/）と英語ページ（/generator/flex/en/）
        main: resolve(__dirname, 'index.html'),
        en: resolve(__dirname, 'en/index.html'),
        // 使い方・FAQ ページ（ツールTOPから分離）
        howto: resolve(__dirname, 'howto.html'),
        howtoEn: resolve(__dirname, 'en/howto.html')
      }
    }
  }
})
