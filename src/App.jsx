import './App.css'
import React, { useState } from 'react';

export default function Game() {
  // Configurable board size
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([Array(3 * 3).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  // When board size changes, reset the game
  React.useEffect(() => {
    setHistory([Array(boardSize * boardSize).fill(null)]);
    setCurrentMove(0);
  }, [boardSize]);

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <label>
          Board size: {boardSize}x{boardSize}
          <input
            type="range"
            min="3"
            max="15"
            value={boardSize}
            onChange={e => setBoardSize(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          />
        </label>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          boardSize={boardSize}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
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


function Board({ xIsNext, squares, onPlay, boardSize }) {
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

  // Render board rows dynamically
  const rows = [];
  for (let row = 0; row < boardSize; row++) {
    const squaresInRow = [];
    for (let col = 0; col < boardSize; col++) {
      const idx = row * boardSize + col;
      squaresInRow.push(
        <Square
          key={idx}
          value={squares[idx]}
          onSquareClick={() => handleClick(idx)}
        />
      );
    }
    rows.push(
      <div className="board-row" key={row}>
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {rows}
    </>
  );
}

function calculateWinner(squares, boardSize) {
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