-- database/init.sql

-- Création de la table products s'il n'existe pas déjà
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insérer quelques données de test
INSERT INTO products (name, description, price, stock) VALUES
('Laptop Pro', 'High performance laptop for professionals', 1299.99, 50),
('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 100),
('Gaming Keyboard', 'Mechanical RGB gaming keyboard', 89.99, 75),
('4K Monitor', '27-inch 4K LED Monitor', 399.99, 30),
('USB-C Hub', 'Multi-port USB-C hub with HDMI', 49.99, 120);

-- Création d'un index pour améliorer les performances des recherches
CREATE INDEX idx_product_name ON products(name);