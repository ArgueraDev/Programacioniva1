var appbuscar_materias = new Vue({
    el: '#frm-buscar-materias',
    data: {
        mis_materias: [],
        valor: ''
    },
    methods: {
        buscarMaterias: function () {
            fetch(`private/Modulos/materias/procesos.php?proceso=buscarMateria&materia=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.mis_materias = resp;
            });
        },
        modificarMateria: function (materia) {
            appmaterias.materia = materia;
            appmaterias.materia.accion = 'modificar';
        },
        eliminarMateria: function (idMateria) {
            fetch(`private/Modulos/materias/procesos.php?proceso=eliminarMateria&materia=${idMateria}`).then(resp => resp.json()).then(resp => {
                this.buscarMaterias();
            });
        }
    },
    created: function () {
        this.buscarMaterias();
    }
});