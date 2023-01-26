/*
======================================
              INDEX PAGE
======================================
*/

$(document).on('click', '#loginValidation', function(e){
  e.preventDefault();
  var email = $('#emailForm').val()
  var pass = $('#passwordForm').val()

  $.ajax({
    url : "/ChecaLogin",
    type : 'post',
    data : {
         email: email,
         password: pass
    },
    success: function (response) {
      if (response.length > 0) {
        localStorage.setItem("infologin", JSON.stringify(response));
        window.location.href = "/home";
      } else {
        $("#msg-text").text("Usuario ou senha invalidos.");
        $(".toast").toast("show");
        setTimeout(() => {
          $("#msg-text").text("");
        }, 3000);
      }
    }
  })
})

/*
======================================
              HOME PAGE
======================================
*/

let pageHome = window.location.pathname;

if(!localStorage.getItem("infologin") && pageHome != '/'){
  window.location.href = '/';
}

if (localStorage.getItem("infologin")) {
  var infoUser = JSON.parse(localStorage.getItem("infologin"));
  if(infoUser[0].admin == 1) {
    $('#btn-admin').css(`display`, 'block')
  }
  else if(infoUser[0].admin == 0 && pageHome == '/admin'){
    window.location.href = '/home';
  }
  $(document).on('click', '#DeslogaUser', function(e){
    localStorage.removeItem("infologin");
    window.location.href = "/";
  })
}

$(document).on('click', '#btn-admin', function(e){
  $('#btn-admin').addClass('active');  
})