export function Square({ value, onClick, isWinning, disabled }) {
  const getMarkClass = () => {
    if (value === 'X') return 'x-mark'
    if (value === 'O') return 'o-mark'
    return ''
  }

  return (
    <button
      className={`square-btn ${getMarkClass()} ${isWinning ? 'winning-square' : ''}`}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={value ? `Square contains ${value}` : 'Empty square'}
    >
      {value}
    </button>
  )
}
