const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});

contextBridge.exposeInMainWorld('Backend', {
    getTransaction: async (transactionID) =>
        ipcRenderer.invoke('getTransaction', transactionID),
    getAllProducts: async () => ipcRenderer.invoke('getAllProducts'),
    getProduct: async (sku) => ipcRenderer.invoke('getProduct', sku),
    createNewProduct: async (product) => ipcRenderer.invoke('createNewProduct', product),
    updatePrice: async (sku, newPrice) => ipcRenderer.invoke('updatePrice', sku, newPrice),
    updateQuantity: async (sku, quantity) => ipcRenderer.invoke('updateQuantity', sku, quantity),
    updateProduct: async (product) => ipcRenderer.invoke('updateProduct', product),
    deleteProduct: async (nodeId) => ipcRenderer.invoke('deleteProduct', nodeId), 
    deleteProductbySKU: async (sku) => ipcRenderer.invoke('deleteProductbySKU', sku),
    createNewEmployee: async (employee) => ipcRenderer.invoke('createNewEmployee', employee),
    getEmployee: async (employeeId) => ipcRenderer.invoke('getEmployee', employeeId),
    getAllEmployees: async () => ipcRenderer.invoke('getAllEmployees'),
    updateEmployee: async (employeeId, first_name, last_name, phone_number, email, address, city, state, zipcode, password, hire_date, starting_amount) => ipcRenderer.invoke('updateEmployee', employeeId, first_name, last_name, phone_number, email, address, city, state, zipcode, password, hire_date, starting_amount),
    deleteEmployee: async (employeeId) => ipcRenderer.invoke('deleteEmployee', employeeId),
    updateEmployeeStyling: async (employeeId, styling) => ipcRenderer.invoke('updateEmployeeStyling', employeeId, styling),
    createNewDiscount: async (discount) => ipcRenderer.invoke ('createNewDiscount', discount),
    getDiscount: async (id) => ipcRenderer.invoke ('getDiscount', id),
    getAllDiscounts: async () => ipcRenderer.invoke ('getAllDiscounts'),
    updateDiscount: async (discountId, newAmount) => ipcRenderer.invoke ('updateDiscount', discountId, newAmount),
    deleteDiscount: async (discountId) => ipcRenderer.invoke ('deleteDiscount', discountId),
    createNewTransaction: async (transaction) => ipcRenderer.invoke('createNewTransaction', transaction),
    addTransactionItems: async (transactionItems, transactionID) => ipcRenderer.invoke('addTransactionItem', transactionItems, transactionID),
    addTransactionDiscounts: async (discounts, transactionID) => ipcRenderer.invoke('addTransactionDiscount', discounts, transactionID),
    createCashTransaction: async (products, discounts, salespersonID) => ipcRenderer.invoke('createCashTransaction', products, discounts, salespersonID),
    createCardTransaction: async (products, discount, salespersonID) => ipcRenderer.invoke('createCardTransaction', products, discount, salespersonID),
    calculateTotal: async (products) => ipcRenderer.invoke('calculateTotal', products),
    calculateTotalWithDiscount: async (products, discount) => ipcRenderer.invoke('calculateTotalWithDiscount', products, discount),
    getTransactionItems: async (transactionID) => ipcRenderer.invoke('getTransactionItems', transactionID),
    getTransactionDiscounts: async (transactionID) => ipcRenderer.invoke('getTransactionDiscounts', transactionID),
    getAllTransactions: async () => ipcRenderer.invoke('getAllTransactions'),
	getTransactionsBetweenDates: async (startDate, endDate) => ipcRenderer.invoke('getTransactionsBetweenDates', {startDate, endDate}),
    getTransactionsBySalesperson: async (salesPersonId) => ipcRenderer.invoke('getTransactionsBySalesperson', salesPersonId),
    getTransactionsByTotal: async () => ipcRenderer.invoke('getTransactionByTotal'),
    updateTransactionSalesperson: async (transactionId, salesPersonId) => ipcRenderer.invoke('updateTransactionSalesperson', transactionId, salesPersonId),
    deleteTransaction: async (transactionId) => ipcRenderer.invoke('deleteTransaction', transactionId),
    getSavedLogin: async () => ipcRenderer.invoke('getSavedLogin'),
    setSavedLogin: async (login) => ipcRenderer.invoke('setSavedLogin', login),
    getSavedStyling: async () => ipcRenderer.invoke('getSavedStyling'),
    setSavedStyling: async (styling) => ipcRenderer.invoke('setSavedStyling', styling),
    logout: async () => ipcRenderer.invoke('logout'),
    showDialog: async (message) => ipcRenderer.invoke('showDialog',message),
    EmployeeBuilder: async (first_name, last_name, phone_number, email, password,address, city, state, zipcode, hire_date, starting_amount) => ipcRenderer.invoke('EmployeeBuilder', first_name, last_name, phone_number, email, password,address, city, state, zipcode, hire_date, starting_amount),
    ProductBuilder: async (sku,title,brand,summary,price,quantity,category,creator,supplier) => ipcRenderer.invoke('ProductBuilder', sku,title,brand,summary,price,quantity,category,creator,supplier)
    
});
