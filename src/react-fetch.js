import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Fetch extends Component {
    static propTypes = {
      url: PropTypes.string.isRequired,
      fetchOptions: PropTypes.object.isRequired, // @TODO: set shape to correct config shape for warning help
      loading: PropTypes.func,
      failure: PropTypes.func,
      initial: PropTypes.func,
      success: PropTypes.func
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
  
    constructor () {
      super()
      this.state = {
        data: null,
        err: null,
        status: 'Initial' // 'Initial' | 'Loading' | 'Success' | 'Failure'
      }
    }
  
    componentDidMount () {
      const { url, fetchOptions } = this.props
      const mergedOptions = {...Fetch.defaultOptions, ...fetchOptions}
  
      this.setState({status: 'Loading'}, () => {
        fetch(url, mergedOptions)
          .then(res => res.json())
          .then(data => this.setState({data, status: 'Success'}))
          .catch(err => this.setState({err, status: 'Failure'}))
      })
    }
  
    render () {
      const { status, data, err } = this.state

      // function-as-child support
      if (typeof this.props.children === 'function') {
        return this.props.children({status, data, err})
      }
  
      // @TODO: Add render-prop support
      // @TODO: Add HOC support

      // Component Injection Support
      const { loading, failure, initial, success } = this.props
      const Initial = initial
      const Success = success
      const Failure = failure
      const Loading = Loading
  
      switch (status) {
        case 'Initial':
          return <Initial />
        case 'Loading':
          return <Loading />
        case 'Success':
          return <Success data={data} />
        case 'Failure':
          return <Failure error={err} />
        default:
          return <Failure error='something went wrong' />
      }
    }
  }