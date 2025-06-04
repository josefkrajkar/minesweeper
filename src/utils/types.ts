export interface Cell {
  x: number; // X-coordinate
  y: number; // Y-coordinate
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMineCount: number;
}

export type Grid = Cell[][];

export type GameState = 'running' | 'won' | 'lost';
