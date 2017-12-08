const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const compression = require('compression')
const USER = require('./server/module/user.js')

// start static server
app.use('/', express.static('www',{
	index:'index.html'
}));
app.use(compression())
app.use(bodyParser.urlencoded({extend:false}))
app.post('/user/login',function(req,res,next){
	let value_uname = req.body.uname,
		value_password = req.body.password;

	if(!(value_uname && value_password)){
		res.json({
			state:0,
			message:'缺少参数'
		})
		return false;
	}
	console.log(value_uname)
	USER.login({'username':value_uname,"password":value_password}, function (data) {
		console.log(data)
		if (data.length > 0) {
			res.cookie('uname', value_uname)
			res.json({
				state: 1,
				message: '登录成功'
			})
			return;
		}
		res.json({
			state: 0,
			message: '账号或密码错误'
		})
	})
})
app.post('/user/register', function (req, res, next) {
	let value_uname = req.body.uname
	let value_password = req.body.password
	let value_email = req.body.email
	if (!(value_uname && value_password && value_email)) {
		res.json({
			state: 0,
			message: '缺少参数'
		})
	}
	USER.search({
		"username": value_uname,
		"email": value_email
	}, function (data) {
		if (data.length > 0) {
			res.json({
				state: 0,
				message: '账号或邮箱已存在'	
			})
			return;
		}
		USER.insert({
			"username": value_uname,
			"password": value_password,
			"email": value_email
		}, function (data){
			console.log(data)
			res.json({
				state: 1,
				message: '注册账号成功'
			})
		})
	})
})
app.listen(80)
