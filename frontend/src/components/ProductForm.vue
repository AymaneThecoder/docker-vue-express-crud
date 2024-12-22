<template>
  <div class="product-form">
    <h3>{{ isEdit ? "Edit Product" : "Add New Product" }}</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Name:</label>
        <input
          v-model="product.name"
          type="text"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label>Description:</label>
        <textarea v-model="product.description" class="form-control"></textarea>
      </div>

      <div class="form-group">
        <label>Price:</label>
        <input
          v-model="product.price"
          type="number"
          step="0.01"
          class="form-control"
          required
        />
      </div>

      <div class="form-group">
        <label>Stock:</label>
        <input
          v-model="product.stock"
          type="number"
          class="form-control"
          required
        />
      </div>

      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Update" : "Create" }}
      </button>
      <button type="button" @click="resetForm" class="btn btn-secondary">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
import ProductService from "@/services/ProductService";

export default {
  name: "ProductForm",
  props: {
    editProduct: {
      type: Object,
      default: null,
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
      isEdit: false,
    };
  },
  watch: {
    editProduct(newValue) {
      if (newValue) {
        this.product = { ...newValue };
        this.isEdit = true;
      }
    },
  },
  methods: {
    handleSubmit() {
      const action = this.isEdit
        ? ProductService.update(this.product.id, this.product)
        : ProductService.create(this.product);

      action
        .then(() => {
          this.$emit("product-saved");
          this.resetForm();
        })
        .catch((error) => {
          console.error("Error saving product:", error);
        });
    },
    resetForm() {
      this.product = {
        name: "",
        description: "",
        price: 0,
        stock: 0,
      };
      this.isEdit = false;
      this.$emit("form-reset");
    },
  },
};
</script>
