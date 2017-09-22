/*
	project name:Pager(分页器)
	parameter: 	el 				=> dom元素的class或者id(必填)
				count 			=> 分页数据总数(必填)
				pageNumbers		=> 每一页的数据数量(默认10)
				showQuikly		=> 是否添加首页和尾页
				limitPageNumber	=> 超过多少出现省略号(默认10)
				fisrtAuto		=> 是否请求第一页数据(默认为false)
	
	类名命名空间pager:
		所有按钮均有pager-span类名
		首页：		pager-btn_first
		最后一页：	pager-btn_last
		上一页：	pager-btn_prev
		下一页：	pager-btn_next
		数字按钮：	pager-btn
		当前页数：	pager-active
		省略号:		pager-elipsis

	dom选择器使用document.querySelector()
	事件添加使用addEventListener()
	按钮以span包裹，激活元素添加active类名
	实力化的evon方法传入一个回调函数，用以分页页数改变的调用函数，函数传入当前页数

	eg: var pagerObj = new Pager({el:'#box',count:100})
			pagerObj.evon(function(num){
				console.log(num);
			})
			pagerObj.refresh(options);重置分页器	
*/
function Pager(opt){
	this.firstAuto = false;
	this.init(opt);
}
Pager.prototype.init = function(opt){
	for(var i in opt){
		this[i] = opt[i]
	};
	// el和count为必填项
	if(!this.el) return;
	if(!this.count && this.count !== 0) return;
	this.count = this.count === 0 ? 1 : this.count;
	this.pageNumbers = this.pageNumbers || 10;
	this.limitPageNumber = this.limitPageNumber || 10;
	this.domArr = [];
	this.notPrev = true;
	this.notNext = false;
	this.oldEl = {};
	this.newEl = false;
	this.countFirstPosition = 1;


	if(this.computeBtnNumber() <= 1){
		this.notNext = true;
	}
	if(typeof this.el === 'string'){
		this.el = document.querySelector(this.el)
	}else if(!this.el.nodeType){
		// 如果this.el没有nodeType属性，则不是原生dom对象，判断是否为jquery对象
		if(this.el[0] && this.el[0].nodeType){
			this.el = this.el[0];
		}
	}
	// this.el.innerHTML = this.createBtn();
	this.createBtn();
	this.addEvent();
}
// 计算按钮数量
Pager.prototype.computeBtnNumber = function(){
	var btnNumber = 0;
	btnNumber = Math.ceil(parseInt(this.count)/parseInt(this.pageNumbers));
	return btnNumber
}
// 创建按钮
Pager.prototype.createBtn = function(){
	var domStr = '',
		btnNumber = this.computeBtnNumber(),
		i = 0;
	for(;i<btnNumber;i++){
		this.domArr[this.domArr.length] = this.createEl('span','pager-btn pager-span',(i+1));
		this.oldEl = this.domArr[0];
		// 默认初始第一页为激活状态
		if(i === 0){
			this.domArr[0] = this.createEl('span','pager-btn pager-span pager-active',(i+1))
		}
	}
	// 默认添加上一页和下一页
	this.domArr.unshift(this.createEl('span','pager-span pager-btn_prev','上一页'))
	this.domArr[this.domArr.length] = this.createEl('span','pager-span pager-btn_next','下一页');
	// 如果打开showQuikly则添加首页和最后一页
	if(this.showQuikly){
		// 数字元素坐标后移
		this.countFirstPosition ++;
		this.domArr.unshift(this.createEl('span','pager-btn_first pager-span','首页'))
		this.domArr[this.domArr.length] = this.createEl('span','pager-span pager-btn_last','最后一页');
	}
	this.appendChild();
}
Pager.prototype.appendChild = function(){
	if(parseInt(this.limitPageNumber) > this.computeBtnNumber()){
		// 清空容器
		this.clearEl(this.el);
		for(var i = 0;i<this.domArr.length;i++){
			this.el.appendChild(this.domArr[i]);
		}
		return false;
	}
	var arr = [];
	var num = parseInt(this.oldEl.innerHTML) - 1;
	for(var i = num;i >= 0 && i >= (num - 2);i--){
		arr.unshift(this.domArr[(i + this.countFirstPosition)]);
	}
	for(var j = num+1;j<=num+2 && j < this.computeBtnNumber();j++){
		arr[arr.length] = this.domArr[(j + this.countFirstPosition)]
	}
	var elipsis = this.createEl('span','pager-elipsis pager-span','...');
	var elipsisn = this.createEl('span','pager-elipsis pager-span','...');
	if(num > 2){
		arr.unshift(elipsis);
		arr.unshift(this.domArr[(this.countFirstPosition)])
	}
	if(this.computeBtnNumber() - num > 3){
		arr[arr.length] = elipsisn;
		arr[arr.length] = this.domArr[(this.computeBtnNumber() - 1 + this.countFirstPosition)]
	}
	if(this.showQuikly){
		arr.unshift(this.domArr[1])
		arr.unshift(this.domArr[0])
		arr[arr.length] = this.domArr[this.domArr.length - 2]
		arr[arr.length] = this.domArr[this.domArr.length - 1]
	}else{
		arr.unshift(this.domArr[0])
		arr[arr.length] = this.domArr[this.domArr.length - 1]
	}
	// 清空容器
	this.clearEl(this.el);
	for(var i = 0;i<arr.length;i++){
		this.el.appendChild(arr[i]);
	}
	
}
// 处理上一元素以及当前激活元素信息,添加删除类名
Pager.prototype.dealEl = function(){
	// 解决直接点击上一页导致问题
	if(!this.newEl) return;
	// 解决最后一页时点击下一页导致重复执行事件分发
	if(this.newEl === this.oldEl) return;
	this.removeClass(this.oldEl,'pager-active');
	this.addClass(this.newEl,'pager-active');
	this.judgeNextAndPrev(this.newEl);
	this.dispatch(this.newEl)
	this.oldEl = this.newEl;
	this.appendChild();
}
// 创建dom元素节点，元素名称el，元素类名cn，元素内容msg
Pager.prototype.createEl = function(el,cn,msg){
	var dom = document.createElement(el);
	dom.className = cn;
	dom.innerHTML = msg;
	return dom;
}
Pager.prototype.clearEl = function(el){
	var childs = el.childNodes,
		l = childs.length,
		i = 0;
	for(i = l - 1;i >= 0;i--){
		el.removeChild(childs[i]);
	}
}
// 添加事件
Pager.prototype.addEvent = function(){
	var that = this;
	this.el.onclick = function(e){
		e = e || window.event;
		var target = e.target || e.srcElement;
		// 点击数字页数事，当前源就是新激活的dom元素
		if(that.isTargetNmuberBtn(target,'pager-btn')){
			that.newEl = target;
		}
		// 点击首页，dom数组中的第一个数字页作为新激活的元素
		if(that.isTargetNmuberBtn(target,'pager-btn_first')){
			that.newEl = that.domArr[that.countFirstPosition]
		}
		if(that.isTargetNmuberBtn(target,'pager-btn_last')){
			that.newEl = that.domArr[that.countFirstPosition - 1 + parseInt(that.computeBtnNumber())]
		}
		if(that.isTargetNmuberBtn(target,'pager-btn_prev') && !that.notPrev){
			var num = parseInt(that.oldEl.innerHTML) - 2 + that.countFirstPosition;
			that.newEl = that.domArr[num];
		}
		if(that.isTargetNmuberBtn(target,'pager-btn_next') && !that.notNext){
			var num = parseInt(that.oldEl.innerHTML) + that.countFirstPosition;
			that.newEl = that.domArr[num];
		}
		that.dealEl();
	};
}
// 判断跳转到当前节点之后能上一页和下一页能否点击
Pager.prototype.judgeNextAndPrev = function(node){
	var num = parseInt(node.innerHTML);
	if(this.computeBtnNumber() === 1){
		this.notPrev = true;
		this.notNext = true;
		return false;
	}
	if(num <= 1){
		this.notPrev = true;
		this.notNext = false;
		return false;
	}
	if(num >= this.computeBtnNumber()){
		this.notNext = true;
		this.notPrev = false;
		return false;
	}
	this.notNext = false;
	this.notPrev = false;
}
// 判断node元素是否有类名cn
Pager.prototype.isTargetNmuberBtn = function(node,cn){
	var className = node.className,
		arr = [],
		i = 0;
	if(node.nodeName.toLowerCase() !== 'span'){
		return false
	}
	arr = className.split(' ');
	for(;i<arr.length;i++){
		if(arr[i] === cn){
			return true;
		}
	}
	return false
}
Pager.prototype.removeClass = function(node,cn){
	if(!node) return;
	var arr = node.className.split(' '),
		newArr = [],
		i = 0;
	for(;i<arr.length;i++){
		if(arr[i] !== cn){
			newArr[newArr.length] = arr[i];
		}
	}
	node.className = newArr.join(' ');
	return newArr.join(' ');
}
Pager.prototype.addClass = function(node,cn){
	node.className = node.className + ' ' + cn;
}
// 事件分发
Pager.prototype.dispatch = function(node){
	if(!this.dispatchFun) return;
	this.dispatchFun(parseInt(node.innerHTML));
}
// 添加事件回调
Pager.prototype.evon = function(func){
	if(!func || typeof func !== 'function') return;
	this.dispatchFun = func;
	if(this.fisrtAuto){
		this.dispatchFun(1);
	}
}
Pager.prototype.refresh = function(opt){
	this.init(opt);
}