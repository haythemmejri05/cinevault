import { useRef } from 'react'

export function withLogger<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName = WrappedComponent.displayName || WrappedComponent.name || 'Component',
) {
  function WithLogger(props: P) {
    const renderCount = useRef(0)

    renderCount.current += 1

    console.log(`[withLogger] ${componentName} rendered ${renderCount.current} time(s)`)

    return <WrappedComponent {...props} />
  }

  WithLogger.displayName = `withLogger(${componentName})`

  return WithLogger
}
