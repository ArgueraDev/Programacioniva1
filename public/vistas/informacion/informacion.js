var appInformacion = new Vue({
    el: '#frm-informacion',
    data: {
        informacion: {
            idInformacion: 0,
            accion: 'nuevo',
            titulo: '',
            contenido: '',
            msg: ''
        }
    },
    methods: {
        guardarInformacion() {
            fetch(`private/Modulos/informacion/procesos.php?proceso=recibirDatos&informacion=${JSON.stringify(this.informacion)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Registro guardado correctamente') {
                    alertify.warning(resp.msg);
                } else {
                    alertify.success(resp.msg);
                    this.LimpiarDatos();
                }
            });
        },
        LimpiarDatos() {
            this.informacion.idInformacion = 0;
            this.informacion.titulo = '';
            this.informacion.contenido = '';
            this.informacion.accion = 'nuevo';
        }
    }
});