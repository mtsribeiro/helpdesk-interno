carregamentoStatico("./pages/dashboard.html", "#dashboard");
carregamentoStatico("./pages/home.html", "#ProfileLogado");

function carregamentoStatico(arquivo, local) {
  fetch(arquivo)
    .then((response) => response.text())
    .then((text) => {
      $(local).html(text);
    });
}
dashboard()

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

$(document).on('click', '#AbreTicket', function (e) {
  location.reload('./dashboard.html');
  var categoria = $('#CategoriaTicket').val()
  var urgencia = $('#UrgenciaTicket').val()
  var assunto = $('#AssuntoTicket').val()
  var descricao = $('#DescricaoTicket').val()

  if (!categoria || !urgencia || !assunto || !descricao) {
    ("#msg-text").text("Necessário preencher todas as informações 🖥️");
        $(".toast").toast("show");
        setTimeout(() => {
          $("#msg-text").text("");
    }, 3000);
  } else {
    dashboard()
    $.ajax({
      url : "/InsereTicket",
      type : 'post',
      data: {Categoria: categoria,
             Urgencia: urgencia,
             Assunto: assunto,
             Descricao: descricao,
             Sprint: 0,
             Solucao: '',
             Situacao: 0},
      success: function (response) {
        $('#CategoriaTicket').val('')
        $('#UrgenciaTicket').val('')
        $('#AssuntoTicket').val('')
        $('#DescricaoTicket').val('')
  
        $("#msg-text").text("Ticket enviado ao time de TI 🖥️");
          $(".toast").toast("show");
          setTimeout(() => {
            $("#msg-text").text("");
          }, 3000);
      }
    })
  }
});

async function dashboard() {
  $.ajax({
    url : "/DashboardBackEnd",
    type : 'post',
    data: {Situacao: 0},
    success: function (response) {
      $('#tks-backlog').html('')
      response.forEach(element => {
        if(element.Sprint == 0){
          var sprint = 'Sprint a definir'
        } else {
          var sprint = 'Sprint' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-backlog').append(`<div class="card-backlog mb-3">
        <span class="badge bg-success">${element.Categoria_desc}</span>
        <span class="badge bg-warning">${sprint}</span>
        <span class="badge bg-danger">${urgencia}</span>
        <h5 style="margin-top: 1vh;">${element.Assunto}</h5>
      </div>`)
      });
    }
  })

  $.ajax({
    url : "/DashboardDev",
    type : 'post',
    data: {Situacao: 1},
    success: function (response) {
      $('#tks-dev').html('')
      response.forEach(element => {
        if(element.Sprint == 0){
          var sprint = 'Sprint a definir'
        } else {
          var sprint = 'Sprint' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-dev').append(`<div class="card-backlog mb-3">
        <span class="badge bg-success">${element.Categoria_desc}</span>
        <span class="badge bg-warning">${sprint}</span>
        <span class="badge bg-danger">${urgencia}</span>
        <h5 style="margin-top: 1vh;">${element.Assunto}</h5>
      </div>`)
      });
    }
  })

  $.ajax({
    url : "/DashboardTeste",
    type : 'post',
    data: {Situacao: 2},
    success: function (response) {
      $('#tks-teste').html('')
      response.forEach(element => {
        if(element.Sprint == 0){
          var sprint = 'Sprint a definir'
        } else {
          var sprint = 'Sprint' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-teste').append(`<div class="card-backlog mb-3">
        <span class="badge bg-success">${element.Categoria_desc}</span>
        <span class="badge bg-warning">${sprint}</span>
        <span class="badge bg-danger">${urgencia}</span>
        <h5 style="margin-top: 1vh;">${element.Assunto}</h5>
      </div>`)
      });
    }
  })

  $.ajax({
    url : "/DashboardFinalizado",
    type : 'post',
    data: {Situacao: 3},
    success: function (response) {
      $('#tks-finalizado').html('')
      response.forEach(element => {
        if(element.Sprint == 0){
          var sprint = 'Sprint a definir'
        } else {
          var sprint = 'Sprint' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-finalizado').append(`<div class="card-backlog mb-3">
        <span class="badge bg-success">${element.Categoria_desc}</span>
        <span class="badge bg-warning">${sprint}</span>
        <span class="badge bg-danger">${urgencia}</span>
        <h5 style="margin-top: 1vh;">${element.Assunto}</h5>
      </div>`)
      });
    }
  })
}