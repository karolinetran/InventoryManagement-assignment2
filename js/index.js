// Get references to the inventory container and error line elements in the DOM
const InventoryContainer = document.getElementById("inventory-container");
const ErrorLine = document.getElementById("error-line");

// Define a class for Product with properties: name, id, manufacturer, date, and quantity
class Product {
    constructor(name, id, manufacturer, date, quantity) {
        this.name = name;
        this.id = id;
        this.manufacturer = manufacturer;
        this.date = date;
        this.quantity = quantity;
    }
}

// Load inventory from local storage when the page loads
document.addEventListener('DOMContentLoaded', function() {
    displayInventoryFromLocalstorage();
});

function displayInventoryFromLocalstorage () {
    // Retrieve the inventory from local storage and parse it to an object
    const inventoryLocalstorage = JSON.parse(localStorage.getItem("pharmaInventory"));

    // Check if inventory is empty or not available, if so, display "Empty..." message
    if (!inventoryLocalstorage || inventoryLocalstorage.length === 0) {
        InventoryContainer.innerHTML = `<p>Empty...</p>`;
    } else {
        // Otherwise, display the inventory
        displayInventory(inventoryLocalstorage);
    }
}

function displayInventory (inventoryLocalstorage) {
    // Clear the inventory container before displaying new content
	InventoryContainer.innerHTML = ''; 

    // Iterate over each product in the inventory and create elements for each
	inventoryLocalstorage.forEach(product => {
		const productHtml = `
			<div class="product-container">
				<div class="product-header">
					<h3>${product.name}</h3>
					<button onclick="deleteProduct('${product.id}')">Delete</button>
				</div>
				<p>ID: ${product.id}</p>
				<p>Manufacturer: ${product.manufacturer}</p>
				<p>Expiration Date: ${product.date}</p>
				<p>Quantity: ${product.quantity}</p>
			</div>
		`;

        // Insert the productHtml into the InventoryContainer
		InventoryContainer.insertAdjacentHTML('beforeend', productHtml);
	});
}

// Add an event listener to the submit button for adding a new product
document.getElementById("submitBtn").addEventListener("click", addProduct);

function addProduct() {
    // Clear any previous error messages
    ErrorLine.innerHTML = ``;

	// Get the values from the form inputs
    const name = document.getElementById("product-name").value;
    const id = document.getElementById("product-id").value;
    const manufacturer = document.getElementById("product-manufacturer").value;
    const date = document.getElementById("product-date").value;
    const quantity = document.getElementById("product-quantity").value;

    // Validate the form data
    const formIsValid = validateData(name, id, manufacturer, date, quantity);
	
    // If the form data is valid, create a new product and update the localStorage
    if (formIsValid) {
        const product = new Product(name, id, manufacturer, date, quantity);
		generateObjectToLocalstorage(product);
		displayInventoryFromLocalstorage();
    } else {
        // If the form data is invalid, display an error message
        ErrorLine.innerHTML = `<p>Invalid form data</p>`;
    }
}

function validateData(name, id, manufacturer, date, quantity) {
    // Retrieve the current inventory from localStorage
    const products = JSON.parse(localStorage.getItem("pharmaInventory")) || [];

    // Check if the product ID is unique
    const idIsUnique = products.every(product => product.id !== id);

    // Return false if any field is empty or the ID is not unique
    if (!name || !id || !manufacturer || !date || !quantity || !idIsUnique) {
        return false; 
    }

    // Return true if all validations pass
    return true; 
}

function generateObjectToLocalstorage(product) {
    // Retrieve the current inventory from localStorage
    let products = JSON.parse(localStorage.getItem("pharmaInventory")) || [];

    // Add the new product to the inventory
    products.push(product);

    // Save the updated inventory back to localStorage
    localStorage.setItem("pharmaInventory", JSON.stringify(products));
}

function deleteProduct(productId) {
    // Retrieve the current inventory from local storage
    let products = JSON.parse(localStorage.getItem("pharmaInventory")) || [];

    // Find the index of the product to delete
    const index = products.findIndex(p => {
		return p.id.toString() === productId.toString(); 
	});

    // If the product is found, remove it from the inventory
	if (index !== -1) {
		products.splice(index, 1);
	}
	
    // Save the updated inventory back to localStorage
    localStorage.setItem("pharmaInventory", JSON.stringify(products));

    // Refresh the displayed inventory
    displayInventoryFromLocalstorage();
}
