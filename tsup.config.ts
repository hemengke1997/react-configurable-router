import { defineConfig, type Options } from 'tsup'

const commonConfig = (option: Options): Options => {
  return {
    entry: ['./src/**/*.{ts,tsx}'],
    outDir: 'dist',
    clean: false,
    sourcemap: !!option.watch,
    dts: true,
    minify: false,
    external: [/^virtual:.*/, 'react', 'react-dom', 'react-router-dom'],
    treeshake: true,
    splitting: false,
    tsconfig: option.watch ? 'tsconfig.dev.json' : 'tsconfig.json',
  }
}

export default defineConfig((option) => [
  {
    ...commonConfig(option),
    format: ['esm'],
    platform: 'neutral',
  },
  {
    ...commonConfig(option),
    format: ['cjs'],
    platform: 'node',
  },
])
