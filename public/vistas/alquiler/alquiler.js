Vue.component('v-select', VueSelect.VueSelect);

var appalquiler = new Vue({
    el: '#frm-alquiler',
    data: {
        alquiler: {
            idAlquiler: 0,
            accion: 'nuevo',
            cliente: {
                id: 0,
                label: ''
            },
            pelicula: {
                id: 0,
                label: ''
            },
            fechaPrestamo: '',
            fechaDevolucion: '',
            valor: '',
            msg: ''
        },
        clientes: {},
        peliculas: {}
    },
    methods: {
        guardarAlquiler() {
            fetch(`private/Modulos/alquiler/procesos.php?proceso=recibirDatos&alquiler=${JSON.stringify(this.alquiler)}`).then(resp => resp.json()).then(resp => {
                this.alquiler.msg = resp.msg;
            });
        },
        limpiarAlquiler() {
            this.alquiler.idAlquiler = 0;
            this.alquiler.accion = "nuevo";
            this.alquiler.clientes = '';
            this.alquiler.peliculas = '';
            this.alquiler.fechaPrestamo = '';
            this.alquiler.fechaDevolucion = '';
            this.alquiler.msg = "";
        }
    },
    created() {
        fetch(`private/Modulos/alquiler/procesos.php?proceso=traer_peliculas_clientes&alquiler=''`).then(resp => resp.json()).then(resp => {
            this.clientes = resp.clientes;
            this.peliculas = resp.peliculas;
        });
    }
});