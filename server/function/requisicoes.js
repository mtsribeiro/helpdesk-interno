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

  app.post("/InsereCategoria", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `INSERT INTO cad_categoria SET ?`, req.body
    );
    res.send(resultado);
  });

  app.post("/InsereUsuario", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `INSERT INTO cad_usuario SET ?`, req.body
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

  app.post("/updateSia", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE mov_Ticket SET ? WHERE idTicket = ${req.body.idTicket}`, req.body
    );
    res.send(resultado);
  });

  app.post("/ListaUsuarios", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_usuario order By ativo Desc`
    );
    res.send(resultado);
  });

  app.post("/ListaCategorias", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_categoria`
    );
    res.send(resultado);
  });

  app.post("/ListaCategoriaEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_categoria where IdCategoria = ${req.body.idCategoria}`
    );
    res.send(resultado);
  });

  app.post("/UpdateCategoriaEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE cad_categoria SET Descricao = '${req.body.Descricao}' where IdCategoria = ${req.body.idCategoria}`
    );
    res.send(resultado);
  });

  app.post("/UpdateUsuarioEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE cad_usuario SET ? where Idusuario = ${req.body.Idusuario}`, req.body
    );
    res.send(resultado);
  });

  app.post("/DeletaCategoriaEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `DELETE FROM cad_categoria where IdCategoria = ${req.body.idCategoria}`
    );
    res.send(resultado);
  });

  app.post("/ListaUsuarioEspecifico", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_usuario where Idusuario = ${req.body.id}`
    );
    res.send(resultado);
  });

  app.post("/DeletaUsuarioEspecifico", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `DELETE FROM cad_usuario where Idusuario = ${req.body.id}`
    );
    res.send(resultado);
  });

  app.post("/DashboardAprovacao", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria where idUsuarioCriacao = ${req.body.id} and Situacao = 2`
    );
    res.send(resultado);
  });
};

module.exports = {
  requisicoes,
};