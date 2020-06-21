/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file moderar.js control de la informacion antes de publicar.
 * @license MIT libre distribucion y modificacion para fine educativos.
 * @instance objeto de instancia de vue.js
 */
var appModerar = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#frm-moderar',
    data: {
        items: [],
        valor: ''
    },
    methods: {
        /**
         * @function VerContribucion mostrar la informacion obtenida de los usuarios antes de ser publicas.
         */
        VerContribucion: function () {
            fetch(`private/Modulos/moderar/procesos.php?proceso=verContribucion&moderar=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.items = resp;
            });
        },
        /**
         * @function Agregar Aceptar la informacion de los usuarios y hacerla publica.
         * @param {object} idModerar id de la informacion a eliminar.
         */
        Agregar: function (idModerar) {
            fetch(`private/Modulos/informacion/procesos.php?proceso=Agregar&informacion=${idModerar}`).then(resp => resp.json()).then(resp => {
                alertify.success(resp.msg);
                this.Eliminar(idModerar);
            });
        },
        /**
         * @function Eliminar Elimina la informacion obtenida de los usuarios.
         */
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