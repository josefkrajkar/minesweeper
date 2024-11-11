import { FixedSizeGrid as Grid } from "react-window";

// Components
import Cell from "../Cell/Cell";

// Hooks
import { useMineField } from "../../hooks/useMineField";

// Constants
import { CELL_SIZE, COLUMN_COUNT, ROW_COUNT } from "../../utils/constants";

function Field() {
  const { minefield } = useMineField();

  return (
    <Grid
      columnCount={COLUMN_COUNT}
      columnWidth={CELL_SIZE}
      height={CELL_SIZE * ROW_COUNT}
      rowCount={ROW_COUNT}
      rowHeight={CELL_SIZE}
      width={CELL_SIZE * COLUMN_COUNT}
      itemData={minefield}
    >
      {Cell}
    </Grid>
  );
}

export default Field;
