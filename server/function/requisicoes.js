const { getConnection } = require("../database/database");

const requisicoes = async (app) => {
  app.post("/ChecaLogin", async function (req, res) {
    var email = req.body.email;
    var senha = req.body.password;
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_usuario where email = '${email}' and senha = '${senha}' and ativo = 1`
    );
    res.send(resultado);
  });

  app.post("/BuscaCategoria", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_categoria`
    );
    res.send(resultado);
  });
};

module.exports = {
  requisicoes,
};