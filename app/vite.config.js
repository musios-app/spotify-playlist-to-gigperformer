import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../tool'
  },
  base: '/projects/spotify-playlist-to-gigperformer/tool'
})
