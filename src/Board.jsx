import React from 'react';

export default function Board({ xIsNext, squares, onPlay, boardSize, calculateWinner }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares, boardSize)) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares, boardSize);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // Render all squares in a flat array for CSS Grid
  const gridSquares = [];
  for (let idx = 0; idx < boardSize * boardSize; idx++) {
    gridSquares.push(
      <Square
        key={idx}
        value={squares[idx]}
        onSquareClick={() => handleClick(idx)}
      />
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      <div
        className="board"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${boardSize}, 34px)`,
          gridTemplateRows: `repeat(${boardSize}, 34px)`,
          gap: 0
        }}
      >
        {gridSquares}
      </div>
    </>
  );
}

function Square({value, onSquareClick}) {
  return (
    <button
      className="square"
      onClick={onSquareClick}>{value}
    </button>
  );
}
