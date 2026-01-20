import { useTranslation } from 'react-i18next'

export function GameStatus({ gameStatus, currentPlayer, isAIThinking, gameMode }) {
  const { t } = useTranslation('game')

  const getStatusMessage = () => {
    if (isAIThinking) {
      return (
        <span className="flex items-center gap-2">
          <span className="animate-pulse">{t('computerThinking')}</span>
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
        ? (gameStatus.winner === 'X' ? t('youWin') : t('computerWins'))
        : t('playerWins', { player: gameStatus.winner })
      return (
        <span className={`font-bold ${gameStatus.winner === 'X' ? 'text-pink-500' : 'text-cyan-400'}`}>
          {winnerName}
        </span>
      )
    }

    if (gameStatus.status === 'draw') {
      return <span className="text-yellow-500 font-bold">{t('itsADraw')}</span>
    }

    const turnMessage = gameMode === 'pvc'
      ? (currentPlayer === 'X' ? t('yourTurn') : t('computersTurn'))
      : t('playerTurn', { player: currentPlayer })

    return (
      <span>
        {turnMessage}{' '}
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
