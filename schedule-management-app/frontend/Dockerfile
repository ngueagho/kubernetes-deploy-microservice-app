# # Build stage
# FROM node:18 AS build
# WORKDIR /app
# COPY ./src ./src
# COPY package*.json ./
# RUN npm install
# RUN npm run build

# # Production stage
# FROM nginx:stable
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


# Étape 1 : Construction avec Node.js
FROM node:18 AS build
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le dossier public et src dans l'image
COPY ./public ./public
COPY ./src ./src

# Construire l'application React
RUN npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:stable
# Copier le build généré dans le dossier par défaut de Nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Exposer le port 80 pour servir l'application
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]

