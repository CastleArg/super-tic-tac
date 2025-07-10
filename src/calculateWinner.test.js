import { describe, it, expect } from 'vitest';
import calculateWinner from './calculateWinner';

describe('calculateWinner', () => {
  it('detects a winner in a row', () => {
    const squares = [
      'X', 'X', 'X',
      null, null, null,
      null, null, null
    ];
    expect(calculateWinner(squares, 3)).toBe('X');
  });

  it('detects a winner in a column', () => {
    const squares = [
      'O', null, null,
      'O', null, null,
      'O', null, null
    ];
    expect(calculateWinner(squares, 3)).toBe('O');
  });

  it('detects a winner in the main diagonal', () => {
    const squares = [
      'X', null, null,
      null, 'X', null,
      null, null, 'X'
    ];
    expect(calculateWinner(squares, 3)).toBe('X');
  });

  it('detects a winner in the anti-diagonal', () => {
    const squares = [
      null, null, 'O',
      null, 'O', null,
      'O', null, null
    ];
    expect(calculateWinner(squares, 3)).toBe('O');
  });

  it('returns null if there is no winner', () => {
    const squares = [
      'X', 'O', 'X',
      'O', 'X', 'O',
      'O', 'X', 'O'
    ];
    expect(calculateWinner(squares, 3)).toBe(null);
  });

  it('works for 4x4 board', () => {
    const squares = [
      'X', 'X', 'X', 'X',
      null, null, null, null,
      null, null, null, null,
      null, null, null, null
    ];
    expect(calculateWinner(squares, 4)).toBe('X');
  });

  it('returns null for empty board', () => {
    const squares = Array(9).fill(null);
    expect(calculateWinner(squares, 3)).toBe(null);
  });
});
