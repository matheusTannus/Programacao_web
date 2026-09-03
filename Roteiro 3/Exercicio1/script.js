//Exercicio 1
const botao1 = document.getElementById("botao1");
const botao2 = document.getElementById("botao2");
const botao3 = document.getElementById("botao3");

const imagem = document.getElementById("imagem");
botao1.addEventListener("click", function() {
    imagem.src = "bugatti.jpg";
});
botao2.addEventListener("click", function() {
    imagem.src = "laferrari.jpg";
});
botao3.addEventListener("click", function() {
    imagem.src = "Urus.jpg";
});

//Exercicio 2
const tituloExercicio = document.getElementById("tituloExercicio");
const botaoTexto = document.getElementById("botaoTexto");
botaoTexto.addEventListener("click", function() {
    tituloExercicio.textContent = "JavaScript é interativo!";
});

// Exercicio 3
const botaoCor = document.getElementById("botaoCor");
botaoCor.addEventListener("click", function() {
    document.body.style.backgroundColor = "pink";
});

// Exercicio 4
let contador = 0;
const numeroContador = document.getElementById("contador");
const botaoContador = document.getElementById("botaoContador");
botaoContador.addEventListener("click", function() {
    contador = contador + 1;

    numeroContador.textContent = contador;
});

// Exercicio 5
const texto = document.getElementById("texto");
const botaoMostrarEsconder = document.getElementById("botaoMostrarEsconder");
botaoMostrarEsconder.addEventListener("click", function() {

    if (texto.style.display === "none") {
        texto.style.display = "block";
        botaoMostrarEsconder.textContent = "Esconder texto";
    } else {
        texto.style.display = "none";
        botaoMostrarEsconder.textContent = "Mostrar texto";
    }

});

// Exercicio 6
const botaoModo = document.getElementById("botaoModo");
botaoModo.addEventListener("click", function() {

    document.body.classList.toggle("escuro");

    if (document.body.classList.contains("escuro")) {
        botaoModo.textContent = "Modo claro";
    } else {
        botaoModo.textContent = "Modo escuro";
    }

});