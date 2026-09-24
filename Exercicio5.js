const http = require("http");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "sql123",
  port: 5432,
});

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith("/usuarios/")) {
    try {
      const id = req.url.split("/")[2];

      if (isNaN(id)) {
        res.writeHead(400, {
          "Content-Type": "application/json",
        });

        return res.end(
          JSON.stringify({ mensagem: "ID deve ser um número" })
        );
      }

      const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE id = $1",
        [id]
      );


      if (resultado.rows.length === 0) {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });

        return res.end(
          JSON.stringify({ mensagem: "Usuário não encontrado" })
        );
      }

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(resultado.rows[0]));
    } catch (erro) {
      console.error(erro);

      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({ mensagem: "Erro interno do servidor" })
      );
    }
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
