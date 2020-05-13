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
        Agregar: function (idModerar) {
            fetch(`private/Modulos/informacion/procesos.php?proceso=Agregar&informacion=${idModerar}`).then(resp => resp.json()).then(resp => {
                alertify.success(resp.msg);
                this.Eliminar(idModerar);
            });
        },
        Eliminar: function (idModerar) {
            fetch(`private/Modulos/moderar/procesos.php?proceso=Eliminar&moderar=${idModerar}`).then(resp => resp.json()).then(resp => {
                alertify.success(resp.msg);
                this.VerContribucion();
            });
        }
    },
    created: function () {
        this.VerContribucion();
    }
});