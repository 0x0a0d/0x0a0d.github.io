import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import vitePluginHtmlEnv from 'vite-plugin-html-env'
import VitePluginWindicss from 'vite-plugin-windicss'
import { dependencies } from './package.json'

const reactDeps = Object.keys(dependencies).filter(key => key === 'react' || key.startsWith('react-'))

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [
    vitePluginHtmlEnv(),
    VitePluginWindicss(),
    reactRefresh(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    }
  },
  build: {
    outDir: 'master',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: reactDeps,
          ...Object.keys(dependencies).reduce((chunks, name) => {
            if (!reactDeps.includes(name)) {
              chunks[name] = [name]
            }
            return chunks
          }, {}),
        },
      },
    },
  }
})
