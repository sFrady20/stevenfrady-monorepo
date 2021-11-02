import { CursorProvider, ScrollProvider } from "base";
import React from "react";
import ReactDOM from "react-dom";
import Pointer from "./components/Pointer";
import Router from "./components/Router";
import "virtual:windi.css";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ScrollProvider>
      <CursorProvider>
        <Pointer />
        <Router />
      </CursorProvider>
    </ScrollProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
