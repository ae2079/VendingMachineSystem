const ProductShelf = require('./ProductShelf');
const Product = require('./Product');

const sampleProduct = new Product('soda', 3);


describe('product shelf tests', () => {
  it('should increase product count in shelf', () => {
    const count = 12;
    const productShelf = new ProductShelf(sampleProduct, count);

    const chargeCount = 5;
    productShelf.charge(chargeCount);

    expect(productShelf.count).toBe(count + chargeCount);
  });

  it('should buy product successfully', () => {
    const count = 12;
    const productShelf = new ProductShelf(sampleProduct, count);

    const coin = 10;
    const buyCount = 3;
    const remaindCoin = productShelf.buy(coin, buyCount);

    expect(remaindCoin).toBe(coin - sampleProduct.getPrice() * buyCount);
    expect(productShelf.count).toBe(count - buyCount);
  });

  it('should throw error because of not enough products', () => {
    const count = 2;
    const productShelf = new ProductShelf(sampleProduct, count);

    const coin = 10;
    const buyCount = 3;
    
    try {
      productShelf.buy(coin, buyCount);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('DONT HAVE ENOUGH PRODUCT!');
    }
  });

  it('should throw error because of not enough coin', () => {
    const count = 12;
    const productShelf = new ProductShelf(sampleProduct, count);

    const coin = 1;
    const buyCount = 3;

    try {
      productShelf.buy(coin, buyCount);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('THE COST IS MORE THAN YOUR MONEY!');
    }
  });

  it('test toDB method', () => {
    const count = 12;
    const productShelf = new ProductShelf(sampleProduct, count);

    const presentation = productShelf.toDB();

    expect(presentation.count).toBe(count);
    expect(presentation.productName).toBe(sampleProduct.name);
    expect(presentation.product).toBeUndefined();
  });
});
