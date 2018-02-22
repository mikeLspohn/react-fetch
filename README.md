# react-fetch

Fetch api react component with support for function-as-child and render-prop implementations.

### Installation

Using Yarn or NPM

`yarn add @mikelspohn/react-fetch`

or

`npm add --save @mikelspohn/react-fetch`

With Script Tag

  * `git clone https://github.com/mikelspohn/react-fetch.git`
  * `cp ./react-fetch/dist/react-fetch/umd.js path/to/project` // copy umd build to your project
  * `<script src='./react-fetch.umd.js'></script>`

__you can install by specific tag version e.g. @mikelspohn/react-fetch@0.1.0__

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