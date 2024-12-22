FROM node:14

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier la configuration
COPY .eslintrc.js ./
COPY vue.config.js ./

# Copier le reste du code
COPY . .

# Build pour la production
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]