import { Component } from 'react';

class ErrorPage extends Component {
  state = {
    error: false,
    message: '',
  };

  componentDidCatch(error, info) {
    this.setState({ error: true, message: error.message });
    console.log('error', error, 'info', info);
  }

  render() {
    const { children } = this.props;

    return this.error ? <h1>에러</h1> : children;
  }
}

export default ErrorPage;
