import { Square } from './Square'

export function Board({ board, onSquareClick, winningLine, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 p-4 fade-in">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          isWinning={winningLine?.includes(index)}
          disabled={disabled}
        />
      ))}
    </div>
  )
}
