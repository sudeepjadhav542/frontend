import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import ContextProvider from "./components/context/job_list_context.tsx";
import App from "./App.jsx";

// @ts-ignore
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
);
