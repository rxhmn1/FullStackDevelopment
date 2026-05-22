// ==========================================================
// SHOPSPHERE - HOMEPAGE JAVASCRIPT
// Step 1C: Featured Products + Cart Functionality
// ==========================================================

// ================= SAMPLE FEATURED PRODUCTS =================
const featuredProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Premium noise-cancelling headphones with crystal-clear sound.",
        price: 2999,
        rating: 4.8,
        category: "electronics",
        icon: "fa-headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Track your fitness, heart rate, and daily activities.",
        price: 4999,
        rating: 4.7,
        category: "electronics",
        icon: "fa-clock",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Gaming Keyboard",
        description: "RGB mechanical keyboard designed for performance.",
        price: 3499,
        rating: 4.9,
        category: "electronics",
        icon: "fa-keyboard",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Running Shoes",
        description: "Lightweight and comfortable shoes for everyday running.",
        price: 2599,
        rating: 4.6,
        category: "fashion",
        icon: "fa-shoe-prints",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Travel Backpack",
        description: "Spacious and durable backpack for work and travel.",
        price: 1999,
        rating: 4.7,
        category: "accessories",
        icon: "fa-backpack",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        description: "Portable speaker with deep bass and long battery life.",
        price: 2799,
        rating: 4.8,
        category: "electronics",
        icon: "fa-volume-high",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Designer T-Shirt",
        description: "Comfortable cotton t-shirt with a modern fit.",
        price: 999,
        rating: 4.5,
        category: "fashion",
        icon: "fa-shirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Luxury Sofa Cushion",
        description: "Elegant decorative cushion for your living room.",
        price: 799,
        rating: 4.4,
        category: "home",
        icon: "fa-couch",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Table Lamp",
        description: "Minimalist lamp with warm ambient lighting.",
        price: 1499,
        rating: 4.6,
        category: "home",
        icon: "fa-lightbulb",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Sunglasses",
        description: "Stylish UV-protected sunglasses.",
        price: 1299,
        rating: 4.5,
        category: "accessories",
        icon: "fa-glasses",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Leather Wallet",
        description: "Premium genuine leather wallet.",
        price: 899,
        rating: 4.7,
        category: "accessories",
        icon: "fa-wallet",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Coffee Maker",
        description: "Brew rich and aromatic coffee at home.",
        price: 5999,
        rating: 4.8,
        category: "home",
        icon: "fa-mug-hot",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
    }
];

// ================= FORMAT CURRENCY =================
function formatCurrency(amount) {
    return `₹${amount.toLocaleString("en-IN")}`;
}

// ================= RENDER FEATURED PRODUCTS =================
function renderFeaturedProducts() {
    const productsGrid = document.getElementById("featured-products-grid");

    if (!productsGrid) return;

    productsGrid.innerHTML = featuredProducts
        .map(
            (product) => `
            <div class="product-card glass-card">
                <div class="product-image">
    <img
        src="${product.image}"
        alt="${product.name}"
        class="product-img"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    >
    <div class="product-icon-fallback" style="display:none;">
        <i class="fas ${product.icon}"></i>
    </div>
</div>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-meta">
                    <span class="product-price">
                        ${formatCurrency(product.price)}
                    </span>

                    <span class="product-rating">
                        ⭐ ${product.rating}
                    </span>
                </div>

                <button
                    class="btn btn-primary"
                    onclick="addToCart(${product.id})"
                >
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        `
        )
        .join("");
}

// ================= GET CART =================
function getCart() {
    return JSON.parse(localStorage.getItem("novamartCart")) || [];
}

// ================= SAVE CART =================
function saveCart(cart) {
    localStorage.setItem("novamartCart", JSON.stringify(cart));
}

// ================= ADD TO CART =================
function addToCart(productId) {
    const selectedProduct = featuredProducts.find(
        (product) => product.id === productId
    );

    if (!selectedProduct) return;

    const cart = getCart();

    const existingItem = cart.find(
        (item) => item.id === selectedProduct.id
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    alert(`${selectedProduct.name} added to cart successfully!`);
}

// ================= UPDATE CART COUNT =================
function updateCartCount() {
    const cart = getCart();

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const cartCountElement = document.getElementById("cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// ================= MOBILE MENU TOGGLE =================
function initializeMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
            navLinks.style.position = "absolute";
            navLinks.style.top = "80px";
            navLinks.style.left = "0";
            navLinks.style.width = "100%";
            navLinks.style.padding = "1.5rem";
            navLinks.style.background = "rgba(15, 23, 42, 0.95)";
            navLinks.style.backdropFilter = "blur(20px)";
            navLinks.style.gap = "1rem";
            navLinks.style.borderBottom =
                "1px solid rgba(255, 255, 255, 0.08)";
        }
    });
}

// ================= NEWSLETTER SUBMISSION =================
function initializeNewsletter() {
    const newsletterForm = document.querySelector(".newsletter-form");

    if (!newsletterForm) return;

    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const emailInput =
            newsletterForm.querySelector('input[type="email"]');

        if (emailInput && emailInput.value.trim() !== "") {
            alert(
                `Thank you for subscribing, ${emailInput.value}!`
            );
            emailInput.value = "";
        }
    });
}

// ================= INITIALIZE APPLICATION =================
document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedProducts();
    updateCartCount();
    initializeMobileMenu();
    initializeNewsletter();
});
// ================= COMPLETE PRODUCT CATALOG WITH IMAGES =================
const allProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Premium noise-cancelling headphones with crystal-clear sound.",
        price: 2999,
        rating: 4.8,
        category: "electronics",
        icon: "fa-headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Track your fitness, heart rate, and daily activities.",
        price: 4999,
        rating: 4.7,
        category: "electronics",
        icon: "fa-clock",
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Gaming Keyboard",
        description: "RGB mechanical keyboard designed for performance.",
        price: 3499,
        rating: 4.9,
        category: "electronics",
        icon: "fa-keyboard",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Running Shoes",
        description: "Lightweight and comfortable shoes for everyday running.",
        price: 2599,
        rating: 4.6,
        category: "fashion",
        icon: "fa-shoe-prints",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Travel Backpack",
        description: "Spacious and durable backpack for work and travel.",
        price: 1999,
        rating: 4.7,
        category: "accessories",
        icon: "fa-backpack",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        description: "Portable speaker with deep bass and long battery life.",
        price: 2799,
        rating: 4.8,
        category: "electronics",
        icon: "fa-volume-high",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Designer T-Shirt",
        description: "Comfortable cotton t-shirt with a modern fit.",
        price: 999,
        rating: 4.5,
        category: "fashion",
        icon: "fa-shirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Luxury Sofa Cushion",
        description: "Elegant decorative cushion for your living room.",
        price: 799,
        rating: 4.4,
        category: "home",
        icon: "fa-couch",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Table Lamp",
        description: "Minimalist lamp with warm ambient lighting.",
        price: 1499,
        rating: 4.6,
        category: "home",
        icon: "fa-lightbulb",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Sunglasses",
        description: "Stylish UV-protected sunglasses.",
        price: 1299,
        rating: 4.5,
        category: "accessories",
        icon: "fa-glasses",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Leather Wallet",
        description: "Premium genuine leather wallet.",
        price: 899,
        rating: 4.7,
        category: "accessories",
        icon: "fa-wallet",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Coffee Maker",
        description: "Brew rich and aromatic coffee at home.",
        price: 5999,
        rating: 4.8,
        category: "home",
        icon: "fa-mug-hot",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80"
    }
];
// ================= PRODUCTS PAGE STATE =================
let currentCategory = "all";
let currentSearch = "";
let currentSort = "default";

// ================= RENDER PRODUCTS PAGE =================
function renderProductsPage() {
    const productsGrid = document.getElementById("products-grid");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");

    if (!productsGrid) return;

    let filteredProducts = [...allProducts];

    // Filter by category
    if (currentCategory !== "all") {
        filteredProducts = filteredProducts.filter(
            (product) => product.category === currentCategory
        );
    }

    // Search by name
    if (currentSearch.trim() !== "") {
        filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    // Sort products
    switch (currentSort) {
        case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "rating":
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    // Update results text
    if (resultsCount) {
        resultsCount.textContent =
            filteredProducts.length === 1
                ? "Showing 1 product"
                : `Showing ${filteredProducts.length} products`;
    }

    // Show empty state
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = "";
        if (emptyState) emptyState.style.display = "block";
        return;
    }

    if (emptyState) emptyState.style.display = "none";

    // Render products
    productsGrid.innerHTML = filteredProducts
        .map(
            (product) => `
            <div class="product-card glass-card">
                <div class="product-image">
    <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="product-img"
        loading="lazy"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    >
    <div class="product-icon-fallback" style="display:none;">
        <i class="fas ${product.icon}"></i>
    </div>
</div>

                <h3>${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-meta">
                    <span class="product-price">
                        ${formatCurrency(product.price)}
                    </span>

                    <span class="product-rating">
                        ⭐ ${product.rating}
                    </span>
                </div>

                <button
                    class="btn btn-primary"
                    onclick="addToCart(${product.id})"
                >
                    <i class="fas fa-cart-plus"></i>
                    Add to Cart
                </button>
            </div>
        `
        )
        .join("");
}

// ================= ENHANCED ADD TO CART =================
function addToCart(productId) {
    const selectedProduct =
        allProducts.find((product) => product.id === productId) ||
        featuredProducts.find((product) => product.id === productId);

    if (!selectedProduct) return;

    const cart = getCart();

    const existingItem = cart.find(
        (item) => item.id === selectedProduct.id
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    saveCart(cart);
    updateCartCount();

    alert(`${selectedProduct.name} added to cart successfully!`);
}

// ================= INITIALIZE PRODUCTS PAGE =================
function initializeProductsPage() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    // Search
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (event) => {
            currentSearch = event.target.value;
            renderProductsPage();
        });
    }

    // Sort
    const sortSelect = document.getElementById("sort-select");
    if (sortSelect) {
        sortSelect.addEventListener("change", (event) => {
            currentSort = event.target.value;
            renderProductsPage();
        });
    }

    // Category Filters
    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) =>
                btn.classList.remove("active")
            );

            button.classList.add("active");
            currentCategory = button.dataset.category;

            renderProductsPage();
        });
    });

    // Initial Render
    renderProductsPage();
}

// ================= EXTEND EXISTING INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    initializeProductsPage();
});


// ==========================================================
// STEP 3 - SHOPPING CART PAGE FUNCTIONALITY
// Render Cart, Update Quantity, Remove Items, Summary
// ==========================================================

const SHIPPING_CHARGE = 99;

// ================= RENDER CART PAGE =================
function renderCartPage() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartLayout = document.getElementById("cart-layout");
    const emptyState = document.getElementById("cart-empty-state");

    const subtotalElement = document.getElementById("cart-subtotal");
    const shippingElement = document.getElementById("cart-shipping");
    const totalElement = document.getElementById("cart-total");

    // If this page doesn't contain cart elements, exit
    if (!cartItemsContainer) return;

    const cart = getCart();

    // Show empty state if cart has no items
    if (cart.length === 0) {
        if (cartLayout) cartLayout.style.display = "none";
        if (emptyState) emptyState.style.display = "block";
        updateCartCount();
        return;
    }

    // Show cart layout
    if (cartLayout) cartLayout.style.display = "grid";
    if (emptyState) emptyState.style.display = "none";

    // Render cart items
    cartItemsContainer.innerHTML = cart
        .map(
            (item) => `
            <div class="cart-item glass-card">
                <div class="cart-item-image">
                    <i class="fas ${item.icon || "fa-box"}"></i>
                </div>

                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="cart-item-price">
                        ${formatCurrency(item.price)}
                    </div>
                </div>

                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button
                            class="quantity-btn"
                            onclick="changeCartQuantity(${item.id}, -1)"
                        >
                            -
                        </button>

                        <span class="quantity-value">
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-btn"
                            onclick="changeCartQuantity(${item.id}, 1)"
                        >
                            +
                        </button>
                    </div>

                    <button
                        class="remove-btn"
                        onclick="removeFromCart(${item.id})"
                    >
                        <i class="fas fa-trash"></i>
                        Remove
                    </button>
                </div>
            </div>
        `
        )
        .join("");

    // Calculate totals
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = subtotal > 0 ? SHIPPING_CHARGE : 0;
    const total = subtotal + shipping;

    // Update summary
    if (subtotalElement) {
        subtotalElement.textContent = formatCurrency(subtotal);
    }

    if (shippingElement) {
        shippingElement.textContent = formatCurrency(shipping);
    }

    if (totalElement) {
        totalElement.textContent = formatCurrency(total);
    }

    // Update cart count in navbar
    updateCartCount();
}

// ================= CHANGE QUANTITY =================
function changeCartQuantity(productId, change) {
    const cart = getCart();

    const item = cart.find((product) => product.id === productId);

    if (!item) return;

    item.quantity += change;

    // Remove item if quantity becomes 0 or less
    if (item.quantity <= 0) {
        const updatedCart = cart.filter(
            (product) => product.id !== productId
        );
        saveCart(updatedCart);
    } else {
        saveCart(cart);
    }

    renderCartPage();
}

// ================= REMOVE ITEM =================
function removeFromCart(productId) {
    const cart = getCart();

    const updatedCart = cart.filter(
        (item) => item.id !== productId
    );

    saveCart(updatedCart);

    renderCartPage();
}

// ================= INITIALIZE CART PAGE =================
function initializeCartPage() {
    const cartItemsContainer = document.getElementById("cart-items");

    // Only run on cart.html
    if (!cartItemsContainer) return;

    renderCartPage();
}

// ================= EXTEND GLOBAL INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    initializeCartPage();
});
// ==========================================================
// STEP 4 - AUTHENTICATION FUNCTIONALITY
// Login and Register Form Validation
// ==========================================================

// ================= INITIALIZE LOGIN FORM =================
function initializeLoginForm() {
    const loginForm = document.getElementById("login-form");

    // Only run on login.html
    if (!loginForm) return;

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document
            .getElementById("login-email")
            .value
            .trim();

        const password = document
            .getElementById("login-password")
            .value
            .trim();

        // Basic validation
        if (!email || !password) {
            alert("Please fill in all required fields.");
            return;
        }

        // Demo login success
        localStorage.setItem(
            "novamartUser",
            JSON.stringify({
                email: email,
                loginTime: new Date().toISOString()
            })
        );

        alert("Login successful! Welcome back to NovaMart.");

        // Redirect to homepage
        window.location.href = "index.html";
    });
}

// ================= INITIALIZE REGISTER FORM =================
function initializeRegisterForm() {
    const registerForm = document.getElementById("register-form");

    // Only run on register.html
    if (!registerForm) return;

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document
            .getElementById("register-name")
            .value
            .trim();

        const email = document
            .getElementById("register-email")
            .value
            .trim();

        const password = document
            .getElementById("register-password")
            .value
            .trim();

        const confirmPassword = document
            .getElementById("register-confirm-password")
            .value
            .trim();

        // Validate required fields
        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all required fields.");
            return;
        }

        // Validate password length
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Validate password match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Save demo user
        localStorage.setItem(
            "novamartUser",
            JSON.stringify({
                name: name,
                email: email,
                registeredAt: new Date().toISOString()
            })
        );

        alert(
            "Account created successfully! You can now log in to NovaMart."
        );

        // Redirect to login page
        window.location.href = "login.html";
    });
}

// ================= INITIALIZE AUTH PAGES =================
function initializeAuthentication() {
    initializeLoginForm();
    initializeRegisterForm();
}

// ================= EXTEND GLOBAL INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    initializeAuthentication();
});


// ==========================================================
// STEP 5 - CHECKOUT PAGE FUNCTIONALITY
// Display Order Summary and Place Orders
// ==========================================================

// ================= GENERATE ORDER ID =================
function generateOrderId() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 900 + 100);
    return `ORD-${timestamp}${random}`;
}

// ================= GET ORDERS =================
function getOrders() {
    return JSON.parse(localStorage.getItem("novamartOrders")) || [];
}

// ================= SAVE ORDERS =================
function saveOrders(orders) {
    localStorage.setItem("novamartOrders", JSON.stringify(orders));
}

// ================= RENDER CHECKOUT SUMMARY =================
function renderCheckoutSummary() {
    const subtotalElement = document.getElementById("checkout-subtotal");
    const shippingElement = document.getElementById("checkout-shipping");
    const totalElement = document.getElementById("checkout-total");

    // Only run on checkout.html
    if (!subtotalElement || !shippingElement || !totalElement) return;

    const cart = getCart();

    // Redirect if cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty. Please add products before checkout.");
        window.location.href = "products.html";
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const shipping = SHIPPING_CHARGE;
    const total = subtotal + shipping;

    // Update UI
    subtotalElement.textContent = formatCurrency(subtotal);
    shippingElement.textContent = formatCurrency(shipping);
    totalElement.textContent = formatCurrency(total);
}

// ================= INITIALIZE CHECKOUT FORM =================
function initializeCheckoutPage() {
    const checkoutForm = document.getElementById("checkout-form");

    // Only run on checkout.html
    if (!checkoutForm) return;

    // Render order summary
    renderCheckoutSummary();

    // Handle form submission
    checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Collect form data
        const customer = {
            name: document.getElementById("checkout-name").value.trim(),
            email: document.getElementById("checkout-email").value.trim(),
            phone: document.getElementById("checkout-phone").value.trim(),
            address: document.getElementById("checkout-address").value.trim(),
            city: document.getElementById("checkout-city").value.trim(),
            state: document.getElementById("checkout-state").value.trim(),
            zip: document.getElementById("checkout-zip").value.trim()
        };

        // Validate all fields
        const values = Object.values(customer);
        if (values.some((value) => !value)) {
            alert("Please fill in all shipping details.");
            return;
        }

        const cart = getCart();

        // Safety check
        if (cart.length === 0) {
            alert("Your cart is empty.");
            window.location.href = "products.html";
            return;
        }

        // Calculate totals
        const subtotal = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const shipping = SHIPPING_CHARGE;
        const total = subtotal + shipping;

        // Create order object
        const order = {
            orderId: generateOrderId(),
            customer: customer,
            items: cart,
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            status: "Processing",
            createdAt: new Date().toISOString()
        };

        // Save order
        const orders = getOrders();
        orders.unshift(order); // newest order first
        saveOrders(orders);

        // Clear cart
        localStorage.removeItem("novamartCart");

        // Update cart count
        updateCartCount();

        // Show success message
        alert(
            `Order placed successfully!\n\nOrder ID: ${order.orderId}`
        );

        // Redirect to orders page
        window.location.href = "orders.html";
    });
}

// ================= EXTEND GLOBAL INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    initializeCheckoutPage();
});


// ==========================================================
// STEP 6 - ORDERS PAGE FUNCTIONALITY
// Render Order History and Tracking Information
// ==========================================================

// ================= FORMAT ORDER DATE =================
function formatOrderDate(dateString) {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// ================= GET STATUS CLASS =================
function getStatusClass(status) {
    switch (status.toLowerCase()) {
        case "processing":
            return "processing";
        case "shipped":
            return "shipped";
        case "delivered":
            return "delivered";
        default:
            return "processing";
    }
}

// ================= RENDER ORDERS PAGE =================
function renderOrdersPage() {
    const ordersContainer = document.getElementById("orders-container");
    const emptyState = document.getElementById("orders-empty-state");

    // Only run on orders.html
    if (!ordersContainer) return;

    const orders = getOrders();

    // Show empty state if no orders exist
    if (orders.length === 0) {
        ordersContainer.style.display = "none";

        if (emptyState) {
            emptyState.style.display = "block";
        }

        return;
    }

    // Show orders container
    ordersContainer.style.display = "flex";

    if (emptyState) {
        emptyState.style.display = "none";
    }

    // Render order cards
    ordersContainer.innerHTML = orders
        .map(
            (order) => `
            <div class="order-card glass-card">
                <div class="order-header">
                    <div class="order-info">
                        <h3>${order.orderId}</h3>
                        <p>
                            <strong>Order Date:</strong>
                            ${formatOrderDate(order.createdAt)}
                        </p>
                        <p>
                            <strong>Items:</strong>
                            ${order.items.length} product(s)
                        </p>
                    </div>

                    <span class="order-status ${getStatusClass(order.status)}">
                        ${order.status}
                    </span>
                </div>

                <div class="order-items">
                    ${order.items
                        .map(
                            (item) => `
                            <div class="order-item">
                                <span>
                                    ${item.name} × ${item.quantity}
                                </span>
                                <span>
                                    ${formatCurrency(
                                        item.price * item.quantity
                                    )}
                                </span>
                            </div>
                        `
                        )
                        .join("")}
                </div>

                <div class="order-footer">
                    <div class="order-customer">
                        <strong>Delivered To:</strong>
                        ${order.customer.name},
                        ${order.customer.city},
                        ${order.customer.state}
                    </div>

                    <div class="order-total">
                        ${formatCurrency(order.total)}
                    </div>
                </div>
            </div>
        `
        )
        .join("");
}

// ================= INITIALIZE ORDERS PAGE =================
function initializeOrdersPage() {
    const ordersContainer = document.getElementById("orders-container");

    // Only run on orders.html
    if (!ordersContainer) return;

    renderOrdersPage();
}

// ================= EXTEND GLOBAL INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    initializeOrdersPage();
});


// ==========================================================
// STEP 7 - ADMIN DASHBOARD FUNCTIONALITY
// Add/Delete Products and Manage Order Status
// ==========================================================

// ================= ADMIN PRODUCTS STORAGE =================
function getAdminProducts() {
    return JSON.parse(localStorage.getItem("novamartAdminProducts")) || [];
}

function saveAdminProducts(products) {
    localStorage.setItem(
        "novamartAdminProducts",
        JSON.stringify(products)
    );
}

// ================= GET ALL AVAILABLE PRODUCTS =================
function getCombinedProducts() {
    const adminProducts = getAdminProducts();
    return [...allProducts, ...adminProducts];
}

// ================= RENDER ADMIN PRODUCTS =================
function renderAdminProducts() {
    const productsGrid = document.getElementById("admin-products-grid");

    // Only run on admin.html
    if (!productsGrid) return;

    const products = getCombinedProducts();

    productsGrid.innerHTML = products
        .map(
            (product) => `
            <div class="admin-product-card glass-card">
                <div class="product-image">
                    <i class="fas ${product.icon || "fa-box"}"></i>
                </div>

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <span class="product-price">
                    ${formatCurrency(product.price)}
                </span>

                <button
                    class="admin-delete-btn"
                    onclick="deleteAdminProduct(${product.id})"
                >
                    <i class="fas fa-trash"></i>
                    Delete Product
                </button>
            </div>
        `
        )
        .join("");
}

// ================= ADD NEW PRODUCT =================
function initializeAdminProductForm() {
    const form = document.getElementById("admin-product-form");

    // Only run on admin.html
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document
            .getElementById("admin-product-name")
            .value
            .trim();

        const description = document
            .getElementById("admin-product-description")
            .value
            .trim();

        const price = Number(
            document.getElementById("admin-product-price").value
        );

        const category = document.getElementById(
            "admin-product-category"
        ).value;

        // Validation
        if (!name || !description || !price || !category) {
            alert("Please fill in all product details.");
            return;
        }

        // Create new product
        const newProduct = {
            id: Date.now(),
            name,
            description,
            price,
            rating: 4.5,
            category,
            icon: "fa-box"
        };

        // Save product
        const adminProducts = getAdminProducts();
        adminProducts.push(newProduct);
        saveAdminProducts(adminProducts);

        // Reset form
        form.reset();

        // Refresh UI
        renderAdminProducts();

        alert("Product added successfully!");
    });
}

// ================= DELETE PRODUCT =================
function deleteAdminProduct(productId) {
    // Prevent deleting built-in products
    if (productId <= 12) {
        alert(
            "Default products cannot be deleted. Only admin-added products can be removed."
        );
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const adminProducts = getAdminProducts();

    const updatedProducts = adminProducts.filter(
        (product) => product.id !== productId
    );

    saveAdminProducts(updatedProducts);

    renderAdminProducts();

    alert("Product deleted successfully!");
}

// ================= RENDER ADMIN ORDERS =================
function renderAdminOrders() {
    const container = document.getElementById(
        "admin-orders-container"
    );

    // Only run on admin.html
    if (!container) return;

    const orders = getOrders();

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="empty-state glass-card">
                <i class="fas fa-box-open"></i>
                <h3>No Orders Available</h3>
                <p>No customer orders have been placed yet.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = orders
        .map(
            (order, index) => `
            <div class="order-card glass-card">
                <div class="order-header">
                    <div class="order-info">
                        <h3>${order.orderId}</h3>
                        <p>
                            <strong>Customer:</strong>
                            ${order.customer.name}
                        </p>
                        <p>
                            <strong>Total:</strong>
                            ${formatCurrency(order.total)}
                        </p>
                    </div>

                    <select
                        class="admin-status-select"
                        onchange="updateOrderStatus(${index}, this.value)"
                    >
                        <option value="Processing"
                            ${
                                order.status === "Processing"
                                    ? "selected"
                                    : ""
                            }>
                            Processing
                        </option>

                        <option value="Shipped"
                            ${
                                order.status === "Shipped"
                                    ? "selected"
                                    : ""
                            }>
                            Shipped
                        </option>

                        <option value="Delivered"
                            ${
                                order.status === "Delivered"
                                    ? "selected"
                                    : ""
                            }>
                            Delivered
                        </option>
                    </select>
                </div>
            </div>
        `
        )
        .join("");
}

// ================= UPDATE ORDER STATUS =================
function updateOrderStatus(orderIndex, newStatus) {
    const orders = getOrders();

    if (!orders[orderIndex]) return;

    orders[orderIndex].status = newStatus;

    saveOrders(orders);

    renderAdminOrders();

    alert(`Order status updated to ${newStatus}.`);
}

// ================= INITIALIZE ADMIN PAGE =================
function initializeAdminPage() {
    const adminProductsGrid = document.getElementById(
        "admin-products-grid"
    );

    // Only run on admin.html
    if (!adminProductsGrid) return;

    initializeAdminProductForm();
    renderAdminProducts();
    renderAdminOrders();
}

// ================= EXTEND GLOBAL INITIALIZATION =================
document.addEventListener("DOMContentLoaded", () => {
    initializeAdminPage();
});


