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
        }
    },
    created: function () {
        this.verIdLogin();
    }
});

const imagePreview = document.getElementById('img-preview');
const imageUploader = document.getElementById('img-uploader');

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/drxvajxbt/image/upload`
const CLOUDINARY_UPLOAD_PRESET = 'dkobndye';

imageUploader.addEventListener('change', async (e) => {
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const res = await axios.post(
        CLOUDINARY_URL,
        formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    );
    console.log(res);
    imagePreview.src = res.data.secure_url;
    appPerfil.perfil.imagen = res.data.secure_url;
});