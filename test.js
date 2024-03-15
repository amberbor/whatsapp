let cart = [];

function incrementQuantity(item, price) {
    let existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    updateCart();
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

function updateCart() {
    const cartItems = document.querySelector('.checkout-items');
    const totalElement = document.getElementById('total');
    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        let itemDisplay = item.item;
        if (item.price) {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemDisplay += ` x ${item.quantity}`;
            cartItems.innerHTML += `
                <div class="checkout-item">
                    <div>${itemDisplay}</div>
                    <hr>
                    <div>$${itemTotal}</div>
                </div>
            `;
        } else {
            // If the item doesn't have a price, only display the quantity
            itemDisplay += ` x ${item.quantity}`;
            cartItems.innerHTML += `
                <div class="checkout-item">
                    <div>${itemDisplay}</div>
                </div>
            `;
        }
    });

    totalElement.textContent = total;

    // Update quantity spans based on item name
    const quantitySpans = document.querySelectorAll('.quantity');
    quantitySpans.forEach(span => {
        const itemName = span.parentElement.parentElement.parentElement.querySelector('.bs-card-title').textContent;
        const cartItem = cart.find(item => item.item === itemName);
        if (cartItem) {
            span.textContent = cartItem.quantity;
        } else {
            span.textContent = '0'; // Set to 0 if item not found in cart
        }
    });
}



function orderViaWhatsApp() {
    let message = 'Order Details:\n\n';
    cart.forEach(item => {
        if (item.price) {
            message += `${item.quantity > 1 ? `${item.quantity} x ` : ''}${item.item} Price: $${item.price * item.quantity}\n\n`;
        } else {
            message += `${item.quantity > 1 ? `${item.quantity} x ` : ''}${item.item}\n\n`;
        }
    });
    message += `Total: $${document.getElementById('total').textContent}`;
    const whatsappLink = `https://wa.me/+355699577766?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappLink;
}

