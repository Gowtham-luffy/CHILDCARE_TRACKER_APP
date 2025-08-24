import { Router } from "express";
import { all, run } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);

r.post("/pull", async (req, res) => {
  const { since='1970-01-01T00:00:00Z' } = req.body || {};
  const children = await all("SELECT * FROM children WHERE updatedAt > ? OR createdAt > ?", [since, since]);
  const vacc = await all("SELECT * FROM vaccinations WHERE updatedAt > ? OR createdAt > ?", [since, since]);
  const growth = await all("SELECT * FROM growth_records WHERE updatedAt > ? OR createdAt > ?", [since, since]);
  const appts = await all("SELECT * FROM appointments WHERE updatedAt > ? OR createdAt > ?", [since, since]);
  res.json({ children, vaccinations: vacc, growth, appointments: appts, serverTime: new Date().toISOString() });
});

r.post("/push", async (req, res) => {
  const { children=[], vaccinations=[], growth=[], appointments=[] } = req.body || {};
  let inserted = 0;
  for (const c of children) {
    await run("INSERT OR IGNORE INTO children (id,name,dob,gender,village,workerId,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?,?)",
      [c.id, c.name, c.dob, c.gender, c.village, c.workerId||null, c.createdAt||new Date().toISOString(), c.updatedAt||new Date().toISOString()]);
    inserted++;
  }
  for (const v of vaccinations) {
    await run("INSERT INTO vaccinations (childId,code,givenOn,notes,createdAt,updatedAt) VALUES (?,?,?,?,?,?)",
      [v.childId, v.code, v.givenOn, v.notes||null, v.createdAt||new Date().toISOString(), v.updatedAt||new Date().toISOString()]);
    inserted++;
  }
  for (const g of growth) {
    await run("INSERT INTO growth_records (childId,date,heightCm,weightKg,headCircumference,createdAt,updatedAt) VALUES (?,?,?,?,?,?,?)",
      [g.childId, g.date, g.heightCm||null, g.weightKg||null, g.headCircumference||null, g.createdAt||new Date().toISOString(), g.updatedAt||new Date().toISOString()]);
    inserted++;
  }
  for (const a of appointments) {
    await run("INSERT INTO appointments (childId,date,location,notes,createdAt,updatedAt) VALUES (?,?,?,?,?,?)",
      [a.childId, a.date, a.location||null, a.notes||null, a.createdAt||new Date().toISOString(), a.updatedAt||new Date().toISOString()]);
    inserted++;
  }
  res.json({ ok: true, inserted });
});

export default r;
