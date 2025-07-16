import { defineConfig } from 'rolldown'

export default defineConfig([
  {
    input: 'src/index.ts',
    external: ['sweph'],
    output: {
      dir: 'dist',
      format: 'module'
    }
  },
  {
    input: 'src/index.ts',
    external: ['sweph'],
    output: {
      format: 'commonjs',
      file: 'dist/index.cjs'
    }
  }
])
