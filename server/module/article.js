const database = require('./database.js')

exports.find = function (options, callback) {
	database.blog(function (db, close) {
		let article = db.collection('article')
		article.find({
			type: options.type
		}).toArray(function (err, data) {
			let result = data
			if (err) {
				console.log(err)
				result = []
			}
			callback(result)
			close()
		})
	})
}

// 插入文章
exports.insert = function (options, callback) {
	database.blog(function (db, close) {
		let article = db.collection('article')
		article.insert(options, function (err, data) {
			let result = true
			if (err) {
				console.log(err)
				result = false
			}
			callback(result)
			close()
		})
	})
}
// 删除文章
exports.delete = function (options, callback) {
	database.blog(function (db, close) {
		let article = db.collection('article')
		article.remove({
			id: options.id
		}, function (err, data) {
			let result =  true
			if (err) {
				result = false
			}
			callback(result)
			close()
		})
	}
}
