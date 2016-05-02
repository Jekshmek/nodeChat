var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 4000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});
app.use(express.static(__dirname + '/public'));

var numUsers = 0;

io.on('connection', function (socket) {

// START любой url по port:4000

    var ID =  (socket.id).toString().substr(0, 5);

    socket.username = ID ;

    socket.on('new message', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message', {
            username: socket.username,
            message: data
        });

       // чистить подсказку
        socket.broadcast.emit('input', {});

    });


    socket.on('input', function (data) {
        socket.broadcast.emit('input', {
            username: socket.username,
            message: data
        });
    });

    socket.on('rename', function (data) {
        ++numUsers;
        socket.username=data;
        galasuicount();
    });

    function galasuicount(){
        var date = (new Date).toLocaleTimeString();
        socket.broadcast.emit('num', {
            num: numUsers,
            date: date
        });
        socket.emit('num', {
            num: numUsers,
            date: date
        });
    }


});