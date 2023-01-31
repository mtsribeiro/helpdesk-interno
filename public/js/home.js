carregamentoStatico("./pages/dashboard.html", "#dashboard");
carregamentoStatico("./pages/home.html", "#ProfileLogado");
carregamentoStatico("./pages/dashboard-aprovacao.html", "#aprovacao-dashboard");

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
        $('#CategoriaTicketSelecionado').append(`<option value="${element.idCategoria}" style="color: #000">${element.Descricao}</option>`)
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
          var sprint = 'Sprint ' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-backlog').append(`<div class="card-backlog mb-3" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
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
          var sprint = 'Sprint ' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-dev').append(`<div class="card-backlog mb-3" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
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
          var sprint = 'Sprint ' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-teste').append(`<div class="card-backlog mb-3" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
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
          var sprint = 'Sprint ' + element.Sprint
        }

        if(element.Urgencia == 1) {
          var urgencia = 'Alta'
        } else if(element.Urgencia == 2) {
          var urgencia = 'Média'
        } else if (element.Urgencia == 3) {
          var urgencia = 'Baixa'
        }
        $('#tks-finalizado').append(`<div class="card-backlog mb-3" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
        <span class="badge bg-success">${element.Categoria_desc}</span>
        <span class="badge bg-warning">${sprint}</span>
        <span class="badge bg-danger">${urgencia}</span>
        <h5 style="margin-top: 1vh;">${element.Assunto}</h5>
      </div>`)
      });
    }
  })
}

function OpenTicket(id) {
  $('#TicketRef').text('REF# '+id)

  $.ajax({
    url : "/SelecionaTicket",
    type : 'post',
    data: {id: id},
    success: function (response) {
        $('#CategoriaTicketSelecionado').val(response[0].Categoria)
        $('#UrgenciaTicketSelecionado').val(response[0].Urgencia)
        $('#AssuntoTicketSelecionado').val(response[0].Assunto)
        $('#DescricaoTicketSelecionado').val(response[0].Descricao)
        $('#SprintTicketSelecionado').val(response[0].Sprint)
        $('#SolucaoTicketSelecionado').val(response[0].Solucao)
        $('#SituacaoTicketSelecionado').val(response[0].Situacao)

        $(document).on('click', '#btn-updateSia', function(e){
          var id = response[0].idTicket
          var categoriaDesc = $('#CategoriaTicketSelecionado').val()
          var urgenciaDesc = $('#UrgenciaTicketSelecionado').val()
          var assuntoDesc = $('#AssuntoTicketSelecionado').val()
          var situacaoDesc = $('#SituacaoTicketSelecionado').val()
          var descricaoDesc = $('#DescricaoTicketSelecionado').val()
          var sprintDesc = $('#SprintTicketSelecionado').val()
          var solucaoDesc = $('#SolucaoTicketSelecionado').val()

          $.ajax({
            url : "/updateSia",
            type : 'post',
            data: {idTicket: id,
                   Categoria: categoriaDesc,
                   Urgencia: urgenciaDesc,
                   Assunto: assuntoDesc,
                   Descricao: descricaoDesc,
                   Sprint: sprintDesc,
                   Solucao: solucaoDesc,
                   Situacao: situacaoDesc},
            success: function (response) {        
              $("#msg-text").text("Ticket salvo! 🖥️");
                $(".toast").toast("show");
                setTimeout(() => {
                  $("#msg-text").text("");
                }, 3000);
                dashboard()
            }
          })
        })
    }
  })
}

$(document).on('click', '#InsereCategoria', function(e){
  e.preventDefault();
  var descricao = $('#DescricaoForm').val()
  $.ajax({
    url : "/InsereCategoria",
    type : 'post',
    data: {Descricao: descricao},
    success: function (response) {

      listaCadastro()
      $('#DescricaoForm').val('')
      $("#msg-text").text("Categoria cadastrada 🖥️");
        $(".toast").toast("show");
        setTimeout(() => {
          $("#msg-text").text("");
        }, 3000);
    }
  })
})

$(document).on('click', '#InsereColaborador', function(e){
  var admin = 0
  if($('#AdminNewColab').prop("checked")) {
    admin = 1
  }
  var nome = $('#nomeNewColab').val()
  var sobrenome = $('#sobrenomeNewColab').val()
  var email = $('#emailNewColab').val()
  var senha = $('#senhaNewColab').val()

  $.ajax({
    url : "/InsereUsuario",
    type : 'post',
    data: {nome: nome,
           sobrenome: sobrenome,
           email: email,
           senha: senha,
           ativo: 1,
           admin: admin},
    success: function (response) {
      listaCadastro()
      $('#nomeNewColab').val('')
      $('#sobrenomeNewColab').val('')
      $('#emailNewColab').val('')
      $('#senhaNewColab').val('')

      $("#msg-text").text("Usuario cadastrado 🖥️");
        $(".toast").toast("show");
        setTimeout(() => {
          $("#msg-text").text("");
        }, 3000);
    }
  })
})

$(document).on('click', '#listaTodosCadastro',function(e){
  $('#listUsers').html('')
  listaCadastro()
})

function listaCadastro(e) {
  $.ajax({
    url : "/ListaUsuarios",
    type : 'post',
    success: function (response) {
      $('#listUsers').html('')
      response.forEach(element => {
        $('#listUsers').append(`<div class="col-6 mt-3">
        <div class="card-backlog p-2" onclick="EditaUsuario(${element.Idusuario})">
          <span class="badge rounded-pill bg-secondary">${element.nome} ${element.sobrenome}</span>
          <small>${element.email}</small>
        </div>
      </div>`)
      });
    }
  })

  $.ajax({
    url : "/ListaCategorias",
    type : 'post',
    success: function (response) {
      $('#listCategory').html('')
      response.forEach(element => {
        $('#listCategory').append(`
        <div class="col-6 mt-3">
        <div class="card-backlog p-2" onclick="EditaCategoria(${element.idCategoria})">
          <small>${element.Descricao}</small>
        </div>
      </div>`)
      });
    }
  })
}

function EditaCategoria(id){
  $.ajax({
    url : "/ListaCategoriaEspecifica",
    data: {idCategoria: id},
    type : 'post',
    success: function (response) {
      $('#DescricaoEditaCategoria').val(response[0].Descricao)
      $("#deletaCategoria").removeAttr("disabled");
      $("#DescricaoEditaCategoria").removeAttr("disabled");
      $("#salvaCategoria").removeAttr("disabled");

      $(document).on('click', '#salvaCategoria', function(e){
        var descricao = $('#DescricaoEditaCategoria').val()
        $.ajax({
          url : "/UpdateCategoriaEspecifica",
          data: {idCategoria: id,
                 Descricao: descricao},
          type : 'post',
          success: function (response) {
            $('#DescricaoEditaCategoria').val('')
            $("#deletaCategoria").attr("disabled", "disabled");
            $("#DescricaoEditaCategoria").attr("disabled", "disabled");
            $("#salvaCategoria").attr("disabled", "disabled");
            listaCadastro()
            $("#msg-text").text("Categoria cadastrada 🖥️");
            $(".toast").toast("show");
            setTimeout(() => {
              $("#msg-text").text("");
            }, 3000);
          }
        })
      })

      $(document).on('click', '#btn-DeletaCategoria', function(e){
        $.ajax({
          url : "/DeletaCategoriaEspecifica",
          data: {idCategoria: id},
          type : 'post',
          success: function (response) {
            $('#DescricaoEditaCategoria').val('')
            $("#deletaCategoria").attr("disabled", "disabled");
            $("#DescricaoEditaCategoria").attr("disabled", "disabled");
            $("#salvaCategoria").attr("disabled", "disabled");
            listaCadastro()
            $("#msg-text").text("Categoria deletada 🖥️");
            $(".toast").toast("show");
            setTimeout(() => {
              $("#msg-text").text("");
            }, 3000);
          }
        })
      })
      $(document).on('click', '#btn-DeletarCancela', function(e){
            $('#DescricaoEditaCategoria').val('')
            $("#deletaCategoria").attr("disabled", "disabled");
            $("#DescricaoEditaCategoria").attr("disabled", "disabled");
            $("#salvaCategoria").attr("disabled", "disabled");
            listaCadastro()
      })
    }
  })
}

function EditaUsuario(id){
  $.ajax({
    url : "/ListaUsuarioEspecifico",
    data: {id: id},
    type : 'post',
    success: function (response) {
      $('#NomeEditacolab').val(response[0].nome)
      $('#SobrenomeEditacolab').val(response[0].sobrenome)
      $('#EmailEditacolab').val(response[0].email)
      $('#SenhaEditacolab').val(response[0].senha)
      if(response[0].ativo == 1){
        $('#AtivoEditacolab').attr("checked", "checked")
      } else {
        $('#AtivoEditacolab').removeAttr("checked")
      }
      if(response[0].admin == 1){
        $('#AdminEditacolab').attr("checked", "checked")
      } else {
        $('#AdminEditacolab').removeAttr("checked")
      }
      
      $("#deletaUsuario").removeAttr("disabled");
      $("#NomeEditacolab").removeAttr("disabled");
      $("#SobrenomeEditacolab").removeAttr("disabled");
      $("#EmailEditacolab").removeAttr("disabled");
      $("#SenhaEditacolab").removeAttr("disabled");
      $("#AdminEditacolab").removeAttr("disabled");
      $("#AtivoEditacolab").removeAttr("disabled");
      $("#salvaUsuario").removeAttr("disabled");

      $(document).on('click', '#salvaUsuario', function(e){
        e.preventDefault();
        var nome = $('#NomeEditacolab').val()
        var sobrenome = $('#SobrenomeEditacolab').val()
        var email = $('#EmailEditacolab').val()
        var senha = $('#SenhaEditacolab').val()
        var admin = 0
        if($('#AdminEditacolab').prop("checked")) {
          admin = 1
        }
        var ativo = 0
        if($('#AtivoEditacolab').prop("checked")) {
          ativo = 1
        }
        $.ajax({
          url : "/UpdateUsuarioEspecifica",
          data: {Idusuario: id,
                 nome: nome,
                 sobrenome: sobrenome,
                 email: email,
                 senha: senha,
                 admin: admin,
                 ativo: ativo},
          type : 'post',
          success: function (response) {
            $('#NomeEditacolab').val('')
            $('#SobrenomeEditacolab').val('')
            $('#EmailEditacolab').val('')
            $('#SenhaEditacolab').val('')
            $("#AdminEditacolab").removeAttr("checked");
            $("#AtivoEditacolab").removeAttr("checked");

            $("#deletaUsuario").attr("disabled", "disabled");
            $("#NomeEditacolab").attr("disabled", "disabled");
            $("#SobrenomeEditacolab").attr("disabled", "disabled");
            $("#EmailEditacolab").attr("disabled", "disabled");
            $("#SenhaEditacolab").attr("disabled", "disabled");
            $("#AdminEditacolab").attr("disabled", "disabled");
            $("#AtivoEditacolab").attr("disabled", "disabled");
            $("#salvaUsuario").attr("disabled", "disabled");
            listaCadastro()

            $("#msg-text").text("Usuário alterado 🖥️");
            $(".toast").toast("show");
            setTimeout(() => {
              $("#msg-text").text("");
            }, 3000);
          }
        })
      })

      $(document).on('click', '#btn-DeletaUsuario', function(e){
        $.ajax({
          url : "/DeletaUsuarioEspecifico",
          data: {id: id},
          type : 'post',
          success: function (response) {
            $('#NomeEditacolab').val('')
            $('#SobrenomeEditacolab').val('')
            $('#EmailEditacolab').val('')
            $('#SenhaEditacolab').val('')
            $("#AdminEditacolab").removeAttr("checked");
            $("#AtivoEditacolab").removeAttr("checked");

            $("#deletaUsuario").attr("disabled", "disabled");
            $("#NomeEditacolab").attr("disabled", "disabled");
            $("#SobrenomeEditacolab").attr("disabled", "disabled");
            $("#EmailEditacolab").attr("disabled", "disabled");
            $("#SenhaEditacolab").attr("disabled", "disabled");
            $("#AdminEditacolab").attr("disabled", "disabled");
            $("#AtivoEditacolab").attr("disabled", "disabled");
            $("#salvaUsuario").attr("disabled", "disabled");
            listaCadastro()

            $("#msg-text").text("Usuário deletado 🖥️");
            $(".toast").toast("show");
            setTimeout(() => {
              $("#msg-text").text("");
            }, 3000);
          }
        })
      })
      $(document).on('click', '#btn-DeletarCancela', function(e){
            $('#NomeEditacolab').val('')
            $('#SobrenomeEditacolab').val('')
            $('#EmailEditacolab').val('')
            $('#SenhaEditacolab').val('')
            $("#AdminEditacolab").removeAttr("checked");
            $("#AtivoEditacolab").removeAttr("checked");

            $("#deletaUsuario").attr("disabled", "disabled");
            $("#NomeEditacolab").attr("disabled", "disabled");
            $("#SobrenomeEditacolab").attr("disabled", "disabled");
            $("#EmailEditacolab").attr("disabled", "disabled");
            $("#SenhaEditacolab").attr("disabled", "disabled");
            $("#AdminEditacolab").attr("disabled", "disabled");
            $("#AtivoEditacolab").attr("disabled", "disabled");
            $("#salvaUsuario").attr("disabled", "disabled");
            listaCadastro()
      })

    }
  })

}