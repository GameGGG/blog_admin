var arr = new Array(10000);
var forF = 0,forS = 0,forInF = 0,forInS = 0;
for(var i = 0;i<arr.length;i++){
	if(i == 0){
		console.log(new Date().getTime())
		forF = new Date().getTime();
	}
	forS = new Date().getTime();
}
console.log(forS - forF);

for(var j in arr){
	if(j == 0){
		forInF = new Date().getTime();
	}
	forInS = new Date().getTime();
}
console.log(forInS - forInF);

