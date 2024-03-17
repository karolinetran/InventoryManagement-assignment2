const InventoryContainer = document.getElementById("inventory-container");
const errorLine = document.getElementById("error-line")


class Product {
    constructor(name, id, manufacturer, date, quantity) {
        this.name = name;
        this.id = id;
        this.manufacturer = manufacturer;
        this.date = date;
        this.quantity = quantity;
    }
}

// Load inventory on pageload

document.addEventListener('DOMContentLoaded', function() {
    displayInventoryFromLocalstorage();
  });

  function displayInventoryFromLocalstorage () {
	const inventoryLocalstorage = JSON.parse(localStorage.getItem("pharmaInventory"));
    if (!inventoryLocalstorage || inventoryLocalstorage.length === 0) {
        InventoryContainer.innerHTML = `<p>Empty...</p>`;
    } else {
        displayInventory(inventoryLocalstorage);
    }
}

function displayInventory (inventoryLocalstorage) {
	InventoryContainer.innerHTML = ''; 				// clear div first
	inventoryLocalstorage.forEach(product => {
		const productHtml = `
			<div class="product-container">
				<div class="product-header">
					<h3>${product.name}</h3>
					<button onclick="deleteProduct(${product.id})">Delete</button>
				</div>
				<p>ID: ${product.id}</p>
				<p>Manufacturer: ${product.manufacturer}</p>
				<p>Expiration Date: ${product.date}</p>
				<p>Quantity: ${product.quantity}</p>
			</div>
		`;
		InventoryContainer.insertAdjacentHTML('beforeend', productHtml);
	});
}

// New product 
document.getElementById("submitBtn").addEventListener("click", addProduct);
function addProduct() {
	// get new product details
    const name = document.getElementById("product-name").value;
    const id = document.getElementById("product-id").value;
    const manufacturer = document.getElementById("product-manufacturer").value;
    const date = document.getElementById("product-date").value;
    const quantity = document.getElementById("product-quantity").value;

    const formIsValid = validateData(name, id, manufacturer, date, quantity);
	console.log(name, id, manufacturer,date,quantity)
    if (formIsValid) {
        const product = new Product(name, id, manufacturer, date, quantity);
		generateObjectToLocalstorage(product);
		displayInventoryFromLocalstorage();
    } else {
        document.getElementById("error-line").innerHTML = "<p>Invalid form data</p>";
    }
}

function validateData(name, id, manufacturer, date, quantity) {
    const products = JSON.parse(localStorage.getItem("pharmaInventory")) || [];
    const idIsUnique = products.every(product => product.id !== id);

    if (!name || !id || !manufacturer || !date || !quantity || !idIsUnique) {
        return false; 
    }

    return true; 
}

function generateObjectToLocalstorage(product) {
    let products = JSON.parse(localStorage.getItem("pharmaInventory")) || [];
    products.push(product);
    localStorage.setItem("pharmaInventory", JSON.stringify(products));
}

function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem("pharmaInventory")) || [];

    const index = products.findIndex(p => {
		console.log("Product ID:", p.id);
		return p.id.toString() === productId.toString(); 
	});

	if (index !== -1) {
		products.splice(index, 1);
	}
	
    localStorage.setItem("pharmaInventory", JSON.stringify(products));
    displayInventoryFromLocalstorage();
}
