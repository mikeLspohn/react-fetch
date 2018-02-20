import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'

const namedExports = {
  './node_modules/react/index.js': ['Component']
}

export default [
  // browser-friendly UMD build
  {
    input: 'src/react-fetch.js',
    output: {
      name: 'react-fetch',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      commonjs({ namedExports })
    ]
  },

  {
    input: 'src/react-fetch-hoc.js',
    output: {
      name: 'hoc',
      file: 'dist/hoc.umd.js',
      format: 'umd'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      commonjs({ namedExports })
    ]
  },

  // esm/cjs builds
  {
    input: 'src/react-fetch.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve({module: true}),
      commonjs({ namedExports })
    ]
  },

  // esm/cjs builds
  {
    input: 'src/react-fetch-hoc.js',
    output: [
      { file: 'dist/hoc.cjs.js', format: 'cjs' },
      { file: 'dist/hoc.esm.js', format: 'es' }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve({module: true}),
      commonjs({ namedExports })
    ]
  }
]
