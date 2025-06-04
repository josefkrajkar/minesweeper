import { FixedSizeGrid as Grid } from "react-window";

// Components
import Cell from "../Cell/Cell";

// Hooks
import { useMineField } from "../../hooks/useMineField";

// Constants
import { CELL_SIZE, DIFFICULTY_CONFIGS } from "../../utils/constants";

function Field() {
  const { minefield, difficulty } = useMineField();
  const config = DIFFICULTY_CONFIGS[difficulty];

  console.log(`Rendering field with difficulty: ${difficulty}`, { rows: config.rows, columns: config.columns });

  const maxWidth = Math.min(config.columns * CELL_SIZE, window.innerWidth - 40);
  const maxHeight = Math.min(config.rows * CELL_SIZE, window.innerHeight - 300);
  const actualCellSize = Math.min(CELL_SIZE, maxWidth / config.columns, maxHeight / config.rows);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      overflow: 'auto',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    }}>
      <Grid
        columnCount={config.columns}
        columnWidth={actualCellSize}
        height={Math.min(actualCellSize * config.rows, maxHeight)}
        rowCount={config.rows}
        rowHeight={actualCellSize}
        width={Math.min(actualCellSize * config.columns, maxWidth)}
        itemData={minefield}
        style={{
          border: '3px solid white',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        }}
      >
        {Cell}
      </Grid>
    </div>
  );
}

export default Field;
