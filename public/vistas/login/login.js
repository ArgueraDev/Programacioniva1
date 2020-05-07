var applogin = new Vue({
  el: '#frm-login',
  data: {
    login: {
      correo: '',
      contraseña: ''
    },
    valor: ''
  },
  methods: {
    iniciarSesion: function () {
      fetch(`private/Modulos/login/procesos.php?proceso=recibirUsuario&login=${JSON.stringify(this.login)}`).then(resp => resp.json()).then(resp => {
        if (resp.msg === "Bienvenido") {
          location.href = "principal.html";
        } else {
          alertify.warning(resp.msg);
        }
      });
    },
    variable: function () {
      fetch(`private/Modulos/login/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp => resp.json()).then(resp => {
        if (resp.msg == 'regrese') {
          location.href = "principal.html";
        } else if (resp.msg == 'Bienvenido') {
          alertify.message(resp.msg);
        }
      });
    }
  },
  created: function () {
    this.variable();
  }
});

function init() {
  $("#Registrar").click(function (e) {
    $(`#vistas`).load(`public/vistas/login/registrar.html`, function () {
      init();
    });
  });

  $("#Recuperar").click(function (e) {
    $(`#vistas`).load(`public/vistas/login/contraseña.html`, function () {
      init();
    });
  });
}
init();