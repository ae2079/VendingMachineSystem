const Controller = require('../controller/Controller');
const ProductRepository = require('../repository/ProductRepository');
const productDataAccess = require('../dataAccess/product');
const vendingMachineDataAccess = require('../dataAccess/vendingMachine');

let controller;


describe('testing scenarios of the system', () => {
  beforeEach(() => {
    productDataAccess.reset();
    vendingMachineDataAccess.reset();
    controller = new Controller();
  });

  it('should create new vending machine successfully', () => {
    const id = 123;
    controller.createNewVendingMachine(id);

    const existingIds = controller.getAllVendingMachineIds();

    expect(existingIds).toHaveLength(1);
    expect(existingIds).toContain(id);
  });

  it('should create new product successfully', () => {
    const productName = 'soda';
    const productPrice = 3;
    controller.createNewProduct(productName, productPrice);

    const savedProduct = ProductRepository.getByName(productName);

    expect(savedProduct.getName()).toBe(productName);
    expect(savedProduct.getPrice()).toBe(productPrice);
  });

  it('should select vending machine successfully', () => {
    const id = 123;
    controller.createNewVendingMachine(id);

    controller.selectVendingMachine(id);

    expect(controller.selectedVendingMachine).toBeDefined();
    expect(controller.selectedVendingMachine.id).toBe(id);
  });

  it('should throw error because of vending machine does not selected', (done) => {
    const id = 123;
    controller.createNewVendingMachine(id);

    try {
      controller.addNewShelfToVendingMachine(11, 'soda', 2);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('PLEASE SELECT A VENDING MACHINE FIRST!');
      done();
    }
  });

  it('should add new shelf to vending machine successfully', () => {
    const id = 123;
    controller.createNewVendingMachine(id);
    const productName = 'soda';
    controller.createNewProduct(productName, 3);

    controller.selectVendingMachine(id);
    const shelfNumber = 11;
    const productCount = 2;
    controller.addNewShelfToVendingMachine(shelfNumber, productName, productCount);

    const existingProducts = controller.getExistingProducts();

    expect(Object.keys(existingProducts)).toHaveLength(1);
    expect(existingProducts[shelfNumber]).toBeDefined();
    expect(existingProducts[shelfNumber].product.getName()).toBe(productName);
    expect(existingProducts[shelfNumber].count).toBe(productCount);
  });

  it('should charge vending machine shelf successfully', () => {
    const id = 123;
    controller.createNewVendingMachine(id);
    const productName = 'soda';
    controller.createNewProduct(productName, 3);

    controller.selectVendingMachine(id);
    const shelfNumber = 11;
    const productCount = 2;
    controller.addNewShelfToVendingMachine(shelfNumber, productName, productCount);
    
    const chargeCount = 5;
    controller.chargeVendingMachineShelf(shelfNumber, chargeCount);

    const existingProducts = controller.getExistingProducts();

    expect(Object.keys(existingProducts)).toHaveLength(1);
    expect(existingProducts[shelfNumber]).toBeDefined();
    expect(existingProducts[shelfNumber].product.getName()).toBe(productName);
    expect(existingProducts[shelfNumber].count).toBe(productCount + chargeCount);
  });

  it('should buy product successfully', () => {
    const id = 123;
    controller.createNewVendingMachine(id);
    const productName = 'soda';
    const productPrice = 3;
    controller.createNewProduct(productName, productPrice);

    controller.selectVendingMachine(id);
    const shelfNumber = 11;
    const productCount = 5;
    controller.addNewShelfToVendingMachine(shelfNumber, productName, productCount);

    const insertedCoinCount = 10;
    controller.insertCoinToVendingMachine(insertedCoinCount);

    const buyCount = 2;
    const buyResult = controller.buyProduct(shelfNumber, buyCount);

    expect(buyResult.count).toBe(buyCount);
    expect(buyResult.remainedCoin).toBe(insertedCoinCount - buyCount * productPrice);
    expect(buyResult.productName).toBe(productName);

    const existingProducts = controller.getExistingProducts();

    expect(Object.keys(existingProducts)).toHaveLength(1);
    expect(existingProducts[shelfNumber]).toBeDefined();
    expect(existingProducts[shelfNumber].product.getName()).toBe(productName);
    expect(existingProducts[shelfNumber].count).toBe(productCount - buyCount);
  });
 });
