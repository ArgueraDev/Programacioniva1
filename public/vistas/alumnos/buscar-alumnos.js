var appbuscar_alumnos = new Vue({
    el: '#frm-buscar-alumnos',
    data: {
        mis_alumnos: [],
        valor: ''
    },
    methods: {
        buscarAlumnos() {
            fetch(`private/Modulos/alumnos/procesos.php?proceso=buscarAlumno&alumno=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.mis_alumnos = resp;
            });
        },
        modificarAlumno(alumno) {
            appalumnos.alumno = alumno;
            appalumnos.alumno.accion = 'modificar';
        },
        eliminarAlumno(idAlumno) {
            alertify.confirm("Mantenimiento Alumnos", "Esta seguro de eliminar",
                () => {
                    fetch(`private/Modulos/alumnos/procesos.php?proceso=eliminarAlumno&alumno=${idAlumno}`).then(resp => resp.json()).then(resp => {
                        this.buscarAlumnos();
                    });
                    alertify.success('Registro Eliminado correctamente.');
                },
                () => {
                    alertify.error('Eliminacion cancelada por el usuario.');
                });
        }
    },
    created() {
        this.buscarAlumnos();
    }
});