/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file registrar.js registra un nuevo usuario.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var appRegistrar = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#frm-registrar',
    data: {
        registrar: {
            idLogin: 0,
            accion: 'nuevo',
            nombre: '',
            correo: '',
            contraseña: '',
            imagen: 'img/usuario.png'
        },
        valor: false
    },
    methods: {
        /**
         * @function guardarRegistro almacena los datos optenidos en la base de datos.
         */
        guardarRegistro: function () {
            fetch(`private/Modulos/login/procesos.php?proceso=recibirDatos&login=${JSON.stringify(this.registrar)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Registro insertado correctamente') {
                    alertify.warning(resp.msg);
                } else if (resp.msg == 'Registro insertado correctamente') {
                    alertify.warning(resp.msg);
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
        },
        /**
         * @function Terminos muestra los terminos y condiciones.
         */
        Terminos() {
            Swal.fire({
                title: 'Términos y Condiciones',
                html: '<iframe src="public/vistas/terminos/terminos.html" height="450"></iframe>'
            })
        },
        /**
         * @function habilitarBtn controla que acepte o no los terminos y condiones.
         */
        habilitarBtn: function () {
            if (this.valor === true) {
                $('#btnRegistrar').attr("disabled", false);
            } else {
                $('#btnRegistrar').attr("disabled", true);
            }
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