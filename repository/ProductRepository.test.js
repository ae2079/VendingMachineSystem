const productDataAccess = require('../dataAccess/product');
const Product = require('../domain/Product');
const ProductRepository = require('../repository/ProductRepository');


describe('product repositpry tests', () => {
  beforeEach(() => {
    productDataAccess.reset();
  });

  it('should add a product to database', () => {
    const name = 'soda';
    const price = 2;
    const product = new Product(name, price);
    
    ProductRepository.save(product);
    
    const savedProduct = ProductRepository.getByName(name);
    
    expect(savedProduct.name).toBe(name);
    expect(savedProduct.price).toBe(price);
  });
});
