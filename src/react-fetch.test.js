import React from 'react'
import Fetch from './react-fetch'
import { shallow } from 'enzyme'

const failureFetch = () => Promise.reject(new Error('something went wrong'))
const successFetch = () => Promise.resolve({json: () => (Promise.resolve('data'))})

describe('function-as-children', () => {
  test('renders with Loading status initially', () => {
    window.fetch = successFetch

    const Wrapper = shallow(
      <Fetch url='/employees' options={{}}>
        {({status}) => <p>{status}</p>}
      </Fetch>
    )

    expect(Wrapper.length).toBe(1)
    expect(Wrapper.state().status).toBe(Fetch.loading)
    expect(Wrapper.html()).toBe('<p>Loading</p>')
  })

  test('Sets status success and data after successful fetch', async () => {
    window.fetch = successFetch

    const Wrapper = await shallow(
      <Fetch url='/employees' options={{}}>
        {({status}) => <p>{status}</p>}
      </Fetch>
    )

    await Wrapper.instance().componentDidMount()

    expect(Wrapper.length).toBe(1)
    expect(Wrapper.state()).toEqual({status: Fetch.success, data: 'data', error: null})
    expect(Wrapper.update().html()).toBe('<p>Success</p>')
  })

  test('Sets status failure and error after failed fetch', async () => {
    window.fetch = failureFetch

    const Wrapper = await shallow(
      <Fetch url='/employees' options={{}}>
        {({status}) => <p>{status}</p>}
      </Fetch>
    )

    try {
      await Wrapper.instance().componentDidMount()
    } catch (err) {
      expect(Wrapper.length).toBe(1)
      expect(Wrapper.state().status).toBe(Fetch.failure)
      expect(Wrapper.state().data).toBe(null)
      expect(Wrapper.state().error.message).toBe('Something went wrong')

      expect(Wrapper.update().html()).toBe('<p>Failure</p>')
    }
  })

  test('refetches if url prop changes', async () => {
    window.fetch = successFetch
    const spy = jest.spyOn(window, 'fetch')

    const Wrapper = await shallow(
      <Fetch url='/employees' options={{}}>
        {({status}) => <p>{status}</p>}
      </Fetch>
    )

    await Wrapper.instance().fetchData()

    expect(Wrapper.state().status).toBe('Success')

    Wrapper.setProps({url: 'something-new'})

    expect(Wrapper.state().status).toBe('Loading')
    expect(spy.mock.calls[2][0]).toBe('something-new')
    spy.mockRestore()
  })
})
