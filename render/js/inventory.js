var inventoryTable = document.getElementById('inventory-list');
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
var products = null;
var removeCheckbox = document.getElementsByClassName('remove-checkbox');
var search = document.getElementById('search');
var productName = document.getElementById('product-name');
var productSku = document.getElementById('product-sku');
var productPrice = document.getElementById('product-price');
var productQuantity = document.getElementById('product-quantity');
var productSummary = document.getElementById('product-summary');
var productBrand = document.getElementById('product-brand');
var productCategory = document.getElementById('product-category');
var productSupplier = document.getElementById('product-supplier');
var modalSubmit = document.getElementById('modal-submit');
// Get the modal
var modal = document.getElementById('myModal');
// Get the button that opens the modal
var btn = document.getElementById('addInventory');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

search.addEventListener('keydown', (e) => {
    let mySearch = search.value;
    if (e.key == 'Enter' && mySearch != '') {
        searchProduct(mySearch);
    } else if (e.key == 'Enter' && mySearch == '') {
        getAllProductsHTML();
    }
});
document.addEventListener('DOMContentLoaded', getAllProductsHTML);

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

function resetTable() {
    inventoryTable.innerHTML = `<tr>
    <th></th>
    <th>SKU</th>
    <th>Name</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Summary</th>
  </tr>`;
}

// check if our string input is empty.
function isEmpty(str) {
    return !str || str.length === 0;
}
//Check if our string input contains a number.
function hasNumber(myString) {
    return /\d/.test(myString);
}

function highlightRow() {}

async function addProduct() {
    // When you call this it will add it to the DB for you.
    if (isEmpty(productSku.value)) {
        alert('Please enter a product sku!');
    } else if (isEmpty(productName.value)) {
        alert('Please enter a product title!');
    } else if (isEmpty(productBrand.value)) {
        alert('Please enter a product brand!');
    } else if (isEmpty(productSummary.value)) {
        alert('Please enter a product summary!');
    } else if (isEmpty(productPrice.value)) {
        alert('Please enter a product price!');
    } else if (isEmpty(productQuantity.value)) {
        alert('Please enter a product quantity!');
    } else if (isEmpty(productCategory.value)) {
        alert('Please enter a product category!');
    } else if (isEmpty(productSupplier.value)) {
        alert('Please enter a product supplier!');
    }
    const newProduct = await Backend.ProductBuilder(
        productSku.value,
        productName.value,
        productBrand.value,
        productSummary.value,
        productPrice.value,
        productQuantity.value,
        productCategory.value,
        0,
        productSupplier.value
    );
    if (newProduct.error !== null) {
        console.log('ERROR' + newProduct.error);
        return;
    } else {
        //This is the code that will execute if we have a valid product.
        //need to figure out how to refresh page
    }
}

async function removeProduct() {}

function searchProduct(name) {
    if (products == null) {
        return;
    } else {
        resetTable();
        //Now that we have the defaults set, we can display the results
        products.forEach((product) => {
            if (product.title.startsWith(name))
                var checkboxID = product.sku + '-checkbox';
            inventoryTable.innerHTML += `<tr id="${product.sku}"><td><input type="checkbox" id="${checkboxID}" class="remove-check"/></td><td>${product.sku}</td><td>${product.title}</td><td>${product.price}</td><td>${product.quantity}</td><td>${product.summary}</td></tr>`;
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
        var checkboxID = product.sku + '-checkbox';
        inventoryTable.innerHTML += `<tr id="${product.sku}"><td><input type="checkbox" id="${checkboxID}" class="remove-check"/></td><td>${product.sku}</td><td>${product.title}</td><td>${product.price}</td><td>${product.quantity}</td><td>${product.summary}</td></tr>`;
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
