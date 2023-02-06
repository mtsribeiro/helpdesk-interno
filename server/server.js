const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app);
var multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../uploads/')
  },
  filename: function (req, file, cb) {
      // Extração da extensão do arquivo original:
      const extensaoArquivo = file.originalname.split('.')[1];

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = file.originalname.split('.')[0];

      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});
var upload = multer({ storage });
const { requisicoes } = require("./function/requisicoes");

const port = 2469;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../public")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/home.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/admin.html"));
});

app.get("/aprovacao", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/aprovacao.html"));
});

requisicoes(app, upload);

server.listen(port, () => {
  console.log(`Servidor iniciado, porta: ${port}`);
});