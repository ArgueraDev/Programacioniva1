var appInicio = new Vue({
    el: '#listado',
    data: {
        items: [],
        valor: '',
    },
    methods: {
        verInformacion: function () {
            fetch(`private/Modulos/informacion/procesos.php?proceso=buscarInformacion&informacion=${this.valor}`).then(resp => resp.json()).then(resp => {
                this.items = resp;
            });
        }
    },
    created: function () {
        this.verInformacion();
    }
})

$("#contribuir").click(function (e) {
    $(`#vistas`).load(`public/vistas/informacion/informacion.html`);
});

(function (d, t, e, m) {

    // Async Rating-Widget initialization.
    window.RW_Async_Init = function () {

        RW.init({
            huid: "458081",
            uid: "7cfd98716eccbd16e57b78b2f15c7cb4",
            source: "website",
            options: {
                "size": "medium",
                "lng": "es",
                "style": "crystal",
                "isDummy": false
            }
        });
        RW.render();
    };
    // Append Rating-Widget JavaScript library.
    var rw, s = d.getElementsByTagName(e)[0],
        id = "rw-js",
        l = d.location,
        ck = "Y" + t.getFullYear() +
        "M" + t.getMonth() + "D" + t.getDate(),
        p = l.protocol,
        f = ((l.search.indexOf("DBG=") > -1) ? "" : ".min"),
        a = ("https:" == p ? "secure." + m + "js/" : "js." + m);
    if (d.getElementById(id)) return;
    rw = d.createElement(e);
    rw.id = id;
    rw.async = true;
    rw.type = "text/javascript";
    rw.src = p + "//" + a + "external" + f + ".js?ck=" + ck;
    s.parentNode.insertBefore(rw, s);
}(document, new Date(), "script", "rating-widget.com/"));