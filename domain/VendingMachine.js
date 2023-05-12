const States = require('../enum/States');
const ProductShelf = require('./ProductShelf');


class VendingMachine {
  constructor(id, shelves = {}, state = States.IDLE) {
    this.id = id;
    this.shelves = shelves;
    this.state = state;
  }

  addNewShelf(number, product, count) {
    this.shelves[number] = new ProductShelf(product, count);
  }

  chargeShelf(number, count) {
    if (this.shelves[number]) {
      this.shelves[number].charge(count);
      return;
    }
    throw new Error('THE ENTERED NUMBER IS NOT CORRECT!', {number});
  }

  getExistingProducts() {
    return Object.fromEntries(Object.entries(this.shelves).filter(([k, v]) => v.count > 0));
  }

  insertCoin(count) {
    if (this.state === States.IDLE) {
      this.insertedCoin = count;
      this.state = States.SELECTING_PRODUCT;
      return;
    }
    throw new Error('CAN NOT INSERT COIN NOW!', {state: this.state});
  }

  buyProduct(number, count) {
    if (this.state === States.SELECTING_PRODUCT) {
      if (this.shelves[number]) {
        const remainedCoin = this.shelves[number].buy(this.insertedCoin, count);
        this.state = States.IDLE;
        return {remainedCoin, productName: this.shelves[number].product.getName(), count};
      }
      throw new Error('THE ENTERED NUMBER IS NOT CORRECT!', {number});
    }
    throw new Error('YOU SHOULD INSERT SOME COIN FIRST!');
  }
};

module.exports = VendingMachine;
