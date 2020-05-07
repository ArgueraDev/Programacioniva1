var appRecuperar = new Vue({
    el: '#frm-recuperar',
    data: {
        restablecer: {
            accion: 'modificar',
            correo: '',
            contraseña: ''
        }
    },
    methods: {
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

function init() {
    $("#Iniciar").click(function (e) {
        $(`#vistas`).load(`public/vistas/login/login.html`, function () {
            init();
        });
    });
}
init();