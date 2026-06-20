import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['cjs'],
  outDir: 'dist',
  noExternal: [/^(?!node:)/],
})
