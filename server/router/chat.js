const server = require('socket.io')

class Chat {
	constructor(httpServer, options) {
		this.init(httpServer, options)
	}
	init (httpServer, options) {
		let io = server(httpServer, options)
		io.on('connection', this.connect.bind(this))
	}
	connect (socket) {
		console.log('socket connection is success')
	}
}

module.exports = Chat





