import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    // Añade esto para manejar problemas de dependencias ESM
    server: {
      deps: {
        inline: [/@exodus\/bytes/]
      }
    }
  },
});