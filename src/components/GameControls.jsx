export function GameControls({ onReset, onExit, gameStatus }) {
  return (
    <div className="flex gap-3 justify-center mt-4">
      <button
        onClick={onReset}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl
                   transition-all duration-200 hover:scale-105 active:scale-95
                   shadow-lg hover:shadow-indigo-500/30"
      >
        {gameStatus.status === 'playing' ? 'Reset Game' : 'Play Again'}
      </button>
      <button
        onClick={onExit}
        className="px-6 py-3 font-semibold rounded-xl
                   transition-all duration-200 hover:scale-105 active:scale-95
                   border-2"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-primary)',
          backgroundColor: 'var(--bg-secondary)'
        }}
      >
        Exit to Menu
      </button>
    </div>
  )
}
