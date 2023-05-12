const States = require('../enum/States');
const productDataAccess = require('../dataAccess/product');
const vendingMachineDataAccess = require('../dataAccess/vendingMachine');
const Product = require('../domain/Product');
const VendingMachine = require('../domain/VendingMachine');
const ProductRepository = require('../repository/ProductRepository');
const VendingMachineRepository = require('../repository/VendingMachineRepository');


function createSomeProducts() {
  ProductRepository.save(new Product('soda', 2));
  ProductRepository.save(new Product('coffee', 3));
  ProductRepository.save(new Product('water', 1));
}

describe('vending machine repositpry tests', () => {
  beforeEach(() => {
    productDataAccess.reset();
    vendingMachineDataAccess.reset();
    createSomeProducts();
  });

  it('should add a empty vending machine to database', () => {
    const id = 123;
    const vendingMachine = new VendingMachine(id);

    VendingMachineRepository.save(vendingMachine);

    const savedVendingMachine = VendingMachineRepository.getById(id);

    expect(savedVendingMachine.id).toBe(id);
    expect(savedVendingMachine.shelves).toStrictEqual({});
    expect(savedVendingMachine.state).toBe(States.IDLE);
  });

  it('should add a vending machine with shelves to database', () => {
    const id = 123;
    const vendingMachine = new VendingMachine(id);
    const shelfNumber = 10;
    const product = ProductRepository.getByName('soda');
    const count = 4;
    vendingMachine.addNewShelf(shelfNumber, product, count);
    const secondShelfNumber = 15;
    const secondProduct = ProductRepository.getByName('coffee');
    const secondCount = 6;
    vendingMachine.addNewShelf(secondShelfNumber, secondProduct, secondCount);

    VendingMachineRepository.save(vendingMachine);

    const savedVendingMachine = VendingMachineRepository.getById(id);

    expect(savedVendingMachine.id).toBe(id);
    expect(savedVendingMachine.shelves[shelfNumber].product).toStrictEqual(product);
    expect(savedVendingMachine.shelves[shelfNumber].count).toBe(count);
    expect(savedVendingMachine.shelves[secondShelfNumber].product).toStrictEqual(secondProduct);
    expect(savedVendingMachine.shelves[secondShelfNumber].count).toBe(secondCount);
    expect(savedVendingMachine.state).toBe(States.IDLE);
  });

  it('should overwrite vending machine data in database', () => {
    const id = 123;
    const vendingMachine = new VendingMachine(id);
    const shelfNumber = 10;
    const product = ProductRepository.getByName('soda');
    const count = 4;
    vendingMachine.addNewShelf(shelfNumber, product, count);
    
    VendingMachineRepository.save(vendingMachine);

    const secondVendingMachine = new VendingMachine(id);
    const secondProduct = ProductRepository.getByName('coffee');
    const secondCount = 6;
    secondVendingMachine.addNewShelf(shelfNumber, secondProduct, secondCount);

    VendingMachineRepository.save(secondVendingMachine);

    const savedVendingMachine = VendingMachineRepository.getById(id);

    expect(savedVendingMachine.id).toBe(id);
    expect(savedVendingMachine.shelves[shelfNumber].product).toStrictEqual(secondProduct);
    expect(savedVendingMachine.shelves[shelfNumber].count).toBe(secondCount);
    expect(savedVendingMachine.state).toBe(States.IDLE);
  });

  it('should not found a vending machinge with this id', () => {
    const id = 123;
    const vendingMachine = new VendingMachine(id);

    VendingMachineRepository.save(vendingMachine);

    expect(() => VendingMachineRepository.getById(12)).toThrow(Error);
  });

  it('should get all vending machine ids successfully', () => {
    const id1 = 123;
    const vendingMachine1 = new VendingMachine(id1);
    VendingMachineRepository.save(vendingMachine1);

    const id2 = 456;
    const vendingMachine2 = new VendingMachine(id2);
    VendingMachineRepository.save(vendingMachine2);

    const allIds = VendingMachineRepository.getAllIds();

    expect(allIds).toHaveLength(2);
    expect(allIds).toContain(id1);
    expect(allIds).toContain(id2);
  });
});
