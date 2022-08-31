-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- USE ecommerce_db;

-- CREATE TABLE Category (
-- id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- category_name TEXT NOT NULL
-- );

-- CREATE TABLE Product (
-- id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- product_name TEXT NOT NULL,
-- price DECIMAL(10,2) NOT NULL,
--  -- need decimal validation 
-- stock INTEGER NOT NULL DEFAULT 10,
-- -- need numeric validation 
-- category_id INTEGER, 
--     INDEX fk_cat (category_id), 
--     FOREIGN KEY (category_id)
--     REFERENCES Category(id)
-- );

-- CREATE TABLE Tag (
-- id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- tag_name TEXT
-- );

-- CREATE TABLE ProductTag (
-- id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
-- tag_id INTEGER,
--     INDEX fk_tag (tag_id),
--     FOREIGN KEY (tag_id)
--     REFERENCES tag(id)
-- );
