var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

var io = require('socket.io')(server);

let history = [];

io.on('connection', function (socket) {
  if (history != null) {
    io.emit('clean-history')
    history.forEach(msg => io.emit('message', msg));
  }

  socket.on('message', function (msg) {
    history.push(msg)
    io.emit('message', msg);
  });
});

server.listen(8080, function () {
  console.log('Chat server running');
});