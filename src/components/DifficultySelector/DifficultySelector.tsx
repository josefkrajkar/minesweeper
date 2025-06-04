import { useMineField } from "../../hooks/useMineField";
import { DIFFICULTY_CONFIGS, type Difficulty } from "../../utils/constants";
import { 
  SelectorContainer, 
  DifficultyButton, 
  SelectorTitle,
  ButtonGrid,
  DifficultyInfo,
  GameStats
} from "./DifficultySelector.styles";

function DifficultySelector() {
  const { difficulty, onDifficultyChange, onResetGame, gameState, mineCount, flagCount } = useMineField();

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    console.log(`Difficulty button clicked: ${newDifficulty}`);
    onDifficultyChange(newDifficulty);
  };

  const remainingMines = mineCount - flagCount;

  return (
    <SelectorContainer>
      <SelectorTitle>Choose Your Challenge</SelectorTitle>
      
      <ButtonGrid>
        {(Object.keys(DIFFICULTY_CONFIGS) as Difficulty[]).map((diff) => {
          const config = DIFFICULTY_CONFIGS[diff];
          const isActive = difficulty === diff;
          
          return (
            <DifficultyButton
              key={diff}
              onClick={() => handleDifficultyChange(diff)}
              $isActive={isActive}
            >
              <span className="emoji">{config.emoji}</span>
              <span className="name">{config.name}</span>
              <span className="description">{config.description}</span>
              <span className="stats">
                {config.columns}×{config.rows} • {config.mines} mines
              </span>
            </DifficultyButton>
          );
        })}
      </ButtonGrid>

      <DifficultyInfo>
        <GameStats>
          <div className="stat">
            <span className="label">💣 Mines Remaining:</span>
            <span className="value">{remainingMines}</span>
          </div>
          <div className="stat">
            <span className="label">🚩 Flags Used:</span>
            <span className="value">{flagCount}</span>
          </div>
          <div className="stat">
            <span className="label">📊 Status:</span>
            <span className={`value status-${gameState}`}>
              {gameState === 'running' ? 'Playing' : 
               gameState === 'won' ? 'Victory!' : 'Game Over'}
            </span>
          </div>
        </GameStats>
        
        <button onClick={onResetGame} className="reset-button">
          🔄 New Game
        </button>
      </DifficultyInfo>
    </SelectorContainer>
  );
}

export default DifficultySelector;