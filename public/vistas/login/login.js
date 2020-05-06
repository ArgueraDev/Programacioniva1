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
    Registrarse: function () {
      location.href = "registrar.html";
    },
    Recuperar: function () {
      location.href = "contraseña.html";
    },
    variable: function () {
      fetch(`private/Modulos/login/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp => resp.json()).then(resp => {
        if (resp.msg == 'Registrese') {
          alertify.message(resp.msg);
        } else if (resp.msg == 'Bienvenido') {
          location.href = "principal.html";
        }
      });
    }
  },
  created: function () {
    this.variable();
  }
});