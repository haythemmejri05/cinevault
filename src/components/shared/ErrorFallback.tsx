import { Button } from './Button'

type ErrorFallbackProps = {
  error?: Error
  message?: string
  onRetry?: () => void
  resetErrorBoundary?: () => void
}

export function ErrorFallback({
  error,
  message = 'Something went wrong.',
  onRetry,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  const handleRetry = resetErrorBoundary ?? onRetry

  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-900">
      <h2 className="text-base font-semibold">Error</h2>

      <p className="mt-1 text-sm">{error?.message || message}</p>

      {handleRetry && (
        <div className="mt-4">
          <Button variant="primary" onClick={handleRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  )
}
