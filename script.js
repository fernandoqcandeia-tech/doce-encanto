/* =====================================
   DOCE ENCANTO - JAVASCRIPT
   ===================================== */

// ALTERA PARA O NÚMERO DO WHATSAPP
// Angola: 244 seguido do número
const WHATSAPP_NUMBER = "244943872421";

// PRODUTOS DO CATÁLOGO
// Altera os nomes, preços e imagens como quiseres.

const products = [
    {
        id: 1,
        name: "Bolo de Chocolate",
        description: "Bolo macio com cobertura de chocolate.",
        price: 8000,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Cupcakes",
        description: "Deliciosos cupcakes decorados.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Bolo de Morango",
        description: "Bolo especial com sabor a morango.",
        price: 10000,
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80"
    },

    {
        id: 5,
        name: "Bolo de Aniversário",
        description: "Bolo personalizado para momentos especiais.",
        price: 15000,
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Bolinhos Caseiros",
        description: "Bolinhos frescos feitos com carinho.",
        price: 5000,
        image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=600&q=80"
    }
];

// CARRINHO
let cart = [];

// FORMATAÇÃO DE PREÇOS
function formatPrice(price) {
    return price.toLocaleString("pt-AO") + " Kz";
}

// MOSTRAR PRODUTOS
function renderProducts() {
    const grid = document.getElementById("product-grid");

    if (!grid) return;

    grid.innerHTML = products.map(product => `
        <div class="product-card reveal">
            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy">

            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>

                <div class="product-bottom">
                    <span class="price">
                        ${formatPrice(product.price)}
                    </span>

                    <button class="add-btn"
                        onclick="adicionarCarrinho(${product.id}, this)">
                        + Adicionar
                    </button>
                </div>
            </div>
        </div>
    `).join("");

    observarAnimacoes();
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(id, button) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    atualizarCarrinho();

    if (button) {
        const originalText = button.textContent;

        button.textContent = "✓ Adicionado";
        button.classList.add("added");

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove("added");
        }, 1000);
    }
}

// REMOVER DO CARRINHO
function removerCarrinho(id) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(product => product.id !== id);
    }

    atualizarCarrinho();
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>🛒 O teu carrinho está vazio.</p>
                <p>Escolhe os teus bolinhos favoritos!</p>
            </div>
        `;
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>
                    ${item.quantity} × ${formatPrice(item.price)}
                </small>
            </div>

            <div>
                <strong>
                    ${formatPrice(item.price * item.quantity)}
                </strong>

                <button onclick="removerCarrinho(${item.id})">
                    −
                </button>
            </div>
        </div>
    `).join("");
}

// ABRIR CARRINHO
function abrirCarrinho() {
    document.getElementById("cart-overlay").style.display = "flex";
    document.body.classList.add("no-scroll");
}

// FECHAR CARRINHO
function fecharCarrinho() {
    document.getElementById("cart-overlay").style.display = "none";
    document.body.classList.remove("no-scroll");
}

// ABRIR FORMULÁRIO
function abrirFormulario() {
    if (cart.length === 0) {
        alert("Adiciona primeiro algum bolinho ao carrinho.");
        return;
    }

    fecharCarrinho();

    document.getElementById("form-overlay").style.display = "flex";
    document.body.classList.add("no-scroll");
}

// FECHAR FORMULÁRIO
function fecharFormulario() {
    document.getElementById("form-overlay").style.display = "none";
    document.body.classList.remove("no-scroll");
}

// ENVIAR ENCOMENDA PELO WHATSAPP
document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("O carrinho está vazio.");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    let mensagem = `🍰 *NOVA ENCOMENDA - DOCE ENCANTO*%0A%0A`;
    mensagem += `👤 *Nome:* ${nome}%0A`;
    mensagem += `📞 *Telefone:* ${telefone}%0A`;
    mensagem += `📍 *Endereço:* ${endereco}%0A%0A`;
    mensagem += `🛒 *Encomenda:*%0A`;

    cart.forEach(item => {
        mensagem += `• ${item.name} - ${item.quantity} × ${formatPrice(item.price)}%0A`;
    });

    mensagem += `%0A💰 *TOTAL: ${formatPrice(total)}*`;

    if (observacoes) {
        mensagem += `%0A📝 *Observações:* ${observacoes}`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`;

    window.open(url, "_blank");

    fecharFormulario();
});

// BOTÃO DE WHATSAPP DIRETO
function enviarWhatsApp() {
    const mensagem = encodeURIComponent(
        "Olá! Gostaria de fazer uma encomenda na Doce Encanto 🍰"
    );

    window.open(
        `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`,
        "_blank"
    );
}

// ANIMAÇÕES DE SCROLL
function observarAnimacoes() {
    const elements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    elements.forEach(element => {
        if (!element.classList.contains("visible")) {
            observer.observe(element);
        }
    });
}

// FECHAR MODAIS AO CLICAR FORA
document.getElementById("cart-overlay").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharCarrinho();
    }
});

document.getElementById("form-overlay").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharFormulario();
    }
});

// ANO AUTOMÁTICO
document.getElementById("year").textContent = new Date().getFullYear();

// INICIAR SITE
document.addEventListener("DOMContentLoaded", function() {
    renderProducts();
    atualizarCarrinho();
    observarAnimacoes();
});