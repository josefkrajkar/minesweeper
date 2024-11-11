import { useMemo, useState } from "react";
import { FixedSizeGrid as Grid } from "react-window";

// Components
import Cell from "../Cell/Cell";

// Helpers
import { createEmptyGrid, placeMines } from "../../utils/helpers";

// Constants
import {
  CELL_SIZE,
  COLUMN_COUNT,
  ROW_COUNT,
  MINE_COUNT,
} from "../../utils/constants";

function Field() {
  const gridData = useMemo(() => createEmptyGrid(ROW_COUNT, COLUMN_COUNT), []);
  const [mineField] = useState(placeMines(gridData, MINE_COUNT));

  return (
    <Grid
      columnCount={COLUMN_COUNT}
      columnWidth={CELL_SIZE}
      height={window.innerHeight}
      rowCount={ROW_COUNT}
      rowHeight={CELL_SIZE}
      width={window.innerWidth}
      itemData={mineField}
    >
      {Cell}
    </Grid>
  );
}

export default Field;
