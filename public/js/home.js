carregamentoStatico("./pages/dashboard.html", "#dashboard");
carregamentoStatico("./pages/home.html", "#ProfileLogado");

function carregamentoStatico(arquivo, local) {
  fetch(arquivo)
    .then((response) => response.text())
    .then((text) => {
      $(local).html(text);
    });
}

$(document).ready(function (e) {
  $.ajax({
    url : "/BuscaCategoria",
    type : 'post',
    success: function (response) {
      response.forEach(element => {
        $('#CategoriaTicket').append(`<option value="${element.idCategoria}" style="color: #000">${element.Descricao}</option>`)
      });
    }
  })
});