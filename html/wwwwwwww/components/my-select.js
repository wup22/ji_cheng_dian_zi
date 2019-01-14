let MySelect = Vue.extend({
	template:`
        <div class="input-group">
            <select 
            name="byRtuModel" 
            id="byRtuModelSel" 
            class="chosen-select"
            data-placeholder="请选择" 			                 
            style="width: 150px;" 
            tabindex="2" 			              
            >
                <option 
                v-for="item,index in dataSelect"
                :value="item.regions" 			                     
                :key="index"
                >
                	{{item.regions}}
                </option>
                
            </select>
        </div>`,
	data(){
		return{
			// A:[]
		}
	},
	props:{
		dataSelect:{
			type:Object,
			required:false,
			default:[{regions: "默认数据"}]
		}
		
	},
	mounted(){
		//多选框初始化
		$('.chosen-select').chosen({				
			no_results_text: '未查询到',//搜索无结果时显示的提示
			width: '100%',
			display_selected_options:true  //多选框是否在下拉列表中显示已经选中的项
		});
		
		//多选框change事件
		let that = this;		
		$('.chosen-select').on('change', function(e, params) {
			let arr = that.dataSelect;			  
		  	arr.map((item,index)=>{
		  		if(item.regions == params.selected){
		  			let arr = []
		  			arr = item.importantUser	  		
		  			// that.A = item.importantUser	
		  			that.$emit("linkage",arr)		  		
		  			// console.log('子',arr)
		  		}
		  	})

		});
	},
	methods:{

	}
})