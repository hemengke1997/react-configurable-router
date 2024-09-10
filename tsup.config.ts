import { defineConfig, type Options } from 'tsup'
import { bundleless } from 'tsup-plugin-bundleless'

const commonConfig = (option: Options): Options => {
  return {
    entry: ['./src/**/*.{ts,tsx}'],
    outDir: 'dist',
    clean: false,
    sourcemap: !!option.watch,
    dts: true,
    minify: false,
    external: [/^virtual:.*/, 'react', 'react-dom', 'react-router-dom'],
    shims: true,
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
    outExtension: () => ({ js: '.js' }),
    plugins: [bundleless({ ext: '.js' })],
  },
  {
    ...commonConfig(option),
    format: ['cjs'],
    platform: 'node',
    outExtension: () => ({ js: '.cjs' }),
    plugins: [bundleless({ ext: '.cjs' })],
  },
])
