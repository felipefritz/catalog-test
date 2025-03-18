# Sistema de Gestión de Catálogos

Este proyecto implementa un sistema completo para la gestión de catálogos, con autenticación de usuarios, autorización basada en roles, y una interfaz web moderna. La aplicación está completamente containerizada usando Docker y puede desplegarse con un solo comando.

## Arquitectura

El sistema está compuesto por cuatro componentes principales:

1. **Base de datos MongoDB**: Almacena usuarios, catálogos y otros datos
2. **API Backend (NestJS)**: Implementa la lógica de negocio y expone endpoints RESTful
3. **API Gateway (Express Gateway)**: Gestiona la seguridad, caché y enrutamiento
4. **Frontend (React)**: Interfaz de usuario moderna y responsiva

## Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) v16 o superior (solo para desarrollo)
- [npm](https://www.npmjs.com/) v7 o superior (solo para desarrollo)

## Inicio rápido

Para iniciar el sistema completo:

```bash
git clone https://github.com/felipefritz/catalog-test.git
cd catalog-test

docker-compose up -d
```

Una vez iniciados, los servicios estarán disponibles en:

- **Frontend**: http://localhost:80
- **API Gateway**: http://localhost:8080
- **API Backend**: http://localhost:3000
- **MongoDB**: mongodb://localhost:27017 (requiere autenticación)

## Estructura del proyecto

```
catalogo-system/
├── backend/               # API en NestJS
├── catalog-api-gateway/   # Express Gateway
├── frontend/              # Aplicación React
├── monitoring/            # Aplicación Prometheus
├── compose.yml     # Configuración de servicios
└── README.md              # Este archivo
```

## Desarrollo local

### Backend (NestJS)

```bash
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Iniciar en modo desarrollo
nest start

# Ejecutar migraciones de base de datos
npm run migrate:up
```

### API Gateway (Express Gateway)

```bash
cd catalog-api-gateway

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

### Frontend (React)

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

## Características principales

### Backend (API)

- API REST completa implementada con NestJS
- Autenticación con JWT
- Autorización basada en roles
- Validación de datos con class-validator
- Conectividad con MongoDB mediante Mongoose
- Rate limiting para prevenir abusos

### Gateway

- Enrutamiento de API centralizado
- Aplicación de políticas de seguridad
- JWT validation
- Rate limiting

### Frontend

- Interfaz moderna basada en React
- Gestión de estado con Redux Toolkit
- Diseño responsivo
- Formularios con validación
- Paginación y búsqueda en listados
- Caché de datos en el cliente

## Uso de la API

### Autenticación

```bash
# Obtener token JWT
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@ejemplo.com","password":"admin123"}'
```

### Operaciones CRUD para catálogos

```bash
# Obtener todos los catálogos
curl http://localhost:8080/catalogs \
  -H "Authorization: Bearer <tu-token>"

# Crear un nuevo catálogo
curl -X POST http://localhost:8080/catalogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <tu-token>" \
  -d '{"nombre":"Nuevo Catálogo","descripcion":"Descripción del catálogo","items":[]}'
```

## Usuarios predeterminados

El sistema viene con un usuario administrador por defecto:

- **Email**: admin@ejemplo.com
- **Contraseña**: admin123
- **Rol**: admin

## Configuración de Docker

El sistema usa Docker Compose para orquestar todos los servicios. La configuración incluye:

- Persistencia de datos con volúmenes de Docker
- Red dedicada para comunicación entre servicios
- Variables de entorno para configuración
- Reinicio automático de servicios en caso de fallos

### Variables de entorno

#### MongoDB

- `MONGO_INITDB_ROOT_USERNAME`: Usuario administrador (por defecto: root)
- `MONGO_INITDB_ROOT_PASSWORD`: Contraseña del administrador (por defecto: example)
- `MONGO_INITDB_DATABASE`: Nombre de la base de datos (por defecto: catalogdb)

#### Backend API

- `MONGODB_URI`: URI de conexión a MongoDB
- `JWT_SECRET`: Clave secreta para tokens JWT
- `PORT`: Puerto de la API (por defecto: 3000)

## Desarrollo y despliegue

### Modificar el frontend

```bash
cd frontend
# Realizar cambios
npm run build
# Reconstruir e iniciar el contenedor
docker-compose up -d --build frontend
```

### Modificar el backend

```bash
cd backend
# Realizar cambios
# Reconstruir e iniciar el contenedor
docker-compose up -d --build api
```