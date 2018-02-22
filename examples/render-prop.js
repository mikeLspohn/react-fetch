import React from 'react'
import Fetch from 'react-fetch'

const Item = props => <Fetch
  url='/employees'
  render={({status, data, error}) => <p>{status}</p>}
/>