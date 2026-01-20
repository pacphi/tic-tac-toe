import { useState, useCallback, useEffect, useRef } from 'react'
import { getGameStatus, getAIMove } from '../utils/ai'

const INITIAL_BOARD = Array(9).fill(null)

export function useGame() {
  const [board, setBoard] = useState(INITIAL_BOARD)
  const [isXNext, setIsXNext] = useState(true)
  const [gameMode, setGameMode] = useState(null) // 'pvp' | 'pvc'
  const [gameStatus, setGameStatus] = useState({ status: 'idle', winner: null, winningLine: null })
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 })
  const [isAIThinking, setIsAIThinking] = useState(false)
  const isAIThinkingRef = useRef(false)

  // Update game status whenever board changes
  useEffect(() => {
    if (gameMode) {
      const status = getGameStatus(board)
      setGameStatus(status)

      // Update scores when game ends
      if (status.status === 'won') {
        setScores(prev => ({
          ...prev,
          [status.winner.toLowerCase()]: prev[status.winner.toLowerCase()] + 1
        }))
      } else if (status.status === 'draw') {
        setScores(prev => ({ ...prev, draws: prev.draws + 1 }))
      }
    }
  }, [board, gameMode])

  // AI move effect - use ref to track thinking state to avoid re-triggering
  useEffect(() => {
    // Check conditions for AI move
    if (gameMode !== 'pvc' || isXNext) {
      return
    }

    // Use ref to prevent duplicate execution
    if (isAIThinkingRef.current) {
      return
    }

    // Compute game status inline to avoid dependency on stale state
    const currentStatus = getGameStatus(board)
    if (currentStatus.status !== 'playing') {
      return
    }

    isAIThinkingRef.current = true
    setIsAIThinking(true)

    // Add slight delay for better UX
    const timer = setTimeout(() => {
      const aiMove = getAIMove(board)
      if (aiMove !== null) {
        setBoard(prev => {
          const newBoard = [...prev]
          newBoard[aiMove] = 'O'
          return newBoard
        })
        setIsXNext(true)
      }
      isAIThinkingRef.current = false
      setIsAIThinking(false)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [gameMode, isXNext, board])

  const handleSquareClick = useCallback((index) => {
    // Prevent moves if game is over, square is taken, or AI is thinking
    const currentStatus = getGameStatus(board)
    if (
      currentStatus.status !== 'playing' ||
      board[index] !== null ||
      isAIThinkingRef.current ||
      (gameMode === 'pvc' && !isXNext)
    ) {
      return
    }

    setBoard(prev => {
      const newBoard = [...prev]
      newBoard[index] = isXNext ? 'X' : 'O'
      return newBoard
    })
    setIsXNext(prev => !prev)
  }, [board, isXNext, gameMode])

  const resetGame = useCallback(() => {
    isAIThinkingRef.current = false
    setBoard(INITIAL_BOARD)
    setIsXNext(true)
    setGameStatus({ status: 'playing', winner: null, winningLine: null })
    setIsAIThinking(false)
  }, [])

  const startGame = useCallback((mode) => {
    isAIThinkingRef.current = false
    setGameMode(mode)
    setBoard(INITIAL_BOARD)
    setIsXNext(true)
    setGameStatus({ status: 'playing', winner: null, winningLine: null })
    setScores({ x: 0, o: 0, draws: 0 })
    setIsAIThinking(false)
  }, [])

  const exitToMenu = useCallback(() => {
    isAIThinkingRef.current = false
    setGameMode(null)
    setBoard(INITIAL_BOARD)
    setIsXNext(true)
    setGameStatus({ status: 'idle', winner: null, winningLine: null })
    setIsAIThinking(false)
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
