```javascript
type renderProps = {
  status: 'Initial' | 'Loading' | 'Success' | 'Failure',
  data: t,
  error: ErrorObject
}

type props = {
  url: string,
  options: object, // window.fetch request options object
  children: (renderProps) : React.Node
  render: (renderProps) : React.Node
}

class Fetch extends Component<props, renderProps>
```