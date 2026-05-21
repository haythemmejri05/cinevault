import { forwardRef, useImperativeHandle, useRef, type FormEvent } from 'react'
import { Button, Input } from '@/components/shared'

export type SearchInputHandle = {
  focus: () => void
  clear: () => void
}

type SearchInputProps = {
  placeholder?: string
  defaultValue?: string
  onSearch: (value: string) => void
  onClear?: () => void
}

export const SearchInput = forwardRef<SearchInputHandle, SearchInputProps>(
  ({ placeholder = 'Search movies...', defaultValue = '', onSearch, onClear }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus()
      },
      clear() {
        if (inputRef.current) {
          inputRef.current.value = ''
        }

        onClear?.()
      },
    }))

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()

      onSearch(inputRef.current?.value.trim() ?? '')
    }

    function handleClear() {
      if (inputRef.current) {
        inputRef.current.value = ''
        inputRef.current.focus()
      }

      onClear?.()
    }

    return (
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <Input ref={inputRef} type="search" defaultValue={defaultValue} placeholder={placeholder} />

        <Button type="submit">Search</Button>

        <Button type="button" variant="ghost" onClick={handleClear}>
          Clear
        </Button>
      </form>
    )
  },
)

SearchInput.displayName = 'SearchInput'
