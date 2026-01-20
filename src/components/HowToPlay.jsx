import { useState } from 'react'

export function HowToPlay() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                   hover:scale-105 active:scale-95"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          color: 'var(--text-secondary)'
        }}
      >
        How to Play
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative max-w-md w-full p-6 rounded-2xl shadow-2xl slide-up"
            style={{ backgroundColor: 'var(--bg-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                         rounded-full transition-colors hover:bg-gray-500/20"
              style={{ color: 'var(--text-secondary)' }}
            >
              ✕
            </button>

            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: 'var(--text-primary)' }}
            >
              How to Play
            </h2>

            <div className="space-y-4" style={{ color: 'var(--text-secondary)' }}>
              <div className="flex gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Objective
                  </h3>
                  <p>Get three of your marks in a row (horizontally, vertically, or diagonally) to win!</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Game Modes
                  </h3>
                  <p>
                    <span className="text-pink-500 font-medium">vs Computer:</span> You play as X against the AI.
                    <br />
                    <span className="text-cyan-400 font-medium">2 Players:</span> Take turns with a friend on the same device.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    How to Play
                  </h3>
                  <p>
                    1. Choose a game mode<br />
                    2. Click any empty square to place your mark<br />
                    3. <span className="text-pink-500">X</span> always goes first<br />
                    4. First to get 3 in a row wins!
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-2xl">🔄</span>
                <div>
                  <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Reset
                  </h3>
                  <p>Click "Reset Game" at any time to start over. Your score will be preserved until you exit to the menu.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white
                         font-semibold rounded-xl transition-all duration-200
                         hover:scale-105 active:scale-95"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </>
  )
}
