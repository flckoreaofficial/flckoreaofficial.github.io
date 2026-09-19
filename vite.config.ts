import { defineConfig } from 'vite';

export default defineConfig({
  // Relative assets work for both username.github.io and username.github.io/repo/.
  base: './',
  build: { target: 'es2022' },
});
