import { Router } from "express";
import { all, run } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);

r.post("/record", async (req, res) => {
  const { childId, date, heightCm, weightKg, headCircumference } = req.body;
  if (!childId || !date) return res.status(400).json({ error: "childId, date required" });
  await run("INSERT INTO growth_records (childId,date,heightCm,weightKg,headCircumference) VALUES (?,?,?,?,?)",
    [childId, date, heightCm||null, weightKg||null, headCircumference||null]);
  res.json({ ok: true });
});

r.get("/child/:childId", async (req, res) => {
  const rows = await all("SELECT * FROM growth_records WHERE childId=? ORDER BY date ASC", [req.params.childId]);
  res.json(rows);
});

export default r;
