let tableData = Vue.extend({
	template:`<table :id="tableId" cellspacing="0"></table>`,
	data(){
		return{
			url:'http://192.168.21.106:8080/bspower/a/'
		}
	},
	props:{
		domainName:{
			type:String,
			required:true,
			default:''
		},
		tableUrl:{
			type:String,
			required:true,
			default:''
		},
		tableId:{
			type:String,
			required:true,
			default:"rtu"
		},
		selectData:{
			type:Object,
			required:false,
			default:''
		},
		columns:{
			type:Object,
			required:false,
			default:[
	            { data: 'area', title: "区域"},
	            { data: 'user' , title: "用户"}
	        ]
		}
	},
	mounted(){ 
		//表格初始化
		let table = $('#' + this.tableId).DataTable({
			"language":{  //把文字变为中文
	            "sProcessing": "处理中...",  
	            "sLengthMenu": "显示 _MENU_ 项结果",  
	            "sZeroRecords": "没有匹配结果",  
	            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",  
	            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",  
	            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",  
	            "sInfoPostFix": "",  
	            "sSearch": "搜索:",  
	            "sUrl": "",  
	            "sEmptyTable": "表中数据为空",  
	            "sLoadingRecords": "载入中...",  
	            "sInfoThousands": ",",  
	            "oPaginate": {  
	                "sFirst": "首页",  
	                "sPrevious": "上页",  
	                "sNext": "下页",  
	                "sLast": "末页"  
	            },  
	            "oAria": {  
	                "sSortAscending": ": 以升序排列此列",  
	                "sSortDescending": ": 以降序排列此列"  
	            }  
	        },
			fixedHeader: true,　//这个是用来固定头部
	        scrollY: 100,
	        paging: true,
	        columns:this.columns,
	        lengthMenu:[[30, 40, 50, -1], ["30条", "40条", "50条", "全部"]],// 显示每页显示的条数  		        
	        "stripeClasses": ["odd", "even"],   // 为奇偶行添加样式
	        "bFilter": true, // 搜索框
	        "ordering":true, //排序
	        // "order":[ [0,'asc'] ],
	        serverSide:true,
	        "ajax":{
	        	"url" : this.domainName + this.tableUrl,
	        	"type" : "POST",
	        	"dataSrc" : "data",
	        	"data" : (data)=>{
	        		var filterParams = {
	        			'draw': data.draw,
	        			'start' : data.start,
	        			'length': data.length,
	        			'searchValue':data.search.value,
	        			'orderColumnName':data.columns[data.order[0].column].data,
	        			'orderDir':data.order[0].dir
	        			
	        		}
	        		// console.log('dataTable',data)
	        		// console.log('sss',filterParams)
	        		console.log('callback',JSON.stringify({filterParams:filterParams,selectData:this.selectData}))
	        		return JSON.stringify(filterParams);
	        		// return JSON.stringify({filterParams:filterParams,selectData:this.selectData});
	        	},
	        	"error" : error=>{console.log(error)},
	        	"contentType": "application/json;charset=utf-8"
	        }        
	    });
	    //监听表格数据变化
		/*this.$watch('selectData',(newVal,oldVal)=>{				
		    table.clear()  ;//清理原数据
		    table.rows.add(newVal) //添加新数据
		    table.draw();  			
		});*/
	
	}
})