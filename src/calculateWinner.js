export default function calculateWinner(squares, boardSize) {
  // Check rows
  for (let row = 0; row < boardSize; row++) {
    let first = squares[row * boardSize];
    if (!first) continue;
    let win = true;
    for (let col = 1; col < boardSize; col++) {
      if (squares[row * boardSize + col] !== first) {
        win = false;
        break;
      }
    }
    if (win) return first;
  }
  // Check columns
  for (let col = 0; col < boardSize; col++) {
    let first = squares[col];
    if (!first) continue;
    let win = true;
    for (let row = 1; row < boardSize; row++) {
      if (squares[row * boardSize + col] !== first) {
        win = false;
        break;
      }
    }
    if (win) return first;
  }
  // Check main diagonal
  let first = squares[0];
  if (first) {
    let win = true;
    for (let i = 1; i < boardSize; i++) {
      if (squares[i * boardSize + i] !== first) {
        win = false;
        break;
      }
    }
    if (win) return first;
  }
  // Check anti-diagonal
  first = squares[boardSize - 1];
  if (first) {
    let win = true;
    for (let i = 1; i < boardSize; i++) {
      if (squares[i * boardSize + (boardSize - 1 - i)] !== first) {
        win = false;
        break;
      }
    }
    if (win) return first;
  }
  return null;
}
