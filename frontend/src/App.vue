<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <span class="navbar-brand">Product Management</span>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="row">
        <div class="col-md-4">
          <ProductForm
            :editProduct="selectedProduct"
            @product-saved="handleProductSaved"
            @form-reset="handleFormReset"
          />
        </div>
        <div class="col-md-8">
          <ProductList ref="productList" @edit-product="handleEditProduct" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import ProductForm from "./components/ProductForm.vue";

export default {
  name: "App",
  components: {
    ProductList,
    ProductForm,
  },
  data() {
    return {
      selectedProduct: null,
    };
  },
  methods: {
    handleEditProduct(product) {
      this.selectedProduct = product;
    },
    handleProductSaved() {
      if (this.$refs.productList) {
        this.$refs.productList.loadProducts();
        this.selectedProduct = null;
      }
    },
    handleFormReset() {
      this.selectedProduct = null;
    },
  },
};
</script>
