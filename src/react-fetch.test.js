import React from 'react'
import Fetch from './react-fetch'
import { shallow } from 'enzyme'

test('Adds stuff', () => {
  const Wrapper = shallow(<Fetch url='/employees' options={{}} />)
  expect(Wrapper.length).toBe(1)
})
