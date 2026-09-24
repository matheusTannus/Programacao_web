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
  if (req.url === "/usuarios") {
    try {
      const resultado = await pool.query(
        "SELECT * FROM usuarios"
      );

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(JSON.stringify(resultado.rows));
    } catch (erro) {
      console.error(erro);

      res.writeHead(500, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          mensagem: "Erro interno do servidor",
        })
      );
    }
  }
});

server.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
