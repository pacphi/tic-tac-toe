import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGame } from './useGame'

const play = (result, ...squares) => {
  for (const i of squares) act(() => result.current.handleSquareClick(i))
}

describe('useGame', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('starts idle with no mode', () => {
    const { result } = renderHook(() => useGame())
    expect(result.current.gameMode).toBeNull()
    expect(result.current.gameStatus.status).toBe('idle')
  })

  it('alternates players in pvp and ignores taken squares', () => {
    const { result } = renderHook(() => useGame())
    act(() => result.current.startGame('pvp'))
    expect(result.current.gameStatus.status).toBe('playing')
    play(result, 4)
    expect(result.current.board[4]).toBe('X')
    expect(result.current.currentPlayer).toBe('O')
    play(result, 4)
    expect(result.current.currentPlayer).toBe('O')
    play(result, 0)
    expect(result.current.board[0]).toBe('O')
  })

  it('records a win once and blocks further moves', () => {
    const { result } = renderHook(() => useGame())
    act(() => result.current.startGame('pvp'))
    play(result, 0, 3, 1, 4, 2) // X wins top row
    expect(result.current.gameStatus).toEqual({ status: 'won', winner: 'X', winningLine: [0, 1, 2] })
    expect(result.current.scores).toEqual({ x: 1, o: 0, draws: 0 })
    play(result, 8)
    expect(result.current.board[8]).toBeNull()
    expect(result.current.scores).toEqual({ x: 1, o: 0, draws: 0 })
  })

  it('records a draw', () => {
    const { result } = renderHook(() => useGame())
    act(() => result.current.startGame('pvp'))
    play(result, 0, 1, 2, 4, 3, 5, 7, 6, 8)
    expect(result.current.gameStatus.status).toBe('draw')
    expect(result.current.scores).toEqual({ x: 0, o: 0, draws: 1 })
  })

  it('keeps scores on reset and clears them on a new game', () => {
    const { result } = renderHook(() => useGame())
    act(() => result.current.startGame('pvp'))
    play(result, 0, 3, 1, 4, 2)
    act(() => result.current.resetGame())
    expect(result.current.board).toEqual(Array(9).fill(null))
    expect(result.current.gameStatus.status).toBe('playing')
    expect(result.current.scores.x).toBe(1)
    act(() => result.current.startGame('pvp'))
    expect(result.current.scores).toEqual({ x: 0, o: 0, draws: 0 })
  })

  it('lets the computer answer after a delay in pvc', () => {
    const { result } = renderHook(() => useGame())
    act(() => result.current.startGame('pvc'))
    play(result, 0)
    expect(result.current.isAIThinking).toBe(true)
    play(result, 1) // ignored while the AI is thinking
    expect(result.current.board[1]).toBeNull()
    act(() => vi.advanceTimersByTime(500))
    expect(result.current.isAIThinking).toBe(false)
    expect(result.current.board.filter((v) => v === 'O')).toHaveLength(1)
    expect(result.current.currentPlayer).toBe('X')
  })

  it('returns to the menu', () => {
    const { result } = renderHook(() => useGame())
    act(() => result.current.startGame('pvc'))
    act(() => result.current.exitToMenu())
    expect(result.current.gameMode).toBeNull()
    expect(result.current.gameStatus.status).toBe('idle')
  })
})
