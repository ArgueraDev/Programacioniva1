/**
 * @author Roberto Arguera <usis008718@ugb.edu.sv>
 * @file chat.js chat con aadministracion.
 * @license MIT libre distribucion y modificacion para fines educativos.
 * @instance objeto de instancia de vue.js
 */
var appchat = new Vue({
    /**
     * @property el element del DOM a enlazar.
     */
    el: '#frm-chat',
    data: {
        msg: {
            de1: '',
            para: 'administracion',
            msg: '',
            imagen: ''
        },
        msgs: []
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
         * @function usuario  obtiene el id del usuario activo.
         */
        usuario() {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.msg.de1 = resp[0].idLogin;
                socket.emit('chatHistory');
            });
            this.finalChat();
        },
        /**
         * @function cargarImagen envia foto o imagen al usuario.
         * @param {object} e datos de la imagen seleccionado para enviar.
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
        this.usuario();
    }
});

/**
 * recibe los msj enviados
 */
socket.on('recibirMensaje', msg => {
    if (msg.de1 === appchat.msg.de1 && msg.para === appchat.msg.para ||
        msg.para === appchat.msg.de1 && msg.de1 === appchat.msg.para) {
        appchat.msgs.push(msg);
        if (msg.de1 === appchat.msg.para) {
            $.notification("Finappza chat", msg.msg, 'img/logo.png');
        }
    }
    appchat.finalChat();
});
/**
 * recibe el historial de los msj almacenados en la base de datos
 */
socket.on('chatHistory', msgs => {
    appchat.msgs = [];
    msgs.forEach(item => {
        if (item.de1 === appchat.msg.de1 && item.para === appchat.msg.para ||
            item.para === appchat.msg.de1 && item.de1 === appchat.msg.para) {
            appchat.msgs.push(item);
        }
    });
});