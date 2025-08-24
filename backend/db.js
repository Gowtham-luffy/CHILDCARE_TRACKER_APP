import sqlite3 from "sqlite3";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const dbPath = process.env.DATABASE_URL || "./data.db";
sqlite3.verbose();
export const db = new sqlite3.Database(path.resolve(dbPath));

export function run(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) return reject(err);
      resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

export function all(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

export function get(sql, params=[]) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

export async function initDb() {
  await run(`PRAGMA foreign_keys = ON;`);
}
