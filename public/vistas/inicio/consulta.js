Vue.component('consulta-card', {
    props: ['contenido', 'llave'],
    template: `
    <div class="card">
    <div class="card-body">
      <p class="card-text">{{ contenido }}</p>
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
        variable: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=verVariable&consulta=${this.valor2}`).then(resp => resp.json()).then(resp => {
                if (resp.msg == 'Registrese') {
                    location.href = "index.html";
                } else if (resp.msg == 'Bienvenido') {
                    this.consultas.consulta = resp.idLogin;
                    alertify.message(resp.msg);
                }
            });
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
        this.variable();
    }
});
var barra = new Vue({
    el: '#barra',
    methods: {
        cerrar: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=cerrar&consulta=${this.valor2}`).then(resp => resp.json()).then(resp => {
                location.href = "index.html";
            });
        }
    }
});