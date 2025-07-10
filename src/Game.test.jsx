import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Game from './Game';

function setup() {
  render(<Game />);
}

describe('Game', () => {
  it('renders the board and move history', () => {
    setup();
    expect(screen.getByText(/Board size:/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to game start/i)).toBeInTheDocument();
  });

  it('allows changing the board size', () => {
    setup();
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 5 } });
    expect(screen.getByText(/5x5/)).toBeInTheDocument();
  });

  it('tracks move history and allows jumping to start', () => {
    setup();
    const squares = screen.getAllByRole('button', { name: '' });
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    expect(screen.getByText(/Go to move #2/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Go to game start/));
    expect(screen.getByText(/Next player: X/)).toBeInTheDocument();
  });
});
