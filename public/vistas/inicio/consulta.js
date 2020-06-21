/**
 * diseño con vue
 */
Vue.component('consulta-card', {
    props: ['contenido', 'llave', 'nombre', 'fecha'],
    template: `
    <div class="row row-cols-1 row-cols-md-1">
    <div class="card">
    <div class="card-body">
      <p class="card-text">{{ contenido }}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">{{ nombre }}  {{ fecha }}</small>
    </div>
    </div>
    </div>
    `
})

/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file consulta.js area de consultas o peticiones.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var appconsulta = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#consultas',
    data: {
        consultas: {
            idConsulta: 0,
            idLogin: 0,
            accion: 'nuevo',
            consulta: '',
            msg: ''
        },
        valores: [],
        valor2: "",
    },
    methods: {
        /**
         * @function guardarConsulta almacena en la base de datos las consultas realizada por los usuarios.
         */
        guardarConsulta: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=recibirDatos&consulta=${JSON.stringify(this.consultas)}`).then(resp => resp.json()).then(resp => {
                if (resp.msg != 'Envio Exitoso') {
                    alertify.warning(resp.msg);
                } else {
                    alertify.success(resp.msg);
                    this.verConsultas();
                    this.limpiezaConsulta();
                }
            });
        },
        /**
         * @function verConsultas muestra las consultas realizadas por los usuarios.
         */
        verConsultas: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=verConsultas&consulta=${this.valor2}`).then(resp => resp.json()).then(resp => {
                this.valores = resp;
            });
        },
        /**
         * @function limpiezaConsulta limpia los campos de la consulta.
         */
        limpiezaConsulta: function () {
            this.consultas.idConsulta = 0;
            this.consultas.consulta = '';
            this.consultas.accion = 'nuevo';
        },
        /**
         * @function verIdLogin obtiene el id del usuario activo.
         */
        verIdLogin: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.consultas.idLogin = resp[0].idLogin;
                this.guardarConsulta();
            });
        }
    },
    created: function () {
        this.verConsultas();
    }
});

var barra = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#barra',
    data: {
        Usuario: {
            idLogin: 0,
            nombre: "",
            imagen: ""
        }
    },
    methods: {
        /**
         * @function cerrar cierra sesion iniciada.
         */
        cerrar: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=cerrar&consulta=""`).then(resp => resp.json()).then(resp => {
                location.href = "/programacioniva1";
            });
        },
        /**
         * @function variable controla si el usuario esta activo y sino lo regresa al login.
         */
        variable: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=verVariable&consulta=""`).then(resp => resp.json()).then(resp => {
                if (resp.msg == 'Registrese') {
                    location.href = "/programacioniva1";
                }
            });
        },
        /**
         * @function usuario obtiene los datos del usuario activo.
         */
        usuario: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.Usuario.idLogin = resp[0].idLogin;
                appInicio.idLogin = resp[0].idLogin;
                this.Usuario.nombre = resp[0].nombre;
                document.getElementById('imgperfil').src = resp[0].imagen;
                if (resp[0].tipo == 'admin') {
                    document.getElementById("permiso").hidden = false;
                    document.getElementById("chats").hidden = false;
                } else {
                    document.getElementById("chat").hidden = false;
                }
            });
        },
        /**
         * @function acercaDe Muestra informacion acerca de la app.
         */
        acercaDe() {
            Swal.fire({
                html: '<iframe src="public/vistas/terminos/informacion.html" height="500"></iframe>'
            })
        }
    },
    created: function () {
        this.variable();
        this.usuario();
    }
});