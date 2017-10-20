var DOMAIN = 'http://124.205.60.109:7223/zhengzhou'
var API = {
	SELECT_OR_TREE:DOMAIN + '/Service/GetUnit',					// 查询组织结构
	ADD_OR_TREE:DOMAIN + '/AddUnit',							// 增加组织结构
	DELECT_OR_TREE:DOMAIN +　'/DelUnit',							// 删除组织结构
	UPDATE_OR_TREE:DOMAIN + '/UpdateUnit',						// 修改组织结构 
	SELECT_POLICE_MSG:DOMAIN + '/Service/police',				// 查询警力信息
	ADD_POLICE_MSG:DOMAIN + '/AddPollice',						// 添加警力信息
	DELECT_POLICE_MSG:DOMAIN + '/DelPolice',					// 删除警力信息
	UPDATE_POLICE_MSG:DOMAIN + '/UpdatePollice',				// 修改警力信息
	COUNT_POLECE:DOMAIN + '/Service/CountPolice',				// 获取警力条数
	SELECT_COM_INFO:DOMAIN + '/Service/GetDev',					// 查询通信信息
	ADD_COM_INFO:DOMAIN +　'/AddDev',							// 添加通信信息
	DELECT_COM_INFO:DOMAIN +　'/DelDev',							// 删除通信信息
	UPDATE_COM_INFO:DOMAIN + '/UpdateDev',						// 修改通信信息
	COUNT_DEV:DOMAIN + '/Service/CountDev'						// 获取设备条数

}

var HTTP = {
	net_error:function() {
		if(this.timer){
			clearInterval(this.timer);
		}
		this.timer = setTimeout(function(){
			alert('网络连接失败。')
		},1000)
	},
	GETUNIT:function(s_func,e_func,options){
		$.ajax({
			url:API.SELECT_OR_TREE,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(beforeDealUnit(data.unitList),data.unitList)
					console.log()
					return;
				}
				e_func(data.message);
			},
			error:function(err) {
				console.log(err)
				// this.net_error()
			}
		})
	},
	GETPOLICE:function(s_func, e_func, options) {
		$.ajax({
			url:API.SELECT_POLICE_MSG,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(data.policeList)
					return;
				}
				e_func(data.message);
			},
			error:function() {
				// this.net_error()
			}
		})
	},
	DELECTPOLICE: function (s_func, e_func, options) {
		$.ajax({
			url:API.DELECT_POLICE_MSG,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(data.Msg)
					return;
				}
				e_func(data.message);
			},
			error:function() {
				// this.net_error()
			}
		})
	},
	UPDATEPOLICE: function (s_func, e_func, options) {
		$.ajax({
			url:API.UPDATE_POLICE_MSG,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(data.Msg)
					return;
				}
				e_func(data.message);
			},
			error:function() {
				// this.net_error()
			}
		})
	},
	ADDPOLICE: function (s_func, e_func, options) {
		$.ajax({
			url:API.UPDATE_POLICE_MSG,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(data.Msg)
					return;
				}
				e_func(data.message);
			},
			error:function() {
				// this.net_error()
			}
		})
	},
	GETDEV:function(s_func, e_func, options) {
		$.ajax({
			url:API.SELECT_COM_INFO,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(data.devList)
					return;
				}
				e_func(data.message);
			},
			error:function() {
				// this.net_error()
			}
		})
	},
	GETCOUNTPOLICE:function(s_func, e_func, options) {
		$.ajax({
			url:API.COUNT_POLECE,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(data.NCOUNT)
					return;
				}
				e_func(data.message);
			},
			error:function() {
				// this.net_error()
			}
		})
	},
	GETCOUNTDEV:function(s_func, e_func, options) {
		$.ajax({
			url:API.COUNT_DEV,
			type:'POST',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(data.NCOUNT)
					return;
				}
				e_func(data.message);
			},
			error:function() {
				// this.net_error()
			}
		})
	}
}
function beforeDealUnit(data) {
	var obj = {},
		result;
	for(var i = 0; i < data.length; i++){
		if(obj[data[i].PARENT_ID]){
			obj[data[i].PARENT_ID].push(data[i])
		} else {
			obj[data[i].PARENT_ID] = [data[i]]
		}
	}
	result = unitTree('-1', obj)
	return result;
}
function unitTree(parent_id, obj) {
	var result = [];
	if(!obj[parent_id]) return null;
	for(var i = 0; i < obj[parent_id].length; i++) {
		obj[parent_id][i].keys = obj[parent_id][i].UNIT_ID
		obj[parent_id][i].name = obj[parent_id][i].UNIT_NAME
		obj[parent_id][i].children = unitTree(obj[parent_id][i].UNIT_ID, obj)
		result.push(obj[parent_id][i])
	}
	return result
}