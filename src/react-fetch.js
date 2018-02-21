import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Function as Child/Component Injection Support
export default class Fetch extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    fetchOptions: PropTypes.object.isRequired, // @TODO: set shape to correct config shape for warning help
    loading: PropTypes.func,
    failure: PropTypes.func,
    initial: PropTypes.func,
    success: PropTypes.func,
    children: PropTypes.oneOf([PropTypes.func, PropTypes.node]),
    render: PropTypes.func
  }

  static defaultProps = {
    fetchOptions: Fetch.defaultOptions
  }

  static defaultOptions = {
    method: 'get',
    headers: {
      'content-type': 'application/json'
    }
  }

  static initial = 'Initial'
  static loading = 'Loading'
  static success = 'Success'
  static failure = 'failure'

  constructor () {
    super()
    this.state = {
      data: null,
      error: null,
      status: Fetch.initial // one of Fetch.statusType
    }
  }

  componentDidMount () {
    const { url, fetchOptions } = this.props
    const mergedOptions = {...Fetch.defaultOptions, ...fetchOptions}

    this.setState({status: Fetch.loading}, () => {
      window.fetch(url, mergedOptions)
        .then(res => res.json())
        .then(data => this.setState({data, status: Fetch.success}))
        .catch(error => this.setState({error, status: Fetch.failure}))
    })
  }

  render () {
    const { status, data, error } = this.state
    const { children, render } = this.props

    // function-as-child support
    if (typeof children === 'function') {
      return children({status, data, error})
    }

    // @TODO: Add render-prop support
    if (render && typeof render !== 'function') {
      throw Error('Render must be a function. (Hint - render-prop!)')
    }

    if (render) {
      return render({status, data, error})
    }

    // Component Injection Support
    const { loading, failure, initial, success } = this.props
    const Initial = initial
    const Success = success
    const Failure = failure
    const Loading = loading

    switch (status) {
      case 'Initial':
        return <Initial />
      case 'Loading':
        return <Loading />
      case 'Success':
        return <Success data={data} />
      case 'Failure':
        return <Failure error={error} />
      default:
        return <Failure error='something went wrong' />
    }
  }
}
