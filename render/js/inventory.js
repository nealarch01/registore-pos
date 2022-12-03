const dataContainerRef = document.getElementById('inventory-div'); // A reference to the div with id "data-container"
const myForm = document.getElementById('search-form');
const myButton = document.getElementById('my-button');

myForm.addEventListener('submit', async (event) => {
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
});
