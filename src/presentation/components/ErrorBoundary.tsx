import React from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from '../types/error.types';

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-box">
          <h2>Something went wrong.</h2>
          <p>{this.state.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
