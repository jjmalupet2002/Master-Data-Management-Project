
CREATE DATABASE IF NOT EXISTS master_data_db;
USE master_data_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT DEFAULT 0,
    category VARCHAR(100) NOT NULL,
    supplier_name VARCHAR(255) NULL,
    source VARCHAR(50) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE rejected_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(50),
    product_name VARCHAR(255),
    price DECIMAL(10,2),
    quantity INT,
    category VARCHAR(100),
    supplier_name VARCHAR(255),
    source VARCHAR(50),
    reason_for_rejection TEXT,
    rejected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE duplicates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id_1 INT NOT NULL,
    product_id_2 INT NOT NULL,
    similarity_score DECIMAL(5,2),
    reason TEXT,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id_1) REFERENCES products(id),
    FOREIGN KEY (product_id_2) REFERENCES products(id)
);
