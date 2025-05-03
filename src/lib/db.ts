import { createClient } from "@libsql/client";

// In Vite, environment variables are accessed through import.meta.env
// No need to use dotenv in the browser environment

export const db = createClient({
  url: "libsql://optica-brayan-chan.aws-us-east-1.turso.io",
  authToken: import.meta.env.VITE_DB_TOKEN
});

// Test database connection
export async function testDatabaseConnection() {
  try {
    console.log("Testing database connection...");
    console.log("Database URL:", db.url);
    console.log("Auth token available:", !!import.meta.env.VITE_DB_TOKEN);
    
    const result = await db.execute("SELECT 1 AS test");
    console.log("Database connection successful:", result);
    return true;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    console.error("❌ Error message:", error.message);
    console.error("❌ Stack trace:", error.stack);
    return false;
  }
}

// Initialize database tables
export async function initializeDatabase() {
  try {
    console.log("Starting database initialization...");
    console.log("Database URL:", db.url);
    console.log("Auth token available:", !!import.meta.env.VITE_DB_TOKEN);

    try {
      // Create roles table
      await db.execute(`CREATE TABLE IF NOT EXISTS roles (
        role_id INTEGER PRIMARY KEY AUTOINCREMENT,
        role_name VARCHAR(50) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Roles table created successfully");

      // Create users table
      await db.execute(`CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP
      )`);
      console.log("✅ Users table created successfully");

      // Create user_roles table
      await db.execute(`CREATE TABLE IF NOT EXISTS user_roles (
        user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
        role_id INTEGER REFERENCES roles(role_id) ON DELETE CASCADE,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, role_id)
      )`);
      console.log("✅ User roles table created successfully");

      // Create customers table
      await db.execute(`CREATE TABLE IF NOT EXISTS customers (
        customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(20),
        address TEXT,
        city VARCHAR(50),
        state VARCHAR(50),
        postal_code VARCHAR(20),
        credit_limit DECIMAL(10, 2) DEFAULT 0.00,
        balance DECIMAL(10, 2) DEFAULT 0.00,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Customers table created successfully");

      console.log("First batch of tables created successfully");

      // Continue with more tables
      // Create products table
      await db.execute(`CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        category VARCHAR(50) NOT NULL,
        purchase_price DECIMAL(10, 2) NOT NULL,
        sale_price DECIMAL(10, 2) NOT NULL,
        current_stock INTEGER NOT NULL DEFAULT 0,
        min_stock INTEGER NOT NULL DEFAULT 5,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Products table created successfully");

      // Create company_agreements table
      await db.execute(`CREATE TABLE IF NOT EXISTS company_agreements (
        agreement_id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_name VARCHAR(100) NOT NULL,
        contact_person VARCHAR(100) NOT NULL,
        contact_email VARCHAR(100),
        contact_phone VARCHAR(20),
        credit_limit DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        credit_used DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        is_blocked BOOLEAN DEFAULT FALSE,
        start_date DATE NOT NULL,
        end_date DATE,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Company agreements table created successfully");

      // Create company_agreement_employees table
      await db.execute(`CREATE TABLE IF NOT EXISTS company_agreement_employees (
        employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
        agreement_id INTEGER REFERENCES company_agreements(agreement_id) ON DELETE CASCADE,
        customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
        employee_code VARCHAR(50),
        is_verified BOOLEAN DEFAULT FALSE,
        verified_by INTEGER REFERENCES users(user_id),
        verified_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Company agreement employees table created successfully");

      console.log("Second batch of tables created successfully");

      // Continue with remaining tables
      // Create appointments table
      await db.execute(`CREATE TABLE IF NOT EXISTS appointments (
        appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
        doctor_id INTEGER REFERENCES users(user_id),
        date DATE NOT NULL,
        time TIME NOT NULL,
        reason VARCHAR(100) NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'scheduled', -- scheduled, completed, cancelled
        notes TEXT,
        created_by INTEGER REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Appointments table created successfully");

      // Create sales table
      await db.execute(`CREATE TABLE IF NOT EXISTS sales (
        sale_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER REFERENCES customers(customer_id),
        agreement_id INTEGER REFERENCES company_agreements(agreement_id),
        user_id INTEGER REFERENCES users(user_id) NOT NULL,
        sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        subtotal DECIMAL(10, 2) NOT NULL,
        tax_amount DECIMAL(10, 2) NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        amount_paid DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
        payment_method VARCHAR(50),
        status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, completed, refunded
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Sales table created successfully");

      console.log("Third batch of tables created successfully");

      // Final batch of tables
      // Create sale_items table
      await db.execute(`CREATE TABLE IF NOT EXISTS sale_items (
        sale_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id INTEGER REFERENCES sales(sale_id) ON DELETE CASCADE,
        product_id INTEGER REFERENCES products(product_id),
        quantity INTEGER NOT NULL,
        unit_price DECIMAL(10, 2) NOT NULL,
        discount DECIMAL(10, 2) DEFAULT 0.00,
        total_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Sale items table created successfully");

      // Create prescriptions table
      await db.execute(`CREATE TABLE IF NOT EXISTS prescriptions (
        prescription_id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER REFERENCES customers(customer_id) ON DELETE CASCADE,
        doctor_id INTEGER REFERENCES users(user_id),
        appointment_id INTEGER REFERENCES appointments(appointment_id),
        prescription_date DATE NOT NULL,
        prescription_type VARCHAR(50) NOT NULL, -- glasses, contacts, bifocal, progressive
        pd_distance VARCHAR(20), -- Pupillary Distance for distance
        pd_near VARCHAR(20), -- Pupillary Distance for near
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Prescriptions table created successfully");

      // Create prescription_details table
      await db.execute(`CREATE TABLE IF NOT EXISTS prescription_details (
        detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
        prescription_id INTEGER REFERENCES prescriptions(prescription_id) ON DELETE CASCADE,
        eye VARCHAR(10) NOT NULL, -- 'right' or 'left'
        sphere VARCHAR(20),
        cylinder VARCHAR(20),
        axis VARCHAR(20),
        add_value VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log("✅ Prescription details table created successfully");

      // Create indexes
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_customers_name ON customers(last_name, first_name)`);
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date)`);
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(sale_date)`);
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_company_agreements_name ON company_agreements(company_name)`);
      await db.execute(`CREATE INDEX IF NOT EXISTS idx_prescriptions_customer ON prescriptions(customer_id)`);
      console.log("✅ Indexes created successfully");

      console.log("Database initialized successfully");
    } catch (sqlError) {
      console.error("❌ SQL Error during table creation:", sqlError);
      console.error("❌ SQL Error message:", sqlError.message);
      console.error("❌ SQL Error code:", sqlError.code);
      console.error("❌ Stack trace:", sqlError.stack);
      throw sqlError; // Re-throw to be caught by the outer try/catch
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    console.error(
      "Error details:",
      error instanceof Error ? error.message : String(error),
    );
  }
}
