import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// Le build TypeScript est vérifié par `tsc -b` avant `vite build`.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Alias « @ » : même convention que shadcn/ui (import { cn } from '@/lib/utils')
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom']


        }
      }
    }
  }
});
