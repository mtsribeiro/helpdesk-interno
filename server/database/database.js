const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "assinatura.rstransitarios.com.br",
  user: "helpdesk",
  port: "3306",
  password: "J7Gdk513GtFZ3E3a",
  database: "helpdesk",
  charset: "utf8mb4",
});

async function getConnection() {
  let conn = await mysql.createConnection({
  host: "assinatura.rstransitarios.com.br",
  user: "helpdesk",
  port: "3306",
  password: "J7Gdk513GtFZ3E3a",
  database: "helpdesk",
  charset: "utf8mb4",
  });
  return conn;
}

module.exports = { getConnection };
