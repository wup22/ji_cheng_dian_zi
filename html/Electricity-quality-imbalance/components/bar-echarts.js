
let barEcharts = Vue.extend({
	name:'echarts-line',
	template:`
	   			<div id="lineChart" ref="lineChart"></div>
          	 `,	
	data () {
		return {
		    
		}
	},
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
	            // title: { text: '饼图' ,x: 'left'},
	            tooltip: {  //悬浮提示框
					formatter: '{a}{b} <br> {c}({d}%)',
				    barStyle: {
				        color: 'green',
				        width: 2,
				        type: 'solid'
				    },
				   	textStyle:{   //提示框字体颜色
				      	color:'#bad9fb'
				    }
	            },	            
		       /* legend:{     //说明文字样式
		        	orient: 'vertical',
					right:"50px",
			          itemWidth:0,
			           itemHeight:0,
			           x:"right", //位置靠右侧
			           textStyle:{
			               fontSize:0,
			               color:'#bad9fb'
			           } 	       
		        }, */

	            
	            
	            series:[{
				    "name":"",
				    "type": "pie",
				    "data": this.opData
				}]
	        });
	     
   	 	}
   	 	
	}
	
})