# react-fetch

Fetch api react component with support for function-as-child, render-props, component inject and HOC implementations.

### Installation

`yarn add @mikelspohn/react-fetch`
// or using npm
`npm add --save @mikelspohn/react-fetch`

__can install by specific tag version e.g. @mikelspohn/react-fetch@0.1.0__

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