import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { initializeDatabase } from "./lib/db";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Initialize the database
initializeDatabase()
  .then(() => console.log("Database setup complete"))
  .catch((error) => console.error("Database setup failed:", error));

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
