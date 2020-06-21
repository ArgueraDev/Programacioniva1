
/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file app.js cambio de ventana del login.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
/**
 * @function init muestra la ventana segun el items seleccionado en el login
 */
function init() {
    $("[class*='mostrar']").click(function (e) {
        let modulo = $(this).data("modulo"),
            form = $(this).data("form");

        $(`#vistas`).load(`public/vistas/${modulo}/${form}.html`, function () {
            init();
        });
    });
}
init();
$(document).ready(function () {
    $(`#vistas`).load(`public/vistas/inicio/inicio.html`, function () {});
});

var socket = io.connect("http://localhost:3001", {
    'forceNew': true
});