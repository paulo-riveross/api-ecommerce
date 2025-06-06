import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { setupSwagger } from "./swagger.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
console.log("✅ Middleware JSON cargado");

// Ruta de prueba para debug
app.post("/debug", (req, res) => {
  console.log("BODY DEBUG:", req.body);
  res.send("Ok");
});

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Documentación Swagger
setupSwagger(app);

// Inicio del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
