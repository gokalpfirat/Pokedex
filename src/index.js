import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./containers/App";
import ContextProvider from "./containers/ContextProvider";
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
  rootElement
);
