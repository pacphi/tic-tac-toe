export function ModeSelector({ onSelectMode }) {
  return (
    <div className="slide-up">
      <h2
        className="text-2xl sm:text-3xl font-bold text-center mb-8"
        style={{ color: 'var(--text-primary)' }}
      >
        Choose Game Mode
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => onSelectMode('pvc')}
          className="group px-8 py-6 rounded-2xl transition-all duration-300
                     hover:scale-105 active:scale-95 border-2
                     hover:border-pink-500 hover:shadow-xl hover:shadow-pink-500/20"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="text-4xl mb-3">🤖</div>
          <div
            className="text-xl font-bold mb-1 group-hover:text-pink-500 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            vs Computer
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Challenge the AI
          </div>
        </button>

        <button
          onClick={() => onSelectMode('pvp')}
          className="group px-8 py-6 rounded-2xl transition-all duration-300
                     hover:scale-105 active:scale-95 border-2
                     hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-400/20"
          style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)'
          }}
        >
          <div className="text-4xl mb-3">👥</div>
          <div
            className="text-xl font-bold mb-1 group-hover:text-cyan-400 transition-colors"
            style={{ color: 'var(--text-primary)' }}
          >
            2 Players
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Play with a friend
          </div>
        </button>
      </div>
    </div>
  )
}
