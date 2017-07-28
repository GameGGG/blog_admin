var express = require('express'),
	app = express(),
	add = express(),
	server = require('http').Server(app),
	io = require('socket.io').listen(server),
	mysql = require('mysql'),
	bodyParser = require('body-parser');

server.listen(3000);
add.listen(80);

// db connect
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'admin',
	prot:'3306',
	database:'passport'
})
connection.connect();


add.use(express.static('www',{
	index:'passport.html'
}));
add.use(bodyParser.urlencoded({extend:false}))

io.sockets.on('connection',function(socket){
	socket.on('commit',function(data){
		insertScoketId(data.uname,data.sid)
	})
	socket.on('message',function(data){
		connection.query('SELECT * FROM uinfo WHERE socketid = ?',[data.sid],function(err,result){
			if(err){
				console.log('[SELECT ERROR] - ',err.message);
				return false;
			}
			let uname = result && result[0] && result[0].uname
			if(!uname){
				socket.emit('errorMsg',{
					state:0
				});
				return;
			};
			socket.broadcast.emit('putMsg',{msg:data.msg,uname:uname});
		})
	})
})

// 注册
add.post('/user/register',function(req,res,next){
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
add.post('/user/login',function(req,res,next){
	let value_uname = req.body.uname,
		value_password = req.body.password;

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
		if(!!result.length){
			connection.query("UPDATE uinfo SET login = 1 WHERE uname = ?",[value_uname],function(err,result){
				if(err){
					console.log("[UPDATE ERROR] - ",err.message);
					return;
				}
				res.json({
					state:1,
					message:''
				})
			})
			return;
		}
		res.json({
			state:0,
			message:'账号或密码错误。'
		})
	});
})

add.use(logErrors);
add.use(errorHandler);

function logErrors(err,req,res,next){
	console.error(err.stack);
	next();
}
function errorHandler(err,req,res,next){
	res.status(500);
	res.render('error',{error:err});
}
function insertScoketId(uname,id){
	connection.query('UPDATE uinfo SET socketid = ? WHERE uname = ? AND login = 1',[id,uname],function(err,result){
		if(err){
			console.log("[UPDATE ERROR] - ",err.message);
			return;
		}
	})
}
function selectUname(sid){
	connection.query('SELECT * FROM uinfo WHERE socketid = ?',[sid],function(err,result){
		if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return false;
		}
		let uname = result && result[0] && result[0].uname
		return uname;
	})
}
