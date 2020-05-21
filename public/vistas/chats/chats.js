var socket = io.connect("http://localhost:3001", {
        'forceNew': true
    }),
    appchats = new Vue({
        el: '#frm-chats',
        data: {
            msg: {
                de1: 'administracion',
                para: '11',
                msg: ''
            },
            msgs: [],
            usuarios: [],
        },
        methods: {
            enviarMensaje() {
                socket.emit('enviarMensaje', this.msg);
                this.msg.msg = '';
            },
            limpiarChat() {
                this.msg.msg = '';
            },
            verusuarios() {
                fetch(`private/Modulos/login/procesos.php?proceso=usuarios&login=""`).then(resp => resp.json()).then(resp => {
                    this.usuarios = resp;
                });
            }
        },
        created() {
            this.verusuarios();
            socket.emit('chatHistory');
        }
    });
socket.on('recibirMensaje', msg => {
    if (msg.de1 === appchats.msg.de1 && msg.para === appchats.msg.para ||
        msg.de1 === appchats.msg.para && msg.para === appchats.msg.de1) {
        appchats.msgs.push(msg);
    }
});
socket.on('chatHistory', msgs => {
    appchats.msgs = [];
    msgs.forEach(item => {
        if (item.de1 === appchats.msg.de1 && item.para === appchats.msg.para ||
            item.de1 === appchats.msg.para && item.para === appchats.msg.de1) {
            appchats.msgs.push(item);
        }
    });
});