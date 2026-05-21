import { useEffect, useState } from 'react'

function readLocalStorageValue<T>(key: string, initialValue: T): T {
  try {
    const storedValue = window.localStorage.getItem(key)

    if (storedValue === null) {
      return initialValue
    }

    return JSON.parse(storedValue) as T
  } catch {
    return initialValue
  }
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => readLocalStorageValue(key, initialValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Ignore localStorage write errors
    }
  }, [key, value])

  useEffect(() => {
    function handleStorageChange(event: StorageEvent) {
      if (event.key !== key || event.newValue === null) {
        return
      }

      try {
        setValue(JSON.parse(event.newValue) as T)
      } catch {
        setValue(initialValue)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [key, initialValue])

  return [value, setValue]
}
