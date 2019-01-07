let MySelect = Vue.extend({
	template:`
        <div class="input-group">
            <select 
            name="byRtuModel" 
            :id="selectId" 
            class="chosen-select"
            data-placeholder="请选择" 			                 
            style="width: 150px;" 
            tabindex="2" 			              
            >
                <option 
                v-for="item,index in dataSelect"
                :value="item" 			                     
                :key="index"
                >
                	{{item}}
                </option>
                
            </select>
        </div>`,
	
	props:{
		// 数据
		dataSelect:{
			type:Object,
			required:true,
			default:''
		},
		// id元素
		selectId:{
			type:String,
			required:true,
			default:''
		},
		// 请求接口
		port:{
			type:String,
			default:''
		}
	},
	
	mounted(){
		//多选框初始化
		$('#'+this.selectId).chosen({				
			no_results_text: '未查询到',//搜索无结果时显示的提示
			width: '100%',
			display_selected_options:true  //多选框是否在下拉列表中显示已经选中的项
		});
		
		//多选框change事件
		let that = this;		
		$('#'+this.selectId).on('change', function(e, params) {
			// console.log('e',e,'params',params)
			that.$axiosGet('/'+that.port+'?name='+params.selected,res=>{
				// let arr = []
				// arr = res;
				that.$emit("linkage",res)
			});
		});
	},
	methods:{

	}
})