const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var port = 8880;

app.get('/', (req, res) => {
//  res.send('<h1>Hello world</h1>');
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

  socket.on('payload', (data) => {
	const payload = data[1];
//	console.log('data[now] : ' + data["now"]);
//    console.log('time passed : ' + JSON.stringify(data));
    console.log('time passed : ' + data['now']);
//	io.emit('chat message', JSON.stringify(data));
	io.emit('chat message', data['now']);
  });
});

io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(port, () => {
  console.log('listening on *: ' + port);
});
