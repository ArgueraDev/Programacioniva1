Vue.component('v-select', VueSelect.VueSelect);

var appmatriculas = new Vue({
    el: '#frm-matriculas',
    data: {
        matricula: {
            idMatricula: 0,
            accion: 'nuevo',
            periodo: {
                idPeriodo: 0,
                periodo: ''
            },
            alumno: {
                idAlumno: 0,
                alumno: ''
            },
            fecha: '',
            msg: ''
        },
        periodos: {},
        alumnos: {}
    },
    methods: {
        guardarMatriculas() {
            fetch(`private/Modulos/matriculas/procesos.php?proceso=recibirDatos&matricula=${JSON.stringify(this.matricula)}`).then(resp => resp.json()).then(resp => {
                this.matricula.msg = resp.msg;
            });
        },
        limpiarMatriculas() {
            this.matricula.idMatricula = 0;
            this.matricula.accion = "nuevo";
            this.matricula.msg = "";
        }
    },
    created() {
        fetch(`private/Modulos/matriculas/procesos.php?proceso=traer_periodos_alumnos&matricula=''`).then(resp => resp.json()).then(resp => {
            this.periodos = resp.periodos;
            this.alumnos = resp.alumnos;
        });
    }
});