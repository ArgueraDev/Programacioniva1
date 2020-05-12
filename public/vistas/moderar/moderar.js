Vue.component('moderador-card', {
    props: ['titulo', 'contenido', 'llave', 'nombre', 'fecha'],
    template: `
    <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h5 class="card-title">{{ titulo }}</h5>
    <p class="card-text">{{ contenido }}</p>
    <small class="text-muted">{{ nombre }}  {{ fecha }}</small>
    </div>
    <div class="card-footer">
    <a href="#" v-on:click="agregar(item.idModerar)" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a>
    </div>
    </div>
    `
})

var appInformacion = new Vue({
    el: '#frm-moderar',
    data: {
        items: [],
        valor: ''
    },
    methods: {
        VerContribucion: function () {
            fetch(`private/Modulos/moderar/procesos.php?proceso=verContribucion&moderar=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.items = resp;
            });
        },
        agregar: function (idModerar) {
            fetch(`private/Modulos/informacion/procesos.php?proceso=recibirDatos&informacion=${idModerar}`).then(resp => resp.json()).then(resp => {
                alertify.warning(resp.msg);
            });
        }
    },
    created: function () {
        this.VerContribucion();
    }
});