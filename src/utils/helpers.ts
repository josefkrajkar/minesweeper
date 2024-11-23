// Types
import type { Cell, Grid } from "./types";

/**
 * Creates an empty grid of specified dimensions.
 *
 * @param rows - The number of rows in the grid.
 * @param cols - The number of columns in the grid.
 * @returns A 2D array representing the grid, where each cell is initialized
 *          with default properties: not a mine, not revealed, not flagged,
 *          and with zero neighboring mines.
 */
export function createEmptyGrid(rows: number, cols: number): Grid {
  const grid: Grid = [];

  for (let x = 0; x < rows; x++) {
    const row: Cell[] = [];
    for (let y = 0; y < cols; y++) {
      row.push({
        x,
        y,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMineCount: 0,
      });
    }
    grid.push(row);
  }

  return grid;
}

/**
 * Places a specified number of mines randomly within a grid.
 *
 * @param grid - The grid where mines will be placed, represented as a 2D array of cells.
 * @param mineCount - The number of mines to place in the grid.
 * @returns The updated grid with mines placed.
 */
export function placeMines(grid: Grid, mineCount: number): Grid {
  const rows = grid.length;
  const cols = grid[0].length;
  const totalCells = rows * cols;

  // Create an array of cell indices
  const indices = Array.from({ length: totalCells }, (_, i) => i);

  // Shuffle the indices
  for (let i = totalCells - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Place mines
  for (let i = 0; i < mineCount; i++) {
    const idx = indices[i];
    const x = Math.floor(idx / cols);
    const y = idx % cols;
    grid[x][y].isMine = true;
  }

  return grid;
}

/**
 * Calculates the number of mines surrounding each cell in a grid.
 *
 * Iterates over each cell in the provided grid and counts the number
 * of adjacent cells that contain mines. Updates each cell with the
 * count of neighboring mines.
 *
 * @param grid - A 2D array representing the grid of cells, where each
 *               cell has properties indicating if it is a mine and
 *               the count of neighboring mines.
 * @returns The updated grid with neighbor mine counts for each cell.
 */
export function calculateNeighborMineCounts(grid: Grid): Grid {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    /* cell */ [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (grid[x][y].isMine) continue;

      let count = 0;

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < rows &&
          ny >= 0 &&
          ny < cols &&
          grid[nx][ny].isMine
        ) {
          count++;
        }
      }

      grid[x][y].neighborMineCount = count;
    }
  }

  return grid;
}

/**
 * Reveals the neighboring cells of a specified cell in a grid.
 *
 * This function takes a grid and coordinates (x, y) of a cell, and reveals
 * all adjacent cells that are not mines. If an adjacent cell has no neighboring
 * mines, it recursively reveals its neighbors as well.
 *
 * @param grid - The grid of cells to be processed.
 * @param x - The x-coordinate of the cell to start revealing from.
 * @param y - The y-coordinate of the cell to start revealing from.
 * @returns The updated grid with the relevant cells revealed.
 */
export function revealNeighbors(grid: Grid, x: number, y: number): Grid {
  const rows = grid.length;
  const cols = grid[0].length;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    /* cell */ [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const queue = [[x, y]];

  while (queue.length > 0) {
    const [x, y] = queue.shift()!;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < rows &&
        ny >= 0 &&
        ny < cols &&
        !grid[nx][ny].isRevealed &&
        !grid[nx][ny].isMine
      ) {
        grid[nx][ny].isRevealed = true;

        if (grid[nx][ny].neighborMineCount === 0) {
          queue.push([nx, ny]);
        }
      }
    }
  }

  return grid;
}

/**
 * Reveals all mines in the given grid.
 *
 * Iterates over each cell in the grid and updates the cell's `isRevealed` property
 * to true if the cell is a mine, already revealed, or flagged.
 *
 * @param grid - The grid of cells to be processed.
 * @returns A new grid with all mines revealed.
 */
export function revealAllMines(grid: Grid): Grid {
  return grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      isRevealed: cell.isMine || cell.isRevealed || cell.isFlagged,
    })),
  );
}

/**
 * Checks if all win conditions are met in the given grid.
 *
 * A win condition is satisfied if every cell in the grid is either:
 * - A mine that is flagged, or
 * - Not a mine and is revealed.
 *
 * @param grid - The grid to check, represented as a 2D array of cells.
 * @returns True if all win conditions are met, false otherwise.
 */
export function checkWinConditions(grid: Grid): boolean {
  return grid.every((row) =>
    row.every(
      (cell) =>
        (cell.isMine && cell.isFlagged) || (!cell.isMine && cell.isRevealed),
    ),
  );
}
