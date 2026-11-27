import { useState, useCallback, useEffect } from 'react'
import { getGameStatus, getAIMove } from '../utils/ai'

const INITIAL_BOARD = Array(9).fill(null)
const IDLE_STATUS = { status: 'idle', winner: null, winningLine: null }
const INITIAL_SCORES = { x: 0, o: 0, draws: 0 }
const AI_DELAY_MS = 500

export function useGame() {
  const [board, setBoard] = useState(INITIAL_BOARD)
  const [isXNext, setIsXNext] = useState(true)
  const [gameMode, setGameMode] = useState(null) // 'pvp' | 'pvc'
  const [scores, setScores] = useState(INITIAL_SCORES)

  // Derived state: recomputed from the board on every render, never stored
  const gameStatus = gameMode ? getGameStatus(board) : IDLE_STATUS
  const isPlaying = gameStatus.status === 'playing'
  const isAIThinking = gameMode === 'pvc' && !isXNext && isPlaying

  // Place a mark and, if that ends the game, record the result once
  const applyMove = useCallback((currentBoard, index, mark) => {
    const newBoard = [...currentBoard]
    newBoard[index] = mark
    setBoard(newBoard)

    const status = getGameStatus(newBoard)
    if (status.status === 'won') {
      const key = status.winner.toLowerCase()
      setScores(prev => ({ ...prev, [key]: prev[key] + 1 }))
    } else if (status.status === 'draw') {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
    }
  }, [])

  // Computer's turn: answer after a short delay for better UX.
  // The cleanup cancels a pending move on reset, exit or unmount.
  useEffect(() => {
    if (!isAIThinking) return

    const timer = setTimeout(() => {
      const aiMove = getAIMove(board)
      if (aiMove !== null) {
        applyMove(board, aiMove, 'O')
        setIsXNext(true)
      }
    }, AI_DELAY_MS)

    return () => clearTimeout(timer)
  }, [isAIThinking, board, applyMove])

  const handleSquareClick = useCallback((index) => {
    // Prevent moves if game is over, square is taken, or it's the computer's turn
    if (!isPlaying || board[index] !== null || isAIThinking) {
      return
    }

    applyMove(board, index, isXNext ? 'X' : 'O')
    setIsXNext(prev => !prev)
  }, [board, isXNext, isPlaying, isAIThinking, applyMove])

  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD)
    setIsXNext(true)
  }, [])

  const startGame = useCallback((mode) => {
    setGameMode(mode)
    setBoard(INITIAL_BOARD)
    setIsXNext(true)
    setScores(INITIAL_SCORES)
  }, [])

  const exitToMenu = useCallback(() => {
    setGameMode(null)
    setBoard(INITIAL_BOARD)
    setIsXNext(true)
  }, [])

  const currentPlayer = isXNext ? 'X' : 'O'

  return {
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
  }
}
