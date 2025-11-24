import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@emotion/react", "@emotion/styled"],
  },
  resolve: {
    dedupe: ["@emotion/react", "@emotion/styled"],
    alias: {
      "@emotion/react": path.resolve(__dirname, "node_modules/@emotion/react"),
      "@emotion/styled": path.resolve(__dirname, "node_modules/@emotion/styled"),
    },
  },
})
