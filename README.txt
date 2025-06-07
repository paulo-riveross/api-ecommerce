# Back-JWT

API RESTful para gestión de usuarios, productos, carrito y órdenes, con autenticación JWT y documentación Swagger.

## Características

- Registro e inicio de sesión de usuarios con JWT
- Roles de usuario y administrador
- CRUD de productos (solo admin puede crear/editar/eliminar)
- Carrito de compras por usuario autenticado
- Creación y consulta de órdenes
- Documentación interactiva con Swagger en `/api-docs`

## Instalación

1. Clona el repositorio.
2. Instala dependencias:

   ```sh
   npm install
   ```

3. Crea un archivo `.env` con tus variables de entorno (ver ejemplo en el repo).

## Variables de entorno

- `MONGO_URI`: URL de conexión a MongoDB
- `JWT_SECRET`: Secreto para firmar JWT
- `PORT`: Puerto del servidor (opcional, por defecto 5000)

## Uso

Inicia el servidor en modo desarrollo:

```sh
npm run dev
```

O en modo producción:

```sh
npm start
```

## Endpoints principales

- `POST /api/auth/register` — Registro de usuario
- `POST /api/auth/login` — Login y obtención de token
- `GET /api/auth/profile` — Perfil del usuario autenticado
- `GET /api/products` — Listar productos
- `POST /api/products` — Crear producto (admin)
- `GET /api/cart` — Ver carrito
- `POST /api/cart` — Agregar al carrito
- `POST /api/orders` — Crear orden

Consulta la documentación Swagger en [http://localhost:8080/api-docs](http://localhost:8080/api-docs) para ver todos los endpoints y probarlos.

## Licencia

MIT