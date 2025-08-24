import { Router } from "express";
import { run, get } from "../db.js";
import bcrypt from "bcryptjs";
import { sign } from "../middleware/auth.js";
import { v4 as uuid } from "uuid";

const r = Router();

r.post("/register", async (req, res) => {
  const { email, password, name, phone, language='en' } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email + password required" });
  const existing = await get("SELECT id FROM users WHERE email = ?", [email]);
  if (existing) return res.status(400).json({ error: "email in use" });
  const hash = await bcrypt.hash(password, 10);
  const id = uuid();
  await run("INSERT INTO users (id,email,passwordHash,name,phone,role,language) VALUES (?,?,?,?,?,?,?)",
    [id, email, hash, name||"", phone||"", "mother", language]);
  const token = sign({ id, role: "mother", name: name||"" });
  res.json({ token, user: { id, email, name, role: "mother", language } });
});

r.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await get("SELECT * FROM users WHERE email = ?", [email]);
  if (!user) return res.status(400).json({ error: "invalid credentials" });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(400).json({ error: "invalid credentials" });
  const token = sign(user);
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, language: user.language } });
});

export default r;
