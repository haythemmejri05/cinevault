type StarRatingProps = {
  value: number
  max?: number
  disabled?: boolean
  onRate: (score: number) => void
}

export function StarRating({ value, max = 5, disabled = false, onRate }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, index) => {
        const score = index + 1
        const isActive = score <= value

        return (
          <button
            key={score}
            type="button"
            disabled={disabled}
            onClick={() => onRate(score)}
            className={[
              'text-xl transition-colors',
              isActive ? 'text-yellow-400' : 'text-gray-300',
              disabled ? 'cursor-not-allowed opacity-60' : 'hover:text-yellow-400',
            ].join(' ')}
            aria-label={`Rate ${score} out of ${max}`}
          >
            ★
          </button>
        )
      })}
    </div>
  )
}
