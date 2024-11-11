import type { Grid } from "../../utils/types";

interface CellProps {
  columnIndex: number;
  rowIndex: number;
  style: React.CSSProperties;
  data: Grid;
}

function Cell({ columnIndex, rowIndex, style, data }: CellProps) {
  const cellData = data[rowIndex][columnIndex];

  const handleClick = () => {
    // Zpracuj odhalení buňky
    console.log(`Klikl jsi na buňku [${rowIndex}, ${columnIndex}]`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        ...style,
        border: "1px solid #ccc",
        boxSizing: "border-box",
        backgroundColor: cellData.isRevealed ? "#e0e0e0" : "#bdbdbd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {cellData.isRevealed && cellData.isMine && "💣"}
      {cellData.isRevealed &&
        !cellData.isMine &&
        cellData.neighborMineCount > 0 &&
        cellData.neighborMineCount}
    </button>
  );
}

export default Cell;
