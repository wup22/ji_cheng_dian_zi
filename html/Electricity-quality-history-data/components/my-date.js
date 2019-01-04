let MyDate = Vue.extend({
	template:`<input :id="dateId" class="wpDate" type="text"/>`,
	
	props:{
		dateId:{
			type:String,
			required:true,
			default:'MyTime'
		}
	},
	mounted(){
		// console.log(this.dateId);
		//时间选择框初始化
		/*laydate({
		    elem: '#'+this.dateId,
		    type:"datetime",
		    choose : value => {
		    	// this.startTime = value;
		    }
		});	*/

		laydate({
			elem : '#'+this.dateId, //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
			format : 'YYYY-MM-DD hh:mm:ss',
			istime : true,
			start: laydate.now(-1, 'YYYY-MM-DD hh:mm:ss'),
			istoday : false, //暂时去掉 今天 快捷选择，layerdate bug，点击今天无法触发choose
			max : laydate.now(), //+1代表明天，+2代表后天，以此类推
			event : 'focus', //响应事件。如果没有传入event，则按照默认的click
			festival : true, //显示节日
			choose : datas => { //选择日期完毕的回调
				// this.endTime = datas;
				this.$emit('gettime',datas)
			}
		});
	}
})