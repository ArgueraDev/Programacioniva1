var appPerfil = new Vue({
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
        verIdLogin: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.perfil = resp[0];
                document.getElementById('img-preview').src = resp[0].imagen;
            });
        },
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