import { BetterSQLite3Database, drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import path, { dirname } from 'path';

const sqlite = new Database('data.db');
export const db: BetterSQLite3Database = drizzle(sqlite);
