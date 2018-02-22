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

### docs

PropTypes:
  * url - string
  * options - object (same as regular `fetch` 2nd param config object)
  * render - function component (receives props and passes to rendered child)
  * children - dom node or function component

Props passed to function child/render from Fetch:
  * status - Fetch.initial | Fetch.loading | Fetch.success | Fetch.failure
  * data - object (data from successful fetch call)
  * error - object (error object from failed fetch call)


### Development

To make a rollup build just run `rollup -c` _assuming you have rollup installed_

### TODO

  * Check browser compatability
  * Cancellable requests
  * HOC implementation (?)
  * Optimize build size
  * React doc-gen