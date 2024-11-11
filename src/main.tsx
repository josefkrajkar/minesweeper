import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Components
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

// Context
import { MineFieldProvider } from "./context/MineFieldContext.tsx";

// Styles
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <MineFieldProvider>
        <App />
      </MineFieldProvider>
    </ErrorBoundary>
  </StrictMode>,
);
