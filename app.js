const express = require('express')
const http = require('http')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
// router config
const user = require('./server/router/user.js')
const article = require('./server/router/article.js')
const Chat = require('./server/router/chat.js')
// start static server

const Server = http.createServer(app)
// 开启socket io服务
new Chat(Server, {
	path: '/chat',
	serveClient: false	
})
app.use('/', express.static('www',{
	index:'index.html'
}));
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extend:false}))
app.use('/article', function (req, res, next) {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Request-Method': '*',
		'Access-Control-Allow-Credentials': false
	})
	next()
})
// 用户路由
app.use('/user', user)
// 文章路由
app.use('/article', article)


// 用户错误日志
app.use(function(err, req, res, next){
	console.log(err)
	next()
})
// 错误日志
app.use(function(err, req, res, next) {
	console.log(err)
})
// 监听端口
Server.listen('80', function () {
	console.log('server start success')
})
