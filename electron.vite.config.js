import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import renderConfig from "./src/renderer/vite.config.js"

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: renderConfig
})
