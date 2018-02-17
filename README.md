# react-fetch

Fetch api react component with support for function-as-child, render-props, component inject and HOC implementations.

Example Usage:

```javascript
import React from 'react'
import Fetch from './Fetch'

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