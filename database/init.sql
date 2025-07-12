-- SQL Injection Lab Database Schema
-- This database contains intentionally vulnerable tables for educational purposes

-- Use the database (database is created automatically by Docker)
-- CREATE DATABASE sqli_lab; -- This is handled by Docker environment

-- Create users table with various vulnerability scenarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role VARCHAR(20) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    profile_picture VARCHAR(255),
    bio TEXT,
    phone VARCHAR(20),
    address TEXT,
    salary DECIMAL(10,2),
    social_security VARCHAR(11),
    credit_card VARCHAR(19)
);

-- Create products table for e-commerce scenarios
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50),
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Create logs table for tracking activities
CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    details JSONB
);

-- Create comments table for blog-like functionality
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    content TEXT NOT NULL,
    post_id INTEGER,
    parent_comment_id INTEGER REFERENCES comments(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_approved BOOLEAN DEFAULT false
);

-- Insert sample data for testing

-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password, first_name, last_name, role, salary, social_security, credit_card) VALUES
('admin', 'admin@sqlilab.com', '$2a$12$DInwEC5yFJ94winC3j7vI.EoVfTpz9XaqkJbvTAJ.EmgBA2Waar1i', 'Admin', 'User', 'admin', 100000.00, '123-45-6789', '4532-1234-5678-9012'),
('john_doe', 'john@example.com', '$2a$12$Rz0lIN2XFayC5zHB9B5gfeqoJ7sLbk/O2zXx1S1a6JYqMYRcnJVe.', 'John', 'Doe', 'user', 75000.00, '987-65-4321', '4532-9876-5432-1098'),
('jane_smith', 'jane@example.com', '$2a$12$rdUZ3dGh75hyPQ7iFRT2Z.75c0g.xpfFlQdHp2g7p7LV9JAP8a8g6', 'Jane', 'Smith', 'user', 85000.00, '456-78-9123', '4532-5555-4444-3333'),
('bob_wilson', 'bob@example.com', '$2a$12$pBJ1u/6YK73m0bP5XqRdG.gLeZnkFPYcZ84VcwzYrI39k0R9FWeLy', 'Bob', 'Wilson', 'user', 65000.00, '789-12-3456', '4532-1111-2222-3333'),
('alice_brown', 'alice@example.com', '$2a$12$1.owB2r/CDiTC54IoEvQMOgzJ7d35LoAJLCXUQPQU06WHb2SGanea', 'Alice', 'Brown', 'manager', 95000.00, '321-54-9876', '4532-7777-8888-9999');

-- Insert sample products
INSERT INTO products (name, description, price, category, stock_quantity) VALUES
('Laptop Pro', 'High-performance laptop for professionals', 1299.99, 'Electronics', 50),
('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 'Electronics', 200),
('Coffee Mug', 'Premium ceramic coffee mug', 14.99, 'Kitchen', 100),
('Notebook', 'Leather-bound notebook', 19.99, 'Office', 75),
('USB Drive', '32GB USB 3.0 flash drive', 12.99, 'Electronics', 150);

-- Insert sample orders
INSERT INTO orders (user_id, product_id, quantity, total_amount) VALUES
(2, 1, 1, 1299.99),
(3, 2, 2, 59.98),
(4, 3, 1, 14.99),
(5, 4, 3, 59.97);

-- Insert sample comments
INSERT INTO comments (user_id, content, post_id) VALUES
(2, 'Great product! Highly recommended.', 1),
(3, 'Fast delivery and excellent quality.', 1),
(4, 'Had some issues with the setup, but support helped.', 2),
(5, 'Perfect for my needs. Will buy again.', 2);

-- Insert sample logs
INSERT INTO logs (user_id, action, ip_address, user_agent) VALUES
(1, 'login', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
(2, 'view_product', '192.168.1.101', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'),
(3, 'purchase', '192.168.1.102', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36');

-- Create indexes for better performance (and some intentionally missing for vulnerability demos)
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_logs_user_id ON logs(user_id);

-- Grant appropriate permissions
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;
