import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import path, { dirname } from 'path';
import { db } from '../index';

const currentDir = dirname(__filename);
const parentDir = dirname(currentDir);
const drizzlePath = path.join(parentDir, 'drizzle');

migrate(db, { migrationsFolder: drizzlePath });
