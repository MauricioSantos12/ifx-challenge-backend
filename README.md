# IFX Challenge Backend

API RESTful para gestión de Máquinas Virtuales construida con Express + Node.js, con actualizaciones en tiempo real mediante WebSockets.

## Requisitos

- Node.js >= 18
- Docker (para la base de datos)

## Instalación

```bash
git clone https://github.com/MauricioSantos12/ifx-challenge-backend.git
cd ifx-challenge-backend
npm install
```

## Configuración

Crear un archivo `.env` en la raíz del proyecto:

```env
JWT_SECRET=tu_clave_secreta
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=ifx_challenge_ms
```

## Base de Datos (Docker)

```bash
# Levantar MySQL con Docker
docker compose up -d

# Ejecutar migraciones
npm run migrate

# Ejecutar seed (usuarios iniciales + VMs de ejemplo)
npm run seed
```

## Ejecución

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

## Documentación API (Swagger)

Una vez iniciado el servidor, acceder a:

```
http://localhost:4000/api-docs
```

## Endpoints

### Auth

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| POST | `/api/v1/login` | Iniciar sesión | Público |
| POST | `/api/v1/logout` | Cerrar sesión | Público |

### Usuarios

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| GET | `/api/v1/users` | Listar usuarios | Admin |
| GET | `/api/v1/users/:id` | Obtener usuario | Admin |
| POST | `/api/v1/users` | Crear usuario | Admin |
| PUT | `/api/v1/users/:id` | Actualizar usuario | Admin |
| DELETE | `/api/v1/users/:id` | Eliminar usuario | Admin |

### Máquinas Virtuales

| Método | Ruta | Descripción | Acceso |
|--------|------|-------------|--------|
| GET | `/api/v1/vms` | Listar VMs activas | Admin, Cliente |
| GET | `/api/v1/vms/:id` | Obtener VM por ID | Admin, Cliente |
| POST | `/api/v1/vms` | Crear VM | Admin |
| PUT | `/api/v1/vms/:id` | Actualizar VM | Admin |
| DELETE | `/api/v1/vms/:id` | Eliminar VM (soft delete) | Admin |

## WebSockets (Socket.io)

El servidor emite eventos en tiempo real cuando hay cambios en las VMs. El frontend puede escuchar estos eventos para actualizar la UI sin necesidad de polling.

### Eventos emitidos

| Evento | Payload | Descripción |
|--------|---------|-------------|
| `vm:created` | `{ id, name, cores, ram, disk, os, status, ... }` | Se creó una nueva VM |
| `vm:updated` | `{ id, name, cores, ram, disk, os, status, ... }` | Se actualizó una VM |
| `vm:deleted` | `{ id }` | Se eliminó una VM (soft delete) |

## Usuarios Seed

| Email | Password | Rol |
|-------|----------|-----|
| admin@ifx.com | Admin123! | Admin |
| cliente@ifx.com | Cliente123! | Cliente |

## Estructura del Proyecto

```
src/
├── controllers/    # Manejo de requests/responses
├── services/       # Lógica de negocio + emisión de eventos
├── models/         # Conexión a base de datos (Knex)
├── middlewares/    # Auth, validación, errores
├── routes/         # Definición de rutas
├── utils/          # Validadores, swagger config
└── index.js        # Entry point + configuración Socket.io
migrations/         # Migraciones de base de datos
seeds/              # Datos iniciales
docker-compose.yml  # Contenedor MySQL
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia con nodemon (hot reload) |
| `npm start` | Inicia en producción |
| `npm run migrate` | Ejecuta migraciones |
| `npm run migrate:rollback` | Revierte última migración |
| `npm run seed` | Inserta datos iniciales |
| `npm run lint` | Ejecuta ESLint |
| `npm run lint:fix` | Corrige errores de lint |

## Seguridad

- JWT almacenado en cookie HttpOnly (no accesible desde JS del cliente)
- Helmet para headers de seguridad
- Rate limiting para prevenir abuso
- Validación de inputs con Zod
- Passwords hasheados con bcrypt
- CORS configurado con credentials

## Tecnologías

- Express
- Socket.io (WebSockets)
- Knex.js (query builder)
- MySQL2
- Docker
- JSON Web Tokens
- Zod (validación)
- Swagger (documentación)
- Helmet, CORS, Rate Limit

## Modelo de IA

Este proyecto fue desarrollado con asistencia de **Amazon Q Developer** (Claude Sonnet, by Anthropic), utilizado como copiloto de desarrollo dentro del IDE mediante el plugin de Amazon Q.

### Uso del modelo en el proyecto

- **Arquitectura y estructura**: Diseño de la estructura de carpetas y separación de responsabilidades (controllers, services, models, middlewares)
- **Autenticación y seguridad**: Configuración de JWT en cookies HttpOnly, middlewares de auth
- **WebSockets**: Implementación de Socket.io para notificaciones en tiempo real
- **Documentación**: Configuración de Swagger y generación del README
