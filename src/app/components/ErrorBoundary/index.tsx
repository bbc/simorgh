import { Component, ErrorInfo, ReactNode } from 'react';
import nodeLogger from '#lib/logger.node';
import { CLIENT_COMPONENT_RENDER_ERROR } from '#lib/logger.const';

const logger = nodeLogger(__filename);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
  componentName: string;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { componentName } = this.props;
    logger.error(CLIENT_COMPONENT_RENDER_ERROR, {
      componentName,
      error: error.message,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      return fallback ? fallback(error) : null;
    }

    return children;
  }
}

export default ErrorBoundary;
