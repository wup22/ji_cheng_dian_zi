let IesTabs = Vue.extend({
	template:`<!-- tabs -->
		<div class="wp_tabs" ref="wp_tabs" @click="rightNone">
			<div class="wp_tabs_1">
				<ul class="tabs_ul">
					<li 
					 :class="{tabs_li:true,'is-active':v1==indexTabs}" 
					 v-for="itemTabs,indexTabs in tabsA"
					 :key="indexTabs"
					 @click="isTabs(indexTabs)"
					 @click.right="rightBtnEvent(indexTabs)">
						{{itemTabs.title}}
						<i v-if="itemTabs.del" @click="removeTab(indexTabs)">{{itemTabs.del}}</i>
					</li>	
				</ul>		
			</div>
			<div 
			 class="wp_tabs_con"
			 :id="'tab-' + itemTab.name"
			 v-show="v1==indexTab"
			 v-for="itemTab,indexTab in tabsA"
			 :key="indexTab"
			 v-html="itemTab.content">
				
			</div>
			<!-- 右键菜单 -->
			<div id="rightBtnMenu" ref="rightBtnMenu" style="display:none;">
				<ul>
					<li 
					v-for="item,index in rightBtn" 
					:key="index" 
					@click="closeTabs(index)">{{item}}</li>
				</ul>
			</div> 
		</div>`,
	
	props:{
		v1 : {
			type:Number,
			required : true,
			default:0
		},
		tabsA : {
			type:Object,
			required:true,
			default:[
	        	{
	        		title:"首页",
	        		name:'1',
	        		content:'<iframe src="html/Electricity-quality-history-data/index.html" frameborder="0" width="100%" height="100%"></iframe>'
	        	}
	        ]
		}
			
	},
	data(){
		return{
	        rightBtn:["关闭当前标签页","关闭其它标签页","关闭左侧标签页","关闭右侧标签页","关闭所有标签页"]	
		}	
	},
	mounted(){
		// console.log(this.indexMenu)
		this.$refs.wp_tabs.oncontextmenu = function(){
			return false;
		}
	},
	methods:{

		isTabs(index){  //点击tabs方法
        	this.v1 = index;
        },
        //点击删除tabs事件
        removeTab(targetIndex) {
        	console.log('targetName',targetIndex);  
        	let tabs = this.tabsA;	        
        	// let activeName = this.v1; 
        	let len = tabs.length-1
        	tabs.splice(targetIndex,1);
        	console.log('v1',this.v1)
        	if (this.v1 === len) {
          		console.log('tab',tabs)
          		// event.target.parentNode.previousSibling.classList.add("is-active")
          		this.$emit('showtabs',tabs.length-1)
            	console.log('ll',this.v1)
        	}else{
        		this.$emit('showtabs',this.v1)
        	}
        	// tabs.splice(targetIndex,1);	              
        	// this.v1 = activeName;console.log('v1-1',this.v1)
        	// this.tabs2 = tabs.filter(tab => tab.name !== targetIndex);
        	// console.log('editableTabsValue2',this.tabIndex,'-|-','tabs2',this.tabs2)
        },
        //鼠标右键事件
        rightBtnEvent(index){
        	this.rightBtnIndex = index;
        	this.$refs.rightBtnMenu.style.display = "block";
        	this.$refs.rightBtnMenu.style.left = event.pageX + 'px';
        	this.$refs.rightBtnMenu.style.top = event.pageY + 'px';	        	
        },
        //单击其他隐藏右键选项
        rightNone(){
        	this.$refs.rightBtnMenu.style.display = "none";
        },
        //鼠标右键选项操作
        closeTabs(index){
        	let rBtnIndex = this.rightBtnIndex;
        	let tabs = this.tabsA;
        	switch(index){
				case 0: //关闭当前标签页
					tabs.splice(rBtnIndex,1);
					this.$emit('showtabs',rBtnIndex)
					break;
				case 1: //关闭其它标签页
					tabs0 = tabs.slice(rBtnIndex,++rBtnIndex);
					tabs.splice(1,tabs.length,tabs0[0]);
					this.$emit('showtabs',0)
					break;
				case 2: //关闭左侧标签页
					tabs.splice(1,--rBtnIndex);
					this.$emit('showtabs',1)
					break;
				case 3: //关闭右侧标签页
					tabs.splice(++rBtnIndex,tabs.length);
					if(this.v1 >= --rBtnIndex){
						this.$emit('showtabs',rBtnIndex)
					};
					break;
				case 4: //关闭所有标签页
					tabs.splice(1,tabs.length-1);
					this.$emit('showtabs',0)
					break;
				default:
					console.log("出错了");
					break;
			}
        }
	}
})