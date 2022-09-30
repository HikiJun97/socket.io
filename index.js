const express = require('express');
const app = express();
//const router = require('./router/main')(app);

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const logger = require('./logger');

//var receive = require('receive.html');

var port = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
	logger.info('INDEX /');
	res.sendFile(__dirname + '/html/index1.html');
});

app.get('/receive.html', (req, res) => {
	logger.info('RECEIVE /');
	res.sendFile(__dirname + '/html/receive.html');
});

app.get('/send.html', (req, res) => {
	logger.info('SEND /');
	res.sendFile(__dirname + '/html/send.html');
});

app.get('/chart.html', (req, res) => {
	logger.info('CHART /');
	res.sendFile(__dirname + '/html/chart.html');
});

io.on('connection', (socket) => {
	console.log('a user connected');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
//    console.log('message: ' + msg);
	logger.info(msg);
  });

  socket.on('payload', (data) => {
	const payload = data[1];
//	console.log('data[now] : ' + data["now"]);
//    console.log('time passed : ' + JSON.stringify(data));
    console.log('time passed : ' + data['now']);
	logger.info(data['now']);
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
