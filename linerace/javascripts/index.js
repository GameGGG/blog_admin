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
	
})

function renderCa1() {
	var myChart = echarts.init(document.querySelector('.ca1'))
	var	option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
		        data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
		    },
		    series: [
		        {
		            name:'访问来源',
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
		                {value:135},
		                {value:1548}
		            ]
		        }
		    ]
		};
	var o = {
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    visualMap: {
        show: false,
        min: 125,
        max: 500,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name:'访问来源',
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
            ],
            itemStyle: {
                normal: {
                    color: '#00cdff'
                }
            },
        }
    ]
};
	myChart.setOption(o)		
}