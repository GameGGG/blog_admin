$(function(){
	$('nav ul li').on('mouseover',function(){
		$(this).addClass('hover');
		if($(this).hasClass('authority')){
			$(this).find('ul').css({
				display:'block'
			})
		}
	})
	$('nav ul li').on('mouseout',function(){
		$(this).removeClass('hover');
		if($(this).hasClass('authority')){
			$(this).find('ul').css({
				display:'none'
			})
		}
	})
	$('.authority_hover li').on('mouseover',function(){
		$(this).addClass('hover');
	})
	$('.authority_hover li').on('mouseout',function(){
		$(this).removeClass('hover');
	})
	$.ajax({
		url:'http://124.205.60.109:7223/zhengzhou/Service/Police',
		type:'post',
		data:{
			"PoliceNo":"100004021001",
			"TOKEN":"49e0877ad05d444ac2d6730931d3e28f",
			"UNIT_ID":"100004000000"
		},
		success:function(data){
			console.log(data);
		}
	})

	pagerObj = new Pager({el:'.user_pg_btn',count:100})
	pagerObj.evon(function(num){
		console.log(num);
	})
})