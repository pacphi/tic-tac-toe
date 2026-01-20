export function ScoreBoard({ scores, gameMode }) {
  const player1Label = gameMode === 'pvc' ? 'You' : 'Player X'
  const player2Label = gameMode === 'pvc' ? 'Computer' : 'Player O'

  return (
    <div
      className="flex justify-center gap-6 sm:gap-10 py-4 px-6 rounded-xl mb-4"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="text-center">
        <div className="text-pink-500 font-bold text-lg sm:text-xl">{player1Label}</div>
        <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {scores.x}
        </div>
      </div>
      <div className="text-center">
        <div className="font-bold text-lg sm:text-xl" style={{ color: 'var(--text-secondary)' }}>
          Draws
        </div>
        <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {scores.draws}
        </div>
      </div>
      <div className="text-center">
        <div className="text-cyan-400 font-bold text-lg sm:text-xl">{player2Label}</div>
        <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          {scores.o}
        </div>
      </div>
    </div>
  )
}
