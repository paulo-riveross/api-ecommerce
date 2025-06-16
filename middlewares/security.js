import helmet from "helmet";
import cors from "cors";

// Helmet configura cabeceras HTTP seguras
export const securityHeaders = helmet();

// CORS: permite solicitudes desde orígenes definidos
export const corsConfig = cors({
  origin: [
    "http://localhost:5173",  // frontend local con Vite
    // "https://mi-front-produccion.com"  // dominio en producción
  ],
  credentials: true, // permite enviar cookies o headers con credenciales
});
