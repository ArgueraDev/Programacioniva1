var appInicio = new Vue({
    el: '#listado',
    data: {
        informacion: [],
        bancaria: [],
        diccionario: [],
        valor: ''
    },
    methods: {
        verInformacion: function () {
            fetch(`private/Modulos/informacion/procesos.php?proceso=buscarInformacion&informacion=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.informacion = resp;
            });
            fetch(`private/Modulos/informacion/procesos.php?proceso=buscarbancaria&informacion=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.bancaria = resp;
            });
            fetch(`private/Modulos/informacion/procesos.php?proceso=buscardiccionario&informacion=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.diccionario = resp;
            });
        }
    },
    created: function () {
        this.verInformacion();
    }
})

$("#contribuir").click(function (e) {
    $(`#vistas`).load(`public/vistas/informacion/informacion.html`);
});