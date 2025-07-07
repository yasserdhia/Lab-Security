import { Pool } from 'pg';

// Parse DATABASE_URL or use default values
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:password@db:5432/sqli_lab';
console.log('Database URL:', databaseUrl);

const pool = new Pool({
  host: process.env.NODE_ENV === 'production' ? 'db' : 'localhost',
  port: 5432,
  database: 'sqli_lab',
  user: 'postgres',
  password: 'password',
  ssl: false,
  // Additional connection settings for better reliability
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test connection on startup
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export default pool;
