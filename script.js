// Helper function to toggle between login and signup
function toggleForm() {
    document.getElementById("login-page").classList.toggle("hidden");
    document.getElementById("signup-page").classList.toggle("hidden");
}

// Handle user sign up
function handleSignUp() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (username && password) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(user => user.username === username)) {
            alert("Username already exists!");
        } else {
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Sign-up successful!");
            toggleForm();
        }
    } else {
        alert("Please fill in all fields.");
    }
}

// Handle user login
function handleLogin() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful!");
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("product-page").classList.remove("hidden");
        localStorage.setItem("currentUser", username); // Set current user
    } else {
        alert("Invalid credentials!");
    }
}

// Function for guest to view products
function guestView() {
    document.getElementById("login-page").classList.add("hidden");
    document.getElementById("view-products-page").classList.remove("hidden");
    loadProducts();
}

// Add product to inventory
function addProduct() {
    const name = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.getElementById("product-price").value);
    const quantity = parseInt(document.getElementById("product-quantity").value);
    const expiry = document.getElementById("product-expiry").value;

    if (name && !isNaN(price) && !isNaN(quantity) && expiry) {
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
            alert("You need to sign up or login to add products.");
            return;
        }
        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push({ name, price, quantity, expiry, username: currentUser });
        localStorage.setItem("products", JSON.stringify(products));
        alert("Product added!");
        clearProductForm();
    } else {
        alert("Please fill in all fields.");
    }
}

// View all products
function viewProducts() {
    document.getElementById("product-page").classList.add("hidden");
    document.getElementById("view-products-page").classList.remove("hidden");
    loadProducts();
}

// Load products from localStorage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const li = document.createElement("li");
        li.classList.add("product-item");
        li.innerHTML = `
            <strong>${product.name}</strong><br>
            Price: $${product.price} | Quantity: ${product.quantity} | Expiry: ${product.expiry}
        `;
        li.onclick = () => {
            if (!localStorage.getItem("currentUser")) {
                alert("You need to sign up or login to interact with products.");
            } else {
                alert("You can now interact with this product.");
            }
        };
        productList.appendChild(li);
    });

    if (productList.innerHTML === "") {
        productList.innerHTML = "<li>No products available.</li>";
    }
}

// Go back to product registration
function goBack() {
    document.getElementById("view-products-page").classList.add("hidden");
    document.getElementById("product-page").classList.remove("hidden");
}

// Clear product form fields
function clearProductForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("product-expiry").value = "";
}
