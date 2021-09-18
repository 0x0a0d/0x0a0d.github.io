import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginHtmlEnv from 'vite-plugin-html-env'
import VitePluginWindicss from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vitePluginHtmlEnv(),
    VitePluginWindicss(),
    reactRefresh(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    }
  }
})
