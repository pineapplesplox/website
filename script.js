// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Basic cart functionality (local storage for prototype)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const item = {
            name: card.querySelector('h3').textContent,
            price: card.querySelector('.price').textContent,
            id: Date.now() // Simple unique ID
        };
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.innerHTML = 'Added! ❤️';
        setTimeout(() => {
            this.innerHTML = 'Add to Cart <i class="fas fa-plus"></i>';
        }, 2000);
        updateCartCount();
    });
});

function updateCartCount() {
    const cartCount = document.querySelector('.cart a');
    if (cartCount) {
        let span = cartCount.querySelector('span');
        if (!span) {
            span = document.createElement('span');
            cartCount.appendChild(span);
        }
        span.textContent = `Cart (${cart.length})`;
    }
}

// Contact form submission (alert for now; integrate with backend later)
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    alert('Thanks for your message! We will get back to you soon. (This is a prototype—real form needs backend setup.)');
    this.reset();
});

// Update cart on load
updateCartCount();