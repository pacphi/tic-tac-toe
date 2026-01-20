// Minimax algorithm with alpha-beta pruning for optimal AI moves

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
]

export function checkWinner(board) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  return null
}

export function isBoardFull(board) {
  return board.every(square => square !== null)
}

export function getGameStatus(board) {
  const result = checkWinner(board)
  if (result) {
    return { status: 'won', winner: result.winner, winningLine: result.line }
  }
  if (isBoardFull(board)) {
    return { status: 'draw', winner: null, winningLine: null }
  }
  return { status: 'playing', winner: null, winningLine: null }
}

function minimax(board, depth, isMaximizing, alpha, beta) {
  const result = checkWinner(board)

  // Terminal states
  if (result) {
    return result.winner === 'O' ? 10 - depth : depth - 10
  }
  if (isBoardFull(board)) {
    return 0
  }

  if (isMaximizing) {
    let maxEval = -Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O'
        const evaluation = minimax(board, depth + 1, false, alpha, beta)
        board[i] = null
        maxEval = Math.max(maxEval, evaluation)
        alpha = Math.max(alpha, evaluation)
        if (beta <= alpha) break // Alpha-beta pruning
      }
    }
    return maxEval
  } else {
    let minEval = Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X'
        const evaluation = minimax(board, depth + 1, true, alpha, beta)
        board[i] = null
        minEval = Math.min(minEval, evaluation)
        beta = Math.min(beta, evaluation)
        if (beta <= alpha) break // Alpha-beta pruning
      }
    }
    return minEval
  }
}

export function getBestMove(board) {
  let bestScore = -Infinity
  let bestMove = null

  // Create a copy to avoid mutating original
  const boardCopy = [...board]

  for (let i = 0; i < 9; i++) {
    if (boardCopy[i] === null) {
      boardCopy[i] = 'O'
      const score = minimax(boardCopy, 0, false, -Infinity, Infinity)
      boardCopy[i] = null

      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }

  return bestMove
}

// Add slight randomness to make AI less predictable at lower difficulties
export function getAIMove(board, difficulty = 'hard') {
  const emptySquares = board
    .map((val, idx) => (val === null ? idx : null))
    .filter(val => val !== null)

  if (emptySquares.length === 0) return null

  if (difficulty === 'easy') {
    // 70% chance of random move
    if (Math.random() < 0.7) {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)]
    }
  } else if (difficulty === 'medium') {
    // 40% chance of random move
    if (Math.random() < 0.4) {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)]
    }
  }

  // Hard difficulty always uses optimal move
  return getBestMove(board)
}
