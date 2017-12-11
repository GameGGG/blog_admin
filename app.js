const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
// router config
const user = require('./server/router/user.js')
const article = require('./server/router/article.js')
// start static server
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
app.use('/user', user)
app.use('/article', article)
// 监听端口
app.listen(80)
