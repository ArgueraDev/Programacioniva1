var appInformacion = new Vue({
    el: '#frm-informacion',
    data: {
        informacion: {
            idInformacion: 0,
            idLogin: 0,
            accion: 'nuevo',
            titulo: '',
            contenido: '',
            msg: ''
        }
    },
    methods: {
        guardarInformacion: function () {
            fetch(`private/Modulos/moderar/procesos.php?proceso=recibirDatos&moderar=${JSON.stringify(this.informacion)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Registro guardado correctamente') {
                    alertify.warning(resp.msg);
                } else {
                    alertify.success(resp.msg);
                    this.LimpiarDatos();
                }
            });
        },
        verIdLogin: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.informacion.idLogin = resp[0].idLogin;
                this.guardarInformacion();
            });
        },
        LimpiarDatos: function () {
            this.informacion.idInformacion = 0;
            this.informacion.idLogin = 0;
            this.informacion.titulo = '';
            this.informacion.contenido = '';
            this.informacion.accion = 'nuevo';
        }
    }
});