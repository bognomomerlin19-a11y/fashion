document.addEventListener('DOMContentLoaded', () => {
  const products = window.productsData || Array.from({ length: 200 }, (_, index) => {
    const colors = ['Blond', 'Brun', 'Noir', 'Châtain', 'Roux'];
    const id = index + 1;
    return {
      id,
      name: "NADEGE KABELO L'INTERNATIONAL",
      style: `Modèle ${String(id).padStart(3, '0')}`,
      color: colors[index % colors.length],
      length: 18 + (index % 10),
      price: 59 + (index % 20),
      description: 'Perruque premium, texture douce et tenue parfaite. Idéale pour un style unique et élégant.',
    };
  });

  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = list.map(formatProductCard).join('');
  const searchInput = document.getElementById('search-input');
  const colorFilter = document.getElementById('color-filter');
  const sortSelect = document.getElementById('sort-select');
  const resultCount = document.getElementById('result-count');
  const cartCount = createCartWidget();
  const cart = loadCart();

  function createCartWidget() {
    const header = document.querySelector('header');
    if (!header) return null;

    const existing = document.getElementById('cart-widget');
    if (existing) {
      return {
        count: existing.querySelector('#cart-count'),
        total: existing.querySelector('#cart-total'),
      };
    }

    const cartWidget = document.createElement('div');
    cartWidget.id = 'cart-widget';
    cartWidget.innerHTML = 'Panier : <span id="cart-count">0</span> articles • <span id="cart-total">0€</span>';
    header.appendChild(cartWidget);
    return {
      count: cartWidget.querySelector('#cart-count'),
      total: cartWidget.querySelector('#cart-total'),
    };
  }

  function loadCart() {
    const storedCart = localStorage.getItem('perruqueCart');
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.warn('Panier corrompu, réinitialisation.', error);
      return [];
    }
  }

  function saveCart() {
    localStorage.setItem('perruqueCart', JSON.stringify(cart));
  }

  function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  }

  function updateCartCount() {
    if (cartCount?.count) {
      cartCount.count.textContent = String(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    }
    if (cartCount?.total) {
      cartCount.total.textContent = `${getCartTotal()}€`;
    }
  }

  function formatProductCard(product) {
    const safeColor = product.color || 'Couleur indisponible';
    return `\n      <article class="card">\n        <div class="card-image">${product.style}</div>\n        <div class="card-body">\n          <div class="card-title">${product.name}</div>\n          <div class="card-subtitle">${product.style} – ${safeColor}</div>\n          <p class="card-text">${product.description}</p>\n          <div class="card-meta">\n            <span class="chip">Longueur ${product.length} pouces</span>\n            <span class="chip">Couleur ${safeColor}</span>\n          </div>\n          <div class="price">${product.price}€</div>\n          <button class="button" data-id="${product.id}" data-title="${product.style} – ${safeColor}">Ajouter au panier</button>\n        </div>\n      </article>\n    `;
  }

  function renderProducts(list) {
    if (!productGrid) return;

    if (list.length === 0) {
      productGrid.innerHTML = '<div class="empty-state">Aucun résultat trouvé. Essayez un autre filtre ou mot-clé.</div>';
      resultCount.textContent = '0 produits trouvés';
      bindAddButtons();
      return;
    }

    productGrid.innerHTML = list.map(formatProductCard).join('');
    resultCount.textContent = `${list.length} produit${list.length > 1 ? 's' : ''} trouvés`;
    bindAddButtons();
  }

  function bindAddButtons() {
    document.querySelectorAll('.button').forEach((button) => {
      button.removeEventListener('click', handleAddToCart);
      button.addEventListener('click', handleAddToCart);
    });
  }

  function handleAddToCart(event) {
    const button = event.currentTarget;
    const productId = Number(button.dataset.id || 0);
    const product = products.find((item) => item.id === productId);
    if (!product) return;

    const existingIndex = cart.findIndex((item) => item.id === productId);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.style,
        color: product.color,
        price: product.price,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }

    saveCart();
    updateCartCount();

    const originalText = button.textContent;
    button.textContent = 'Ajouté au panier';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1400);
  }

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function filterAndSortProducts() {
    const searchTerm = normalize(searchInput?.value);
    const selectedColor = normalize(colorFilter?.value);
    const sortBy = sortSelect?.value || 'id';

    const filtered = products.filter((product) => {
      const searchMatch = [product.style, product.name, product.color, product.description, `${product.length}`]
        .some((field) => normalize(field).includes(searchTerm));
      const colorMatch = selectedColor ? normalize(product.color) === selectedColor : true;
      return searchMatch && colorMatch;
    });

    const sorted = filtered.slice().sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      }
      if (sortBy === 'length') {
        return a.length - b.length;
      }
      return a.id - b.id;
    });

    renderProducts(sorted);
  }

  searchInput?.addEventListener('input', filterAndSortProducts);
  colorFilter?.addEventListener('change', filterAndSortProducts);
  sortSelect?.addEventListener('change', filterAndSortProducts);

  updateCartCount();
  renderProducts(products);
});
