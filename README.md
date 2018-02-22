[![CircleCI](https://circleci.com/gh/mikeLspohn/react-fetch.svg?style=svg)](https://circleci.com/gh/mikeLspohn/react-fetch)

# react-fetch

Fetch api React component with support for function-as-child and render-prop implementations.

### Installation

Using Yarn or NPM

`yarn add @mikelspohn/react-fetch`

`npm install --save @mikelspohn/react-fetch`

With Script Tag

  * `git clone https://github.com/mikelspohn/react-fetch.git`
  * `cp ./react-fetch/dist/react-fetch/umd.js path/to/project`
  * `<script src='./react-fetch.umd.js'></script>`

### [Examples](https://github.com/mikeLspohn/react-fetch/tree/master/examples)

### docs

```javascript
type fetchConfig = // default fetch options object
type fetchRenderProps t = {
  status: 'Initial' | 'Loading' | 'Success' | 'Failure',
  data: t,
  error: ErrorObject
}

type FetchProps t = {
    url: string,
    options: fetchConfig,
    children: (fetchRenderProps) => React.Element,
    render: (fetchRenderProps) => React.Element
}
```

### Development

To make a rollup build just run `rollup -c` _assuming you have rollup installed_

### TODO

  * Check browser compatability
  * Cancellable requests
  * HOC implementation (?)
  * Optimize build size
  * React doc-gen
