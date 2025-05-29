# Post-App (Redis, Sequelize, Express)

Este proyecto es una API REST desarrollada con **Node.js**, **Express** y **Sequelize**, que utiliza **Redis + BullMQ** para manejo de colas. Ideal para sistemas escalables que requieren procesamiento en segundo plano (como envíos masivos, tareas diferidas, etc).

## 📦 Tecnologías Usadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/) o MariaDB
- [Redis](https://redis.io/)
- [BullMQ](https://docs.bullmq.io/) para manejo de colas
- [Docker](https://www.docker.com/) (para Redis local)

---

## 📁 Estructura del Proyecto

```bash
.
├── src/
│     ├── app/
│     ├── auth/
│     ├── controllers/
│     ├── db/
│     ├── middlewares/
│     ├── models/
│     ├── queues/
│     ├── routes/
│     ├── services/
│     ├── utils/
│     ├── workers/
│     ├── config.js
│     └── index.js
├── uploads/
├── .env
└── README.md
```

## Installation

# 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

# 2. Instala dependencias

```bash
  npm install
```

# 3. Configura las variables de entorno

Crea un archivo .env y completa con tu configuración:

```bash
# Environment variables for the application

# Application configuration
PORT = 3000
API_KEY=71f3a2b2-643f-4b57-9c29-9019f8f69d6b
CORS_ORIGIN=http://localhost:4200

# Database configuration
MYSQL_HOST = localhost
MYSQL_PORT =  3306
MYSQL_USER = root
MYSQL_PASSWORD =
MYSQL_DB = post-app
MYSQL_DIALECT = mysql

# JWT configuration
JWT_SECRET=palabra clave
JWT_EXPIRES_IN=7d

# Redis configuration
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Email configuration
EMAIL_USER="mephisto0130@gmail.com"
EMAIL_PASS="ejor xuck tprp homw"
```

# 4. Inicia Redis con Docker (si no lo tienes instalado)

```bash
docker run -d -p 6379:6379 --name redis redis
```

## Ejecutar en Desarrollo

# Servidor principal (API)

```bash
npm run dev
```

# Worker para procesar colas

```bash
  npm run worker
```

## Endpoints disponibles

# Método Ruta Descripción

```bash
POST /roles Crear rol (usa cola)
GET /roles Listar roles
POST /auth/login Login con JWT
GET /users Listar usuarios
POST /posts Crear post (ejemplo)
```

Documentación completa pronto disponible en Swagger.

## Scripts útiles

```bash
npm run dev        # Ejecuta API en desarrollo
npm run worker     # Inicia worker para procesar colas
npm run start      # Inicia API en modo producción
```

## Seguridad

```bash
Headers seguros con helmet
Protección de rutas con JWT
```

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/LMG87/post-app-server)
