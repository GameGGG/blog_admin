var CONFIG = {
	pageNumber: 10,
	editDefaultMsg: {},
	add: false
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
		// 清空信息
		clearSelect();
		$('.user_container').show();
	})
	$('.user_table_box').on('click','.update_btn',function (){
		CONFIG.add = false;
		var unitId = $(this).attr('data-unitId')
		var name = $(this).parent().siblings().eq(1).html();
		var policeId = $(this).parent().siblings().eq(0).html()
		var phone = $(this).parent().siblings().eq(4).html();
		CONFIG.editDefaultMsg.ZW = $(this).parent().siblings().eq(3).html()
		CONFIG.editDefaultMsg.JWT = $(this).parent().siblings().eq(5).html()
		CONFIG.editDefaultMsg.ZFY = $(this).parent().siblings().eq(6).html()
		CONFIG.editDefaultMsg.CZ = $(this).parent().siblings().eq(7).html()
		CONFIG.editDefaultMsg.YJ = $(this).parent().siblings().eq(8).html()
		CONFIG.editDefaultMsg.MTCZ = $(this).parent().siblings().eq(9).html()
		CONFIG.editDefaultMsg.QTSB = $(this).parent().siblings().eq(10).html()
		$('.unit_select').val(unitId);
		$('.name_input').val(name);
		$('.phone_input').val(phone);
		$('.policeid_input').val(policeId);
		setSelectOptions(unitId);
		$('.update_alt').show();
		$('.user_container').hide();
	})

	$('.user_new_btn').on('click',function (){
		$('.update_alt').show();
		$('.user_container').hide();
		CONFIG.add = true;
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

	// 提交修改信息按钮
	$('.sub_sure').on('click', function () {
		var opt = {
			PoliceId: $('.policeid_input').val(),
			PoliceName: $('.name_input').val(),
			PolicePost: $('.policepost_select').val(),
			UnitId: $('.unit_select').val(),
			MobileNum: $('.phone_input').val(),
			JWT: $('.jwt_input').val(),
			ZFY: $('.zfy_input').val(),
			CZ: $('.cz_input').val(),
			MTCZ: $('.mtc_input').val(),
			YJ: $('.yj_input').val(),
			QTSB: $('.qtsb_select').val()
		} 
		if (CONFIG.add) {
			HTTP.ADDPOLICE(addSuccess, alert_window, opt)
		} else {
			HTTP.UPDATEPOLICE(submitSuccess, alert_window, opt)
		}
	})

	// 点击删除警员信息
	$('.user_table_box').on('click', '.del_btn', function () {
		return false;
		HTTP.DELECTPOLICE(delPoliceSuccess, alert_window, {
			PoliceId: $(this).attr('data-policeId')
		})
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
function dealUnit (data, unitList) {
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
	setUnitSelectOptions(unitList)
	setTimeout(function () {
		$('.nav_tree-0 p').eq(0).click();
	}, 0)
}

function submitSuccess () {
	alert('修改信息成功')
}
// 警员列表处理
function dealPolice (data) {
	renderPoliceList(data)
}
function dealPager (total) {
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
function renderPoliceList (data) {
	var htmlStr = '<li class="user_table_header c">'
					+'<div>警号</div>'
					+'<div>姓名</div>'
					+'<div>单位</div>'
					+'<div>职务</div>'
					+'<div>手机号</div>'
					+'<div>警务通APP</div>'
					+'<div>4G执法仪</div>'
					+'<div>4G车载</div>'
					+'<div>云镜</div>'
					+'<div>摩托车载</div>'
					+'<div>其他设备</div>'
					+'<div>操作</div>'
				+'</li>',
		i = 0;
	for(; i < data.length; i++){
		htmlStr += '<li class="c">'
					+'<div>'+ data[i].POLICE_ID +'</div>'
					+'<div>'+ data[i].POLICE_NAME +'</div>'
					+'<div>'+ (data[i].UNIT_ID || '') +'</div>'
					+'<div>'+ (data[i].POLICE_TYPE || '') +'</div>'
					+'<div>'+ (data[i].MOBILE_NO || '') +'</div>'
					+'<div>'+ (data[i].JWT) +'</div>'
					+'<div>'+ (data[i].ZFY || '') +'</div>'
					+'<div>'+ (data[i].CZ || '') +'</div>'
					+'<div>'+ (data[i].YJ || '') +'</div>'
					+'<div>'+ (data[i].MTCZ || '') +'</div>'
					+'<div>'+ (data[i].QTSB || '') +'</div>'
					+'<div>'
						+'<a href="javascript:void(0);" class="del_btn" data-policeId="'+data[i].POLICE_ID+'">删除</a>'
						+'<a href="javascript:void(0);" class="update_btn" data-unitId="'+data[i].UNIT_ID+'">编辑</a>'
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

function setUnitSelectOptions (unitList) {
	console.log(unitList)
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
function setSelectOptions (unitId) {
	HTTP.GETDEV(setJwtSelectOptions, alert_window, {
		UNIT_ID: unitId,
		DEV_TYPE: '警务通APP'
	})
	HTTP.GETDEV(setZfySelectOptions, alert_window, {
		UNIT_ID: unitId,
		DEV_TYPE: '执法仪'
	})
	HTTP.GETDEV(setMtcSelectOptions, alert_window, {
		UNIT_ID: unitId,
		DEV_TYPE: '摩托车载'
	})
	HTTP.GETDEV(setCzSelectOptions, alert_window, {
		UNIT_ID: unitId,
		DEV_TYPE: '车载4G'
	})
	HTTP.GETDEV(setQtsbSelectOptions, alert_window, {
		UNIT_ID: unitId,
		DEV_TYPE: '其他设备'
	})
	HTTP.GETDEV(setYjSelectOptions, alert_window, {
		UNIT_ID: unitId,
		DEV_TYPE: '云镜'
	})
}

function setJwtSelectOptions (data) {
	var htmlStr = '';
	for(var i = 0, l = data.length; i < l; i++){
		htmlStr += '<option value="'+ data[i].DEV_TYPE +'">'+ data[i].DEV_TYPE +'</option>'
	}
	$('.jwt_select').append(htmlStr)
}

function setZfySelectOptions (data) {
	var htmlStr = '';
	for(var i = 0, l = data.length; i < l; i++){
		htmlStr += '<option value="'+ data[i].DEV_TYPE +'">'+ data[i].DEV_TYPE +'</option>'
	}
	$('.zfy_select').append(htmlStr)
}

function setMtcSelectOptions (data) {
	var htmlStr = '';
	for(var i = 0, l = data.length; i < l; i++){
		htmlStr += '<option value="'+ data[i].DEV_TYPE +'">'+ data[i].DEV_TYPE +'</option>'
	}
	$('.mtc_select').append(htmlStr)
}

function setCzSelectOptions (data) {
	var htmlStr = '';
	for(var i = 0, l = data.length; i < l; i++){
		htmlStr += '<option value="'+ data[i].DEV_TYPE +'">'+ data[i].DEV_TYPE +'</option>'
	}
	$('.cz_select').append(htmlStr)
}

function setQtsbSelectOptions (data) {
	var htmlStr = '';
	for(var i = 0, l = data.length; i < l; i++){
		htmlStr += '<option value="'+ data[i].DEV_TYPE +'">'+ data[i].DEV_TYPE +'</option>'
	}
	$('.qtsb_select').append(htmlStr)
}

function setYjSelectOptions (data) {
	var htmlStr = '';
	for(var i = 0, l = data.length; i < l; i++){
		htmlStr += '<option value="'+ data[i].DEV_TYPE +'">'+ data[i].DEV_TYPE +'</option>'
	}
	$('.yj_select').append(htmlStr)
}

function clearSelect () {
	CONFIG.editDefaultMsg = {};
	$('.unit_select').val('');
	$('.name_input').val('');
	$('.phone_input').val('');
	$('.policeid_input').val('');
}
function alert_window(msg){
	console.log(msg)
}