import { run } from "./db.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";

const createSql = `
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE,
  passwordHash TEXT NOT NULL,
  name TEXT,
  phone TEXT,
  role TEXT CHECK(role IN ('mother','worker','admin')) NOT NULL,
  language TEXT DEFAULT 'en',
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS mothers_children (
  id TEXT PRIMARY KEY,
  motherId TEXT NOT NULL,
  childId TEXT NOT NULL,
  FOREIGN KEY(motherId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY(childId) REFERENCES children(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS children (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  dob TEXT NOT NULL,
  gender TEXT,
  village TEXT,
  workerId TEXT,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(workerId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS vaccinations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  childId TEXT NOT NULL,
  code TEXT NOT NULL,
  givenOn TEXT NOT NULL,
  notes TEXT,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(childId) REFERENCES children(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS growth_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  childId TEXT NOT NULL,
  date TEXT NOT NULL,
  heightCm REAL,
  weightKg REAL,
  headCircumference REAL,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(childId) REFERENCES children(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  childId TEXT NOT NULL,
  date TEXT NOT NULL,
  location TEXT,
  notes TEXT,
  createdAt TEXT DEFAULT (datetime('now')),
  updatedAt TEXT DEFAULT (datetime('now')),
  FOREIGN KEY(childId) REFERENCES children(id) ON DELETE CASCADE
);
`;

async function reset() {
  for (const stmt of createSql.trim().split(";\n\n")) {
    if (stmt.trim()) await run(stmt + ";");
  }
  const adminPass = await bcrypt.hash("Pass@123", 10);
  const workerPass = await bcrypt.hash("Pass@123", 10);
  const { v4: uuid } = await import("uuid");
  const adminId = uuid();
  const workerId = uuid();
  await run(
    "INSERT OR IGNORE INTO users (id,email,passwordHash,name,role,language) VALUES (?,?,?,?,?,?)",
    [adminId, "admin@example.com", adminPass, "Admin", "admin", "en"]
  );
  await run(
    "INSERT OR IGNORE INTO users (id,email,passwordHash,name,role,language) VALUES (?,?,?,?,?,?)",
    [workerId, "worker@example.com", workerPass, "Worker", "worker", "en"]
  );
  console.log("Database reset complete. Seeded admin/worker users.");
}

if (process.argv.includes("--reset")) {
  reset().catch((e) => { console.error(e); process.exit(1); });
}
