import React, { useState, useEffect } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import './App.css';

export default function Game() {
  // Configurable board size
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([Array(3 * 3).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  // When board size changes, reset the game
  useEffect(() => {
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
          calculateWinner={calculateWinner}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
