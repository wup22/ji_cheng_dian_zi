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
	data(){
		return{
			
		}
	},
	props:{
		dataSelect:{
			type:Object,
			required:true,
			default:''
		},
		selectId:{
			type:String,
			required:true,
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
			that.$http.get('/importantUser?region='+params.selected).then((res)=>{
				// console.log(res.data.data);
				let flag = res.data;				
				if(flag.code.toUpperCase() == 'OK'){
					let arr = []
					arr = flag.data
					that.$emit("linkage",arr)
					// console.log('region',this.region)
				}else{
					console.log(flag.msg)
				}				
			}).catch((err)=>{
				console.log(err)
			})

			
		});
	},
	methods:{

	}
})