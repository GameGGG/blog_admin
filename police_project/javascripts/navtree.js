function navTree (options){
	if(!options.el) {
		throw('no ‘el’ argument')
	}
	this.el = options.el;
	this.obj = options.obj;
	this.default = 'nav_tree';
	this.classArr = [];
	this.activePArr = [];
	this.showDom = [];
	this.nowCloseDom = null;
	this.openOnlyone = true;
	this.activeNode = 'nav_tree-active'
	this.activePClass = 'nav_tree-p-active'
	this.title = "name"
	this.children = "children"
	this.init();
}
navTree.prototype.init = function(){
	var domObj = this.renderDom(this.obj);
	this.addEvent(domObj);
}
navTree.prototype.renderDom = function(obj){
	var domStr = this.createTagetStr(obj,'nav_tree'),
		domObj = this.getDom(this.el);
	domObj.innerHTML = domStr;
	return domObj;
}
navTree.prototype.createTagetStr = function(obj,n){
	var str = '<ul class="'+ (n) +'" ' 
			+ ( n === this.default ? ">" 
								   : "style=\"display:none;\">");
	this.classArr.push(n);
	for(var i = 0;i < obj.length;i++){
		if(obj[i].children){
			str += '<li class="'+ (n + '-' + i) +' nav_tree-title"><p>'+ obj[i][this.title] +'</p>'
			str += this.createTagetStr(obj[i][this.children],n+'-'+i)
		}else{
			str += '<li class="'+ (n + '-' + i) +'"><p>'+ obj[i][this.title] +'</p>'
		}

		str += '</li>'
	}
	str += '</ul>'
	return str;
}
navTree.prototype.addEvent = function(dom){
	var that = this;
	dom.addEventListener('click',function(e){
		var targetDom = e.target,
			hasPChild = that.hasPTarget(targetDom);
		if(hasPChild){
			if(that.activePArr[0]){
				that.removeClass(that.activePArr[0],that.activePClass);
			}
			if(!targetDom.nextSibling){
				
				that.activePArr[0] = targetDom
				that.addClass(targetDom,that.activePClass)
				that.dealDate(targetDom);
				return
			}
			targetDom.nextSibling.style.display = 'block'
			that.addClass(targetDom.parentNode,that.activeNode)
			that.dealDate(hasPChild)
			that.pushDom(targetDom.nextSibling)
		}
	})
}
navTree.prototype.hasPTarget = function(dom){
	var name = dom.nodeName.toLowerCase()
	if(name === 'p'){
		return dom
	}
	if(name === 'ul'){
		return false
	}
	return this.hasPTarget(dom.parentNode)
}
navTree.prototype.pushDom = function(dom){
	if(this.showDom.indexOf(dom) >= 0) return; 
	if(dom === this.nowCloseDom){
		this.nowCloseDom = null;
		return;
	}
	this.showDom.push(dom);
	
}
navTree.prototype.getDom = function(el){
	return document.querySelector(el);
}
navTree.prototype.dealDate = function(dom){
	var className = dom.parentNode.className,
		arr = className.split(' '),
		result = '';
	if(className){
		this.closeTarget(className);
		if(arr.indexOf(this.activeNode) > -1){
			arr.splice(arr.indexOf(this.activeNode),1);
		}
		result = arr[0].replace('nav_tree-','');
		this.dispatch(result)
	}
}
navTree.prototype.closeTarget = function(str){
	var i = 0,
		name = '';
	for(; i < this.showDom.length; i++) {
		name = this.showDom[i].className
		if(!this.judgeIsChild(str,name) && this.openOnlyone){
			this.showDom[i].style.display = 'none';
			this.removeClass(this.showDom[i].parentNode,this.activeNode)
			this.showDom.splice(i,1);
			break;
		}
		if(this.hasClass(str,name)){
			this.nowCloseDom = this.showDom[i];
			this.showDom[i].style.display = 'none';
			this.removeClass(this.showDom[i].parentNode,this.activeNode)
			this.showDom.splice(i,1);
		}
	}
}
navTree.prototype.judgeIsChild = function(str,name){
	var arr = name.split(' '),
		l = arr.length,
		i = 0;
	for(; i<l; i++){
		if(str.indexOf(arr[i]) > -1){
			return true
		}
	}
	return false;
}
navTree.prototype.dispatch = function(val){
	console.log(val);
}
navTree.prototype.hasClass = function(str,name){
	var className = str,
		arr = [];
	if(className){
		arr = className.split(' ');
		if(arr.indexOf(name) > -1){
			return true;
		}
	}
	return false;
}
navTree.prototype.removeClass = function(dom,name){
	var className = dom.className,
		arr = [];
	if(className){
		arr = className.split(' ');
		if(arr.indexOf(name) > -1){
			arr.splice(arr.indexOf(name),1)
		}
		dom.className = arr.join(' ');
	}
}
navTree.prototype.addClass = function(dom,name){
	if(!this.hasClass(dom.className,name)){
		dom.className += ' ' + name
	}
}
		