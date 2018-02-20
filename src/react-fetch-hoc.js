import React from 'react'
import PropTypes from 'prop-types'

// HOC support
export const withData = hocProps => {
    return WrappedComponent => {
      class Fetch extends Component {
        static propTypes = {
          url: PropTypes.string.isRequired,
          fetchOptions: PropTypes.object.isRequired, // @TODO: set shape to correct config shape for warning help
          loading: PropTypes.func,
          failure: PropTypes.func,
          initial: PropTypes.func,
          success: PropTypes.func,
          children: PropTypes.oneOf([PropTypes.func])
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
            window.fetch(url, mergedOptions)
              .then(res => res.json())
              .then(data => this.setState({data, status: 'Success'}))
              .catch(err => this.setState({err, status: 'Failure'}))
          })
        }
      
        render () {
          const { status, data, err } = this.state
          return <WrappedComponent fetchStatus={status} fetchData={data} fetchErr={err} />
        }
      }
  
      return Fetch
    }
  }
  