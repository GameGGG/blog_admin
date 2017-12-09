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
function clearSession (username) {
	let sessionid = SESSIONS[username].session
	delete SESSIONS[username]
}

exports.setSession = function (username) {
	const user_session = generatorSessionId()
	const t = new Date().getTime()
	SESSIONS[username] = {
		session: user_session,
		time: t 
	}
	return user_session
}
exports.getSession = function (username) {
	let session = ''
	if (SESSIONS[username] && SESSIONS[username].session) {
		session = SESSIONS[username].session
	}
	return session
}
exports.time = function (time) {
	outTime = time
}
exports.clearSession = clearSession

setInterval(() => {
	for (let i in SESSIONS) {
		if (judgeTime(SESSIONS[i].time, outTime)) {
			// 清除session
			clearSession(i)
		}
	}
}, 60000)

