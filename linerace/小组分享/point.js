// auther: GANLEI
// url:type(string) 默认值为：// ;**必填**项设置发送数据的地址
// isPageValue:type(boolean) 默认值为：false ;是否实例化就发送页面信息
// pageValue:type(string) 默认值为：null;isPageValue为true时必传
// attrName:type(string) 默认值为：regid ;打点属性名设置
// eventType:type(string) 默认值为：click ;设置什么事件发送统计数据

// 使用： Dpoint(options)

;(function(win,doc){
	function Dpoint(){
		// 设置默认值
		var defaul = {
			url:'//',
			isPageValue:false,
			attrName:'regid',
			eventType:'click'
		};
		var i = null;
		for(i in defaul){
			this[i] = defaul[i];
		}
	}
	Dpoint.prototype.init = function(opts){
		var i = null,
			str = '';
		for(i in opts){
			this[i] = opts[i];
		}
		this.addEvent();
		if(this.isPageValue && this.pageValue){
			str = this.pageValue;
			this.sendMsg(str);
		}
	};
	Dpoint.prototype.addEvent = function(){
		var B = doc.getElementsByTagName('body')[0],
			that = this;
		if (B.attachEvent) {
			B.attachEvent("on" + this.eventType, function(e){
				e = e || window.event;
				that.dealEvent(e);
			});
		} else {
			B.addEventListener(this.eventType, function(e){
				e = e || window.event;
				that.dealEvent(e);
			}, false);
		}
	};
	Dpoint.prototype.dealEvent = function(e){
		var node =  e.target || e.srcElement,
			val = this.recurSelect(node);
		if(val){
			this.sendMsg(val);
		}
	};
	Dpoint.prototype.recurSelect = function(dom){
		var flag = '',
			tagName = dom.tagName.toLowerCase(),
			nDom = dom;
		while(tagName !== 'body'){
			flag = this.hasAttribute(nDom,this.attrName);
			if(flag){
				return nDom.getAttribute(this.attrName);
			}
			nDom = nDom.parentNode;
			tagName = nDom.tagName.toLowerCase();
		}
		return flag;
	};
	Dpoint.prototype.hasAttribute = function(ele, attribute){
		return ele.getAttribute(attribute) != null;
	};
	Dpoint.prototype.sendMsg = function(data){
		var arr = data.split(','),
			cpImg = new Image();
		cpImg.src = this.url 
					+ "?id=" + (arr[0] || this.ID || '') 
					+ '&type=' + arr[1] 
					+ '&remarks0=' + (arr[2] !== '0'?arr[2]:'') 
					+ '&remarks1=' + (arr[3] !== '0'?arr[3]:'') 
					+ '&remarks2=' + (arr[4] !== '0'?arr[4]:'') 
					+ '&rendom=' + Math.random();
	};
	if(win && !win.Dpoint){
		win.Dpoint = function(options){
			new Dpoint().init(options);
		};
	}
}(window,document));

