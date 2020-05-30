var appRegistrar = new Vue({
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
        variable: function () {
            fetch(`private/Modulos/login/procesos.php?proceso=verVariable&login=${this.valor}`).then(resp => resp.json()).then(resp => {
                if (resp.msg == 'regrese') {
                    location.href = "principal.html";
                }
            });
        },
        Terminos() {
            Swal.fire({
                title: 'Términos y Condiciones',
                html: '<iframe src="public/vistas/terminos/terminos.html" height="450"></iframe>'
            })
        },
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

function init() {
    $("#Iniciar").click(function (e) {
        $(`#vistas`).load(`public/vistas/login/login.html`, function () {
            init();
        });
    });
}
init();