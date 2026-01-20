import { useTranslation } from 'react-i18next'
import { useGame } from './hooks/useGame'
import { Board } from './components/Board'
import { GameStatus } from './components/GameStatus'
import { GameControls } from './components/GameControls'
import { ModeSelector } from './components/ModeSelector'
import { ScoreBoard } from './components/ScoreBoard'
import { HowToPlay } from './components/HowToPlay'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageSwitcher } from './components/LanguageSwitcher'

function App() {
  const { t } = useTranslation('common')
  const {
    board,
    currentPlayer,
    gameMode,
    gameStatus,
    scores,
    isAIThinking,
    handleSquareClick,
    resetGame,
    startGame,
    exitToMenu,
  } = useGame()

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Header */}
      <header
        className="py-4 px-6 flex justify-between items-center border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          <span className="text-pink-500">Tic</span>
          <span className="text-gray-400">-</span>
          <span className="text-cyan-400">Tac</span>
          <span className="text-gray-400">-</span>
          <span className="text-indigo-500">Toe</span>
        </h1>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <HowToPlay />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          {!gameMode ? (
            <ModeSelector onSelectMode={startGame} />
          ) : (
            <div className="slide-up">
              {/* Score Board */}
              <ScoreBoard scores={scores} gameMode={gameMode} />

              {/* Game Status */}
              <GameStatus
                gameStatus={gameStatus}
                currentPlayer={currentPlayer}
                isAIThinking={isAIThinking}
                gameMode={gameMode}
              />

              {/* Game Board */}
              <div className="flex justify-center">
                <Board
                  board={board}
                  onSquareClick={handleSquareClick}
                  winningLine={gameStatus.winningLine}
                  disabled={gameStatus.status !== 'playing' || isAIThinking}
                />
              </div>

              {/* Game Controls */}
              <GameControls
                onReset={resetGame}
                onExit={exitToMenu}
                gameStatus={gameStatus}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-4 text-center text-sm border-t"
        style={{
          borderColor: 'var(--border-color)',
          color: 'var(--text-secondary)'
        }}
      >
        {t('builtWith')}
      </footer>
    </div>
  )
}

export default App
