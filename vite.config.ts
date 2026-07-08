import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' 讓資產以相對路徑載入，配合 HashRouter 可直接部署於
// GitHub Pages 子路徑（https://<user>.github.io/study-in-germany/）
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  define: {
    __APP_VERSION__: JSON.stringify(
      new Date().toISOString().slice(0, 10) + '-' +
      (process.env.GITHUB_SHA?.slice(0, 7) ?? 'local')
    ),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      output: {
        // Vite 8（Rolldown）僅支援函式形式的 manualChunks（物件形式型別已移除）
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('@supabase')) return 'supabase-vendor';
          if (id.includes('react')) return 'react-vendor';
          return undefined;
        },
      },
    },
  },
})
