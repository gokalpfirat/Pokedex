import ReactDOM from "react-dom";

import App from "./containers/App";
import ContextProvider from "./containers/ContextProvider";
import ErrorBoundary from "./containers/ErrorBoundary";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ErrorBoundary>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ErrorBoundary>,
  rootElement
);
