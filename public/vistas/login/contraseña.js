/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file contraseña.js Restablece la contraseña.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var appRecuperar = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#frm-recuperar',
    data: {
        restablecer: {
            accion: 'modificar',
            correo: '',
            contraseña: ''
        }
    },
    methods: {
        /**
         * @function RecuperarContra obtengo los datos ingresados y los envios para su respectiva validacion y hacer los cambios de contraseña.
         */
        RecuperarContra: function () {
            fetch(`private/Modulos/login/procesos.php?proceso=recibirCorreo&login=${JSON.stringify(this.restablecer)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Contraseña Restablecida') {
                    alertify.warning(resp.msg);
                } else if (resp.msg == 'Contraseña Restablecida') {
                    alertify.success(resp.msg);
                    location.href = "index.html";
                }
            });
        },
        /**
         * @function variable controla si el usuario ya a iniciado sesion para mandarlo a la pagina principal.
         */
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
 * @function init Cambiar de ventana.
 */
function init() {
    $("#Iniciar").click(function (e) {
        $(`#vistas`).load(`public/vistas/login/login.html`, function () {
            init();
        });
    });
}
init();