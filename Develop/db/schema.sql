-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

USE ecommerce_db;

CREATE TABLE category (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
category_name TEXT NOT NULL
);

CREATE TABLE product (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name TEXT NOT NULL,
price DECIMAL(10,2) NOT NULL,
 -- need decimal validation 
stock INTEGER NOT NULL DEFAULT 10,
-- need numeric validation 
category_id INTEGER, 
    INDEX fk_cat (category_id), 
    FOREIGN KEY (category_id)
    REFERENCES category(id)
);

CREATE TABLE bowl (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
tag_name TEXT
);

CREATE TABLE product_tag (
id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_id INTEGER, 
    INDEX fk_product (product_id),
    FOREIGN KEY (product_id)
    REFERENCES product(id)
-- tag_id INDEX fk_tag (tag_id),
--     FOREIGN KEY (tag_id)
--     REFERENCES tag(id)
);
