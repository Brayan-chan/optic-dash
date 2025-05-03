import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { initializeDatabase, testDatabaseConnection, db } from "./lib/db";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

// Test database connection first, then initialize if successful
console.log("Starting database initialization process...");

// First, let's try a simple query to test the connection
const testConnection = async () => {
  try {
    console.log("Attempting to connect to database...");
    console.log("Auth token available:", !!import.meta.env.VITE_DB_TOKEN);
    
    // Try a simple query
    const result = await db.execute("SELECT 1 AS test");
    console.log("✅ Database connection successful", result);
    
    // Try to create a temporary table to test permissions
    await db.execute(`
      CREATE TABLE IF NOT EXISTS test_table (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      )
    `);
    console.log("✅ Successfully created test table");
    
    return true;
  } catch (error) {
    console.error("❌ Database connection test failed:", error);
    console.error("❌ Detailed error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return false;
  }
};

testConnection()
  .then((connected) => {
    if (connected) {
      console.log("🔌 Database connection successful, initializing tables...");
      return initializeDatabase();
    } else {
      console.error("❌ Database connection failed, skipping initialization");
      throw new Error("Database connection failed");
    }
  })
  .then(() => {
    console.log("✅ Database setup complete");
    console.log("✅ All tables have been created successfully");
  })
  .catch((error) => {
    console.error("❌ Database setup failed:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Stack trace:", error.stack);
    }
    throw error; // Rethrow to prevent app from starting with broken database
  });

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
