const productDataAccess = require('../dataAccess/product');
const Product = require('../domain/Product');


class ProductRepository {
  static save(product) {
    return productDataAccess.insertProduct(product);
  }

  static getByName(name) {
    const productData = productDataAccess.fetchProductByName(name);
    if (productData) {
      return new Product(productData.name, productData.price);
    }
    throw new Error('PRODUCT NOT FOUND!', name);
  }
};

module.exports = ProductRepository;
