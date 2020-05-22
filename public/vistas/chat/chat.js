var socket = io.connect("http://localhost:3001", {
        'forceNew': true
    }),
    appchat = new Vue({
        el: '#frm-chat',
        data: {
            msg: {
                de1: '',
                para: 'administracion',
                msg: ''
            },
            msgs: []
        },
        methods: {
            enviarMensaje() {
                if (!empty(trim(this.msg))) {
                    socket.emit('enviarMensaje', trim(this.msg));
                    this.msg.msg = '';
                }
            },
            usuario() {
                fetch(`private/Modulos/consultas/procesos.php?proceso=idLogin&consulta=""`).then(resp => resp.json()).then(resp => {
                    this.msg.de1 = resp[0].idLogin;
                    socket.emit('chatHistory');
                });
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
    }
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