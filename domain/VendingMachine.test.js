const VendingMachine = require('./VendingMachine')
const Product = require('./Product');
const States = require('../enum/States');

const sampleProduct = new Product('soda', 3);


describe('vending machine tests', () => {
  it('should charge shelf', () => {
    const vendingMachine = new VendingMachine(123);
    const shelfNumber = 11;
    const productCount = 2;
    vendingMachine.addNewShelf(shelfNumber, sampleProduct, productCount);

    expect(vendingMachine.shelves[shelfNumber].count).toBe(productCount);

    const chargeCount = 5;
    vendingMachine.chargeShelf(shelfNumber, chargeCount);

    expect(vendingMachine.shelves[shelfNumber].count).toBe(productCount + chargeCount);
  });

  it('should throw error because of shelf number is not correct', (done) => {
    const vendingMachine = new VendingMachine(123);
    const shelfNumber = 11;
    vendingMachine.addNewShelf(shelfNumber, sampleProduct, 2);

    try {
      vendingMachine.chargeShelf(shelfNumber + 1, 5);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('THE ENTERED NUMBER IS NOT CORRECT!');
      done();
    }
  });

  it('should get existing products successfully', () => {
    const vendingMachine = new VendingMachine(123);
    const shelfNumber = 11;
    const productCount = 2;
    vendingMachine.addNewShelf(shelfNumber, sampleProduct, productCount);

    const coffee = new Product('coffee', 5);
    const coffeeShelfNumber = 15;
    const coffeeCount = 0;
    vendingMachine.addNewShelf(coffeeShelfNumber, coffee, coffeeCount);

    const existingProducts = vendingMachine.getExistingProducts();

    expect(Object.keys(existingProducts)).toHaveLength(1);
    expect(existingProducts[shelfNumber]).toBeDefined();
    expect(existingProducts[coffeeShelfNumber]).toBeUndefined();
  });

  it('should insert coin successfully', () => {
    const vendingMachine = new VendingMachine(123);

    expect(vendingMachine.state).toBe(States.IDLE);

    const coinCount = 5;
    vendingMachine.insertCoin(coinCount);

    expect(vendingMachine.state).toBe(States.SELECTING_PRODUCT);
    expect(vendingMachine.insertedCoin).toBe(coinCount);
  });

  it('should throw error because of insert coin in select product state', (done) => {
    const vendingMachine = new VendingMachine(123);
    
    vendingMachine.insertCoin(5);
    
    expect(vendingMachine.state).toBe(States.SELECTING_PRODUCT);
    try {
      vendingMachine.insertCoin(7);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('CAN NOT INSERT COIN NOW!');
      done();
    }
  });

  it('should buy product successfully', () => {
    const vendingMachine = new VendingMachine(123);
    const shelfNumber = 11;
    vendingMachine.addNewShelf(shelfNumber, sampleProduct, 12);

    expect(vendingMachine.state).toBe(States.IDLE);

    const insertCoinCount = 10;
    vendingMachine.insertCoin(insertCoinCount);

    expect(vendingMachine.state).toBe(States.SELECTING_PRODUCT);

    const buyCount = 2;
    const buyResult = vendingMachine.buyProduct(shelfNumber, buyCount);

    expect(buyResult.count).toBe(buyCount);
    expect(buyResult.remainedCoin).toBe(insertCoinCount - buyCount * sampleProduct.getPrice());
    expect(buyResult.productName).toBe(sampleProduct.getName());
  });

  it('should throw error because of buy product in idle state', (done) => {
    const vendingMachine = new VendingMachine(123);
    const shelfNumber = 11;
    vendingMachine.addNewShelf(shelfNumber, sampleProduct, 12);

    expect(vendingMachine.state).toBe(States.IDLE);

    try {
      vendingMachine.buyProduct(shelfNumber, 2);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('YOU SHOULD INSERT SOME COIN FIRST!');
      done();
    }
  });

  it('should throw error because of the shelf number is not exist', (done) => {
    const vendingMachine = new VendingMachine(123);
    const shelfNumber = 11;
    vendingMachine.addNewShelf(shelfNumber, sampleProduct, 12);

    expect(vendingMachine.state).toBe(States.IDLE);

    vendingMachine.insertCoin(10);

    expect(vendingMachine.state).toBe(States.SELECTING_PRODUCT);
    try {
      vendingMachine.buyProduct(shelfNumber + 1, 2);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('THE ENTERED NUMBER IS NOT CORRECT!');
      done();
    }
  });
});
