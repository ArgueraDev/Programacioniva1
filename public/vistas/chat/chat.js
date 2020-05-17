var socket = io.connect("http://localhost:3001", {
        'forceNew': true
    }),
    appchat = new Vue({
        el: '#frm-chat',
        data: {
            msg: '',
            msgs: []
        },
        methods: {
            enviarMensaje() {
                socket.emit('enviarMensaje', this.msg);
                this.msg = '';
            },
            limpiarChat() {
                this.msg = '';
            }
        },
        created() {
            socket.emit('chatHistorial');
        }
    });
socket.on('recibirMensaje', msg => {
    appchat.msgs.push(msg);
});
socket.on('chatHistorial', msgs => {
    msgs.forEach(item => {
        appchat.msgs.push(item.msg);
    });
});