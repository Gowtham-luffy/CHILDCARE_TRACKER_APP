import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { all } from "../db.js";

const r = Router();
r.use(requireAuth, requireRole("admin"));

r.get("/reports/coverage", async (req, res) => {
  const children = await all("SELECT id FROM children", []);
  const given = await all("SELECT childId, COUNT(*) as doses FROM vaccinations GROUP BY childId", []);
  const map = Object.fromEntries(given.map(g => [g.childId, g.doses]));
  const totalChildren = children.length;
  const totalGiven = given.reduce((acc,g)=>acc+g.doses,0);
  res.json({ totalChildren, totalDosesGiven: totalGiven, avgDosesPerChild: totalChildren? totalGiven/totalChildren : 0, details: map });
});

export default r;
