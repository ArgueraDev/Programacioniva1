var socket = io.connect("http://localhost:3001", {
        'forceNew': true
    }),
    appchats = new Vue({
        el: '#frm-chats',
        data: {
            msg: {
                de1: 'administracion',
                para: 0,
                msg: ''
            },
            msgs: [],
            usuarios: [],
            todosmsg: []
        },
        methods: {
            enviarMensaje() {
                var msj = this.msg.msg;
                this.msg.msg = msj.trim();
                if (this.msg.msg != '' && this.msg.para != 0) {
                    socket.emit('enviarMensaje', this.msg);
                    this.msg.msg = '';
                }
            },
            verusuarios() {
                fetch(`private/Modulos/login/procesos.php?proceso=usuarios&login=""`).then(resp => resp.json()).then(resp => {
                    this.usuarios = resp;
                });
            },
            abrirChat(id) {
                socket.emit('chatHistory');
                this.msg.para = id;
                this.msgs = [];
                this.todosmsg.forEach(item => {
                    this.utilidad(item);
                });
            },
            utilidad(item) {
                if (item.de1 === this.msg.de1 && item.para === this.msg.para ||
                    item.de1 === this.msg.para && item.para === this.msg.de1) {
                    this.msgs.push(item);
                }
            }
        },
        created() {
            this.verusuarios();
            socket.emit('chatHistory');
        }
    });
socket.on('recibirMensaje', msg => {
    if (msg.de1 === appchats.msg.de1 && msg.para === appchats.msg.para ||
        msg.para === appchats.msg.de1 && msg.de1 === appchats.msg.para) {
        appchats.msgs.push(msg);
    }
});
socket.on('chatHistory', msgs => {
    appchats.todosmsg = msgs;
});