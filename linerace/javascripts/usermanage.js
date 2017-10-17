var CONFIG = {
	pageNumber: 10
}

var pagerObj = null
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
	$('.update_not').on('click',function (){
		$('.update_alt').hide();
		$('.user_container').show();
	})
	$('.user_table_box').on('click','.update_btn',function (){
		$('.update_alt').show();
		$('.user_container').hide();
	})

	$('.user_new_btn').on('click',function (){
		$('.update_alt').show();
		$('.user_container').hide();
	})

	// 点击查询按钮
	$('.user_select_btn').on('mousedown', function() {
		$(this).addClass('active')
	})
	$('.user_select_btn').on('mouseup', function() {
		$(this).removeClass('active')
	})
	$('.user_select_btn').on('click', function() {
		var search_word = $('.user_select_input').val()
		if(search_word === '') return false;
		HTTP.GETPOLICE(
			dealPolice, 
			alert_window,
			{
				"KEY_WORD": search_word,
				"ROWS": CONFIG.pageNumber,
				"PAGE_INDEX": "1"
			}
		)
		HTTP.GETCOUNTPOLICE(
			dealPager,
			alert_window, 
			{
				"KEY_WORD": search_word,
				"ROWS": CONFIG.pageNumber,
				"PAGE_INDEX": "1"
			}
		)
	})

	// 获取组织结构
	HTTP.GETUNIT(
		dealUnit,
		alert_window,
		{
			"UNIT_ID":"-1",
			"ALL_SUBUNIT":"1"
		}
	);
	

	
})

// 组织结构处理
function dealUnit(data) {
	new navTree({
		el:'.user_or_tree',
		obj:data
	}).enov(function(value) {
		HTTP.GETPOLICE(
			dealPolice, 
			alert_window,
			{
				"UNIT_ID": value,
				"ROWS": CONFIG.pageNumber,
				"PAGE_INDEX": "1"
			}
		)
		HTTP.GETCOUNTPOLICE(
			dealPager,
			alert_window, 
			{
				"UNIT_ID": value,
				"ROWS": CONFIG.pageNumber,
				"PAGE_INDEX": "1"
			}
		)
	})
}
// 警员列表处理
function dealPolice(data) {
	renderPoliceList(data)
}
function dealPager(total) {
	if(pagerObj){
		pagerObj.refresh({el:'.user_pg_btn',count:total})
		return;
	}
	console.log(total)
	pagerObj = new Pager({el:'.user_pg_btn',count:total})

	pagerObj.evon(function(num){
		console.log(num);
	})
}
function renderPoliceList(data) {
	var htmlStr = '<li class="user_table_header c">'
					+'<div>序号</div>'
					+'<div>姓名</div>'
					+'<div>职称</div>'
					+'<div>创建者名称</div>'
					+'<div>创建时间</div>'
					+'<div>单位</div>'
					+'<div>密码</div>'
					+'<div>操作</div>'
				+'</li>',
		i = 0;
	for(; i < data.length; i++){
		htmlStr += '<li class="c">'
					+'<div>1</div>'
					+'<div>'+ data[i].POLICE_NAME +'</div>'
					+'<div>'+ (data[i].POLICE_POST || '') +'</div>'
					+'<div>admin</div>'
					+'<div>2015-06-11 22：27：05</div>'
					+'<div>大类</div>'
					+'<div>'+ data[i].PWS +'</div>'
					+'<div>'
						+'<a href="javascript:void(0);" class="del_btn">删除</a>'
						+'<a href="javascript:void(0);" class="update_btn">编辑</a>'
					+'</div>'
				+'</li>'
	}
	$('.user_table_box').html(htmlStr)
	dealLiHeight();
}
function dealLiHeight() {
	if(!$('.user_table_box li')[1]){
		return false
	}
	var h = $('.user_table_box li')[1].offsetHeight
	$('.user_table_box li').not('.user_table_header').css('height',h + "px")
}

function alert_window(msg){
	console.log(msg)
}