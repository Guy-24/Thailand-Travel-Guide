-- Active: 1778244155555@@127.0.0.1@5432@ttg
-- CREATE DATABASE ttg;
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    google_id VARCHAR(255) UNIQUE NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL,
    user_name VARCHAR(100) NOT NULL,
    picture_url TEXT,                        
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);


-- TRUNCATE TABLE users RESTART IDENTITY CASCADE; -- ลบ users และรี ID
SELECT * FROM users;


CREATE TABLE IF NOT EXISTS places (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL, 
    location VARCHAR(255) NOT NULL,
    region VARCHAR(255) NOT NULL,
    picture_url TEXT NOT NULL   
);

INSERT INTO places
VALUES (1,'วัดพระศรีรัตนศาสดาราม', 'กรุงเทพมหานครฯ', 'กลาง', 'https://static.thairath.co.th/media/dFQROr7oWzulq5FZUEh3MRrERXP2ZCRNt1ty78Z5HuJ2mEG4frJaJLYSmi7PuWvciU0.jpg');

-- TRUNCATE TABLE places RESTART IDENTITY CASCADE; -- ลบ places และรี ID
SELECT * FROM places;

