import ReactDOM from "react-dom";

import App from "./containers/App";
import AppProvider from "./containers/AppProvider";
import PokemonProvider from "./containers/PokemonProvider";
import ErrorBoundary from "./containers/ErrorBoundary";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ErrorBoundary>
    <PokemonProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </PokemonProvider>
  </ErrorBoundary>,
  rootElement
);
