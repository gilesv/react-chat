var messages = {};
var users = {};

module.exports = function(http) {
    const io = require('socket.io')(http, { wsEngine: 'ws' });

    io.on('connection', function(client) {

        client.broadcast.emit('userConnected', client.id);

        client.on('userConnected', function(id) {
            client.broadcast.emit('userConnected', id);
        });

        client.on('userRegistered', function(username) {
            users[client.id] = username;
            client.broadcast.emit('userRegistered', username);
        })

        client.on('newMessage', function(msg) {
            client.broadcast.emit('newMessage', msg);
        });

        client.on('disconnect', function() {
            client.broadcast.emit('userDisconnected', users[client.id]);
        });
    });

    return io;
}