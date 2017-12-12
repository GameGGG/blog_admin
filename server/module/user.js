const DATABASE = require('./database.js')
// 用户登录
exports.login = function (options, callback) {
	DATABASE.platform(function (database, cb) {
		let use_Collection = database.collection('user')
		console.log(options)
		use_Collection.find({
			"username": options.username,
			"password": options.password
		}).toArray(function (err, result) {
			callback(result)
			cb()
		})	
	})
}
// 查询用户名和email是否重复
exports.search = function (options, callback) {
	DATABASE.platform(function (database, cb) {
		let userCollection = database.collection('user')
		let result = userCollection.find({
			$or: [
				{"username": options.username},
				{"email": options.email}
			]
			
		}).toArray(function (err, result){
			callback(result)
			cb()
		})
	})
}
// 插入用户信息
exports.insert = function (options, callback) {
	DATABASE.platform(function (database, cb) {
		let userCollection = database.collection('user')
		let result = userCollection.insert({
			"username": options.username,
			"password": options.password,
			"email": options.email
		}, function (err, result){
			var r = result
			if (err) {
				r = false
			}
			callback(r)
			cb()
		})
	})
}
