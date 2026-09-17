import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base keeps the build working on GitHub Pages
// both at user.github.io/<repo>/ and at a custom domain root.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { outDir: 'dist', assetsDir: 'assets' }
})
