const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const user = require('./server/router/user.js')
// start static server
app.use('/', express.static('www',{
	index:'index.html'
}));
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.urlencoded({extend:false}))
app.use('/user', user)
// 监听端口
app.listen(80)
