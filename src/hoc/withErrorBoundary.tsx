import { Component, type ComponentType, type ErrorInfo, type ReactNode } from 'react'

type FallbackComponentProps = {
  error: Error
  resetErrorBoundary: () => void
}

type ErrorBoundaryProps = {
  children: ReactNode
  FallbackComponent: ComponentType<FallbackComponentProps>
}

type ErrorBoundaryState = {
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    error: null,
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary]', error)
    console.error('[ErrorBoundary info]', errorInfo)
  }

  resetErrorBoundary = () => {
    this.setState({
      error: null,
    })
  }

  render() {
    const { error } = this.state
    const { children, FallbackComponent } = this.props

    if (error) {
      return <FallbackComponent error={error} resetErrorBoundary={this.resetErrorBoundary} />
    }

    return children
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: ComponentType<P>,
  FallbackComponent: ComponentType<FallbackComponentProps>,
) {
  const componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary FallbackComponent={FallbackComponent}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    )
  }

  WithErrorBoundary.displayName = `withErrorBoundary(${componentName})`

  return WithErrorBoundary
}
