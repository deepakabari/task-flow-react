import { useEffect, useState } from "react"

function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const results = await fetchFn()
        setData(results)
      } catch (err) {
        console.error("Error fetching data", err)
        setError(err instanceof Error ? err.message : "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()

    // Intentionally omitting fetchFn from deps — this hook only fetches once on mount.
    // Caller must pass a stable function reference (e.g. a top-level import),
    // not an inline arrow function, or this won't refetch as expected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, isLoading, error }
}

export default useFetch
