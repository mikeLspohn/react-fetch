import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'

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
      resolve(), // so Rollup can find `ms`
      commonjs({
        namedExports: {
          './node_modules/react/index.js': ['Component']
        }
      }) // so Rollup can convert `ms` to an ES module
    ]
  },

    // esm/cjs builds
  {
    input: 'src/react-fetch.js',
    external: ['ms'],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve({module: true}),
      commonjs({
        namedExports: {
          './node_modules/react/index.js': ['Component']
        }
      })
    ]
  }
]
