var zindex = 1;

function init() {
    $("[class*='mostrar']").click(function (e) {
        let modulo = $(this).data("modulo"),
            form = $(this).data("form");

        $(`#vistas-${form}`).load(`public/vistas/${modulo}/${form}.html`, function () {
            $(`#btn-close-${form}`).click(() => {
                $(`#vistas-${form}`).html("");
            });
            init();
        }).draggable();
    });
}

function zindex_ventana(app) {
    $(`#frm-${app} .card-header`).click(() => {
        $(`#vistas-${app}`).css("z-index", zindex++);
    });
}
init();