let cart = [];

async function loadMenu() {
    const response = await fetch('data.json');
    const menuItems = await response.json();
    const menuContainer = document.getElementById('menu-items');

    menuItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'overflow-hidden', 'relative'); // Added 'relative' for positioning

        itemElement.innerHTML = `
    <picture class="w-full">
        <source media="(min-width: 1024px)" srcset="${item.image.desktop}">
        <source media="(min-width: 768px)" srcset="${item.image.tablet}">
        <source media="(min-width: 480px)" srcset="${item.image.mobile}">
        <img src="${item.image.thumbnail}" alt="${item.name}" class="w-full h-48 object-cover"> <!-- Full width image -->
    </picture>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <button class="bg-white text-orange-500  py-2 rounded-full shadow-lg hover:bg-orange-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 3a1 1 0 011-1h1a1 1 0 011 1h8a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 00-1-1zm0 9a1 1 0 011-1h1a1 1 0 011 1h8a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1a1 1 0 00-1-1zm0-4a1 1 0 011-1h1a1 1 0 011 1h8a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 00-1-1z" />
            </svg>
            Add to Cart
        </button>
    </div>
    <div class="p-4 text-left"> <!-- Wrapped content to manage padding -->
        <h2 class="text-lg font-bold m-0">${item.name}</h2> <!-- Removed margin -->
        <p class="text-gray-600 m-0">${item.category}</p> <!-- Removed margin -->
        <p class="text-orange-600 font-semibold text-xl mt-2">$${item.price.toFixed(2)}</p>
    </div>
`;

        menuContainer.appendChild(itemElement);
    });
}

// Function to add item to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Clear current cart display
    cartItemsContainer.innerHTML = '';

    // Calculate total
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const cartItemElement = document.createElement('li');
        cartItemElement.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
        cartItemElement.innerHTML = `
                    <span>${item.name} x${item.quantity}</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Update cart count and total price
    cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.innerText = `$${total.toFixed(2)}`;
}

// Load the menu when the page is loaded
loadMenu();
