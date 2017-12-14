const server = require('socket.io')
const nickName = {}
const nameUsed = []
let nameNum = 1
class Chat {
	constructor(httpServer, options) {
		this.init(httpServer, options)
	}
	init (httpServer, options) {
		let io = server(httpServer, options)
		io.on('connection', this.connect.bind(this))
	}
	connect (socket) {
		const name = this.assetNickName(socket)
		socket.emit('message', {
			type: 'name',
			body: name
		})
		this.joinRoom(socket, 'Total')
		socket.on('message', (data) => {
			console.log(data)
			if (data.type === 'message') {
				socket.broadcast.to(data.room).emit('message', {
					type: 'message',
					body: data.body,
					name: name
				})
			}
			//this[data.type](socket, data.message)	
		})
	}
	assetNickName (socket) {
		let name = 'D' + nameNum
		nameNum ++;
		nickName[socket.id] = name
		return name
	}
	joinRoom (socket, roomName) {
		socket.join(roomName, () => {
			socket.broadcast.to(roomName).emit('message',{
				type: 'broadcast',
				body: nickName[socket.id] + '加入聊天室' + roomName
			})
		})
	}
}
module.exports = Chat





