;(function(win,doc){
	var CONFIG = {
		mode:'prod'
	}
	if(win.Log){
		console.error('Log变量已存在')
		return
	}
	function Log(options){
		this.filterModule = null;
		this.filterLevel = null;
		for(var i in options){
			this[i] = options[i]
		}
		this.stackArr = [];
	}
	Log.prototype.conLog = function(module_name,level,msg){
		if(!this.filter(module_name,level,msg)) return;
		switch(level){
			case 0:console.log(module_name,msg);break;
			case 1:console.warn(module_name,msg);break;
			case 2:console.error(module_name,msg);break;
		}
	}
	Log.prototype.filter = function(module_name,level,msg){
		if(this.mode !== 'dev'){
			this.putStack(module_name,level,msg)
			return false;
		}
		if(this.filterModule && (typeof this.filterModule).toLowerCase() === 'string' && this.filterModule !== module_name){
			return false;
		}
		if(!this.judgeFilterLevel(level)){
			return false;
		}
		return true;
	}
	Log.prototype.judgeFilterLevel = function(level){
		var level_n = null;
		if(!this.filterLevel){
			return true;
		}
		if((typeof this.filterLevel).toLowerCase() === "string"){
			level_n = this.levelChange(this.filterLevel);
			if(level === level_n){
				return true
			}
		}
		return false
	}
	Log.prototype.levelChange = function(str){
		var result = null;
		switch(str){
			case 'log':result = 0;break;
			case 'warn':result = 1;break;
			case 'error':result = 2;break;
		}
		return result;
	}
	Log.prototype.putStack = function(module_name,level,msg){
		this.stackArr.push([module_name,level,msg]);
	}
	Log.prototype.log = function(module_name,msg){
		if(arguments.length === 0){
			return false;
		}
		if(arguments.length < 2){
			msg = module_name;
			module_name = 'All'
		}
		this.conLog(module_name,0,msg);
	}
	Log.prototype.warn = function(module_name,msg){
		if(arguments.length === 0){
			return false;
		}
		if(arguments.length < 2){
			msg = module_name;
			module_name = 'All'
		}
		this.conLog(module_name,1,msg);
	}
	Log.prototype.err = function(module_name,msg){
		if(arguments.length === 0){
			return false;
		}
		if(arguments.length < 2){
			msg = module_name;
			module_name = 'All'
		}
		this.conLog(module_name,2,msg);
	}
	Log.prototype.errorHandler = function(msg){
		this.conLog('',2,msg)
	}
	Log.prototype.config = function(module_name){
		var that = this;
		function jojojo(msg){
			jojojo.log(msg);
		}
		jojojo.log = function(msg){
			that.conLog(module_name,0,msg);
		}
		jojojo.warn = function(msg){
			that.conLog(module_name,1,msg);
		}
		jojojo.err = function(msg){
			that.conLog(module_name,2,msg);
		}
		return jojojo
	}
	Log.prototype.onlineDeBugger = function(config){
		this.filterModule = null;
		this.filterLevel = null;
		if(config){
			this.filterModule = config.module;
			this.filterLevel = config.level;
		}
		this.mode = 'dev';
		for(var i = 0;i < this.stackArr.length;i++){
			this.conLog(this.stackArr[i][0],this.stackArr[i][1],this.stackArr[i][2])
		}
	}
	var log = new Log();
	if (typeof module != "undefined" && module.exports){
		module.exports = log
	} else if (typeof define == 'function' && defined.amd){
		define(function(){
			return log
		})
	} else {
		win.Log = log
	}
})(window,document)