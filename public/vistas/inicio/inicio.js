Vue.component('info-card', {
    props: ['titulo', 'contenido', 'llave'],
    template: `
    <div class="card mb-3">
    <div class="card-body">
    <h5 class="card-title">{{ titulo }}</h5>
    <p class="card-text">{{ contenido }}</p>
    </div>
    </div>
    `
})
var appInicio = new Vue({
    el: '#listado',
    data: {
        items: [],
        valor: ''
    },
    methods: {
        verInformacion: function () {
            fetch(`private/Modulos/informacion/procesos.php?proceso=buscarInformacion&informacion=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.items = resp;
            });
        }
    },
    created: function () {
        this.verInformacion();
    }
})