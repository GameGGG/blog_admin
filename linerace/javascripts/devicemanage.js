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
	// 点击搜索按钮
	$('.user_select_btn').on('mousedown', function() {
		$(this).addClass('active')
	})
	$('.user_select_btn').on('mouseup', function() {
		$(this).removeClass('active')
	})
	$('.user_select_btn').on('click', function() {
		var search_word = $('.user_select_input').val()
		if(search_word === '') return false;
		var options = {
			"KEY_WORD": search_word,
			"ROWS": CONFIG.pageNumber,
			"PAGE_INDEX": "1"
		}
		CONFIG.searchOptions = options;
		HTTP.GETDEV(
			dealDev, 
			alert_window,
			options
		)
		HTTP.GETCOUNTDEV(
			dealPager,
			alert_window, 
			{
				"KEY_WORD": search_word,
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
function dealUnit(data, dataList) {
	console.log(dataList)
	setUnitSelectOptions(dataList)
	new navTree({
		el:'.user_or_tree',
		obj:data
	}).enov(function(value) {
		var options = {
			"UNIT_ID": value,
			"ROWS": CONFIG.pageNumber,
			"PAGE_INDEX": "1"
		}
		CONFIG.searchOptions = options
		HTTP.GETDEV(
			dealDev, 
			alert_window,
			options
		)
		HTTP.GETCOUNTDEV(
			dealPager,
			alert_window, 
			{
				"UNIT_ID": value,
			}
		)
	})
	setTimeout(function () {
		$('.nav_tree-0 p').eq(0).click();
	}, 0)
}
// 警员列表处理
function dealDev(data) {
	renderDevList(data)
}
function dealPager(total) {
	if(pagerObj){
		pagerObj.refresh({el:'.user_pg_btn',count:total})
		return;
	}

	pagerObj = new Pager({el:'.user_pg_btn',count:total})

	pagerObj.evon(function(num){
		var options = CONFIG.searchOptions;
		options.PAGE_INDEX = num;
		HTTP.GETDEV(
			dealDev, 
			alert_window,
			options
		)
	})
}
function renderDevList(data) {
	var htmlStr = '<li class="user_table_header c">'
					+'<div>设备ID</div>'
					+'<div>设备类型</div>'
					+'<div>通信号码</div>'
					+'<div>设备所属单位</div>'
					+'<div>操作</div>'
				+'</li>',
		i = 0;
	for(; i < data.length; i++){
		htmlStr += '<li class="c">'
					+'<div>'+ data[i] +'</div>'
					+'<div>'+ (data[i].DEV_TYPE || '') +'</div>'
					+'<div>'+ (data[i].CALL_NO || '') +'</div>'
					+'<div>暂无所属单位字段</div>'
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
	var li2 = $('.user_table_box li')[1]
	if(!li2) return;
	var h = li2.offsetHeight
	$('.user_table_box li').not('.user_table_header').css('height',h + "px")
}

function setUnitSelectOptions (unitList) {
	var htmlStr = '';
	for(var i = 0, l = unitList.length; i < l; i++){
		htmlStr += '<option value="'+ unitList[i].UNIT_ID +'">'+ unitList[i].UNIT_NAME +'</option>'
	}
	$('.unit_select').append(htmlStr)
	setTimeout(function () {
		$('.unit_select').on('change', function () {
			setSelectOptions($(this).val())
		})
	}, 0)
}

function alert_window(msg){
	console.log(msg)
}