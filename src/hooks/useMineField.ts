import { useContext } from "react";

// Context
import { MineFieldContext } from "../context/MineFieldContext";

export function useMineField() {
  const context = useContext(MineFieldContext);
  if (!context) {
    throw new Error("useMineField must be used within an MineFieldContext");
  }
  return context;
}
