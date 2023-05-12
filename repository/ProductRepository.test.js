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
    
    expect(savedProduct.getName()).toBe(name);
    expect(savedProduct.getPrice()).toBe(price);
  });

  it('should overwrite product data in database', () => {
    const name = 'soda';
    const firstPrice = 2;
    const product = new Product(name, firstPrice);

    ProductRepository.save(product);

    const newPrice = firstPrice + 1;
    const updatedProduct = new Product(name, newPrice);

    ProductRepository.save(updatedProduct);

    const savedProduct = ProductRepository.getByName(name);

    expect(savedProduct.getName()).toBe(name);
    expect(savedProduct.getPrice()).toBe(newPrice);
  });

  it('should not found a product with this name', () => {
    const name = 'soda';
    const price = 2;
    const product = new Product(name, price);

    ProductRepository.save(product);

    expect(() => ProductRepository.getByName('invalid')).toThrow(Error);
  });
});
