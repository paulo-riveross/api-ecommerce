import jwt from "jsonwebtoken";

/**
 * Middleware para verificar si el usuario está autenticado mediante JWT.
 */
export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No autorizado: token faltante o inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contiene { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};

/**
 * Middleware para verificar si el usuario tiene rol de administrador.
 */
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Acceso denegado: solo administradores" });
  }
  next();
};
