const express = require('express');
const app = express();
//= rota home
app.get('/', (req, res) => {
    res.send('Bem Vindo Usuario');
});
//= rota sobre
app.get('/sobre', (req, res) => {
    res.send('Esse é um sistema de casa de aposta');
});
//= rota contato
app.get('/contato', (req, res) => {
    res.send('Telefone (34) 998875420');
});
app.get('/api/produto', (req, res) => {
    const produto = [
        { nome: 'coca-cola', preco: 4.50 },
        { nome: 'fanta laranja', preco: 3.50 },
    ];
    res.json(produto);
});

app.get('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const usuarios = [
        { id: 1, nome: 'Ana', mensagem: 'voce foi desclassificada da nossa campanha' },
        { id: 2, nome: 'Carlos', mensagem: 'voce foi selecionado na nossa campanha' }
    ];
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({
            erro: 'Usuário nãO encontrado' });
    }
    res.json(usuario);
});

app.get('/buscar', (req, res) => {
    const nome = req.query.nome;
    res.json({
        resultado: nome
    });
});

app.get('/api/alunos', (req, res) => {
    const alunos = [
        { nome: 'João Silva', idade: 17, nota: 8.5 },
        { nome: 'Maria Santos', idade: 16, nota: 9.0 },
        { nome: 'Pedro Oliveira', idade: 18, nota: 7.5 },
        { nome: 'Ana Costa', idade: 17, nota: 9.5 },
        { nome: 'Lucas Souza', idade: 16, nota: 6.5 },
        { nome: 'Beatriz Lima', idade: 18, nota: 8.0 },
    ];
    res.json(alunos);
});

app.listen(3000, () => {
    console.log('Servidor rodando');
});


