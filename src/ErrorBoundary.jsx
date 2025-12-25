import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // You could send this to an analytics endpoint
    console.error('Captured by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:40}}>
          <h2 style={{color:'#f97316'}}>App failed to load</h2>
          <pre style={{whiteSpace:'pre-wrap'}}>{String(this.state.error)}</pre>
          <p>Check the terminal for Vite errors and the browser console for stack traces.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
