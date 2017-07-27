var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io').listen(server),
	mysql = require('mysql');
	
server.listen(80);


// db connect
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'admin',
	prot:'3306',
	database:'passport'
})


app.use(express.static('www'));
io.sockets.on('connection',function(socket){
	console.log('user connection')
	socket.emit('news',{hello:'world'});
	socket.on('message',function(data){
		socket.broadcast.emit('putMsg',{msg:data});
	})
})

app.post('user/register',function(req,res){
	let value_uname = req.query.uname,
		value_password = req.query.password,
		value_email = req.query.email;
	if(!(vaule_uname && value_password && value_email)){
		res.json({
			state:0,
			message:'缺少参数'
		})
	}
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

