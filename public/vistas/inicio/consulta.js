Vue.component('consulta-card', {
    props: ['nombre', 'contenido', 'llave'],
    template: `
    <div class="card">
    <div class="card-body">
      <p class="card-text">{{ contenido }}</p>
      <p class="card-text"><small class="text-muted">{{ nombre }}</small></p>
    </div>
    </div>
    `
})

var appconsulta = new Vue({
    el: '#consultas',
    data: {
        consulta: {
            idConsulta: 0,
            accion: 'nuevo',
            consultas: '',
            msg: ''
        },
        valores: [],
        valor2: ""
    },
    methods: {
        guardarConsulta: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=recibirDatos&consulta=${JSON.stringify(this.consulta)}`).then(resp => resp.json()).then(resp => {
                this.verConsultas();
                this.limpiezaConsulta();
            });
        },
        verConsultas: function () {
            fetch(`private/Modulos/consultas/procesos.php?proceso=verConsultas&consulta=${this.valor2}`).then(resp => resp.json()).then(resp => {
                this.valores = resp;
            });
        },
        limpiezaConsulta: function () {
            this.consulta.idConsulta = 0;
            this.consulta.consulta = '';
            this.consulta.accion = 'nuevo';
        }
    },
    created: function () {
        this.verConsultas();
    }
});