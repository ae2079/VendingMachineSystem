const VendingMachine = require('../domain/VendingMachine');
const Product = require('../domain/Product');
const VendingMachineRepository = require('../repository/VendingMachineRepository');
const ProductRepositpry = require('../repository/ProductRepository');


class Controller {
  constructor() {
    this.selectedVendingMachine = null;
  }
  getAllVendingMachineIds() {
    return VendingMachineRepository.getAllIds();
  }

  createNewVendingMachine(id) {
    const vendingMachine = new VendingMachine(id);
    return VendingMachineRepository.save(vendingMachine);
  }

  createNewProduct(name, price) {
    const product = new Product(name, price);
    return ProductRepositpry.save(product);
  }

  selectVendingMachine(id) {
    this.selectedVendingMachine = VendingMachineRepository.getById(id);
  }

  checkVendingMachineSelection() {
    if (this.selectedVendingMachine === null) {
      throw new Error('PLEASE SELECT A VENDING MACHINE FIRST!');
    }
  }

  addNewShelfToVendingMachine(number, productName, count) {
    this.checkVendingMachineSelection();
    const product = ProductRepositpry.getByName(productName);
    this.selectedVendingMachine.addNewShelf(number, product, count);
  }

  chargeVendingMachineShelf(number, count) {
    this.checkVendingMachineSelection();
    this.selectedVendingMachine.chargeShelf(number, count);
  }

  getExistingProducts() {
    this.checkVendingMachineSelection();
    return this.selectedVendingMachine.getExistingProducts();
  }

  insertCoinToVendingMachine(count) {
    this.checkVendingMachineSelection();
    this.selectedVendingMachine.insertCoin(count);
  }

  buyProduct(number, count) {
    this.checkVendingMachineSelection();
    return this.selectedVendingMachine.buyProduct(number, count);
  }
}

module.exports = Controller;
