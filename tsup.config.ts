import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/main.tsx"],
  sourcemap: false,
  minify: true,
  dts: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],                     
  format: ["esm", "cjs"],
  splitting: false,
});