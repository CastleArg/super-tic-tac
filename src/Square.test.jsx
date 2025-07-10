import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import Board from './Board';
import calculateWinner from './calculateWinner';

describe('Square', () => {
  it('renders value and handles click', () => {
    const onPlay = vi.fn();
    const squares = Array(9).fill(null);
    render(
      <Board
        xIsNext={true}
        squares={squares}
        onPlay={onPlay}
        boardSize={3}
        calculateWinner={calculateWinner}
      />
    );
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[0]);
    expect(onPlay).toHaveBeenCalled();
  });
});
