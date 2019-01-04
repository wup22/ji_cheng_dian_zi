
let lineEcharts = Vue.extend({
	name:'echarts-line',
	template:`<div id="lineChart" ref="lineChart"></div>`,	
	props:['opData'],
    mounted(){
    	this.drawLine();
    },
    watch:{
    	opData:{
    		handler(newData,oldData){
    			this.drawLine();
    		},
    	}
    },
  
	methods: {
	    //柱状图函数
		drawLine(){
			//容器父级
			let oDiv = document.querySelector('.curveDiv');
			//容器
			let oMyDiv = document.getElementById('lineChart');
			//设置容器宽高
			function setWH(){
				oMyDiv.style.width = oDiv.offsetWidth+"px";
				oMyDiv.style.height = oDiv.offsetHeight+"px";
			}
			setWH();
	        // 基于准备好的dom，初始化echarts实例
	        let myChart = this.$echarts.init(oMyDiv)
	       
	        // 绘制图表
	        myChart.setOption({
	        	textStyle:{fontSize:20,color:'#bad9fb'},//字体和颜色设置
	            // title: { text: '介绍echarts' },
	            tooltip: {  //悬浮提示框
				
				    barStyle: {
				        color: 'green',
				        width: 2,
				        type: 'solid'
				    },
				   	textStyle:{   //提示框字体颜色
				      	color:'#bad9fb'
				    }
	            },	            
		        legend:{     //说明文字样式
			          itemWidth:0,
			           itemHeight:0,
			           x:"right", //位置靠右侧
			           textStyle:{
			               fontSize:0,
			               color:'#bad9fb'
			           } 	       
		        }, 

	            xAxis: {
	                data:this.opData.x ,
	                axisLine: {     // x轴样式
	                    lineStyle: {
	                        type: 'solid',
	                        color: '#bad9fb',//x轴的颜色
	                        width:'2'//坐标线的宽度
	                    }
	                },
	                axisLabel: {    //x轴字体样式
	                    textStyle: {
	                        color: '#bad9fb',//坐标值得字体具体的颜色
	 
	                    }
	                }
	            },
	            yAxis: {
	            	type : 'value',
		            splitLine:{show: true},//保留网格线
		            //splitArea : {show : 0},//保留网格区域
	            	axisLine: {     // y轴样式
	                    lineStyle: {
	                        type: 'solid',
	                        color: '#bad9fb',//y轴的颜色
	                        width:'2'//坐标线的宽度
	                    }
	                },
	                axisLabel: {    //y轴字体样式
	                    textStyle: {
	                        color: '#bad9fb',//坐标值得字体具体的颜色
	 
	                    }
	                },
	                axisLabel: {   //y轴坐标值
	                    formatter: '{value} 千瓦'
	                 }
	            },
	            series:this.opData.msg
	        });
	     
   	 	}
   	 	
	}
	
})