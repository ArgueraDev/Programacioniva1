/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file login.js Iniciar Sesion.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var applogin = new Vue({
  /**
   * @property el element del DOM a enlazar.
   */
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
        }
      });
    }
  },
  created: function () {
    this.variable();
  }
});
/**
 * @function init cambia de ventana.
 */
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