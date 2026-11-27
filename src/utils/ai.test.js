import { describe, it, expect, vi, afterEach } from 'vitest'
import { checkWinner, isBoardFull, getGameStatus, getBestMove, getAIMove } from './ai'

const b = (s) => s.split('').map((c) => (c === '.' ? null : c))

describe('checkWinner', () => {
  it('returns null on an empty board', () => {
    expect(checkWinner(Array(9).fill(null))).toBeNull()
  })

  it.each([
    ['XXX......', [0, 1, 2]],
    ['...OOO...', [3, 4, 5]],
    ['X..X..X..', [0, 3, 6]],
    ['O...O...O', [0, 4, 8]],
    ['..X.X.X..', [2, 4, 6]],
  ])('detects the line in %s', (board, line) => {
    const result = checkWinner(b(board))
    expect(result.line).toEqual(line)
    expect(result.winner).toBe(board.replace(/\./g, '')[0])
  })
})

describe('isBoardFull / getGameStatus', () => {
  it('reports a draw on a full board with no line', () => {
    const board = b('XOXXOOOXX')
    expect(isBoardFull(board)).toBe(true)
    expect(getGameStatus(board)).toEqual({ status: 'draw', winner: null, winningLine: null })
  })

  it('reports playing while moves remain', () => {
    expect(getGameStatus(b('X........')).status).toBe('playing')
  })

  it('reports the winner and line', () => {
    expect(getGameStatus(b('OOO.XX.X.'))).toEqual({ status: 'won', winner: 'O', winningLine: [0, 1, 2] })
  })
})

describe('getBestMove', () => {
  it('takes an immediate win', () => {
    expect(getBestMove(b('OO.XX....'))).toBe(2)
  })

  it('blocks an immediate loss', () => {
    expect(getBestMove(b('XX..O....'))).toBe(2)
  })

  it('does not mutate the input board', () => {
    const board = b('X...O....')
    const copy = [...board]
    getBestMove(board)
    expect(board).toEqual(copy)
  })

  it('never loses: perfect play from both sides ends in a draw', () => {
    const board = Array(9).fill(null)
    let player = 'X'
    while (getGameStatus(board).status === 'playing') {
      // getBestMove plays as O; mirror the board to let it play X too
      const view = player === 'O' ? board : board.map((v) => (v === 'X' ? 'O' : v === 'O' ? 'X' : null))
      board[getBestMove(view)] = player
      player = player === 'X' ? 'O' : 'X'
    }
    expect(getGameStatus(board).status).toBe('draw')
  })
})

describe('getAIMove', () => {
  afterEach(() => vi.restoreAllMocks())

  it('returns null when no squares are left', () => {
    expect(getAIMove(b('XOXXOOOXX'))).toBeNull()
  })

  it('plays optimally on hard', () => {
    expect(getAIMove(b('OO.XX....'), 'hard')).toBe(2)
  })

  it('may play a random empty square on easy', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    expect(getAIMove(b('X........'), 'easy')).toBe(1)
  })
})
