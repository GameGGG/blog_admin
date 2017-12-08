const MongoClient = require('mongodb').MongoClient

exports.platform = function (callback) {
	MongoClient.connect('mongodb://localhost:27017/platform', function (err, database) {
		if ( err ) {
			console.log(err)
		}
		console.log('mongodb connection platform database success')
		callback(database, function () {
			database.close()
		})
	})
}
