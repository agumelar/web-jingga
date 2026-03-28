import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://smkn1rongga.sch.id',
  srcDir: './src',
  publicDir: './public',
  output: 'static',
  build: {
    format: 'file'
  },
  integrations: [],
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
