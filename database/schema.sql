-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories for clothes (tops, bottoms, shoes, etc.)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Clothes table
CREATE TABLE clothes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    color VARCHAR(100),
    size VARCHAR(50),
    brand VARCHAR(100),
    image_url VARCHAR(500),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Outfits table
CREATE TABLE outfits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Outfit items (many-to-many between outfits and clothes)
CREATE TABLE outfit_items (
    id SERIAL PRIMARY KEY,
    outfit_id INTEGER REFERENCES outfits(id) ON DELETE CASCADE,
    clothes_id INTEGER REFERENCES clothes(id) ON DELETE CASCADE
);

-- Insert default categories
INSERT INTO categories (name) VALUES
('Tops'), ('Bottoms'), ('Dresses'), ('Shoes'), ('Accessories'), ('Outerwear');