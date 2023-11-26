import React, { StrictMode } from "react";
import Todolist from "./components/Todolist";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <Todolist />
  </StrictMode>,
);

