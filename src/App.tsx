// Components
import Field from "./components/Field/Field";
import Layout from "./components/Layout/Layout";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";

// Hooks
import { useMineField } from "./hooks/useMineField";

function App() {
  const { gameState } = useMineField();

  console.log(`App rendering with game state: ${gameState}`);

  return (
    <Layout>
      <DifficultySelector />
      {gameState === "lost" && (
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '12px',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(238, 90, 82, 0.3)'
        }}>
          💥 BOOM! You lost! 💥
        </div>
      )}
      {gameState === "won" && (
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '12px',
          marginBottom: '1rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
        }}>
          🎉 Congratulations! You won! 🎉
        </div>
      )}
      <Field />
    </Layout>
  );
}

export default App;
