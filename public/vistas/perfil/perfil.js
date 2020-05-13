var appInformacion = new Vue({
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
                document.getElementById("imagen").disabled = false;


            } else if (document.getElementById("editar").value === "Actualizar") {
                document.getElementById("editar").value = "Editar";
                document.getElementById("contraseña").disabled = true;
                document.getElementById("nombre").disabled = true;
                document.getElementById("imagen").disabled = true;
                this.modificar();
                console.log(this.perfil);
            }
        },
        modificar: function () {
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
            });
        }
    },
    created: function () {
        this.verIdLogin();
    }
});