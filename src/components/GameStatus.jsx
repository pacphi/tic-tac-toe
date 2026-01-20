export function GameStatus({ gameStatus, currentPlayer, isAIThinking, gameMode }) {
  const getStatusMessage = () => {
    if (isAIThinking) {
      return (
        <span className="flex items-center gap-2">
          <span className="animate-pulse">Computer is thinking</span>
          <span className="flex gap-1">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </span>
        </span>
      )
    }

    if (gameStatus.status === 'won') {
      const winnerName = gameMode === 'pvc'
        ? (gameStatus.winner === 'X' ? 'You win!' : 'Computer wins!')
        : `Player ${gameStatus.winner} wins!`
      return (
        <span className={`font-bold ${gameStatus.winner === 'X' ? 'text-pink-500' : 'text-cyan-400'}`}>
          {winnerName}
        </span>
      )
    }

    if (gameStatus.status === 'draw') {
      return <span className="text-yellow-500 font-bold">It's a draw!</span>
    }

    const playerName = gameMode === 'pvc'
      ? (currentPlayer === 'X' ? 'Your' : "Computer's")
      : `Player ${currentPlayer}'s`

    return (
      <span>
        {playerName} turn{' '}
        <span className={currentPlayer === 'X' ? 'text-pink-500' : 'text-cyan-400'}>
          ({currentPlayer})
        </span>
      </span>
    )
  }

  return (
    <div
      className="text-xl sm:text-2xl font-medium text-center py-4 min-h-[60px] flex items-center justify-center"
      style={{ color: 'var(--text-primary)' }}
    >
      {getStatusMessage()}
    </div>
  )
}
