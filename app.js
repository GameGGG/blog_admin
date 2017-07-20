var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io').listen(server);
server.listen(3000);


app.use(express.static('www'));
io.sockets.on('connection',function(socket){
	console.log('user connection')
	socket.emit('news',{hello:'world'});
	socket.on('message',function(data){
		socket.broadcast.emit('putMsg',{msg:data});
	})
})


app.use(logErrors);
app.use(errorHandler);

function logErrors(err,req,res,next){
	console.error(err.stack);
	next();
}
function errorHandler(err,req,res,next){
	res.status(500);
	res.render('error',{error:err});
}

