var appbuscar_alquiler = new Vue({
    el: '#frm-buscar-alquiler',
    data: {
        mis_alquileres: [],
        valor: ''
    },
    methods: {
        buscarAlquiler() {
            fetch(`private/Modulos/alquiler/procesos.php?proceso=buscarAlquiler&alquiler=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.mis_alquileres = resp;
            });
        },
        modificarAlquiler(alquiler) {
            appalquiler.alquiler = alquiler;
            appalquiler.alquiler.accion = 'modificar';
        },
        eliminarAlquiler(idAlquiler) {
            fetch(`private/Modulos/alquiler/procesos.php?proceso=eliminarAlquiler&alquiler=${idAlquiler}`).then(resp => resp.json()).then(resp => {
                this.buscarAlquiler();
            });
        }
    },
    created() {
        this.buscarAlquiler();
    }
});