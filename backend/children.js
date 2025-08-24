import { Router } from "express";
import { all, run } from "../db.js";
import { requireAuth } from "../middleware/auth.js";
import { v4 as uuid } from "uuid";

const r = Router();
r.use(requireAuth);

r.get("/", async (req, res) => {
  const { id, role } = req.user;
  if (role === "mother") {
    const rows = await all(`
      SELECT c.* FROM children c
      JOIN mothers_children mc ON mc.childId=c.id
      WHERE mc.motherId=?
      ORDER BY c.createdAt DESC`, [id]);
    return res.json(rows);
  } else if (role === "worker" || role === "admin") {
    const rows = await all("SELECT * FROM children ORDER BY createdAt DESC", []);
    return res.json(rows);
  }
  res.json([]);
});

r.post("/", async (req, res) => {
  const { role, id: userId } = req.user;
  if (!["worker","admin"].includes(role)) return res.status(403).json({ error: "Forbidden" });
  const { name, dob, gender, village, motherId } = req.body;
  if (!name || !dob) return res.status(400).json({ error: "name + dob required" });
  const childId = uuid();
  await run("INSERT INTO children (id,name,dob,gender,village,workerId) VALUES (?,?,?,?,?,?)",
    [childId, name, dob, gender||null, village||null, role==="worker"?userId:null]);
  if (motherId) {
    await run("INSERT INTO mothers_children (id,motherId,childId) VALUES (?,?,?)", [uuid(), motherId, childId]);
  }
  res.json({ id: childId });
});

export default r;
