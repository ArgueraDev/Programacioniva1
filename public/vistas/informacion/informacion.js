Vue.component('v-select', VueSelect.VueSelect);

var appInformacion = new Vue({
    el: '#frm-informacion',
    data: {
        informacion: {
            idInformacion: 0,
            idLogin: 0,
            accion: 'nuevo',
            titulo: '',
            contenido: '',
            imagen: '',
            tipo: '',
            msg: ''
        },
        tipos: [{
                id: 1,
                label: 'Información General'
            },
            {
                id: 2,
                label: 'Información Bancaria'
            },
            {
                id: 3,
                label: 'Conceptos Básicos'
            }
        ]
    },
    methods: {
        guardarInformacion: function () {
            fetch(`private/Modulos/moderar/procesos.php?proceso=recibirDatos&moderar=${JSON.stringify(this.informacion)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Gracias por su aporte') {
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
            this.informacion.imagen = '';
            this.informacion.tipo = '';
            this.informacion.accion = 'nuevo';
        },
        obtenerimagen(e) {
            var respuesta = null;
            let file = e.target.files[0];
            var formdata = new FormData($('#frm-informacion')[0]);
            var ruta = 'private/imagenes/guardarimg.php';

            $.ajax({
                type: "POST",
                url: ruta,
                data: formdata,
                contentType: false,
                processData: false,
                async: false,
                success: function (response) {
                    respuesta = response;
                }

            });
            this.informacion.imagen = "private/imagenes/" + respuesta;
            this.cargar(file);

        },
        cargar(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById("imagenif").src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }
});