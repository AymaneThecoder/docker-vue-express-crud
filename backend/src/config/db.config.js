module.exports = {
  HOST: process.env.DB_HOST || "database",
  USER: process.env.DB_USER || "root",
  PASSWORD: process.env.DB_PASSWORD || "password123",
  DB: process.env.DB_NAME || "productsdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 5,
  },
};
