const vendingMachineDataAccess = require('../dataAccess/vendingMachine');
const ProductRepository = require('./ProductRepository');
const ProductShelf = require('../domain/ProductShelf');
const VendingMachine = require('../domain/VendingMachine');


class VendingMachineRepository {
  static save(vendingMachine) {
    return vendingMachineDataAccess.insertVendingMachine(vendingMachine);
  }

  static getById(id) {
    const vendingMachineData = vendingMachineDataAccess.fetchVendingMachineById(name);
    if (vendingMachineData) {
      const shelves = VendingMachineRepository.fillShelvesData(vendingMachineData.shelves);
      return new VendingMachine(vendingMachineData.id, shelves, vendingMachineData.state);
    }
    throw new Error('VENDING MACHINE NOT FOUND!', id);
  }
  
  static fillShelvesData(selves) {
    return Object.fromEntries(Object.entries(shelves).map(([k, v]) =>  
      [k, new ProductShelf(ProductRepository.getByName(v.productName), v.count)]));
  }
};

module.exports = VendingMachineRepository;
