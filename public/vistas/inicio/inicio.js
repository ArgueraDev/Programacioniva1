/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file inicio.js contenido de la informacion.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var appInicio = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#listado',
    data: {
        informacion: [],
        bancaria: [],
        diccionario: [],
        valor: ''
    },
    methods: {
        /**
         * @function verInformacion bucas la informacion que se va escribiendo.
         */
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
/**
 * carga el formulario para agregar nueva informacion
 */
$("#contribuir").click(function (e) {
    $(`#vistas`).load(`public/vistas/informacion/informacion.html`);
});