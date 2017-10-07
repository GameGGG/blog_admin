$(function(){
	// ======================= 导航设置【BEGIN】 =======================
	// **
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
	// **
	// ======================= 导航设置【END】 =======================

	
	// 编辑信息页的弹出关闭
	$('.update_not').on('click',function(){
		$('.update_alt').hide();
		$('.user_container').show();
	})
	$('.user_table_box').on('click','.update_btn',function(){
		$('.update_alt').show();
		$('.user_container').hide();
	})

	$('.user_new_btn').on('click',function (){
		$('.update_alt').show();
		$('.user_container').hide();
	})

	// 获取组织结构
	HTTP.GETUNIT(
		dealUnit,
		alert_window,
		{
			"PoliceNo":"100004021001",
			"TOKEN":"49e0877ad05d444ac2d6730931d3e28f",
			"UNIT_ID":"100004000000"
		}
	);
	pagerObj = new Pager({el:'.user_pg_btn',count:100})
	pagerObj.evon(function(num){
		console.log(num);
	})

	
})

// 组织结构处理
function dealUnit(data) {
	console.log(data)
	new navTree({
		el:'.user_or_tree',
		obj:data
	})
}


function alert_window(msg){
	console.log(msg)
}