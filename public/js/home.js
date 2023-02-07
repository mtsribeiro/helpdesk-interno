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
  
  var categoria = $('#CategoriaTicket').val()
  var urgencia = $('#UrgenciaTicket').val()
  var assunto = $('#AssuntoTicket').val()
  var descricao = $('#DescricaoTicket').val()
  var idUsuario = $('#idUserlogado').val()

  if (!categoria || !urgencia || !assunto || !descricao) {
        $('#AnexosTicket').val('')
        $("#msg-text").text("Necessário preencher todas as informações 🖥️");
        $(".toast").toast("show");
        setTimeout(() => {
          $("#msg-text").text("");
    }, 3000);
  } else {
    $.ajax({
      url : "/InsereTicket",
      type : 'post',
      data: {Categoria: categoria,
             Urgencia: urgencia,
             Assunto: assunto,
             Descricao: descricao,
             idUsuarioCriacao: idUsuario,
             Sprint: 0,
             Solucao: '',
             Situacao: 0},
      success: function (response) {
        $('#AnexosTicket').val('')
        $('#CategoriaTicket').val(2)
        $('#UrgenciaTicket').val(3)
        $('#AssuntoTicket').val('')
        $('#DescricaoTicket').val('')
        dashboard()
  
        $("#msg-text").text("Ticket enviado ao time de TI 🖥️");
          $(".toast").toast("show");
          setTimeout(() => {
            $("#msg-text").text("");
          }, 3000);
      }
    })
      var formData = new FormData();
      var arquivos = $("#AnexosTicket")[0].files;
      for (var i = 0; i < arquivos.length; i++) {
        var tamanhoFile = arquivos[i].size;
        if (tamanhoFile > 1000000) {
          return;
        }
        formData.append('files', arquivos[i]);
        
      }
    
      $.ajax({
        url: '/enviarArquivos',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
          $.ajax({
            url: '/PegaUltimoTicket',
            type: 'POST',
            success: function(response){
              UpdateArquivosTicket(response[0].idTicket)
            }
          });
        }
      });

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
        $('#tks-backlog').append(`<div class="card-backlog mb-3 animate__animated animate__fadeInDown" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
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
        $('#tks-dev').append(`<div class="card-backlog mb-3 animate__animated animate__fadeInDown" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
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
        $('#tks-teste').append(`<div class="card-backlog mb-3 animate__animated animate__fadeInDown" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
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
        $('#tks-finalizado').append(`<div class="card-backlog mb-3 animate__animated animate__fadeInDown" onClick="OpenTicket(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenTicket">
        <span class="badge bg-success">${element.Categoria_desc}</span>
        <span class="badge bg-warning">${sprint}</span>
        <span class="badge bg-danger">${urgencia}</span>
        <h5 style="margin-top: 1vh;">${element.Assunto}</h5>
      </div>`)
      });
    }
  })

  var idusuario = $('#idUserlogado').val()
  $.ajax({
    url : "/DashboardAprovacao",
    type : 'post',
    data: {id: idusuario},
    success: function (response) {
      $('#tks-aprovacao').html('')
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
        $('#tks-aprovacao').append(`<div class="card mb-3 animate__animated animate__fadeInDown">
        <div class="row card-body">
        <div class="col-4">
          <span class="badge bg-success">${element.Categoria_desc}</span>
          <span class="badge bg-warning">${sprint}</span>
          <span class="badge bg-danger">${urgencia}</span>
          <h5 style="margin-top: 1vh; margin-bottom: 1vh">${element.Assunto}</h5>
          <div class="row">
            <div class="col-12">
              <button class="btn btn-success" onClick="BtnAprovaTicket(${element.idTicket})">Aprovado</button>
              <button class="btn btn-danger" onClick="BtnEnviaCancelamento(${element.idTicket})" data-bs-toggle="modal" data-bs-target="#OpenMotivoCancelamento">Reprovado</button>
            </div>
          </div>
        </div>
        <div class="col-4" style="border-left: 1px solid #ccc;">${element.Descricao}</div>
        <div class="col-4" style="border-left: 1px solid #ccc;">${element.Solucao}</div>`)
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
        $("#SprintTicketSelecionado").val(response[0].Sprint);
        $('#SolucaoTicketSelecionado').val(response[0].Solucao)
        $('#MotivoCancelamentoTicketSelecionado').val(response[0].motivoCancelamento)
        $('#SituacaoTicketSelecionado').val(response[0].Situacao)
        $('#text-sprint').text('Sprint atual: ' + response[0].Sprint)
        $.ajax({
          url: '/selecionaArquivosTicket',
          type: 'POST',
          data: {id: id},
          success: function (response){
            $('#AnexosTicket').html('')
            response.forEach(element => {
              $('#AnexosTicket').append(`<a class="link-primary" href='${element.caminho}' download>${element.descricao}</a><br>`)
            });
          }
        })

        $(document).on('click', '#btn-updateSia', function(e){
          var id = response[0].idTicket
          var categoriaDesc = $('#CategoriaTicketSelecionado').val()
          var urgenciaDesc = $('#UrgenciaTicketSelecionado').val()
          var assuntoDesc = $('#AssuntoTicketSelecionado').val()
          var situacaoDesc = $('#SituacaoTicketSelecionado').val()
          var descricaoDesc = $('#DescricaoTicketSelecionado').val()
          var sprintDesc = $('#SprintTicketSelecionado').val()
          var solucaoDesc = $('#SolucaoTicketSelecionado').val()
          var motivoDesc = $('#MotivoCancelamentoTicketSelecionado').val()

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
                   Situacao: situacaoDesc,
                   motivoCancelamento: motivoDesc},
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
        $('#listUsers').append(`<div class="col-6 mt-3 animate__animated animate__fadeInDown">
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
        <div class="col-6 mt-3 animate__animated animate__fadeInDown">
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

function BtnEnviaCancelamento(id){
  $(document).on('click', '#UpdateStatusCancelado', function(e){
    var motivoCancelamento = $('#MotivoCancelamentoDesc').val()
    $.ajax({
      url : "/UpdateTicketCancelado",
      data: {id: id,
             motivoCancelamento: motivoCancelamento},
      type : 'post',
      success: function (response) {
        $('#MotivoCancelamentoDesc').val('')
        dashboard()
        $("#msg-text").text("Ticket reprovado 🖥️");
        $(".toast").toast("show");
        setTimeout(() => {
          $("#msg-text").text("");
        }, 3000);
      }
    })
  })
}

function BtnAprovaTicket(id){
  $.ajax({
    url : "/UpdateTicketAprovado",
    data: {id: id},
    type : 'post',
    success: function (response) {
      dashboard()
      $("#msg-text").text("Ticket aprovado 🖥️");
      $(".toast").toast("show");
      setTimeout(() => {
        $("#msg-text").text("");
      }, 3000);
    }
  })
}

function UpdateArquivosTicket(id){
  $.ajax({
    url: '/UpdateArquivosTicket',
    type: 'POST',
    data: {id: id}
  });
}