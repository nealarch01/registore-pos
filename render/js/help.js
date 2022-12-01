const dataContainerRef = document.getElementById('data-container'); // A reference to the div with id "data-container"
const searchFormRef = document.getElementById("search-form"); // A reference to the form with id "search-form"


searchFormRef.addEventListener("submit", async (event) => {
    event.preventDefault();
    let searchInput = document.getElementById("search-box").value;
    searchInput = parseInt(searchInput);
    if (isNaN(searchInput)) {
        dataContainerRef.innerHTML = "<h2>Invalid input</h2>";
        return;
    }

    const response = await Backend.getTransaction({ transactionID: searchInput });

    if (response.error !== null) {
        dataContainerRef.innerHTML = `<h2>${response.error}</h2>`;
        return;
    }

    if (response.data === null) {
        dataContainerRef.innerHTML = `<h2>No data found</h2>`;
        return;
    }

    // If we get here, we have a valid response
    dataContainerRef.innerHTML = `<h2>Transaction details:</h2>`;
    for (const [key, value] of Object.entries(response.data)) {
        dataContainerRef.innerHTML += `<p>${key}: ${value}</p>`;
    }
});

