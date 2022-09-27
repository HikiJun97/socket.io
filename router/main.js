module.exports = function(app){
	app.get('/', (req, res) => {
		logger.info('GET /');
		res.sendFile(__dirname + '/index.html');
	});

	app.get('/receive', (req, res) => {
		logger.info('RECEIVE /');
		res.sendFile(__dirname + '/receive.html');
	});
}
