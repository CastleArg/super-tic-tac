import React, { useState, useEffect } from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';
import './App.css';

// Firebase imports
import { db } from './firebase';
import { ref, set, onValue, off } from 'firebase/database';

export default function Game() {
  // Configurable board size
  const [boardSize, setBoardSize] = useState(3);
  const [history, setHistory] = useState([Array(3 * 3).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // As Firebase does not persist nulls, Always ensure currentSquares is a full array of correct length
  function toFullArray(arr, size) {
    // Accepts array or object, returns array of length size, filled with nulls where missing
    return Array.from({ length: size }, (_, i) => (arr && (Array.isArray(arr) ? arr[i] : arr[i] !== undefined ? arr[i] : null)) ?? null);
  }
  const currentSquares = toFullArray(history && history[currentMove], boardSize * boardSize);
  const xIsNext = currentMove % 2 === 0;

  // Multiplayer: simple room id (could be improved)
  const roomId = 'default-room'; // For demo, use a static room. In production, generate or select a room.

  // When board size changes, reset the game
  useEffect(() => {
    // Always use full arrays of nulls
    const emptyBoard = Array(boardSize * boardSize).fill(null);
    setHistory([emptyBoard]);
    setCurrentMove(0);
    set(ref(db, `games/${roomId}`), {
      boardSize,
      history: [emptyBoard],
      currentMove: 0,
    });
  }, [boardSize]);


  // Listen for remote game state
  useEffect(() => {
    const gameRef = ref(db, `games/${roomId}`);
    const listener = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || !Array.isArray(data.history) || typeof data.currentMove !== 'number') {
        // Fail fast: do not update state if data is missing or malformed
        return;
      }
      // Convert all history entries to full arrays
      const fullHistory = data.history.map(h => toFullArray(h, data.boardSize * data.boardSize));
      setHistory(fullHistory);
      setCurrentMove(data.currentMove);
      if (typeof data.boardSize === 'number' && data.boardSize !== boardSize) {
        setBoardSize(data.boardSize);
      }
    });
    return () => off(gameRef, 'value', listener);
  }); // Only run once

  function handlePlay(nextSquares) {
    // Always save as full arrays
    const safeNextSquares = toFullArray(nextSquares, boardSize * boardSize);
    const nextHistory = [...history.slice(0, currentMove + 1), safeNextSquares];
    const newMove = nextHistory.length - 1;
    setHistory(nextHistory);
    setCurrentMove(newMove);
    set(ref(db, `games/${roomId}`), {
      boardSize,
      history: nextHistory.map(h => toFullArray(h, boardSize * boardSize)),
      currentMove: newMove,
    });
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    set(ref(db, `games/${roomId}/currentMove`), nextMove);
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
