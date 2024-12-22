<template>
  <div class="product-edit">
    <div class="card">
      <div class="card-header">
        <h3>Edit Product</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="updateProduct">
          <div class="form-group mb-3">
            <label for="name" class="form-label">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="product.name"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label for="description" class="form-label">Description</label>
            <textarea
              class="form-control"
              id="description"
              v-model="product.description"
              rows="3"
            ></textarea>
          </div>

          <div class="form-group mb-3">
            <label for="price" class="form-label">Price</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model.number="product.price"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label for="stock" class="form-label">Stock</label>
            <input
              type="number"
              class="form-control"
              id="stock"
              v-model.number="product.stock"
              min="0"
              required
            />
          </div>

          <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              {{ loading ? "Updating..." : "Update Product" }}
            </button>
            <button type="button" class="btn btn-secondary" @click="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Alert for error messages -->
    <div v-if="error" class="alert alert-danger mt-3">
      {{ error }}
    </div>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  name: "ProductEdit",
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: 0,
        stock: 0,
      },
      loading: false,
      error: null,
    };
  },
  async created() {
    await this.loadProduct();
  },
  methods: {
    async loadProduct() {
      try {
        this.loading = true;
        this.error = null;
        const response = await ProductService.getById(this.id);
        this.product = response.data;
      } catch (err) {
        this.error = "Failed to load product details";
        console.error("Error loading product:", err);
      } finally {
        this.loading = false;
      }
    },
    async updateProduct() {
      try {
        this.loading = true;
        this.error = null;

        // Validation
        if (
          !this.product.name ||
          this.product.price < 0 ||
          this.product.stock < 0
        ) {
          this.error = "Please fill all required fields with valid values";
          return;
        }

        await ProductService.update(this.id, this.product);
        this.$emit("product-updated", this.product);
        this.$emit("update-success");
      } catch (err) {
        this.error = "Failed to update product";
        console.error("Error updating product:", err);
      } finally {
        this.loading = false;
      }
    },
    cancel() {
      this.$emit("cancel");
    },
  },
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.loadProduct();
        }
      },
    },
  },
};
</script>

<style scoped>
.product-edit {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #f8f9fa;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  font-weight: 500;
}

.alert {
  margin-top: 1rem;
}

button {
  min-width: 120px;
}

.btn-secondary {
  margin-left: 10px;
}
</style>
