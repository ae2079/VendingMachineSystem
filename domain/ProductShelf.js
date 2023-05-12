

class ProductShelf {
  constructor(product, count) {
    this.product = product;
    this.count = count;
  }

  charge(count) {
    this.count = this.count + count;
  }

  buy(coin, count) {
    if (count <= this.count) {
      const price = this.product.getPrice();
      const cost = price * count;
      if (coin >= cost) {
        this.count = this.count - count;
        return coin - cost;
      }
      throw new Error('THE COST IS MORE THAN YOUR MONEY!', {cost, coin});
    }
    throw new Error('DONT HAVE ENOUGH PRODUCT!', {inStock: this.count});
  }
  
  toDB() {
    return {
      productName: this.product.getName(),
      count: this.count,
    };
  }
};

module.exports = ProductShelf;