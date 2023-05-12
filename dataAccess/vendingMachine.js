const privates = {
  vendingMachines: [],
};

const vendingMachineDataAccess = {
  reset() {
    privates.vendingMachines = [];
  },

  insertVendingMachine(vendingMachineData) {
    let vendingMachine = privates.vendingMachines.find(vm => vm.id === vendingMachineData.id);
    if (vendingMachine) {
      vendingMachine.shelves = Object.fromEntries(Object.entries(vendingMachineData.shelves).map(([k, v]) => [k, v.toDB()]));
      vendingMachine.state = vendingMachineData.state;
      vendingMachine.insertedCoin = vendingMachineData.insertedCoin;
    } else {
      vendingMachine = {
        id: vendingMachineData.id,
        shelves: Object.fromEntries(Object.entries(vendingMachineData.shelves).map(([k, v]) => [k, v.toDB()])),
        state: vendingMachineData.state,
        insertedCoin: vendingMachineData.insertedCoin,
      };
      privates.vendingMachines.push(vendingMachine);
    }
    return vendingMachine;
  },

  fetchVendingMachineById(id) {
    return privates.vendingMachines.find(vm => vm.id === id);
  },
  
  fetchAllIds() {
    return privates.vendingMachines.map(vm => vm.id);
  }
};

module.exports = vendingMachineDataAccess;
