<template>
  <div class="product-list">
    <h2>Products</h2>

    <!-- Loading state -->
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <!-- Empty state -->
    <div v-if="!loading && products.length === 0" class="alert alert-info">
      No products available. Add your first product!
    </div>

    <!-- Products table -->
    <div v-if="!loading && products.length > 0" class="table-responsive">
      <table class="table table-hover">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.description || "No description" }}</td>
            <td>${{ formatPrice(product.price) }}</td>
            <td>
              <span :class="getStockClass(product.stock)">
                {{ product.stock }}
              </span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button
                  @click="editProduct(product)"
                  class="btn btn-sm btn-primary me-2"
                  title="Edit product"
                >
                  Edit
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="btn btn-sm btn-danger"
                  title="Delete product"
                  :disabled="isDeleting === product.id"
                >
                  {{ isDeleting === product.id ? "Deleting..." : "Delete" }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  name: "ProductList",

  data() {
    return {
      products: [],
      loading: false,
      error: null,
      isDeleting: null,
    };
  },

  methods: {
    formatPrice(price) {
      return Number(price).toFixed(2);
    },

    getStockClass(stock) {
      return {
        "text-danger": stock <= 5,
        "text-warning": stock > 5 && stock <= 20,
        "text-success": stock > 20,
      };
    },

    async loadProducts() {
      this.loading = true;
      this.error = null;

      try {
        const response = await ProductService.getAll();
        this.products = response.data;
      } catch (error) {
        this.error = "Failed to load products. Please try again later.";
        console.error("Error loading products:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteProduct(id) {
      if (!confirm("Are you sure you want to delete this product?")) {
        return;
      }

      this.isDeleting = id;

      try {
        await ProductService.delete(id);
        await this.loadProducts();
        this.$emit("product-deleted", id);
      } catch (error) {
        this.error = "Failed to delete product. Please try again.";
        console.error("Error deleting product:", error);
      } finally {
        this.isDeleting = null;
      }
    },

    editProduct(product) {
      this.$emit("edit-product", { ...product });
    },
  },

  mounted() {
    this.loadProducts();
  },

  errorCaptured(err, vm, info) {
    this.error = "An unexpected error occurred.";
    console.error("Error in ProductList component:", err, info);
    return false;
  },
};
</script>

<style scoped>
.product-list {
  padding: 1rem;
}

.table th {
  font-weight: 600;
}

.btn-group {
  white-space: nowrap;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  margin: 2rem auto;
}
</style>
