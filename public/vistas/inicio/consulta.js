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

var appconsulta = new Vue({
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
        verConsultas: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=verConsultas&consulta=${this.valor2}`).then(resp => resp.json()).then(resp => {
                this.valores = resp;
            });
        },
        limpiezaConsulta: function () {
            this.consultas.idConsulta = 0;
            this.consultas.consulta = '';
            this.consultas.accion = 'nuevo';
        },
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
    el: '#barra',
    data: {
        Usuario: {
            idLogin: 0,
            nombre: ""
        }
    },
    methods: {
        cerrar: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=cerrar&consulta=""`).then(resp => resp.json()).then(resp => {
                location.href = "index.html";
            });
        },
        variable: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=verVariable&consulta=""`).then(resp => resp.json()).then(resp => {
                if (resp.msg == 'Registrese') {
                    location.href = "index.html";
                }
            });
        },
        usuario: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.Usuario.idLogin = resp[0].idLogin;
                this.Usuario.nombre = resp[0].nombre;
                if (resp[0].tipo == 'admin') {
                    $("#permiso").show()
                } else {
                    $("#permiso").hide()
                }
            });
        }
    },
    created: function () {
        this.variable();
        this.usuario();
    }
});