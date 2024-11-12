import type { Grid } from "../../utils/types";
import { useMineField } from "../../hooks/useMineField";

// Styles
import { Button } from "./Cell.styles";

type CellProps = {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: Grid;
};

function Cell({ rowIndex, columnIndex, data, style }: CellProps) {
  const cellData = data[rowIndex][columnIndex];
  const { isRevealed, isMine, neighborMineCount, isFlagged } = cellData;
  const { onCellReveal, onCellFlag, gameState } = useMineField();

  const handleClick = () => {
    if (gameState !== "running") {
      return;
    }
    onCellReveal(rowIndex, columnIndex);
  };

  const handleFlag = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameState !== "running") {
      return;
    }
    onCellFlag(rowIndex, columnIndex);
  };

  return (
    <Button
      style={style}
      onClick={handleClick}
      onContextMenu={handleFlag}
      isRevealed={isRevealed}
      isMine={isMine}
      isFlagged={isFlagged}
      neighborMineCount={neighborMineCount}
    >
      {isFlagged && "🚩"}
      {isRevealed && isMine && "💣"}
      {isRevealed && !isMine && neighborMineCount > 0 && neighborMineCount}
    </Button>
  );
}

export default Cell;
