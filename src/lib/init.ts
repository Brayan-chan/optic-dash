import { db, initializeDatabase } from './db';

// Initialize database when the module is imported
initializeDatabase().then(() => {
  console.log('Database initialization completed');
}).catch((error) => {
  console.error('Failed to initialize database:', error);
  throw error; // This will cause the app to fail if database initialization fails
});

// Export the db instance for use in other modules
export { db };
