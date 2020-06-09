var appchat = new Vue({
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
        enviarMensaje() {
            if (this.msg.msg.trim() != '') {
                socket.emit('enviarMensaje', this.msg);
                this.msg.msg = '';
            }
        },
        usuario() {
            fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                this.msg.de1 = resp[0].idLogin;
                socket.emit('chatHistory');
            });
            this.finalChat();
        },
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
socket.on('chatHistory', msgs => {
    appchat.msgs = [];
    msgs.forEach(item => {
        if (item.de1 === appchat.msg.de1 && item.para === appchat.msg.para ||
            item.para === appchat.msg.de1 && item.de1 === appchat.msg.para) {
            appchat.msgs.push(item);
        }
    });
});