const express = require('express')
const router = express.Router()
const SESSION = require('./../session/index.js')
const USER = require('./../module/user.js')
// 登录模块
router.post('/login',function(req,res,next){
	let value_uname = req.body.uname,
		value_password = req.body.password;

	if(!(value_uname && value_password)){
		res.json({
			state:0,
			message:'缺少参数'
		})
		return false;
	}
	USER.login(
		{
			'username':value_uname,
			"password":value_password
		}, 
		function (data) {
			if (data.length > 0) {
				const session = SESSION.set(value_uname)
				res.cookie('token', session + '&&' + value_uname)
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
		}
	)
})
// 注册接口 
router.post('/register', function (req, res, next) {
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
			res.json({
				state: 1,
				message: '注册账号成功'
			})
		})
	})
})
// 验证登录接口
router.get('/islogin', function (req, res, next) {
	const token = req.cookies.token
	const messages = token ? token.split('&&') : []
	const username = messages[1]
	const session = messages[0]
	if (username && SESSION.is(username) === session) {
		res.json({
			state: 1,
			message: '已登陆'
		})
		return
	}
	res.json({
		state: 0,
		message: '未登录'
	})
})
// 退出登录
router.get('/loginout', function (req, res, next) {
	const token = req.cookies.token
	const messages = token ? token.split('&&') : []
	const username = messages[1]
	const session = messages[0]
	if (username && SESSION.clear(username)) {
		res.json({
			state: 1,
			message: '退出登录'
		})		
		return
	}
	res.json({
		state: 0,
		message: '登出失败'
	})
})


module.exports = router
