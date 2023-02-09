const { getConnection } = require("../database/database");

function getWeek() {
  let date = new Date();
  let firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  let dayOfWeek = firstDayOfYear.getDay();
  let spendDays = 1;
  if (dayOfWeek != 0) {
    spendDays = 7 - dayOfWeek + 1;
  }
  let firstMondayOfYear = new Date(date.getFullYear(), 0, 1 + spendDays);
  let d = Math.floor((date.valueOf() - firstMondayOfYear.valueOf()) / 86400000);
  return Math.ceil((d + firstMondayOfYear.getDay() + 1) / 7);
}

const requisicoes = async (app, upload) => {
  app.post("/ChecaLogin", async function (req, res) {
    var email = req.body.email;
    var senha = req.body.password;
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_usuario where email = '${email}' and senha = '${senha}' and ativo = 1`
    );
    res.send(resultado);
    conn.end();
  });

  app.post("/BuscaCategoria", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_categoria`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/InsereTicket", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `INSERT INTO mov_Ticket SET ?`, req.body
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DashboardBackEnd", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/myDashboardBackEnd", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao} and Tks.idUsuarioCriacao = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DashboardDev", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/myDashboardDev", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao} and Tks.idUsuarioCriacao = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DashboardTeste", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/myDashboardTeste", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao} and Tks.idUsuarioCriacao = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DashboardFinalizado", async function (req, res) {
    var semanaAtual = getWeek()
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao} and Tks.sprint = ${semanaAtual}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/myDashboardFinalizado", async function (req, res) {
    var semanaAtual = getWeek()
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao} and Tks.sprint = ${semanaAtual} and Tks.idUsuarioCriacao = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DashboardArquivado", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/myDashboardArquivado", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Situacao = ${req.body.Situacao} and Tks.idUsuarioCriacao = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/InsereCategoria", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `INSERT INTO cad_categoria SET ?`, req.body
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/InsereUsuario", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `INSERT INTO cad_usuario SET ?`, req.body
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/SelecionaTicket", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria WHERE Tks.IdTicket = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/updateSia", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE mov_Ticket SET Categoria = ${req.body.Categoria}, Urgencia = ${req.body.Urgencia}, Assunto = '${req.body.Assunto}', Descricao = '${req.body.Descricao}', Sprint = ${req.body.Sprint}, Solucao = '${req.body.Solucao}', Situacao = ${req.body.Situacao}, motivoCancelamento = '${req.body.motivoCancelamento}' WHERE idTicket = ${req.body.idTicket}`
    );
    res.send(resultado);
    conn.end();
  });

  app.post("/ListaUsuarios", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_usuario order By ativo Desc`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/ListaCategorias", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_categoria`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/ListaCategoriaEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_categoria where IdCategoria = ${req.body.idCategoria}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/UpdateCategoriaEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE cad_categoria SET Descricao = '${req.body.Descricao}' where IdCategoria = ${req.body.idCategoria}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/UpdateUsuarioEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE cad_usuario SET ? where Idusuario = ${req.body.Idusuario}`, req.body
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DeletaCategoriaEspecifica", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `DELETE FROM cad_categoria where IdCategoria = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/ListaUsuarioEspecifico", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `Select * from cad_usuario where Idusuario = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DeletaUsuarioEspecifico", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `DELETE FROM cad_usuario where Idusuario = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/DashboardAprovacao", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria where idUsuarioCriacao = ${req.body.id} and Situacao = 2`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/UpdateTicketCancelado", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE mov_Ticket SET motivoCancelamento = '${req.body.motivoCancelamento}', situacao = 1 WHERE idTicket = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/UpdateTicketAprovado", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE mov_Ticket SET situacao = 3 WHERE idTicket = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  })
  
  app.post('/enviarArquivos', upload.array("files", 10), async function (req, res) {
    let conn = await getConnection();
    var arquivos = req.files
    arquivos.forEach(async element => {
      await conn.query(`INSERT INTO arq_Arquivos (descricao, idTicket, caminho) VALUES ('${element.originalname}',0,'uploads/${element.originalname}');`)
    });
    
    res.send('Enviado com sucesso');
    conn.end();
  });

  app.post("/PegaUltimoTicket", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT Tks.*, Ctg.Descricao as Categoria_desc FROM mov_Ticket Tks Join cad_categoria Ctg on Ctg.IdCategoria = Tks.Categoria order by Tks.IdTicket desc limit 1`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/UpdateArquivosTicket", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `UPDATE arq_Arquivos SET idTicket = ${req.body.id} Where idTicket = 0`
    );
    
    res.send(resultado);
    conn.end();
  });

  app.post("/selecionaArquivosTicket", async function (req, res) {
    let conn = await getConnection();
    const resultado = await conn.query(
      `SELECT * FROM arq_Arquivos WHERE idTicket = ${req.body.id}`
    );
    
    res.send(resultado);
    conn.end();
  });
  
}

module.exports = {
  requisicoes
}