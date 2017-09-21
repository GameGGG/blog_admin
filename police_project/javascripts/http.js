var DOMAIN = '//124.205.60.109:7223/zhengzhou'
var API = {
	SELECT_OR_TREE:DOMAIN + '/Service/GetUnit',					// 查询组织结构
	ADD_OR_TREE:DOMAIN + '/AddUnit',							// 增加组织结构
	DELECT_OR_TREE:DOMAIN +　'/DelUnit',							// 删除组织结构
	UPDATE_OR_TREE:DOMAIN + '/UpdateUnit',						// 修改组织结构 
	SELECT_POLICE_MSG:DOMAIN + '/Service/police',				// 查询警力信息
	ADD_POLICE_MSG:DOMAIN + '/AddPollice',						// 添加警力信息
	DELECT_POLICE_MSG:DOMAIN + '/DelPollice',					// 删除警力信息
	UPDATE_POLICE_MSG:DOMAIN + '/UpdatePollice',				// 修改警力信息
	SELECT_COM_INFO:DOMAIN + '/Service/GetDev',					// 查询通信信息
	ADD_COM_INFO:DOMAIN +　'/AddDev',							// 添加通信信息
	DELECT_COM_INFO:DOMAIN +　'/DelDev',							// 删除通信信息
	UPDATE_COM_INFO:DOMAIN + '/UpdateDev'						// 修改通信信息

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
			url:'http://124.205.60.109:7223/zhengzhou/Service/GetUnit',
			type:'post',
			data:options,
			success:function(data) {
				if(data.result === 1){
					s_func(MOCK);
					return;
				}
				e_func(data.message);
			},
			error:function() {
				this.net_error()
			}
		})
	}
}


var MOCK = [
	{
		name:'郑州市公安局',
		children:[
			{
				name:'东城分局',
				children:[
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					}
				]
			},
			{
				name:'月牙河分局',
				children:[
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					},
					{
						name:'街道派出所'
					},
					{
						name:'河东区派出所'
					}
				]
			}
		]
	}
]