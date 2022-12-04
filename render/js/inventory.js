var inventoryTable = document.getElementById('inventory-list');
var products = null;
let search = document.getElementById('search');

search.addEventListener('keydown', (e) => {
    console.log(search.value);
    let mySearch = search.value;
    if (e.key == 'Enter' && mySearch != '') {
        searchProduct(mySearch);
    } else if (e.key == 'Enter' && mySearch == '') {
        getAllProductsHTML();
    }
});
document.addEventListener('DOMContentLoaded', getAllProductsHTML);

function resetTable() {
    inventoryTable.innerHTML = `<tr>
    <th>SKU</th>
    <th>Name</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Summary</th>
  </tr>`;
}

function addProduct() {}
function removeProduct() {}
function searchProduct(name) {
    if (products == null) {
        return;
    } else {
        resetTable();
        //Now that we have the defaults set, we can display the results
        products.forEach((product) => {
            if (product.title.startsWith(name))
                inventoryTable.innerHTML += `<tr id="${product.sku}"><td>${product.sku}</td><td>${product.title}</td><td>${product.price}</td><td>${product.quantity}</td><td>${product.summary}</td></tr>`;
        });
    }
}
async function getAllProductsHTML() {
    const response = await Backend.getAllProducts();
    if (response.error !== null) {
        /*TODO: update error messages*/

        return;
    }
    if (response.data === null) {
        /*TODO: update error messages*/

        return;
    }
    products = response.data;
    resetTable();
    products.forEach((product) => {
        inventoryTable.innerHTML += `<tr id="${product.sku}"><td>${product.sku}</td><td>${product.title}</td><td>${product.price}</td><td>${product.quantity}</td><td>${product.summary}</td></tr>`;
    });
}
function sortProducts() {}
function addProductHTML() {}
function removeProductHTML() {}

/*myForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await Backend.getAllProducts();
    // const response = await Backend.getProduct({ sku: '123-123-123' });

    if (response.error !== null) {
        dataContainerRef.innerHTML = `<h2>${response.error}</h2>`;
        return;
    }

    if (response.data === null) {
        dataContainerRef.innerHTML = `<h2>No data found</h2>`;
        return;
    }

    const databases = JSON.parse(response.data);

    // print all databases
    console.log(databases);
    databases.forEach((db) => {
        dataContainerRef.innerHTML += `<p>${db.node.sku} ${db.node.title} ${db.node.summary}</p>`;
    });

    // If we get here, we have a valid response
    // for (const [key, value] of Object.entries(response.data)) {
    // dataContainerRef.innerHTML += `<p>${JSON.stringify(response)}</p>`;
    // }
});*/
