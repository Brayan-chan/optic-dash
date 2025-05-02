-- Appointments table
CREATE TABLE appointments (
    appointment_id SERIAL PRIMARY KEY,
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
);

-- Sales table
CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
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
);

-- Sale items table
CREATE TABLE sale_items (
    sale_item_id SERIAL PRIMARY KEY,
    sale_id INTEGER REFERENCES sales(sale_id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(product_id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0.00,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prescriptions table
CREATE TABLE prescriptions (
    prescription_id SERIAL PRIMARY KEY,
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
);

-- Prescription details table
CREATE TABLE prescription_details (
    detail_id SERIAL PRIMARY KEY,
    prescription_id INTEGER REFERENCES prescriptions(prescription_id) ON DELETE CASCADE,
    eye VARCHAR(10) NOT NULL, -- 'right' or 'left'
    sphere VARCHAR(20),
    cylinder VARCHAR(20),
    axis VARCHAR(20),
    add_value VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_customers_name ON customers(last_name, first_name);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_sales_date ON sales(sale_date);
CREATE INDEX idx_company_agreements_name ON company_agreements(company_name);
CREATE INDEX idx_prescriptions_customer ON prescriptions(customer_id);
