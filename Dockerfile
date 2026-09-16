# CodeMaster Pro - Production Dockerfile
FROM node:20-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
EXPOSE 5000
CMD ["node", "server.js"]

FROM node:20-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build
# Serve with nginx in production
FROM nginx:alpine AS production
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
