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

  app.post("/InsereTicket", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `INSERT INTO mov_Ticket SET ?`, req.body
    );
    res.send(resultado);
  });

  app.post("/DashboardBackEnd", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    res.send(resultado);
  });

  app.post("/DashboardDev", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    res.send(resultado);
  });

  app.post("/DashboardTeste", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    res.send(resultado);
  });

  app.post("/DashboardFinalizado", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    res.send(resultado);
  });

  app.post("/SelecionaTicket", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Tks.IdTicket = ${req.body.id}`
    );
    res.send(resultado);
  });
};

module.exports = {
  requisicoes,
};