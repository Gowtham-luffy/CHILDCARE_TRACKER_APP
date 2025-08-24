import { Router } from "express";
import { all, run } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);

const BASE_SCHEDULE = [
  { code: "BCG", dueDays: 0 },
  { code: "OPV0", dueDays: 0 },
  { code: "HEPB0", dueDays: 0 },
  { code: "DPT1", dueDays: 42 },
  { code: "OPV1", dueDays: 42 },
  { code: "DPT2", dueDays: 70 },
  { code: "OPV2", dueDays: 70 },
  { code: "MEASLES1", dueDays: 270 }
];

r.get("/schedule/:childId", async (req, res) => {
  const given = await all("SELECT code, givenOn FROM vaccinations WHERE childId=? ORDER BY givenOn ASC", [req.params.childId]);
  res.json({ schedule: BASE_SCHEDULE, given });
});

r.post("/mark", async (req, res) => {
  const { childId, code, date, notes } = req.body;
  if (!childId || !code || !date) return res.status(400).json({ error: "childId, code, date required" });
  await run("INSERT INTO vaccinations (childId,code,givenOn,notes) VALUES (?,?,?,?)", [childId, code, date, notes||null]);
  res.json({ ok: true });
});

export default r;
