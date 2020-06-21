var http = require('http').Server(),
    io = require('socket.io')(http),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://127.0.0.1:27017',
    dbName = 'chatFinappza';

const webpush = require('web-push'),
    vapidKeys = {
        publicKey: 'BJHfdZQWnVUaHtWnSANmO46PAKlXzk6FnM2sYzSYxgjf-bNvNC8LHxwDrqi4Dt-LwbDyEB5K29sBX7PLRtOzB20',
        privateKey: 'QM1DCuNyxTIUSCtYbrT94WlbyREmfGVR0MVyj7_DUyQ'
    };
var pushSubcriptions; //debe de almacenarse en una BD.
webpush.setVapidDetails("mailto:luishernandez@ugb.edu.sv", vapidKeys.publicKey, vapidKeys.privateKey);

io.on('connection', socket => {
    socket.on('enviarMensaje', (msg) => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            db.collection('chat').insert({
                'de1': msg.de1,
                'para': msg.para,
                'msg': msg.msg,
                'imagen': msg.imagen
            });
            io.emit('recibirMensaje', msg);
            try {
                const dataPush = JSON.stringify({
                    title: 'Notificacion PUSH desde el SERVIDOR',
                    msg
                });
                console.log("Endpoint: ", pushSubcriptions.endpoint);
                webpush.sendNotification(pushSubcriptions, dataPush);
            } catch (error) {
                console.log("Error al intentar enviar la notificacion push", error);
            }
        });
    });
    socket.on('chatHistory', () => {
        MongoClient.connect(url, (err, client) => {
            const db = client.db(dbName);
            db.collection('chat').find({}).toArray((err, msgs) => {
                io.emit('chatHistory', msgs);
            });
        });
    });
    socket.on("suscribirse", (subcriptions) => {
        pushSubcriptions = JSON.parse(subcriptions);
        console.log(pushSubcriptions.endpoint);
    });
});
http.listen(3001, () => {
    console.log('Escuchando peticiones por el puerto 3001, LISTO');
});