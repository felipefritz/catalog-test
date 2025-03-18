FROM node:18-alpine

WORKDIR /app

# Instalar NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación
RUN npm run build

# Verificar estructura generada
RUN ls -la dist/

EXPOSE 3000

# Modificar el comando para usar la estructura correcta
CMD ["node", "dist/src/main.js"]