const { app,session, BrowserWindow, Menu } = require('electron');
const path = require('path');

const isMac = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'production';

const { ipcMain } = require('electron');
const RegistoreBackend = require('./node_modules/registore-business-logic/dist/index');
var currentLogin = null; 

ipcMain.handle('EmployeeBuilder', async (event, args) => {
    const {first_name, last_name, phone_number, email, password,address, city, state, zipcode, hire_date, starting_amount } = args; // Desctructure the args object
    const response = await RegistoreBackend.EmployeeBuilder.setFirstName(first_name).setLastName(last_name).setCity(city).setPhoneNumber(phone_number).setEmail(email).setPassword(password).setState(state).setZipcode(zipcode).setAddress(address).setHireDate(hire_date).setStartingAmount(starting_amount).build();
    const response2 = await RegistoreBackend.EmployeeController.createNewEmployee(response);
    return response2;
});

ipcMain.handle('getSavedLogin', async (event, args) => {
    console.log(currentLogin);
    return String(currentLogin);
    
});
ipcMain.handle('setSavedLogin', async (event, args) => {
    const login  = args; 
    currentLogin = String(login);
    console.log('login set to '+ String(currentLogin));
    return;
});
ipcMain.handle('logout', async (event, args) => {
    currentLogin = null;
});

// Because we are returning values, we need to use ipcMain.handle, do not use ipcMain.on
ipcMain.handle('getTransaction', async (event, args) => {
    console.log(args);
    const { transactionID } = args; // Desctructure the args object
    const response =
        await RegistoreBackend.TransactionController.getTransaction(
            transactionID
        );
    return response;
});

ipcMain.handle('getAllProducts', async (event, args) => {
    console.log(args);
    const response = await RegistoreBackend.ProductController.getAllProducts();
    return response;
});

ipcMain.handle('getProduct', async (event, args) => {
    console.log(args);
    const { sku } = args; // Desctructure the args object
    const response = await RegistoreBackend.ProductController.getProduct(sku);
    return response;
});
ipcMain.handle('createNewProduct', async (event, args) => {
    console.log(args);
    const { product } = args; // Desctructure the args object
    const response = await RegistoreBackend.ProductController.createNewProduct(product);
    return response;
});

ipcMain.handle('updatePrice', async (event, args) => {
    console.log(args);
    const { sku, newPrice } = args; // Desctructure the args object
    const response = await RegistoreBackend.ProductController.updatePrice(sku, newPrice);
    return response;
});
ipcMain.handle('updateQuantity', async (event, args) => {
    console.log(args);
    const { sku, quantity } = args; // Desctructure the args object
    const response = await RegistoreBackend.ProductController.updateQuantity(sku, quantity);
    return response;
});
ipcMain.handle('updateProduct', async (event, args) => {
    console.log(args);
    const { product } = args; // Desctructure the args object
    const response = await RegistoreBackend.ProductController.updateProduct(product);
    return response;
});
ipcMain.handle('deleteProduct', async (event, args) => {
    console.log(args);
    const { nodeId } = args; // Desctructure the args object
    const response = await RegistoreBackend.ProductController.deleteProduct(nodeId);
    return response;
});
ipcMain.handle('deleteProductbySKU', async (event, args) => {
    console.log(args);
    const { sku } = args; // Desctructure the args object
    const response = await RegistoreBackend.ProductController.deleteProductbySKU(sku);
    return response;
});
ipcMain.handle('createNewEmployee', async (event, args) => {
    console.log(args);
    const { employee } = args; // Desctructure the args object
    const response = await RegistoreBackend.EmployeeController.createNewEmployee(employee);
    return response;
});
ipcMain.handle('getEmployee', async (event, args) => {
    console.log(args);
    const { employeeId } = args; // Desctructure the args object
    const response = await RegistoreBackend.EmployeeController.getEmployee(employeeId);
    return response;
});
ipcMain.handle('getAllEmployees', async (event) => {
    const response = await RegistoreBackend.EmployeeController.getAllEmployees();
    return response;
});
ipcMain.handle('updateEmployee', async (event, args) => {
    console.log(args);
    const { employeeId, first_name, last_name, phone_number, email, address, city, state, zipcode, password, hire_date, starting_amount } = args; // Desctructure the args object
    const response = await RegistoreBackend.EmployeeController.updateEmployee(employeeId, first_name, last_name, phone_number, email, address, city, state, zipcode, password, hire_date, starting_amount);
    return response;
});
ipcMain.handle('deleteEmployee', async (event, args) => {
    console.log(args);
    const { employeeId } = args; // Desctructure the args object
    const response = await RegistoreBackend.EmployeeController.deleteEmployee(employeeId);
    return response;
});
ipcMain.handle('createNewDiscount', async (event, args) => {
    console.log(args);
    const { discount } = args; // Desctructure the args object
    const response = await RegistoreBackend.DiscountController.createNewDiscount(discount);
    return response;
});
ipcMain.handle('deleteDiscount', async (event, args) => {
    console.log(args);
    const { discountId } = args; // Desctructure the args object
    const response = await RegistoreBackend.DiscountController.deleteDiscount(discountId);
    return response;
});
ipcMain.handle('updateDiscount', async (event, args) => {
    console.log(args);
    const { discountId, newAmount } = args; // Desctructure the args object
    const response = await RegistoreBackend.DiscountController.updateDiscount(discountId, newAmount);
    return response;
});
ipcMain.handle('getAllDiscounts', async (event) => {
    const response = await RegistoreBackend.DiscountController.getAllDiscounts();
    return response;
});
ipcMain.handle('getDiscount', async (event, args) => {
    console.log(args);
    const { id } = args; // Desctructure the args object
    const response = await RegistoreBackend.DiscountController.getDiscount(id);
    return response;
});
ipcMain.handle('createNewTransaction', async (event, args) => {
    console.log(args);
    const { transaction } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.createNewTransaction(transaction);
    return response;
});
ipcMain.handle('addTransactionItems', async (event, args) => {
    console.log(args);
    const { transactionItems, transactionID } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.addTransactionItems(transactionItems, transactionID);
    return response;
});
ipcMain.handle('addTransactionDiscounts', async (event, args) => {
    console.log(args);
    const { discounts, transactionID } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.addTransactionDiscounts(discounts, transactionID);
    return response;
});
ipcMain.handle('createCashTransaction', async (event, args) => {
    console.log(args);
    const { products, discounts, salespersonID } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.createCashTransaction(products, discounts, salespersonID);
    return response;
});
ipcMain.handle('createCardTransaction', async (event, args) => {
    console.log(args);
    const { products, discounts, salespersonID } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.createCardTransaction(products, discounts, salespersonID);
    return response;
});
ipcMain.handle('calculateTotal', async (event, args) => {
    console.log(args);
    const { products } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.calculateTotal(products);
    return response;
});
ipcMain.handle('calculateTotalWithDiscount', async (event, args) => {
    console.log(args);
    const { products, discount } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.calculateTotalWithDiscount(products, discount);
    return response;
});
ipcMain.handle('getTransactionItems', async (event, args) => {
    console.log(args);
    const { transactionID } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.getTransactionItems(transactionID);
    return response;
});
ipcMain.handle('getTransactionDiscounts', async (event, args) => {
    console.log(args);
    const { transactionID } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.getTransactionDiscounts(transactionID);
    return response;
});
ipcMain.handle('getAllTransactions', async (event) => {
    const response = await RegistoreBackend.TransactionController.getAllTransactions();
    return response;
});
ipcMain.handle('getTransactionsBySalesperson', async (event, args) => {
    console.log(args);
    const { salesPersonId } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.getTransactionsBySalesperson(salesPersonId);
    return response;
});
ipcMain.handle('getTransactionsByTotal', async (event) => {
    const response = await RegistoreBackend.TransactionController.getTransactionsByTotal();
    return response;
});
ipcMain.handle("getTransactionsBetweenDates", async (event, args) => {
	const { startDate, endDate } = args;
	const response = await RegistoreBackend.TransactionController.getTransactionsBetweenDates(startDate, endDate);
	return response;
});
ipcMain.handle('updateTransactionSalesperson', async (event, args) => {
    console.log(args);
    const { transactionId, salesPersonId } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.updateTransactionSalesperson(transactionId, salesPersonId);
    return response;
});
ipcMain.handle('deleteTransaction', async (event, args) => {
    console.log(args);
    const { transactionId } = args; // Desctructure the args object
    const response = await RegistoreBackend.TransactionController.deleteTransaction(transactionId);
    return response;
});
// create the main window
const createMainWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'Registore',
        width: isDev ? 500 + 800 : 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // open dev tools if in dev envi
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.loadFile(path.join(__dirname, './render/register.html'));
};

//create about window
function createItemInfo() {
    const itemInfo = new BrowserWindow({
        title: 'About',
        width: 300,
        height: 600
    });
    itemInfo.loadFile(path.join(__dirname, './render/itemInfo.html'));
}


// app is ready
app.whenReady().then(() => {
    createMainWindow();

    // implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
        session.defaultSession.cookies.get({})
  .then((cookies) => {
    console.log(cookies)
  }).catch((error) => {
    console.log(error)
  })
    });
});

// menu template
const menu = [
    ...(isMac
        ? [
              {
                  label: app.name,
                  submenu: [
                      {
                          label: 'About',
                          // TODO createAboutWindow
                          click: () => {}
                      }
                  ]
              }
          ]
        : []),
    {
        role: 'fileMenu'
    },
    ...(!isMac
        ? [
              {
                  label: 'Help',
                  submenu: [
                      {
                          label: 'View Item',
                          click: createItemInfo
                      }
                  ]
              }
          ]
        : [])
];

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});
