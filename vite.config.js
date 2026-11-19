import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Configuration Vite (le build TypeScript est vérifié par `tsc -b` avant `vite build`).

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'],
          react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom']
        }
      }
    }
  }
});
