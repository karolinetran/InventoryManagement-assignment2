

document.getElementById("submitBtn").addEventListener("click", addProduct);

function addProduct() {
	// Validate input
	const formdata = document.getElementsByClassName("input-form");
	validateData(formdata)
  	document.getElementById("inventory-container").innerHTML = "<p>test...</p>";
}

function validateData(formData) {
	console.log(formData)
}