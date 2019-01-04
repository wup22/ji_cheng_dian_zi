let MySelect2 = Vue.extend({
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
                v-for="item,index in dataSelect2"
                :value="item" 			                     
                :key="index"
                >
                	{{item}}
                </option>
                
            </select>
        </div>`,
	data(){
		return{}
	},
	props:{
		dataSelect2:{
			type:Object,
			required:false,
			default:["详细信息1","详细信息2","详细信息3"]
		},
		
	},
	mounted(){
		//多选框初始化
		$('.chosen-select').chosen({				
			no_results_text: '未查询到',//搜索无结果时显示的提示
			width: '100%',
			display_selected_options:true  //多选框是否在下拉列表中显示已经选中的项
		});
		//监听多选框数据变化
		this.$watch('dataSelect2',(newVal,oldVal)=>{				
			$('.chosen-select').trigger('chosen:updated')
		});
	},
	methods:{

	}
})