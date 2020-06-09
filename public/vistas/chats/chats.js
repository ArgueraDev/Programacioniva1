var appchats = new Vue({
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
        enviarMensaje() {
            if (this.msg.msg.trim() != '') {
                socket.emit('enviarMensaje', this.msg);
                this.msg.msg = '';
            }
        },
        verusuarios() {
            fetch(`private/Modulos/login/procesos.php?proceso=usuarios&login=""`).then(resp => resp.json()).then(resp => {
                this.usuarios = resp;
            });
        },
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
        utilidad(item) {
            if (item.de1 === this.msg.de1 && item.para === this.msg.para ||
                item.de1 === this.msg.para && item.para === this.msg.de1) {
                this.msgs.push(item);
            }
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
        this.verusuarios();
        socket.emit('chatHistory');
    }
});
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
socket.on('chatHistory', msgs => {
    appchats.todosmsg = msgs;
});