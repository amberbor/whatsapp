let cart = [];

function addToCart(item,  price) {
    let existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.querySelector('.checkout-items');
    const totalElement = document.getElementById('total');
    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        cartItems.innerHTML += `
            <div class="checkout-item">
                <div>
                    ${item.item} 
                </div>
                <hr>
                <div class="quantity-div">
                    <button class="quantity-btn" onclick="decrementQuantity('${item.item}')">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="incrementQuantity('${item.item}')">+</button>
                </div>
                <hr>
                <div>$${itemTotal}</div>
                
            </div>
        `;
    });

    totalElement.textContent = total;
}

function incrementQuantity(item) {
    const cartItem = cart.find(cartItem => cartItem.item === item);
    if (cartItem) {
        cartItem.quantity++;
        updateCart();
    }
}

function decrementQuantity(item) {
    const cartItem = cart.find(cartItem => cartItem.item === item);
    if (cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            // Remove the item from the cart if the quantity becomes 0
            cart = cart.filter(cartItem => cartItem.item !== item);
        }
        updateCart();
    }
}

function orderViaWhatsApp() {
    let message = 'Order Details:\n\n';
    cart.forEach(item => {
        message += `${item.quantity > 1 ? `${item.quantity} x ` : ''}${item.item} Price: $${item.price * item.quantity}\n\n`;
    });
    message += `Total: $${document.getElementById('total').textContent}`;
    const whatsappLink = `https://wa.me/+355699577766?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappLink;
}
