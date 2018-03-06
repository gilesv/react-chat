
const express = require('express');
const app = express();

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('index.html', { root: 'public' });
});

app.listen('3000', function() {
    console.log('User connected');
});