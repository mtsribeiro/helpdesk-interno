const mysql = require("promise-mysql");

const connection = mysql.createConnection({
  host: "helpdesk.rstransitarios.com.br",
  user: "helpdesk",
  port: "3306",
  password: "J7Gdk513GtFZ3E3a",
  database: "helpdesk",
  charset: "utf8mb4",
});

function getConnection() {
  return connection;
}

module.exports = { getConnection };
