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
	SESSIONS.delete(username)
}

exports.setSession = function (username) {
	const user_session = generatorSessionId()
	const t = new Date().getTime()
	SESSIONS[username] = {
		session: user_session,
		time: t 
	}
}
exports.getSession = function (username) {
	let session = ''
	if (SESSIONS[username] && SESSIONS[username].session) {
		session = SESSIONS[username].session
	}
	return session
}
exports.clearSession = clearSession

setTimeout(() => {
	for (let i in SESSIONS) {
		if (judgeTime(SESSIONS[i].time, outTime)) {
			// 清除session
			clearSession(username)
		}
	}
}, 60000)

