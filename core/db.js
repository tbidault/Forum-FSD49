import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from 'dotenv';

config({ path: '../.env' });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//console.log('Connecting to DB with:', process.env.DATABASE_URL);

const db = drizzle(pool);

export default db;
