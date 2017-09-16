function navTree (options){
			if(!options.el) {
				throw('no ‘el’ argument')
			}
			this.el = options.el;
			this.obj = options.obj;
			this.default = 'nav_tree';
			this.classArr = [];
			this.showDom = [];
			this.nowCloseDom = null;
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
			var str = '<ul class="'+ (n) +'" ' + (n === this.default ? ">" : "style=\"display:none;\">");
			this.classArr.push(n);
			for(var i = 0;i < obj.length;i++){
				str += '<li class="'+ (n + '-' + i) +'"><p>'+ obj[i].name +'</p>'
				if(obj[i].children){
					str += this.createTagetStr(obj[i].children,n+'-'+i)
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
					if(!targetDom.nextSibling) return
					targetDom.nextSibling.style.display = 'block'
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
			var className = dom.parentNode.className;
			if(className){
				this.closeTarget(className);
				this.dispatch(className)
			}
		}
		navTree.prototype.closeTarget = function(str){
			var i = 0,
				name = '';
			for(; i < this.showDom.length; i++) {
				name = this.showDom[i].className
				if(str.indexOf(name) === -1){
					this.showDom[i].style.display = 'none';
					this.showDom.splice(i,1);
					break;
				}
				if(str === name){
					this.nowCloseDom = this.showDom[i];
					this.showDom[i].style.display = 'none';
					this.showDom.splice(i,1);
				}
			}
		}
		navTree.prototype.dispatch = function(val){
			console.log(val);
		}
		new navTree({
			el:'#box',
			obj:[
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
		})