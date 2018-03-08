
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('index.html', { root: 'public' });
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('message', function(msg) {
        socket.broadcast.emit('message', msg);
    })
});
  
http.listen(3000, function() {
    console.log('Listening at 3000...');
});
