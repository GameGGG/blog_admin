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
	setTimeout(renderCa1,1000)
	setTimeout(renderCa2,1000)
	setTimeout(renderCa4,1000)
})

function renderCa1() {
	var myChart = echarts.init(document.querySelector('.ca1'))
	var o = {
		color:["#82E2FF", "#00B0D9", "#2CC0E8", "#53CEF2"],
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    series: [
	        {
	            name:'设备数量',
	            type:'pie',
	            radius: ['40%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {value:335},
	                {value:310},
	                {value:234},
	                {value:135}
	            ]
	        }
	    ]
	};
	myChart.setOption(o)		
}

function renderCa4() {
	var myChart = echarts.init(document.querySelector('.ca4')),
		option = {
		    color: ['#0094EF', '#00CBC9'],
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'shadow'
		        }
		    },
		    textStyle: {
		    	color:'#00CBC9'
		    },
		    legend: {
		        data: ['人员', '设备']
		    },
		    xAxis:{
		        	show: true,
		            type: 'category',
		            axisTick: {show: true},
		            data: ['派出所1', '派出所2', '派出所3', '派出所4', '派出所5','派出所1', '派出所2', '派出所3', '派出所4', '派出所5','派出所1', '派出所2', '派出所3', '派出所4', '派出所5']
		    }
		    ,
		    yAxis: [
		        {
		        	show: true,
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            name: '人员',
		            type: 'bar',
		            barGap: '0.1',
		            data: [320, 332, 301, 334, 390,320, 332, 301, 334, 390,320, 332, 301, 334, 390]
		        },
		        {
		            name: '设备',
		            type: 'bar',
		            data: [220, 182, 191, 234, 290,320, 332, 301, 334, 390,320, 332, 301, 334, 390]
		        }
		    ]
		};
	myChart.setOption(option)
}

function renderCa2() {
	var myChart = echarts.init(document.querySelector('.ca2'))
	var o = {
		color:["#00FF4E", "#D20000", "#FFA200", "#EFFF00"],
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
	    series: [
	        {
	            name:'优先级数量',
	            type:'pie',
	            radius: ['50%', '70%'],
	            avoidLabelOverlap: false,
	            label: {
	                normal: {
	                    show: false,
	                    position: 'center'
	                },
	                emphasis: {
	                    show: true,
	                    textStyle: {
	                        fontSize: '30',
	                        fontWeight: 'bold'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    show: false
	                }
	            },
	            data:[
	                {value:335},
	                {value:310},
	                {value:234},
	                {value:135}
	            ]
	        }
	    ]
	};
	myChart.setOption(o)
}



