import React from "react";
import ReactDOM from "react-dom";
import "virtual:windi.css";
import Router from "./components/Router";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById("root")
);
