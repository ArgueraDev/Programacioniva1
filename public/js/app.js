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