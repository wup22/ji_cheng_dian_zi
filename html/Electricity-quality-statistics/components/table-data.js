let tableData = Vue.extend({
	template:`<table class="" id="rtuAccTable" cellspacing="0"></table>`,
	data(){
		return{
			
		}
	},
	props:['opDiskData'],
	mounted(){ 
		// console.log('opDiskData=>',this.opDiskData)
		//表格初始化
		let table = $('#rtuAccTable').DataTable({
	        scrollY: 100,
	        paging: true,
	        columns: [
	            { data: 'name', title: "区域"},
	            { data: 'position' , title: "用户"},
	            { data: 'sss' , title: "数值"}
	        ],
	        data: this.opDiskData,
	        lengthMenu:[[30, 40, 50, -1], ["30条", "40条", "50条", "全部"]],// 显示每页显示的条数  		        
	        "stripeClasses": ["odd", "even"],   // 为奇偶行添加样式
	        "bFilter": false,         // 去掉 搜索框
	    });
	    //监听表格数据变化
		this.$watch('opDiskData',(newVal,oldVal)=>{				
		    table.clear()  ;//清理原数据
		    table.rows.add(newVal) //添加新数据
		    table.draw();  			
		});
	},
	methods:{

	}
})