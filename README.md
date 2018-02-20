# react-fetch

Fetch api react component with support for function-as-child, render-props, component inject and HOC implementations.

### Installation

Using Yarn or NPM

`yarn add @mikelspohn/react-fetch`

or

`npm add --save @mikelspohn/react-fetch`

With Script Tag

  * git clone https://github.com/mikelspohn/react-fetch.git
  * cp ./react-fetch/dist/react-fetch/umd.js path/to/project // copy umd build to your project
  * <script src='./react-fetch.umd.js'></script>

__you can install by specific tag version e.g. @mikelspohn/react-fetch@0.1.0__

### Example Usage

```javascript
import React from 'react'
import Feth from '@mikelspohn/react-fetch'

// example function-as-child usage
export const FetchExample = props => (
  <Fetch url='http://localhost:3001/employees'>
    {
        ({status, data, err}) => {
          switch (status) {
            case 'Initial':
              return null
            case 'Loading':
              return <p>Loading...</p>
            case 'Success':
              return <p>{JSON.stringify(data)}</p>
            case 'Failure':
              return <p style={{color: 'red'}}>Error: {JSON.stringify(err)}</p>
            default:
              return <p>Something went wrong</p>
          }
        }
    }
  </Fetch>
)

// Other Usage passing components for status states
//
// <Fetch
//   url='/employees'
//   config={fetchOptions}
//   loading={Loading}
//   success={EmployeesTable}
//   error={Flash}
// />
```

# Development

To make a rollup build just run `rollup -c` _assuming you have rollup installed_