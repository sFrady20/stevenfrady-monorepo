import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import PasswordProtect from "./components/PasswordProtect";

ReactDOM.render(
  <React.StrictMode>
    <PasswordProtect>
      <App />
    </PasswordProtect>
  </React.StrictMode>,
  document.getElementById("root")
);
