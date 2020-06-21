/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file perfil.js Visualizacion y edicion de perfil para los usuarios.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var appPerfil = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#frm-perfil',
    data: {
        perfil: {
            idLogin: 0,
            nombre: '',
            correo: '',
            contraseña: '',
            imagen: '',
            accion: 'modificar'
        }
    },
    methods: {
        /**
         * @function Editar funcion para habilitar o deshabilitar los campos de edicion del perfil.
         */
        Editar: function () {
            if (document.getElementById("editar").value === "Editar") {
                document.getElementById("editar").value = "Actualizar";
                document.getElementById("nombre").disabled = false;
                document.getElementById("contraseña").disabled = false;
                document.getElementById("img-uploader").disabled = false;


            } else if (document.getElementById("editar").value === "Actualizar") {
                document.getElementById("editar").value = "Editar";
                document.getElementById("contraseña").disabled = true;
                document.getElementById("nombre").disabled = true;
                document.getElementById("img-uploader").disabled = true;
                this.modificar();
            }
        },
        /**
         * @function modificar funcion para guardar los datos actualizar los datos del perfil.
         */
        modificar: function () {
            console.log(this.perfil);
            fetch(`private/Modulos/login/procesos.php?proceso=Modificar&login=${JSON.stringify(this.perfil)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Usuario Actualizado') {
                    alertify.warning(resp.msg);
                } else {
                    alertify.success(resp.msg);
                }
            });
        },
        /**
         * @function verIdLogin funcion para mostrar los datos del usuario activo.
         */
        verIdLogin: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.perfil = resp[0];
                document.getElementById('img-preview').src = resp[0].imagen;
            });
        },
        /**
         * @function obtenerimagen funcion para guardar imagen de perfil.
         *  @param {object} e dato del archivo seleccionado.
         */
        obtenerimagen(e) {
            var respuesta = null;
            let file = e.target.files[0];
            var formdata = new FormData($('#frm-perfil')[0]);
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

            })
            console.log(respuesta);
            this.perfil.imagen = "private/imagenes/" + respuesta;
            this.cargar(file);

        },
        /**
         * @function cargar funcion para mostrar la imagen de perfil.
         * @param {object} file la imagen seleccionada para mostrar.
         */
        cargar(file) {
            let reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById("img-preview").src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    },
    created: function () {
        this.verIdLogin();
    }
});