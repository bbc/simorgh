import { Component, ErrorInfo, ReactNode } from 'react';
import nodeLogger from '#lib/logger.node';
import { CLIENT_COMPONENT_RENDER_ERROR } from '#lib/logger.const';

const logger = nodeLogger(__filename);

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Class component required: React has no hook-based equivalent of getDerivedStateFromError/componentDidCatch.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
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
    const { hasError } = this.state;
    const { children, fallback = null } = this.props;

    return hasError ? fallback : children;
  }
}

export default ErrorBoundary;
