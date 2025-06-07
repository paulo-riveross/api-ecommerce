import rateLimit from "express-rate-limit";

// Límite general: 100 peticiones cada 15 minutos por IP
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 50,
  message: "Demasiadas solicitudes desde esta IP, intenta más tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Límite estricto para login y registro: 10 intentos cada 15 minutos
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Demasiados intentos. Intenta de nuevo en unos minutos.",
  standardHeaders: true,
  legacyHeaders: false,
});
