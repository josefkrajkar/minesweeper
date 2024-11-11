// Components
import Field from "./components/Field/Field";
import Layout from "./components/Layout/Layout";

// Hooks
import { useMineField } from "./hooks/useMineField";

function App() {
  const { gameState } = useMineField();

  return (
    <Layout>
      {gameState === "lost" && <h1>BOOM, you lost!</h1>}
      {gameState === "won" && <h1>Congratulations, you won!</h1>}
      <Field />
    </Layout>
  );
}

export default App;
