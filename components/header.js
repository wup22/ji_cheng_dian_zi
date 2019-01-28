let IndexHeader = Vue.extend({
	template:`<!-- 头部导航 -->
		<div class="conent clearfix">
			<ul class="clearfix">
				<li v-for="item,index in indexMenu" 
				:key="index" 
				class="menu"
				ref="menu"
				:style="{background:'url(img/funcmenu/funcmenu_'+ ++index + '.png?v=1.02)0 -5px',backgroundSize:'100% 100%'}"
				@mouseenter="change(--index,item)"
				@mouseleave="native(--index,item)"
				>					
					<div class="explain">{{item.first}}</div>
					<ul class="menu_nav" v-show="isShow==index">
						<li v-for="itemMenu,indexIndex in item.second" :key="indexIndex"
						ref="menu_nav_1" 
						class="menu_nav_1"
						@mouseenter="changeI(index,indexIndex)"
						@mouseleave="nativeI(index,indexIndex)"
						@click="addTab(indexIndex,itemMenu)"
						>
							<div class="menu_nav_1_child">{{itemMenu.title}}</div>						
						</li>						
					</ul>
				</li>				
			</ul>			
		</div>`,
		props:{
			indexMenu:{
				type:Object,
			},
			tabs : {
				type:Object,
				required:true,
				default:[
		        	{
		        		title:"首页",
		        		name:'1',
		        		content:'<div></div>'
		        	}
		        ]
			},
			v1:{
				type:Number,
				required:true,
				default:0
			}
		},
		data(){
			return{
				isShow:false,
				editableTabsValue2: 1,
		    	tabIndex: 1
			}	
		},
		// mounted(){console.log(this.tabs)},
		methods:{
			change(index,item){
				event.target.style.backgroundImage = `url(img/funcmenu/funcmenu_${++index}_active.png?v=1.02)`;
				// item.isShow = true;	
				this.isShow = index;		
			},
			native(index,item){
				event.target.style.backgroundImage = `url(img/funcmenu/funcmenu_${++index}.png?v=1.02)`
				// item.isShow = false;
				this.isShow = !index;
			},
			changeI(index,indexIndex){
				event.target.style.backgroundColor = "orange";
			},
			nativeI(index,indexIndex){	
				event.target.style.backgroundColor = "#102b78";

			},
			addTab(targetName,innerHtml) {  //点击导航菜单创建tabs方法
					var titleT = innerHtml.title; //菜单文本
				// console.log('0=>',targetName);
				var iframeID = "";
				
				this.tabs.map((item, index)=>{
					var tName = item.title;
					if(titleT == tName){
						iframeID = item.name;						
						this.$emit("show",index)
					}
				});				
				if(iframeID == ""){						
					let newTabName = ++this.tabIndex + '';
					this.$emit("tabsadd",{title: titleT,
	          			name: newTabName,
	          			content: `<iframe src="${innerHtml.path}" frameborder="0" width="100%" height="100%"></iframe>`,
	          			del:"X"})
					v1 = this.tabs.length - 1;
					this.$emit("show",v1)
	        		this.editableTabsValue2 = newTabName;
	        		// console.log('tabs',this.tabs2)
	        		// http://192.168.21.32:8080/DMSPro/a		        	
				}
	        }
	
		}
})





