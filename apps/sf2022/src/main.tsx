import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Router from "./components/Router";
import { Canvas } from "@react-three/fiber";
import { Preload, ScrollControls } from "@react-three/drei";
import { Suspense } from "react";
import ErrorBoundary from "~/components/ErrorBoundary";
import OverlayScene from "./scenes/Overlay";
import "virtual:windi.css";
import "./index.css";
import ThemeProvider from "./components/Theme";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <OverlayScene />
        <Canvas
          style={{
            position: "absolute",
            backgroundColor: "var(--sf-background-color)",
            color: "var(--sf-text-color)",
          }}
          className="inset-0 z-0"
          gl={{ alpha: true }}
        >
          <Suspense fallback={null}>
            <ScrollControls damping={5} distance={0.8} pages={4}>
              <Router />
            </ScrollControls>
            <Preload />
          </Suspense>
        </Canvas>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
