carregamentoStatico("./pages/dashboard.html", "#dashboard");
carregamentoStatico("./pages/home.html", "#ProfileLogado");

function carregamentoStatico(arquivo, local) {
  fetch(arquivo)
    .then((response) => response.text())
    .then((text) => {
      $(local).html(text);
    });
}