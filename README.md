# Docker Product Management System

Un système de gestion de produits complet construit avec Vue.js, Express.js et MySQL, conteneurisé avec Docker.

## Members Of The Group
Aymane EL HAMRAOUI G-46
Ferkous Imed Eddine G-46
Kartouti yassine G-44

## Prérequis

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

## Installation et démarrage

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/docker-vue-express-crud.git
cd docker-vue-express-crud
```

### 2. Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
DB_HOST=database
DB_USER=root
DB_PASSWORD=password123
DB_NAME=productsdb
```

### 3. Construire et démarrer les conteneurs

```bash
docker-compose up -d --build
```

### 4. Vérifier les services

```bash
docker-compose ps
```

### 5. Accéder aux URLs

- **Frontend** : [http://localhost:8080](http://localhost:8080)
- **Backend API** : [http://localhost:3000/api](http://localhost:3000/api)
- **Base de données MySQL** : localhost:3306

## API Endpoints

### Produits

| Méthode | Endpoint           | Description             |
|----------|--------------------|-------------------------|
| GET      | `/api/products`    | Liste des produits      |
| GET      | `/api/products/:id`| Détail d'un produit     |
| POST     | `/api/products`    | Créer un produit        |
| PUT      | `/api/products/:id`| Modifier un produit     |
| DELETE   | `/api/products/:id`| Supprimer un produit    |

### Format JSON des produits

```json
{
  "name": "Nom du produit",
  "description": "Description du produit",
  "price": 99.99,
  "stock": 100
}
```

## Structure du projet

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── app.js
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.vue
│   ├── Dockerfile
│   └── package.json
├── database/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

## Fonctionnalités

- Affichage des produits
- Ajout de nouveaux produits
- Modification des produits existants
- Suppression de produits
- Validation des données
- Interface responsive avec Bootstrap

## Tests

### Tests avec cURL

```bash
# Liste des produits
curl http://localhost:3000/api/products

# Créer un produit
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Description","price":99.99,"stock":10}'
```

## Commandes Docker utiles

```bash
# Voir les logs
docker-compose logs

# Redémarrer les services
docker-compose restart

# Arrêter les services
docker-compose down

# Reconstruire les services
docker-compose up -d --build
```

## Résolution des problèmes

### Les conteneurs ne démarrent pas

- **Vérifier les logs** :
  ```bash
  docker-compose logs
  ```
- **Reconstruire les conteneurs** :
  ```bash
  docker-compose up -d --build
  ```

### Problèmes de base de données

- **Recréer les volumes** :
  ```bash
  docker-compose down -v
  ```
- **Redémarrer les conteneurs** :
  ```bash
  docker-compose up -d
  ```

## Licence

Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).
