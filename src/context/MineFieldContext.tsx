import React, { createContext, useCallback, useMemo, useState } from "react";

// Types
import type { Grid, GameState } from "../utils/types";

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
import { DIFFICULTY_CONFIGS, type Difficulty } from "../utils/constants";

type MineFieldContextType = {
  minefield: Grid;
  onCellReveal: (columnIndex: number, rowIndex: number) => void;
  onCellFlag: (columnIndex: number, rowIndex: number) => void;
  gameState: GameState;
  difficulty: Difficulty;
  onDifficultyChange: (newDifficulty: Difficulty) => void;
  onResetGame: () => void;
  mineCount: number;
  flagCount: number;
};

export const MineFieldContext = createContext<MineFieldContextType | undefined>(
  undefined,
);

export function MineFieldProvider({ children }: { children: React.ReactNode }) {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [gameState, setGameState] = useState<GameState>("running");
  
  const currentConfig = DIFFICULTY_CONFIGS[difficulty];
  
  const createNewGame = useCallback((selectedDifficulty: Difficulty) => {
    const config = DIFFICULTY_CONFIGS[selectedDifficulty];
    let grid = createEmptyGrid(config.rows, config.columns);
    grid = placeMines(grid, config.mines);
    grid = calculateNeighborMineCounts(grid);
    console.log(`New ${config.name} game created:`, { rows: config.rows, columns: config.columns, mines: config.mines });
    return grid;
  }, []);

  const [minefield, setMinefield] = useState(() => createNewGame(difficulty));

  const onCellReveal = useCallback(
    (x: number, y: number) => {
      if (gameState !== "running" || minefield[x][y].isRevealed || minefield[x][y].isFlagged) {
        return;
      }
      console.log(`Revealing cell at [${x}, ${y}]`);
      if (minefield[x][y].isMine) {
        setMinefield(revealAllMines(minefield));
        setGameState("lost");
        console.log("Game lost - mine revealed!");
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
        console.log("Game won!");
      }
    },
    [minefield, gameState],
  );

  const onCellFlag = useCallback(
    (x: number, y: number) => {
      if (gameState !== "running" || minefield[x][y].isRevealed) {
        return;
      }
      console.log(`Toggling flag at [${x}, ${y}]`);
      const newMinefield = [...minefield];
      newMinefield[x][y].isFlagged = !newMinefield[x][y].isFlagged;
      setMinefield(newMinefield);
      if (checkWinConditions(newMinefield)) {
        setGameState("won");
        console.log("Game won!");
      }
    },
    [minefield, gameState],
  );

  const onDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    console.log(`Changing difficulty to: ${newDifficulty}`);
    setDifficulty(newDifficulty);
    setMinefield(createNewGame(newDifficulty));
    setGameState("running");
  }, [createNewGame]);

  const onResetGame = useCallback(() => {
    console.log("Resetting game");
    setMinefield(createNewGame(difficulty));
    setGameState("running");
  }, [createNewGame, difficulty]);

  const flagCount = useMemo(() => {
    return minefield.flat().filter(cell => cell.isFlagged).length;
  }, [minefield]);

  const contextValue = useMemo(
    () => ({
      minefield,
      onCellReveal,
      onCellFlag,
      gameState,
      difficulty,
      onDifficultyChange,
      onResetGame,
      mineCount: currentConfig.mines,
      flagCount,
    }),
    [minefield, onCellReveal, onCellFlag, gameState, difficulty, onDifficultyChange, onResetGame, currentConfig.mines, flagCount],
  );

  return (
    <MineFieldContext.Provider value={contextValue}>
      {children}
    </MineFieldContext.Provider>
  );
}
