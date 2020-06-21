/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file informacion.js aformulario para agregar informacion.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
Vue.component('v-select', VueSelect.VueSelect);

var appInformacion = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
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
        /**
         * @function guardarInformacion envia los datos ingresados a la base de datos para luego ser observado por el administrador.
         */
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
        /**
         * @function verIdLogin obtiene el ID los usuario activo.
         */
        verIdLogin: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.informacion.idLogin = resp[0].idLogin;
                this.guardarInformacion();
            });
        },
        /**
         * @function LimpiarDatos liempia los campos de formulario.
         */
        LimpiarDatos: function () {
            this.informacion.idInformacion = 0;
            this.informacion.idLogin = 0;
            this.informacion.titulo = '';
            this.informacion.contenido = '';
            this.informacion.imagen = '';
            this.informacion.tipo = '';
            this.informacion.accion = 'nuevo';
        },
        /**
         * @function obtenerimagen carga una imagen del pc para agregar a la informacion.
         * @param {object} e dato del archivo seleccionado.
         */
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
        /**
         * @function cargar muestra la imagen.
         * @param {object} file imagen a mostrar.
         */
        cargar(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById("imagenif").src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }
});