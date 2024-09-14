import db from './drizzle.config.js';
import { users } from './schema.js';

async function createTables() {
  await db.schema.createTable(users);
  console.log('Table created successfully');
}

createTables().catch(console.error);