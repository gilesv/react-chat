const express = require('express');
const app = express();
const http = require('http').Server(app);
const socket = require('./config/socket.js')(http);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('index.html', { root: 'public' });
});

http.listen(3000, function() {
    console.log('Listening at http://localhost:3000...');
});
