// Components
import Field from "./components/Field/Field";
import Layout from "./components/Layout/Layout";

// Hooks
import { useMineField } from "./hooks/useMineField";

function App() {
  const { gameState } = useMineField();

  return (
    <Layout>
      {gameState === "lost" && <h1>Prohrál jsi!</h1>}
      {gameState === "won" && <h1>Gratulujeme, vyhrál jsi!</h1>}
      <Field />
    </Layout>
  );
}

export default App;
