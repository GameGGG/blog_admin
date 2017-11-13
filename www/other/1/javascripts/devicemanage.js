var CONFIG = {
	pageNumber: 20,
	editDefaultMsg: {},
	searchOptions: {},
	add:false
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

	
	// 添加设备信息
	$('.update_not').on('click',function(){
		clearEditMsg();
		$('.update_alt').hide();
		$('.user_container').show();
	})
	// 修改设备信息
	$('.user_table_box').on('click','.update_btn',function(){
		CONFIG.add = false;
		var devtype = $(this).parent().siblings().eq(0).html()
		var unitid = $(this).attr('data-unitid')
		var name = $(this).attr('data-devname')
		var devid = $(this).parent().siblings().eq(1).html()
		var devnum = $(this).parent().siblings().eq(2).html()
		var yxj = $(this).attr('data-yxj')
		$('.type_select').val(devtype)
		$('.unit_select').val(unitid)
		$('.name_input').val(name)
		$('.devid_input').val(devid)
		$('.tx_input').val(devnum)
		$('.level_select').val(yxj)
		$('.update_alt').show();
		$('.user_container').hide();
	})

	// 删除设备信息
	$('.user_table_box').on('click', '.del_btn', function () {
		HTTP.DELDEV(delDevSuccess, alert_window, {
			"DevId": $(this).attr('data-devid')
		})
	})
	// 提交修改/增加设备信息
	$('.sure_submit').on('click', function () {
		var options = {
			DevId: $('.devid_input').val(),
			DevType: $('.type_select').val(),
			UnitID: $('.unit_select').val(),
			CallNum: $('.tx_input').val(),
			YXJ: $('.level_select').val(),
			DEV_NAME: $('.name_input').val(),
			GPSID:11111,
			REMARK: '11',
			GpsId: $('.gspid_input').val(),
			MOBILE_SERVICE: $('.yys_input').val(),
			INTO_TIME: $('.rwsj_input').val(),
			CALL_NO: $('.call1_input').val(),
			CALL_NO2: $('.call2_input').val(),
			CALL_NO3: $('.call3_input').val(),
			CALL_NO4: $('.call4_input').val(),
			POLICE_ID: $('.pid_input').val(),
			POLICE_NAME: $('.pname_input').val(),
			MOBILE_NO: $('.phone_input').val()

		}
		if (CONFIG.add) {
			HTTP.ADDDEV(addDevSuccess, alert_window, options)
		} else {
			HTTP.UPDATEDEV(updateDevSuccess, alert_window, options)
		}
	})

	$('.user_new_btn').on('click',function (){
		CONFIG.add = true;		
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
	var htmlStr = '<tr class="user_table_header c">'
					+'<td>类型</td>'
					+'<td>名称</td>'
					+'<td>所属单位</td>'
					+'<td>所属民警</td>'
					+'<td>所属民警警号</td>'
					+'<td>民警手机号</td>'
					+'<td>定位ID</td>'
					+'<td>运营商</td>'
					+'<td>入网时间</td>'
					+'<td>音视频呼号1</td>'
					+'<td>音视频呼号2</td>'
					+'<td>音视频呼号3</td>'
					+'<td>音视频呼号4</td>'
					+'<td style="box-sizing:border-box">操作</td>'
				+'</tr>',
		i = 0;
	for(; i < data.length; i++){
		htmlStr += '<tr class="c">'
					+'<td>'+ (data[i].DEV_TYPE || '') +'</td>'
					+'<td>'+ (data[i].DEV_NAME || '') +'</td>'
					+'<td>'+ (data[i].UNIT_NAME || '') +'</td>'
					+'<td>'+ (data[i].POLICE_NAME || '') +'</td>'
					+'<td>'+ (data[i].POLICE_ID || '') +'</td>'
					+'<td>'+ (data[i].MOBILE_NO || '') +'</td>'
					+'<td>'+ (data[i].GPS_ID || '') +'</td>'
					+'<td>'+ (data[i].MOBILE_SERVICE || '') +'</td>'
					+'<td>'+ (data[i].INTO_TIME || '') +'</td>'
					+'<td>'+ (data[i].CALL_NO || '') +'</td>'
					+'<td>'+ (data[i].CALL_NO2 || '') +'</td>'
					+'<td>'+ (data[i].CALL_NO3 || '') +'</td>'
					+'<td>'+ (data[i].CALL_NO4 || '') +'</td>'
					+'<td style="min-width:120px;">'
						+'<a href="javascript:void(0);" class="del_btn" data-devid="'+ data[i].IMEI +'">删除</a>'
						+'<a href="javascript:void(0);" class="update_btn" data-unitid="'+ data[i].UNIT_ID +'" data-devname="'+ data[i].DEV_NAME +'" data-yxj="'+ (data[i].YXJ || '') +'">编辑</a>'
					+'</td>'
				+'</tr>'
	}
	$('.user_table_box').html(htmlStr)
	// dealLiHeight();
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
function setSelectOptions () {
	console.log()
}

function addDevSuccess () {
	alert('添加通信设备信息成功')
	var options = CONFIG.searchOptions;
	HTTP.GETDEV(
		dealDev, 
		alert_window,
		options
	);
	$('.update_alt').hide();
	clearEditMsg();
	$('.user_container').show();
}
function updateDevSuccess () {
	alert('修改通信设备信息成功')
	var options = CONFIG.searchOptions;
	HTTP.GETDEV(
		dealDev, 
		alert_window,
		options
	);
	$('.update_alt').hide();
	clearEditMsg();
	$('.user_container').show();
}
function delDevSuccess () {
	alert('删除设备信息成功')
	var options = CONFIG.searchOptions;
	HTTP.GETDEV(
		dealDev, 
		alert_window,
		options
	)
}

function clearEditMsg () {
	$('.type_select').val('');
	$('.unit_select').val('');
	$('.name_input').val('');
	$('.devid_input').val('');
	$('.level_select').val('');
	$('.tx_input').val('')
}
function alert_window (msg){
	alert(msg)
}