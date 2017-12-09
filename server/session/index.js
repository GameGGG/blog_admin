const SESSIONIDS = []
const SESSIONS = {}
let outTime = 30
function generatorSessionId () {
	let sessionid = Math.random().toString()
	while (SESSIONIDS.indexOf(sessionid) !== -1) {
		sessionid = Math.random().toString()
	}
	return sessionid
}
function judgeTime (t, outtime) {
	const time = new Date().getTime()
	if (time > t + outtime * 60 * 1000) {
		return true
	}	
	return false
}
function clear (username) {
	let sessionid = SESSIONS[username].session
	if (sessionid) {
		delete SESSIONS[username]
		return true
	}
	return false
}

exports.set = function (username) {
	const user_session = generatorSessionId()
	const t = new Date().getTime()
	SESSIONS[username] = {
		session: user_session,
		time: t 
	}
	return user_session
}
exports.get = function (username) {
	let session = ''
	if (SESSIONS[username] && SESSIONS[username].session) {
		session = SESSIONS[username].session
	}
	return session
}
exports.time = function (time) {
	outTime = time
}
exports.clear = clear

setInterval(() => {
	for (let i in SESSIONS) {
		if (judgeTime(SESSIONS[i].time, outTime)) {
			// 清除session
			clearSession(i)
		}
	}
}, 60000)

