var appRegistrar = new Vue({
    el: '#frm-registrar',
    data: {
        registrar: {
            idLogin: 0,
            accion: 'nuevo',
            nombre: '',
            correo: '',
            contraseña: ''
        }
    },
    methods: {
        guardarRegistro: function () {
            fetch(`private/Modulos/login/procesos.php?proceso=recibirDatos&login=${JSON.stringify(this.registrar)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Registro insertado correctamente') {
                    alertify.warning(resp.msg);
                } else if (resp.msg == 'Registro insertado correctamente') {
                    alertify.warning(resp.msg);
                    this.registrar.idLogin = 0;
                    this.registrar.nombre = '';
                    this.registrar.correo = '';
                    this.registrar.contraseña = '';
                }
            });
        },
        Iniciarsesion: function () {
            location.href = "index.html";
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