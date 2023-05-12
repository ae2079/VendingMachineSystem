const privates = {
  products: [],
};

const productDataAccess = {
  reset() {
    privates.products = [];
  },

  insertProduct(productData) {
    let product = privates.products.find(p => p.name === productData.name);
    if (product) {
      product.price = productData.price;
    } else {
      product = {
        name: productData.name,
        price: productData.price,
      };
      privates.products.push(product);
    }
    return product;
  },

  fetchProductByName(name) {
    return privates.products.find(p => p.name === name);
  },
};

module.exports = productDataAccess;
