import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
console.log("✅ Middleware JSON cargado");

app.post("/debug", (req, res) => {
  console.log("BODY DEBUG:", req.body);
  res.send("Ok");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Servidor en puerto", PORT));

setupSwagger(app);
