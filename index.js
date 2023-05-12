const readline = require('readline');
const Controller = require('./controller/Controller');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));


async function createVendingMachineHandler(controller) {
  const id = Number(await prompt('  enter id: '));
  controller.createNewVendingMachine(id);
  console.log(' Vending machine created successfully.');
}

async function createProductHandler(controller) {
  const name = await prompt('  enter name: ');
  const price = Number(await prompt('  enter price: '));
  controller.createNewProduct(name, price);
  console.log(' Product created successfully.');
}

async function selectVendingMachineHandler(controller) {
  const id = Number(await prompt('  enter id: '));
  controller.selectVendingMachine(id);
  console.log(' Vending machine selected successfully.');
}

async function addNewShelfToVendingMachineHandler(controller) {
  const number = Number(await prompt('  enter shelf number: '));
  const productName = await prompt('  enter product name: ');
  const count = Number(await prompt('  enter product count: '));
  controller.addNewShelfToVendingMachine(number, productName, count);
  console.log(' New shelf added to selected vending machine successfully.');
}

async function chargeVendingMachineShelfHandler(controller) {
  const number = Number(await prompt('  enter shelf number: '));
  const count = Number(await prompt('  enter product count: '));
  controller.chargeVendingMachineShelf(number, count);
  console.log(' Charge selected vending machine shelf successfully.');
}

function getExistingProductsHandler(controller) {
  const existingProducts = controller.getExistingProducts();
  Object.entries(existingProducts).forEach(([shelfNumber, productShelf]) => {
    console.log('   (shelf number:)', shelfNumber, '(product name:)', productShelf.product.getName(),
      '(product price:)',  productShelf.product.getPrice(), '(product count:)',  productShelf.count);
  });
}

async function insertCoinHandler(controller) {
  const count = Number(await prompt('  enter coin count: '));
  controller.insertCoinToVendingMachine(count);
  console.log(' insert coin to selected vending machine successfully.');
}

async function buyProductHandler(controller) {
  const number = Number(await prompt('  enter shelf number: '));
  const count = Number(await prompt('  enter buy count: '));
  const buyResult = controller.buyProduct(number, count);
  console.log(' buy product successfully. here the result:');
  console.log('   buy', buyResult.count, 'number of', buyResult.productName,
    'and remain', buyResult.remainedCoin, 'of your coin.');
  console.log(' please give your product and remain coin.');
}

function presetHandler(controller) {
  controller.createNewVendingMachine(1);
  controller.createNewVendingMachine(2);
  controller.createNewVendingMachine(3);

  controller.createNewProduct('soda', 2);
  controller.createNewProduct('coffee', 3);

  controller.selectVendingMachine(1);
  controller.addNewShelfToVendingMachine(1, 'soda', 5);
  controller.addNewShelfToVendingMachine(2, 'coffee', 0);

  controller.selectVendingMachine(2);
  controller.addNewShelfToVendingMachine(1, 'soda', 0);
  controller.addNewShelfToVendingMachine(2, 'coffee', 10);

  controller.selectVendingMachine(3);
  controller.addNewShelfToVendingMachine(3, 'soda', 6);
  controller.addNewShelfToVendingMachine(4, 'coffee', 7);

  console.log(' create 3 vending machine and 2 product for quick test :)');
}

async function main() {
  console.log('<<<Start vending machine system>>>');
  const controller = new Controller();
  while(true) {
    const command = await prompt('Please enter your command: ');
    try {
      switch (command) {
        case 'create vending machine':
          await createVendingMachineHandler(controller);
          break;
        case 'create product':
          await createProductHandler(controller);
          break;
        case 'select vending machine':
          await selectVendingMachineHandler(controller);
          break;
        case 'add shelf':
          await addNewShelfToVendingMachineHandler(controller);
          break;
        case 'charge shelf':
          await chargeVendingMachineShelfHandler(controller);
          break;
        case 'get products':
          getExistingProductsHandler(controller);
          break;
        case 'insert coin':
          await insertCoinHandler(controller);
          break;
        case 'buy':
          await buyProductHandler(controller);
          break;
        case 'preset':
          presetHandler(controller);
          break;
        case 'close':
          rl.close();
          return;
        default:
          console.log('wrong command! please try again.');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

main().catch((error) => {
  console.log(error);
  setTimeout(() => { process.exit(1); }, 3000);
});

rl.on('close', () => {
  console.log('Have a good day :)');
  setTimeout(() => { process.exit(1); }, 3000);
});
