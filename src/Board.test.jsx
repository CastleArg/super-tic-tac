import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Board from './Board';
import calculateWinner from './calculateWinner';

function renderBoard({ xIsNext = true, squares = Array(9).fill(null), boardSize = 3, onPlay = () => {} } = {}) {
  return render(
    <Board
      xIsNext={xIsNext}
      squares={squares}
      onPlay={onPlay}
      boardSize={boardSize}
      calculateWinner={calculateWinner}
    />
  );
}

describe('Board', () => {
  it('renders the correct number of squares for 3x3', () => {
    renderBoard();
    expect(screen.getAllByRole('button', { name: '' }).length).toBe(9);
  });

  it('renders the correct number of squares for 4x4', () => {
    renderBoard({ boardSize: 4, squares: Array(16).fill(null) });
    expect(screen.getAllByRole('button', { name: '' }).length).toBe(16);
  });

  it('shows the correct status for next player', () => {
    renderBoard();
    expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();
  });

  it('shows the winner when there is one', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null];
    renderBoard({ squares });
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });

  it('calls onPlay when a square is clicked', () => {
    const onPlay = vi.fn();
    renderBoard({ onPlay });
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[0]);
    expect(onPlay).toHaveBeenCalled();
  });

  it('does not call onPlay if square already filled', () => {
    const onPlay = vi.fn();
    const squares = ['X', null, null, null, null, null, null, null, null];
    renderBoard({ squares, onPlay });
    const button = screen.getByRole('button', { name: 'X' });
    fireEvent.click(button);
    expect(onPlay).not.toHaveBeenCalled();
  });
});
