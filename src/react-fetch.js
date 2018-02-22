import { Component } from 'react'
import PropTypes from 'prop-types'

const CompOrFunc = PropTypes.oneOfType([PropTypes.func, PropTypes.node])

// Function as Child/Component Injection Support
export default class Fetch extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired, // @TODO: set shape to correct config shape for warning help
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

  constructor (props) {
    super(props)

    if (typeof props.render !== 'function' && typeof props.children !== 'function') {
      throw Error('`children` or `render` prop passed to `Fetch` must be a function')
    }

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

    return (typeof children === 'function')
      ? children({status, data, error})
      : render({status, data, error})
  }
}
