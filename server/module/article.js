const database = require('./database.js')

exports.find = function (options, callback) {
	database.blog(function (db, close) {
		let article = db.collection('article')
		article.find({
			type: options.type
		}).toArray(function (err, result) {
			if (err) {
				console.log(err)
			}
			callback(result)
		})
		close()
	})
}

exports.insert = function (options, callback) {
	database.blog(function (db, close) {
		let article = db.collection('article')
		article.insert(options, function (err, result) {
			if (err) {
				console.log(err)
			}
			callback(result)
		})
	})
}
