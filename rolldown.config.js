import { defineConfig } from 'rolldown'

export default defineConfig([
  {
    input: 'src/index.ts',
    external: ['swisseph'],
    output: {
      dir: 'dist',
      format: 'module'
    }
  },
  {
    input: 'src/index.ts',
    external: ['swisseph'],
    output: {
      format: 'commonjs',
      file: 'dist/index.cjs'
    }
  }
])
