CREATE DATABASE perndb;

-- Table: users
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    role VARCHAR(255),
    name VARCHAR(255),
    firstname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

-- Table: client
CREATE TABLE client(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    number VARCHAR(255),
    address VARCHAR(255),
    compaddress VARCHAR(255),
    postalcode VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

-- Table: etataffilier
CREATE TABLE etataffilier (
    etataffilier_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES "users" (user_id),
    transactionaffilier INT REFERENCES transaction (transaction_id)
);

-- Table: transaction
CREATE TABLE transaction (
    transaction_id SERIAL PRIMARY KEY,
    affiliatedId INT REFERENCES etataffilier (etataffilier_id),
    cost DECIMAL,
    product VARCHAR
);

-- Table: statproduit
CREATE TABLE statproduit (
    statproduct_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES produit (product_id),
    ventesannuel INT,
    singleventestotal INT,
    année INT,
    donnermensuel DECIMAL,
    donnerjournalier DECIMAL
);

-- Table: produit
CREATE TABLE produit (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR,
    price DECIMAL,
    description TEXT,
    category VARCHAR,
    rating DECIMAL,
    supply INT
);

-- Table: allstats
CREATE TABLE allstats (
    allstats_id SERIAL PRIMARY KEY,
    ventestotalannuel INT,
    soldtotalannuel INT,
    annee INT,
    datamensuel DECIMAL,
    datajournalier DECIMAL,
    totalclient INT,
    venteparcategorie TEXT
);

--Rajouter une column dans une table
ALTER TABLE etataffilier
ADD COLUMN user_id INT REFERENCES "users" (user_id);