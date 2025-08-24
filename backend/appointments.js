import { Router } from "express";
import { all, run } from "../db.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);

r.post("/", async (req, res) => {
  const { childId, date, location, notes } = req.body;
  if (!childId || !date) return res.status(400).json({ error: "childId, date required" });
  await run("INSERT INTO appointments (childId,date,location,notes) VALUES (?,?,?,?)",
    [childId, date, location||null, notes||null]);
  res.json({ ok: true });
});

r.get("/:childId", async (req, res) => {
  const rows = await all("SELECT * FROM appointments WHERE childId=? ORDER BY date DESC", [req.params.childId]);
  res.json(rows);
});

export default r;
