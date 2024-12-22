import axios from "axios";

// Créer une instance axios avec une configuration personnalisée
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 15000, // Augmenter le timeout à 15 secondes
  headers: {
    "Content-Type": "application/json",
  },
});

class ProductService {
  async getAll() {
    try {
      const response = await api.get("/products");
      return response;
    } catch (error) {
      console.error("Error fetching products:", error.message);
      throw error;
    }
  }

  async create(data) {
    try {
      const response = await api.post("/products", data);
      return response;
    } catch (error) {
      console.error("Error creating product:", error.message);
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await api.put(`/products/${id}`, data);
      return response;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error.message);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error.message);
      throw error;
    }
  }
}

export default new ProductService();
