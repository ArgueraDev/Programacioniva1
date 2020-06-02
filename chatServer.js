var http = require('http').Server(),
    io = require('socket.io')(http),
    MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://127.0.0.1:27017',
    dbName = 'chatFinappza';

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
});
http.listen(3001, () => {
    console.log('Escuchando peticiones por el puerto 3001, LISTO');
});