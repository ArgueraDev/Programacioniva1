var appbuscar_docentes = new Vue({
    el: '#frm-buscar-docentes',
    data: {
        mis_docentes: [],
        valor: ''
    },
    methods: {
        buscarDocentes() {
            fetch(`private/Modulos/docentes/procesos.php?proceso=buscarDocente&docente=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.mis_docentes = resp;
            });
        },
        modificarDocente(docente) {
            appdocentes.docente = docente;
            appdocentes.docente.accion = 'modificar';
        },
        eliminarDocente(idDocente) {
            fetch(`private/Modulos/docentes/procesos.php?proceso=eliminarDocente&docente=${idDocente}`).then(resp => resp.json()).then(resp => {
                this.buscarDocentes();
            });
        }
    },
    created() {
        this.buscarDocentes();
    }
});