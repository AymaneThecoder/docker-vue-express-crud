const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
require("./routes/product.routes")(app);

const initialProducts = [
  {
    name: "Laptop Pro",
    description: "High performance laptop for professionals",
    price: 1299.99,
    stock: 50,
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse",
    price: 29.99,
    stock: 100,
  },
  {
    name: "Gaming Keyboard",
    description: "Mechanical RGB gaming keyboard",
    price: 89.99,
    stock: 75,
  },
  {
    name: "4K Monitor",
    description: "27-inch 4K LED Monitor",
    price: 399.99,
    stock: 30,
  },
  {
    name: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI",
    price: 49.99,
    stock: 120,
  },
];

const PORT = process.env.PORT || 3000;

async function initializeDatabase() {
  try {
    // Force true va recréer les tables
    await db.sequelize.sync({ force: true });
    console.log("Tables créées!");

    // Insérer les données initiales
    const Product = db.products;
    await Product.bulkCreate(initialProducts);
    console.log("Données initiales insérées!");
  } catch (error) {
    console.error("Erreur d'initialisation:", error);
  }
}

// Initialiser la base de données et démarrer le serveur
initializeDatabase()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erreur de démarrage:", err);
  });
