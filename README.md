# Aplicación de Gestión de Finanzas

Esta es una API backend para una aplicación de gestión de finanzas personales, construida con Node.js y Express.js.

## Características

- Autenticación de usuarios con JWT
- Gestión de cuentas bancarias
- Registro de transacciones (ingresos y gastos)
- Presupuestos por categoría
- Seguridad con Helmet y CORS

## Instalación

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno en un archivo `.env`:
   - `DATABASE_URL`: URI de PostgreSQL (ej: postgres://username:password@localhost:5432/finanzas)
   - `JWT_SECRET`: Secreto para JWT
   - `PORT`: Puerto del servidor (opcional, por defecto 3000)
4. Ejecuta el servidor: `node server.js`

## Uso

La API está disponible en `http://localhost:3000`.

### Endpoints

- `POST /api/auth/register`: Registrar un nuevo usuario
- `POST /api/auth/login`: Iniciar sesión
- `POST /api/accounts`: Crear una cuenta (requiere autenticación)
- `GET /api/accounts`: Obtener cuentas del usuario
- `POST /api/transactions`: Crear una transacción
- `GET /api/transactions`: Obtener transacciones del usuario
- `POST /api/budgets`: Crear un presupuesto
- `GET /api/budgets`: Obtener presupuestos del usuario

## Dependencias

- Express.js
- Sequelize
- pg
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- helmet
- morgan
