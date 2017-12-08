const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const compression = require('compression')
const DB = require('./server/module/index.js')

console.log(DB)
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
	DB.dbLogin({'username':value_uname,"password":value_password}, function (data) {
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
/*
function dbConnect (callback) {
	MongoClient.connect('mongodb://localhost:27017/platform', function (err, database) {
		if (err) {
			console.log(err)
		}
		console.log('mongodb connection')
		callback(database, function () {
			database.close()
		})
	})
}

function dbLogin (options, callback) {
	dbConnect(function (database, cb) {
		let use_Collection = database.collection('user')
		use_Collection.find({
			"username": options.username,
			"password": options.password
		}).toArray(function (err, result) {
			callback(result)
			cb()
		})	
	})
}

*/
app.listen(80)
