import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { initDb } from "./db.js";
import authRoutes from "./routes/auth.js";
import childrenRoutes from "./routes/children.js";
import vaccinationRoutes from "./routes/vaccinations.js";
import growthRoutes from "./routes/growth.js";
import appointmentRoutes from "./routes/appointments.js";
import adminRoutes from "./routes/admin.js";
import syncRoutes from "./routes/sync.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, service: "childcare-backend" }));

app.use("/auth", authRoutes);
app.use("/children", childrenRoutes);
app.use("/vaccinations", vaccinationRoutes);
app.use("/growth", growthRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/admin", adminRoutes);
app.use("/sync", syncRoutes);

const PORT = process.env.PORT || 4000;
initDb().then(() => {
  app.listen(PORT, () => console.log(`API running http://localhost:${PORT}`));
});
