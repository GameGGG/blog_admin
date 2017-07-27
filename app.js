var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io').listen(server),
	mysql = require('mysql'),
	bodyParser = require('body-parser');

server.listen(80);


// db connect
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'admin',
	prot:'3306',
	database:'passport'
})
connection.connect();

app.use(express.static('www',{
	index:'passport.html'
}));
app.use(bodyParser.urlencoded({extend:false}))

io.sockets.on('connection',function(socket){
	socket.emit('news',{hello:'world'});
	socket.on('message',function(data){
		socket.broadcast.emit('putMsg',{msg:data});
	})
})

// 注册
app.post('/user/register',function(req,res,next){
	let value_uname = req.body.uname,
		value_password = req.body.password,
		value_email = req.body.email;
	if(!(value_uname && value_password && value_email)){
		res.json({
			state:0,
			message:'缺少参数'
		})
		return false;
	}
	connection.query("SELECT * FROM uinfo WHERE uname=? OR email=?;",[value_uname,value_email],function(err,result){
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		console.log(!result.length)
		if(!!result.length){
			res.json({
				state:0,
				message:'用户名或邮箱以存在。'
			})
			return;
		}
		connection.query("INSERT INTO uinfo (uname,email,password) VALUES (?,?,?)",[value_uname,value_email,value_password],function(err,reult){
			if(err){
				console.log('[INSERT ERROR] - ',err.message);
				return
			}
			res.json({
				state:1,
				message:'注册成功。'
			})
		})
	});
})
// 登陆
app.post('/user/login',function(req,res,next){
	let value_uname = req.body.uname,
		value_password = req.body.password,
	if(!(value_uname && value_password)){
		res.json({
			state:0,
			message:'缺少参数'
		})
		return false;
	}
	connection.query("SELECT * FROM uinfo WHERE uname=? AND password=?;",[value_uname,value_password],function(err,result){
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
		}
		console.log(!result.length)
		if(!!result.length){
			res.json({
				state:1,
				message:''
			})
			return;
		}
		res.json({
			state:0,
			message:'账号或密码错误。'
		})
	});
	next();
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

