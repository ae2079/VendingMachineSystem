# Vending Machine System
This project is developed for interview challenge.

## Running Unit Tests:
Before running tests, you should install test dependencies by "yarn install" command.
you should enter this command in the terminal at the main directory of project.

To run unit tests, you can enter "yarn test" command in the terminal at the main directory of project.

After that, you can see test coverage and test results.

## Running Program:
### locally:
Before running this program, you should have node on your PC.

Then, you can run this program by enter "node index.js" command in the terminal at the main directory of project.


## How Does This Program Work?
It will get below commands from command line from the user and do proper actions based on commands.
### Commands:
1. "create vending machine" : to create a new vending machine.
2. "create product" : to create a new product.
3. "select vending machine" : to select a vending machine for add new shelf to it, charge a shelf of it, insert coin to it, get product list of it, or buy from it. when you select a vending machine, this was used for all next command until you change it buy selecting another vending machine.
4. "add shelf" : to add a new shelf to selected vending machine.
5. "charge shelf" : to charge an existing shelf of the selected vending machine.
6. "get products" : to get available products of the selected vending machine.
7. "insert coin" : to insert coin to the selected vending machine for buy product form it.
8. "buy" : to buy a product from the selected vending machine.
9. "preset" : this command will add 3 vending machine and 2 product to the database and add some shelves to the vending machines. (you can use this command for persist data for a quick test.)
10. "close" : to close the program.


