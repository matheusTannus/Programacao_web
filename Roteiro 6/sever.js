const express = require('express');

const app = express();
const PORT = 3000;

// Permite receber dados em formato JSON
app.use(express.json());

// Array para armazenar os produtos
let produtos = [];
let proximoId = 1;

// ========================================
// EXERCÍCIO 3 — MIDDLEWARE DE LOG
// ========================================

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// ========================================
// EXERCÍCIO 1 — CRUD DE PRODUTOS
// ========================================

// POST /produtos
// Cadastra um novo produto
app.post('/produtos', (req, res) => {
    const { nome, preco } = req.body;

    // EXERCÍCIO 2 — VALIDAÇÃO

    if (
        typeof nome !== 'string' ||
        nome.trim() === '' ||
        typeof preco !== 'number' ||
        !Number.isFinite(preco) ||
        preco <= 0
    ) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Nome deve ser preenchido e preço deve ser um número maior que zero.'
        });
    }

    const novoProduto = {
        id: proximoId++,
        nome: nome.trim(),
        preco: preco
    };

    produtos.push(novoProduto);

    return res.status(201).json({
        sucesso: true,
        dados: novoProduto
    });
});

// GET /produtos
// Lista todos os produtos
app.get('/produtos', (req, res) => {
    return res.status(200).json({
        sucesso: true,
        dados: produtos
    });
});

// GET /produtos/:id
// Busca um produto pelo ID
app.get('/produtos/:id', (req, res) => {
    const id = req.params.id;

    // EXERCÍCIO 5 — VALIDAÇÃO DO ID

    if (!/^[1-9]\d*$/.test(id)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido. Informe um número inteiro positivo.'
        });
    }

    const idNumerico = Number(id);

    if (!Number.isSafeInteger(idNumerico)) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido. Informe um número inteiro positivo.'
        });
    }

    const produto = produtos.find(p => p.id === idNumerico);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado.'
        });
    }

    return res.status(200).json({
        sucesso: true,
        dados: produto
    });
});

// PUT /produtos/:id
// Atualiza um produto existente
app.put('/produtos/:id', (req, res) => {
    const id = req.params.id;

    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido. Informe um número inteiro positivo.'
        });
    }

    const idNumerico = Number(id);

    const produto = produtos.find(p => p.id === idNumerico);

    if (!produto) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado.'
        });
    }

    const { nome, preco } = req.body;

    // Valida os dados recebidos
    if (
        typeof nome !== 'string' ||
        nome.trim() === '' ||
        typeof preco !== 'number' ||
        !Number.isFinite(preco) ||
        preco <= 0
    ) {
        return res.status(400).json({
            sucesso: false,
            erro: 'Nome deve ser preenchido e preço deve ser um número maior que zero.'
        });
    }

    produto.nome = nome.trim();
    produto.preco = preco;

    return res.status(200).json({
        sucesso: true,
        dados: produto
    });
});

// DELETE /produtos/:id
// Exclui um produto
app.delete('/produtos/:id', (req, res) => {
    const id = req.params.id;

    if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(Number(id))) {
        return res.status(400).json({
            sucesso: false,
            erro: 'ID inválido. Informe um número inteiro positivo.'
        });
    }

    const idNumerico = Number(id);

    const indice = produtos.findIndex(p => p.id === idNumerico);

    if (indice === -1) {
        return res.status(404).json({
            sucesso: false,
            erro: 'Produto não encontrado.'
        });
    }

    const produtoRemovido = produtos.splice(indice, 1)[0];

    return res.status(200).json({
        sucesso: true,
        dados: produtoRemovido
    });
});

// ========================================
// EXERCÍCIO 3 — ROTA DE USUÁRIOS PARA TESTAR O LOG
// ========================================

// POST /usuarios
app.post('/usuarios', (req, res) => {
    return res.status(201).json({
        sucesso: true,
        dados: {
            mensagem: 'Rota de teste de usuários funcionando.'
        }
    });
});

// ========================================
// TRATAMENTO DE ROTAS INEXISTENTES
// ========================================

app.use((req, res) => {
    return res.status(404).json({
        sucesso: false,
        erro: 'Rota não encontrada.'
    });
});

// ========================================
// INICIAR SERVIDOR
// ========================================

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
