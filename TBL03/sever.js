const express = require('express');
const cors = require('cors');

const app = express();

// Habilitar o CORS
app.use(cors({           
    // Quando o frontend for executado em http://localhost:5500, a chamada será permitida.

    // Se a página for executada em outra origem, como http://localhost:5501, o navegador bloqueará o acesso à resposta da API, pois essa origem não está autorizada pelo CORS.

    origin: 'http://localhost:5500'
    // methods: ['GET']
    //Permite somente requisições do tipo GET através do CORS.
    // O objetivo de limitar os métodos permitidos é aumentar a segurança da API, evitando que origens não autorizadas utilizem métodos como POST, PUT e DELETE para enviar, alterar ou excluir informações.
    // Importante: essa configuração limita os métodos permitidos pelo CORS para requisições de outras origens feitas por navegadores. Ela não substitui a validação dos métodos HTTP no próprio backend.
}));

// R: A chamada pode funcionar no Postman e falhar no navegador porque o Postman não aplica as mesmas restrições de CORS dos navegadores. 
// O navegador verifica se o servidor autoriza requisições de outras origens. 
// Se essa autorização não estiver configurada, o navegador poderá bloquear o acesso à resposta da API.

// Rota da API
/*app.get('/api', (req, res) => {
    res.json({ mensagem: 'API funcionando normalmente!' });
});*/

app.get('/usuarios', (req, res) => {
    res.json([
        {
            id: 1,
            nome: 'João'
        },
        {
            id: 2,
            nome: 'Maria'
        },
        {
            id: 3,
            nome: 'Pedro'
        }
    ]);
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
