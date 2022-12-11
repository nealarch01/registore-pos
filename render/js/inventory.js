//INVENTORY
var inventoryTable = document.getElementById('inventory-list');
var products = null;
var search = document.getElementById('search');
//FORM
var productName = document.getElementById('product-name');
var productSku = document.getElementById('product-sku');
var productPrice = document.getElementById('product-price');
var productQuantity = document.getElementById('product-quantity');
var productSummary = document.getElementById('product-summary');
var productBrand = document.getElementById('product-brand');
var productCategory = document.getElementById('product-category');
var productSupplier = document.getElementById('product-supplier');
var modalSubmit = document.getElementById('modal-submit');
// MODAL
var addModal = document.getElementById('addModal');
var removeModal = document.getElementById('removeModal');
// Get the button that opens the modal
var addBtn = document.getElementById('addInventory');
var removeBtn = document.getElementById('removeInventory');
// Get the <span> element that closes the modal
var spanAdd = document.getElementById('add-modal-close');
var spanRemove = document.getElementById('remove-modal-close');
//remove modal buttons
var confirmBtn = document.getElementById('confirm-btn');
var cancelBtn = document.getElementById('cancel-btn');
//SORT
var sort = document.getElementById('sort');

var selectedMap = {};

search.addEventListener('keydown', (e) => {
    let mySearch = search.value;
    if (e.key == 'Enter' && mySearch.length >= 1) {
        console.log('searching for ' + mySearch);
        searchProduct(mySearch);
    } else if (e.key == 'Enter' && mySearch == '') {
        console.log('resetting search');
        getAllProductsHTML();
    }
});
document.addEventListener('DOMContentLoaded', getAllProductsHTML);

// When the user clicks the button, open the modal
addBtn.onclick = function () {
    addModal.style.display = 'block';
};
removeBtn.onclick = function () {
    removeModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
spanAdd.onclick = function () {
    addModal.style.display = 'none';
};
spanRemove.onclick = function () {
    removeModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == addModal) {
        addModal.style.display = 'none';
    } else if (event.target == removeModal) {
        removeModal.style.display = 'none';
    }
};
//remove modal button onclicks
cancelBtn.onclick = function () {
    removeModal.style.display = 'none';
};

function resetTable() {
    inventoryTable.innerHTML = `<tr>
    <th><input type='checkbox' onchange='selectAllProducts(event)'></input></th>
    <th>Name</th>
    <th>SKU</th>
    <th>Category</th>
    <th>Brand</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Summary</th>
  </tr>`;
}

function resetWholeTable() {
    inventoryTable.innerHTML = `<tr>
    <th><input type='checkbox' onchange='selectAllProducts(event)'></input></th>
    <th>Name</th>
    <th>SKU</th>
    <th>Category</th>
    <th>Brand</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Summary</th>
    </tr>`;
    products.forEach((product) => {
        inventoryTable.innerHTML += `<tr><td><input type="checkbox" data-sku="${product.sku}" class="remove-check" /></td><td>${product.title}</td><td>${product.sku}</td><td>${product.category}</td><td>${product.brand}</td><td>${product.price}</td><td>${product.quantity}</td><td>${product.summary}</td></tr>`;
    });
}

// check if our string input is empty.
function isEmpty(str) {
    return !str || str.length === 0;
}
//Check if our string input contains a number.
function hasNumber(myString) {
    return /\d/.test(myString);
}
//check if our string has letters
function hasLetters(myString) {
    return /^[A-Za-z\s]*$/.test(myString);
}

async function addProduct(event) {
    event.preventDefault();
    // When you call this it will add it to the DB for you.
    if (isEmpty(productSku.value) && !hasLetters(productSku.value)) {
        await Backend.showDialog('Please enter a product sku!');
    } else if (isEmpty(productName.value)) {
        await Backend.showDialog('Please enter a product title!');
    } else if (isEmpty(productBrand.value)) {
        await Backend.showDialog('Please enter a product brand!');
    } else if (isEmpty(productSummary.value)) {
        await Backend.showDialog('Please enter a product summary!');
    } else if (isEmpty(productPrice.value) && !hasLetters(productSku.value)) {
        await Backend.showDialog('Please enter a product price!');
    } else if (
        isEmpty(productQuantity.value) &&
        !hasLetters(productSku.value)
    ) {
        await Backend.showDialog('Please enter a product quantity!');
    } else if (isEmpty(productCategory.value)) {
        await Backend.showDialog('Please enter a product category!');
    } else if (isEmpty(productSupplier.value)) {
        await Backend.showDialog('Please enter a product supplier!');
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
    if (newProduct == null) {
        console.log('ERROR cannot contact Product Builder');
        return;
    } else {
        // If the product is made successfully, update the database
        const result = await Backend.createNewProduct(newProduct);
        if (result.error != null) {
            console.log('ERROR ' + result.error);
            return;
        } else {
            //Product was made successfully.
            console.log('Successfully created new product ' + result.data);
            window.location.assign('./inventory.html');
        }
    }
}

async function removeProducts(event) {
    const skus = Object.keys(selectedMap);
    const totalSelected = skus.length;

    //check cases for 0 selected, 1 selected or multidelete
    if (totalSelected === 0) {
        return;
    }

    if (totalSelected == 1) {
        const result = await Backend.deleteProductbySKU(skus[0]);
        if (result.error != null) {
            console.log('ERROR ' + result.error);
            return;
        } else {
            removeModal.style.display = 'none';
            getAllProductsHTML();
            return;
        }
    }

    /**
     * Create defs
     */

    const defs = skus.reduce((acc, sku) => {
        const def = new Promise(async (resolve, reject) => {
            const result = await Backend.deleteProductbySKU(sku);

            if (result.error !== null) {
                console.log('ERROR ' + result.error);

                reject({
                    error: result.error
                });
            }

            resolve({
                message: 'successfully removed product'
            });
        });

        acc.push(def);

        return acc;
    }, []);

    Promise.all(defs)
        .then((values) => {
            console.log('defs -- values:', values);
            removeModal.style.display = 'none';
            getAllProductsHTML();
            return;
        })
        .catch((errors) => {
            console.log('errors:', errors);
        });
}

//Table header checkbox selects all products
function selectAllProducts(event) {
    const { checked } = event.target;

    const removeCheckboxList = document.getElementsByClassName('remove-check');

    if (checked) {
        removeBtn.removeAttribute('disabled');
        const productSkus = products.reduce((acc, { sku }) => {
            acc[sku] = true;

            return acc;
        }, {});

        /**
         * Set all productSkus in selectedMap
         */
        selectedMap = {
            ...selectedMap,
            ...productSkus
        };
    } else {
        // Reset selectedMap to an empty object and removebtn to disabled
        removeBtn.setAttribute('disabled', 'disabled');
        selectedMap = {};
    }

    [...removeCheckboxList].forEach((element) => {
        const {
            parentNode: { parentNode: tableRowNode }
        } = element;
        const { sku } = element.dataset;
        const fn = !!selectedMap[sku] ? 'add' : 'remove';
        element.checked = !!selectedMap[sku];
        tableRowNode.classList[fn]('checked-row');
    });

    return;
}

function searchProduct(name) {
    if (products == null) {
        console.log('No Products Found');
        return;
    } else {
        resetTable();
        //Now that we have the defaults set, we can display the results
        products.forEach((product) => {
            if (
                product.title
                    .toString()
                    .toLowerCase()
                    .includes(name.toLowerCase())
            ) {
                inventoryTable.innerHTML += `<tr><td><input type="checkbox" data-sku="${product.sku}" class="remove-check"/></td><td>${product.title}</td><td>${product.sku}</td><td>${product.category}</td><td>${product.brand}</td><td>${product.price}</td><td>${product.quantity}</td><td>${product.summary}</td></tr>`;
            }
        });
    }
}

async function getAllProductsHTML() {
    const response = await Backend.getAllProducts();
    if (response.error !== null) {
        /*TODO: update error messages*/
        console.log('failed to get all products');
        return;
    }
    if (response.data === null) {
        /*TODO: update error messages*/
        console.log('No Products to display');
        return;
    }
    products = response.data;

    resetWholeTable();

    search.focus;

    //checkbox eventlistener
    var removeCheckboxList = document.getElementsByClassName('remove-check');
    [...removeCheckboxList].forEach((element) => {
        const { sku } = element.dataset;

        element.checked = !!selectedMap[sku];

        element.addEventListener('change', (e) => {
            const {
                checked,
                dataset,
                parentNode: { parentNode: tableRowNode }
            } = e.target;

            const { sku } = dataset;
            const skus = Object.keys(selectedMap);
            const totalSelected = skus.length;
            //if checkbox is cheked enable removebutton and highlight rows else do opposite
            if (checked) {
                removeBtn.removeAttribute('disabled');
                selectedMap[sku] = checked;
                console.log(tableRowNode);
                tableRowNode.classList.add('checked-row');
            }
            if (!checked && selectedMap[sku]) {
                delete selectedMap[sku];
                tableRowNode.classList.remove('checked-row');
                console.log(totalSelected);
                //if all checkboxes are unchcked disable remove button
                if (totalSelected == 1) {
                    removeBtn.setAttribute('disabled', 'disabled');
                }
            }
        });
    });
}

//Sort Functions
function sortByQuantity(products) {
    var unsorted = true;
    var swapped;
    while (unsorted) {
        swapped = false;
        for (var i = 0; i < products.length - 1; i++) {
            if (products[i].quantity > products[i + 1].quantity) {
                var temp = products[i];
                products[i] = products[i + 1];
                products[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            unsorted = false;
        }
    }
    return products;
}

function sortByBrand(products) {
    var unsorted = true;
    var swapped;
    while (unsorted) {
        swapped = false;
        for (var i = 0; i < products.length - 1; i++) {
            if (
                products[i].brand.toLowerCase()[0] >
                products[i + 1].brand.toLowerCase()[0]
            ) {
                var temp = products[i];
                products[i] = products[i + 1];
                products[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            unsorted = false;
        }
    }
    return products;
}

function sortByName(products) {
    var unsorted = true;
    var swapped;
    while (unsorted) {
        swapped = false;
        for (var i = 0; i < products.length - 1; i++) {
            if (
                products[i].title.toLowerCase()[0] >
                products[i + 1].title.toLowerCase()[0]
            ) {
                var temp = products[i];
                products[i] = products[i + 1];
                products[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            unsorted = false;
        }
    }
    return products;
}
function sortByBrand(products) {
    var unsorted = true;
    var swapped;
    while (unsorted) {
        swapped = false;
        for (var i = 0; i < products.length - 1; i++) {
            if (
                products[i].brand.toLowerCase()[0] >
                products[i + 1].brand.toLowerCase()[0]
            ) {
                var temp = products[i];
                products[i] = products[i + 1];
                products[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            unsorted = false;
        }
    }
    return products;
}
function sortByCategory(products) {
    var unsorted = true;
    var swapped;
    while (unsorted) {
        swapped = false;
        for (var i = 0; i < products.length - 1; i++) {
            if (
                products[i].category.toLowerCase()[0] >
                products[i + 1].category.toLowerCase()[0]
            ) {
                var temp = products[i];
                products[i] = products[i + 1];
                products[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            unsorted = false;
        }
    }
    return products;
}

function sortByPrice(products) {
    var unsorted = true;
    var swapped;
    while (unsorted) {
        swapped = false;
        for (var i = 0; i < products.length - 1; i++) {
            if (products[i].price > products[i + 1].price) {
                var temp = products[i];
                products[i] = products[i + 1];
                products[i + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            unsorted = false;
        }
    }
    return products;
}

function sortProducts() {
    if (sort.value == 'sortByName') {
        sortByName(products);
    } else if (sort.value == 'sortByBrand') {
        sortByBrand(products);
    } else if (sort.value == 'sortByCategory') {
        sortByCategory(products);
    } else if (sort.value == 'sortByQuantity') {
        sortByQuantity(products);
    } else if (sort.value == 'sortByPrice') {
        sortByPrice(products);
    } else {
        console.log('error');
    }
    resetWholeTable();
}
