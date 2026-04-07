import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// PostgreSQL connection securely using connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

pool.on('connect', () => {
    console.log('🔗 Connected to the PostgreSQL database.');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

// Create tables automatically if they don't exist
export const initDb = async () => {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'USER',
        status VARCHAR(50) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    try {
        await pool.query(createTableQuery);
        console.log("✅ Users table initialized successfully.");
    } catch (error) {
        console.error("❌ Error creating users table", error);
    }
}

export default pool;
