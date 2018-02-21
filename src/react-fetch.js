import React, { Component } from 'react'
import PropTypes from 'prop-types'

const CompOrFunc = PropTypes.oneOfType([PropTypes.func, PropTypes.node])

// Function as Child/Component Injection Support
export default class Fetch extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired, // @TODO: set shape to correct config shape for warning help
    loading: CompOrFunc, // Component, Should be node probably?
    failure: CompOrFunc,
    initial: CompOrFunc,
    success: CompOrFunc,
    children: CompOrFunc,
    render: PropTypes.func
  }

  static defaultProps = {
    options: Fetch.defaultOptions
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
  static failure = 'Failure'

  constructor () {
    super()
    this.state = {
      data: null,
      error: null,
      status: Fetch.initial // one of Fetch.statusType
    }

    this.fetchData = this.fetchData.bind(this)
    this.getOptions = this.getOptions.bind(this)
  }

  componentDidMount () {
    this.fetchData(this.props.url)
  }

  componentDidUpdate (prevProps, prevState) {
    const { url } = this.props
    if (prevProps.url !== url) {
      this.fetchData(url, this.getOptions())
    }
  }

  getOptions () {
    return {...Fetch.defaultOptions, ...this.props.options}
  }

  fetchData (url) {
    this.setState({status: Fetch.loading}, () => {
      window.fetch(url, this.getOptions())
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
