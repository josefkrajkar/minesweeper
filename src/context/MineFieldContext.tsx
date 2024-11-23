import React, { createContext, useCallback, useMemo, useState } from "react";

// Types
import type { Grid } from "../utils/types";

// Helpers
import {
  createEmptyGrid,
  placeMines,
  calculateNeighborMineCounts,
  revealNeighbors,
  revealAllMines,
  checkWinConditions,
} from "../utils/helpers";

// Constants
import { MINE_COUNT, COLUMN_COUNT, ROW_COUNT } from "../utils/constants";

type MineFieldContextType = {
  minefield: Grid;
  onCellReveal: (columnIndex: number, rowIndex: number) => void;
  onCellFlag: (columnIndex: number, rowIndex: number) => void;
  gameState: "running" | "won" | "lost";
};

export const MineFieldContext = createContext<MineFieldContextType | undefined>(
  undefined,
);

export function MineFieldProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<"running" | "won" | "lost">(
    "running",
  );
  const [minefield, setMinefield] = useState(() => {
    let grid = createEmptyGrid(ROW_COUNT, COLUMN_COUNT);
    grid = placeMines(grid, MINE_COUNT);
    grid = calculateNeighborMineCounts(grid);

    return grid;
  });

  const onCellReveal = useCallback(
    (x: number, y: number) => {
      if (minefield[x][y].isRevealed || minefield[x][y].isFlagged) {
        return;
      }
      if (minefield[x][y].isMine) {
        setMinefield(revealAllMines(minefield));
        setGameState("lost");
        return;
      }
      const newMinefield = [...minefield];
      newMinefield[x][y].isRevealed = true;
      if (newMinefield[x][y].neighborMineCount === 0) {
        revealNeighbors(newMinefield, x, y);
      }
      setMinefield(newMinefield);
      if (checkWinConditions(newMinefield)) {
        setGameState("won");
      }
    },
    [minefield],
  );

  const onCellFlag = useCallback(
    (x: number, y: number) => {
      const newMinefield = [...minefield];
      newMinefield[x][y].isFlagged = !newMinefield[x][y].isFlagged;
      setMinefield(newMinefield);
      if (checkWinConditions(newMinefield)) {
        setGameState("won");
      }
    },
    [minefield],
  );

  const contextValue = useMemo(
    () => ({
      minefield,
      onCellReveal,
      onCellFlag,
      gameState,
    }),
    [minefield, onCellReveal, onCellFlag, gameState],
  );

  return (
    <MineFieldContext.Provider value={contextValue}>
      {children}
    </MineFieldContext.Provider>
  );
}
