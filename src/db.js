import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";

// ES Modules replacement for __dirname
const __dirname = import.meta.dirname;

let db;

// Initialize DB and create tables if they don't exist
export const db_initialize_create = async () => {
  if (db) return db;

  const filename = path.join(__dirname, "db", "data.db");

  db = await open({
    filename,
    driver: sqlite3.Database,
  });

  // Enable foreign keys
  await db.exec("PRAGMA foreign_keys = ON;");

  // Create users table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Create items table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      owner_user_id INTEGER,
      FOREIGN KEY (owner_user_id) REFERENCES users(id)
    );
  `);

  console.log("✅ Database initialized and tables created");

  return db;
};

// Helper to get initialized DB
export const get_db = () => {
  if (!db) {
    throw new Error("DB not initialized. Call db_initialize_create() first.");
  }
  return db;
};