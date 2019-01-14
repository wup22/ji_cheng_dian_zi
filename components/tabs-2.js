var Tabs = Vue.extend({
	name:"Tabs",
	template:`	<div id="header" @click="rightNone">	
		<!-- 头部导航 -->
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
					<ul class="menu_nav" v-show="item.isShow">
						<li v-for="itemMenu,indexIndex in item.second" :key="indexIndex"
						ref="menu_nav_1" 
						class="menu_nav_1"
						@mouseenter="changeI(index,indexIndex)"
						@mouseleave="nativeI(index,indexIndex)"
						@click="addTab(editableTabsValue2,itemMenu)"
						>
							<div class="menu_nav_1_child">{{itemMenu.title}}</div>						
						</li>						
					</ul>
				</li>				
			</ul>			
		</div>
		<div class="wp_tabs" ref="wp_tabs">
			<div class="wp_tabs_1">
				<ul class="tabs_ul">
					<li 
					 :class="{tabs_li:true,'is-active':v1==indexTabs}" 
					 v-for="itemTabs,indexTabs in tabs2"
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
			 v-for="itemTab,indexTab in tabs2"
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
		</div>
		
	</div>`,
		props:{
			indexMenu:{
				type:Object,
			}
		},
		data(){
			return {
				v1:0,		
				arr2:[
		          {
		            img:'funcmenu_1.png',
		            img_active:'funcmenu_1_active.png',
		            first:'统计分析',
		            isShow: false,
		            second:[
		              {title:'电能质量历史数据',path:'html/Electricity-quality-history-data/index.html'},
		             
		            ]
		          },
		          {
		            img:'funcmenu_2.png',
		            img_active:'funcmenu_2_active.png',
		            first:'综合分析',
		            isShow: false,
		            second:[
		              {groupTitle:'异常综合分析',path:'html/Abnormal-synthesis-analyze/index.html'},
		           
		            ]
		          },
		          {
		            img:'funcmenu_3.png',
		            img_active:'funcmenu_3_active.png',
		            first:'电能质量分析',
		            isShow: false,
		            second:[
		              {groupTitle:'重要负荷分析',path:'html/Important-load-analysis/index.html'},
		              {groupTitle:'异常事件统计',path:'html/Abnormal-event-statistics/index.html'},
		              {groupTitle:'电能质量不平衡',path:'html/Electricity-quality-imbalance/index.html'}
		            ]
		          },
		          {
		            img:'funcmenu_4.png',
		            img_active:'funcmenu_4_active.png',
		            first:'分析与预测',
		            isShow: false,
		            second:[
		              {groupTitle:'线损实时分析',path:'html/Line-harm-real-time-analyze/index.html'},
		              {groupTitle:'线损历史分析',path:'html/Line-harm-history-analyze/index.html'} 
		            ]
		          }
		        ],
		        tabs2:[
		        	{
		        		title:"首页",
		        		name:'1',
		        		content:'<iframe src="html/Electricity-quality-history-data/index.html" frameborder="0" width="100%" height="100%"></iframe>'
		        	}
		        ],
		        editableTabsValue2: 1,
		        tabIndex: 1,
		        rightBtn:["关闭当前标签页","关闭其它标签页","关闭左侧标签页","关闭右侧标签页","关闭所有标签页"],
		        rightBtnIndex:1
			}
		},
		mounted(){
			console.log(this.indexMenu)
			this.$refs.wp_tabs.oncontextmenu = function(){
				return false;
			}
		},
		methods:{
			change(index,item){
				// this.$refs.menu[index].style.backgroundImage = 'url(img/funcmenu/funcmenu_'+ ++index + '_active.png?v=1.02)';
				event.target.style.backgroundImage = `url(img/funcmenu/funcmenu_${++index}_active.png?v=1.02)`;
				item.isShow = true;			
			},
			native(index,item){
				// this.$refs.menu[index].style.backgroundImage = 'url(img/funcmenu/funcmenu_'+ ++index + '.png?v=1.02)';
				event.target.style.backgroundImage = `url(img/funcmenu/funcmenu_${++index}.png?v=1.02)`
				item.isShow = false;
			},
			changeI(index,indexIndex){
				// this.$refs.menu[index].children[1].children[indexIndex].style.backgroundColor = "orange";
				event.target.style.backgroundColor = "orange";
				// console.log(event.target)
			},
			nativeI(index,indexIndex){
				// this.$refs.menu[index].children[1].children[indexIndex].style.backgroundColor = "#102b78"	
				event.target.style.backgroundColor = "#102b78";

			},
			
			addTab(targetName,innerHtml) {  //点击导航菜单创建tabs方法
					var titleT = innerHtml.title; //菜单文本
					// console.log('0=>',targetName);
					var iframeID = "";
					let _this = this;
					this.tabs2.map(function(item, index){
						var tName = item.title;
						if(titleT == tName){
							iframeID = item.name;
							_this.v1 = index;
						}
					});
					
					if(iframeID == ""){						
						let newTabName = ++this.tabIndex + '';
						this.tabs2.push({
		          			title: titleT,
		          			name: newTabName,
		          			content: `<iframe src="http://192.168.21.32:8080/DMSPro/a${innerHtml.path}" frameborder="0" width="100%" height="100%"></iframe>`,
		          			del:"X"
		        		});
		        		this.editableTabsValue2 = newTabName;
		        		this.v1 = this.tabs2.length - 1;
		        		// console.log('tabs',this.tabs2)		        		
					}
	        },
	        isTabs(index){  //点击tabs方法
	        	this.v1 = index;
	        },
	        //点击删除tabs事件
	        removeTab(targetIndex) {
	        	console.log('targetName',targetIndex);  
	        	let tabs = this.tabs2;	        
	        	// let activeName = this.v1; 
	        	let len = tabs.length-1
	        	tabs.splice(targetIndex,1);
	        	console.log('v1',this.v1)
	        	if (this.v1 === len) {
	        	  	// let aa = --targetIndex
	          		// tabs.splice(targetIndex,1);
	          		console.log('tab',tabs)
	          		// event.target.parentNode.previousSibling.classList.add("is-active")
	          		// this.tabs2 = tabs;
	            	this.v1 = tabs.length-1;
	            	console.log('ll',this.v1)
	        	}else{
	        		// tabs.splice(targetIndex,1);
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
	        	let tabs = this.tabs2;
	        	switch(index){
					case 0: //关闭当前标签页
						tabs.splice(rBtnIndex,1);
						this.v1 = rBtnIndex;
						break;
					case 1: //关闭其它标签页
						tabs0 = tabs.slice(rBtnIndex,++rBtnIndex);
						tabs.splice(1,tabs.length,tabs0[0]);
						this.v1 = 0;
						break;
					case 2: //关闭左侧标签页
						tabs.splice(1,--rBtnIndex);
						this.v1 = 1;
						break;
					case 3: //关闭右侧标签页
						tabs.splice(++rBtnIndex,tabs.length);
						if(this.v1 >= --rBtnIndex){
							this.v1 = rBtnIndex
						};
						break;
					case 4: //关闭所有标签页
						tabs.splice(1,tabs.length-1);
						this.v1 = 0;
						break;
					default:
						console.log("出错了");
						break;
				}
	        }
		},

	
})