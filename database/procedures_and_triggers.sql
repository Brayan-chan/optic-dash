-- Stored procedures and triggers for Optical Store Management System

-- Procedure to add a new customer
CREATE OR REPLACE FUNCTION add_customer(
    p_first_name VARCHAR(50),
    p_last_name VARCHAR(50),
    p_email VARCHAR(100),
    p_phone VARCHAR(20),
    p_address TEXT,
    p_city VARCHAR(50),
    p_state VARCHAR(50),
    p_postal_code VARCHAR(20),
    p_credit_limit DECIMAL(10, 2)
) RETURNS INTEGER AS $$
DECLARE
    new_customer_id INTEGER;
BEGIN
    INSERT INTO customers (
        first_name, last_name, email, phone, address, 
        city, state, postal_code, credit_limit
    ) VALUES (
        p_first_name, p_last_name, p_email, p_phone, p_address, 
        p_city, p_state, p_postal_code, p_credit_limit
    ) RETURNING customer_id INTO new_customer_id;
    
    RETURN new_customer_id;
END;
$$ LANGUAGE plpgsql;

-- Procedure to schedule an appointment
CREATE OR REPLACE FUNCTION schedule_appointment(
    p_customer_id INTEGER,
    p_doctor_id INTEGER,
    p_date DATE,
    p_time TIME,
    p_reason VARCHAR(100),
    p_notes TEXT,
    p_created_by INTEGER
) RETURNS INTEGER AS $$
DECLARE
    new_appointment_id INTEGER;
BEGIN
    INSERT INTO appointments (
        customer_id, doctor_id, date, time, reason, notes, created_by
    ) VALUES (
        p_customer_id, p_doctor_id, p_date, p_time, p_reason, p_notes, p_created_by
    ) RETURNING appointment_id INTO new_appointment_id;
    
    RETURN new_appointment_id;
END;
$$ LANGUAGE plpgsql;

-- Procedure to create a new sale
CREATE OR REPLACE FUNCTION create_sale(
    p_customer_id INTEGER,
    p_agreement_id INTEGER,
    p_user_id INTEGER,
    p_subtotal DECIMAL(10, 2),
    p_tax_amount DECIMAL(10, 2),
    p_total_amount DECIMAL(10, 2),
    p_amount_paid DECIMAL(10, 2),
    p_payment_method VARCHAR(50),
    p_notes TEXT
) RETURNS INTEGER AS $$
DECLARE
    new_sale_id INTEGER;
BEGIN
    INSERT INTO sales (
        customer_id, agreement_id, user_id, subtotal, tax_amount, 
        total_amount, amount_paid, payment_method, notes
    ) VALUES (
        p_customer_id, p_agreement_id, p_user_id, p_subtotal, p_tax_amount, 
        p_total_amount, p_amount_paid, p_payment_method, p_notes
    ) RETURNING sale_id INTO new_sale_id;
    
    -- Update customer balance if not fully paid
    IF p_amount_paid < p_total_amount THEN
        UPDATE customers
        SET balance = balance + (p_total_amount - p_amount_paid)
        WHERE customer_id = p_customer_id;
    END IF;
    
    -- Update company agreement credit used if applicable
    IF p_agreement_id IS NOT NULL THEN
        UPDATE company_agreements
        SET credit_used = credit_used + (p_total_amount - p_amount_paid)
        WHERE agreement_id = p_agreement_id;
    END IF;
    
    RETURN new_sale_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update product stock when a sale is made
CREATE OR REPLACE FUNCTION update_product_stock() RETURNS TRIGGER AS $$
BEGIN
    -- Decrease product stock
    UPDATE products
    SET current_stock = current_stock - NEW.quantity,
        updated_at = CURRENT_TIMESTAMP
    WHERE product_id = NEW.product_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_product_stock
AFTER INSERT ON sale_items
FOR EACH ROW
EXECUTE FUNCTION update_product_stock();

-- Trigger to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply the timestamp trigger to relevant tables
CREATE TRIGGER trg_update_customer_timestamp
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_product_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_appointment_timestamp
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_sale_timestamp
BEFORE UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_prescription_timestamp
BEFORE UPDATE ON prescriptions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_update_company_agreement_timestamp
BEFORE UPDATE ON company_agreements
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
