import React from 'react'
import Feth from '@mikelspohn/react-fetch'

export const FetchExample = props => (
  <Fetch url='http://localhost:3001/employees'>
    {
        ({status, data, error}) => {
          switch (status) {
            case 'Initial':
              return null
            case 'Loading':
              return <p>Loading...</p>
            case 'Success':
              return <p>{JSON.stringify(data)}</p>
            case 'Failure':
              return <p style={{color: 'red'}}>Error: {JSON.stringify(error)}</p>
            default:
              return <p>Something went wrong</p>
          }
        }
    }
  </Fetch>
)