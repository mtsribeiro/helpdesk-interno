const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "assinatura.rstransitarios.com.br",
  user: "mateus",
  port: "3306",
  password: "21uZtxOj8HWhf1T4",
  database: "helpdesk",
  charset: "utf8mb4",
});

async function getConnection() {
  let conn = await mysql.createConnection({
  host: "assinatura.rstransitarios.com.br",
  user: "mateus",
  port: "3306",
  password: "21uZtxOj8HWhf1T4",
  database: "helpdesk",
  charset: "utf8mb4",
  });
  return conn;
}

module.exports = { getConnection };
