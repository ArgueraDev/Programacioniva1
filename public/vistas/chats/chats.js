/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file chats.js chat con administracion.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var appchats = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#frm-chats',
    data: {
        msg: {
            de1: 'administracion',
            para: 0,
            msg: '',
            imagen: ''
        },
        msgs: [],
        usuarios: [],
        todosmsg: [],
        usuario: {
            img: '',
            nombre: ''
        }
    },
    methods: {
        /**
         * @function enviarMensaje envia el mensaje por medio de nodejs y socket io.
         */
        enviarMensaje() {
            if (this.msg.msg.trim() != '') {
                socket.emit('enviarMensaje', this.msg);
                this.msg.msg = '';
            }
        },
        /**
         * @function verusuarios muestra cada uno de los usuarios registrados en la app.
         */
        verusuarios() {
            fetch(`private/Modulos/login/procesos.php?proceso=usuarios&login=""`).then(resp => resp.json()).then(resp => {
                this.usuarios = resp;
            });
        },
        /**
         * @function abrirChat muestra los msj de el usuario seleccionado.
         * @param {object} item datos del usario seleccionado.
         */
        abrirChat(item) {
            this.msg.para = item.idLogin;
            this.usuario.img = item.imagen;
            this.usuario.nombre = item.nombre;
            socket.emit('chatHistory');
            this.msgs = [];
            this.todosmsg.forEach(item => {
                this.utilidad(item);
            });
            this.finalChat();
        },
        /**
         * @function utilidad funciona para controlar el ingreso de los msj.
         * @param {object} item mensaje a validar con el usuario.
         */
        utilidad(item) {
            if (item.de1 === this.msg.de1 && item.para === this.msg.para ||
                item.de1 === this.msg.para && item.para === this.msg.de1) {
                this.msgs.push(item);
            }
        },
        /**
         * @function cargarImagen envia foto o imagen al usuario.
         * @param {object} e datos de la imagen seleccionada.
         */
        cargarImagen(e) {
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = (event) => {
                this.msg.imagen = event.target.result
                this.msg.msg = '';
                socket.emit('enviarMensaje', this.msg);
                this.msg.imagen = '';
            };
            reader.readAsDataURL(file);
        },
        /**
         * @function finalChat muestra el ultimo msj del chat.
         */
        finalChat() {
            $("#scroll").animate({
                scrollTop: $('#scroll')[0].scrollHeight
            }, 1000);
        }
    },
    created() {
        this.verusuarios();
        socket.emit('chatHistory');
    }
});

/**
 * recibe los msj enviados
 */
socket.on('recibirMensaje', msg => {
    if (msg.de1 === appchats.msg.de1 && msg.para === appchats.msg.para ||
        msg.para === appchats.msg.de1 && msg.de1 === appchats.msg.para) {
        appchats.msgs.push(msg);
        if (msg.de1 != appchats.msg.de1) {
            $.notification("Finappza chat", msg.msg, 'img/logo.png');
        }
    }
    appchats.finalChat();
});
/**
 * recibe el historial de los msj almacenados en la base de datos
 */
socket.on('chatHistory', msgs => {
    appchats.todosmsg = msgs;
});