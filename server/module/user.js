const DATABASE = require('./database.js')
// 用户登录
exports.dbLogin = function (options, callback) {
	DATABASE.platform(function (database, cb) {
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
