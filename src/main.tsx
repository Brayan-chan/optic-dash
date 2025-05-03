import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { initializeDatabase } from "./lib/db";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

import { testDatabaseConnection } from "./lib/db";

// Test database connection first, then initialize if successful
testDatabaseConnection()
  .then((connected) => {
    if (connected) {
      console.log("🔌 Database connection successful, initializing tables...");
      return initializeDatabase();
    } else {
      console.error("❌ Database connection failed, skipping initialization");
      return Promise.reject("Database connection failed");
    }
  })
  .then(() => console.log("✅ Database setup complete"))
  .catch((error) => console.error("❌ Database setup failed:", error));

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
