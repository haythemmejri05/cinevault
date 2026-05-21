import { useEffect, useState } from 'react'

type UseFetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useFetch<T>(fetchFn: (signal: AbortSignal) => Promise<T>): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function loadData() {
      try {
        setLoading(true)
        setError(null)

        const result = await fetchFn(controller.signal)

        if (!controller.signal.aborted) {
          setData(result)
        }
      } catch (err) {
        if (controller.signal.aborted) {
          return
        }

        setError(err instanceof Error ? err.message : 'Something went wrong')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      controller.abort()
    }
  }, [fetchFn])

  return {
    data,
    loading,
    error,
  }
}
