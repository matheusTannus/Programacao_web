let carrinho = [];

function dinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function adicionarProduto(card) {
    let id = card.dataset.id;
    let nome = card.dataset.name;
    let preco = Number(card.dataset.price);
    let imagem = card.querySelector("img").src;

    let produto = {
        id: id,
        nome: nome,
        preco: preco,
        imagem: imagem,
        quantidade: 1
    };

    let item = carrinho.find(function(item) {
        return item.id == id;
    });

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push(produto);
    }

    mostrarCarrinho();
    abrirCarrinho();
}

function mostrarCarrinho() {
    let lista = document.getElementById("cartItems");

    lista.innerHTML = "";

    let total = 0;
    let quantidade = 0;

    for (let i = 0; i < carrinho.length; i++) {
        let produto = carrinho[i];

        total += produto.preco * produto.quantidade;
        quantidade += produto.quantidade;

        lista.innerHTML += `
            <div class="cart-item">

                <div class="item-icon">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                </div>

                <div class="item-info">

                    <h4>${produto.nome}</h4>

                    <small>${dinheiro(produto.preco)}</small>

                    <div class="qty">

                        <button onclick="diminuir(${i})">
                            -
                        </button>

                        <b>${produto.quantidade}</b>

                        <button onclick="aumentar(${i})">
                            +
                        </button>

                        <button class="remove" onclick="remover(${i})">
                            Remover
                        </button>

                    </div>

                </div>

                <strong>
                    ${dinheiro(produto.preco * produto.quantidade)}
                </strong>

            </div>
        `;
    }

    if (carrinho.length == 0) {
        lista.innerHTML = `
            <div class="empty">
                🛒
                <br><br>
                Seu carrinho está vazio.
                <br>
                Adicione algo delicioso!
            </div>
        `;
    }

    document.getElementById("cartCount").innerText = quantidade;

    document.getElementById("cartTotal").innerText =
        dinheiro(total);

    document.getElementById("checkoutButton").disabled =
        carrinho.length == 0;
}

function aumentar(i) {
    carrinho[i].quantidade++;
    mostrarCarrinho();
}

function diminuir(i) {
    carrinho[i].quantidade--;

    if (carrinho[i].quantidade == 0) {
        carrinho.splice(i, 1);
    }

    mostrarCarrinho();
}

function remover(i) {
    carrinho.splice(i, 1);
    mostrarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("cart").classList.add("open");
    document.getElementById("overlay").classList.add("show");
}

function fecharCarrinho() {
    document.getElementById("cart").classList.remove("open");
    document.getElementById("overlay").classList.remove("show");
}

document.getElementById("cartButton").onclick = abrirCarrinho;

document.getElementById("closeCart").onclick = fecharCarrinho;

document.getElementById("overlay").onclick = fecharCarrinho;

document.getElementById("checkoutButton").onclick = function() {

    if (carrinho.length == 0) {
        return;
    }

    fecharCarrinho();

    document.getElementById("checkoutItems").innerText =
        carrinho.length;

    document.getElementById("checkoutTotal").innerText =
        document.getElementById("cartTotal").innerText;

    document.getElementById("checkoutModal").classList.add("show");
};

document.getElementById("closeCheckout").onclick = function() {
    document.getElementById("checkoutModal").classList.remove("show");
};

let botoes = document.querySelectorAll(".add");

botoes.forEach(function(botao) {

    botao.onclick = function() {

        let card = botao.closest(".card");

        adicionarProduto(card);
    };
});

document.getElementById("paymentMethod").onchange = function() {

    let forma = this.value;
    let extra = document.getElementById("paymentExtra");

    if (forma == "Pix") {

        extra.innerHTML = `
            <p>
                O pagamento será feito por PIX.
            </p>
        `;

    } else if (forma == "Cartão") {

        extra.innerHTML = `
            <label>
                Número do cartão

                <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    required
                >
            </label>
        `;

    } else if (forma == "Dinheiro") {

        extra.innerHTML = `
            <label>
                Troco para

                <input
                    type="text"
                    placeholder="Ex.: 50,00"
                >
            </label>
        `;

    } else {

        extra.innerHTML = "";
    }
};

document.getElementById("paymentForm").onsubmit = function(event) {

    event.preventDefault();

    let nome = document.getElementById("customerName").value;

    let forma = document.getElementById("paymentMethod").value;

    let total = document.getElementById("cartTotal").innerText;

    document.getElementById("successText").innerText =
        "Obrigado, " +
        nome +
        "! Seu pedido de " +
        total +
        " foi registrado para pagamento em " +
        forma +
        ".";

    document.getElementById("checkoutContent")
        .classList.add("hidden");

    document.getElementById("successMessage")
        .classList.remove("hidden");

    carrinho = [];

    mostrarCarrinho();
};

document.getElementById("newOrder").onclick = function() {

    document.getElementById("successMessage")
        .classList.add("hidden");

    document.getElementById("checkoutContent")
        .classList.remove("hidden");

    document.getElementById("paymentForm").reset();

    document.getElementById("paymentExtra").innerHTML = "";

    document.getElementById("checkoutModal")
        .classList.remove("show");
};

mostrarCarrinho();
