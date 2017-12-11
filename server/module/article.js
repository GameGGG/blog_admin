const database = require('./database.js')

exports.get = function (options, callback) {
	database.blog(function (db, close) {
		console.log(options)
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
