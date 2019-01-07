var Tabs = Vue.extend({
	name:"Tabs",
	template:`	<div id="header">	
		<!-- 头部导航 -->
		<div class="conent clearfix">
			<ul class="clearfix">
				<li v-for="item,index in arr2" 
				:key="index" 
				class="menu"
				ref="menu"
				:style="{background:'url(img/funcmenu/'+ item.img + '?v=1.02)0 -5px',backgroundSize: 'contain'}"
				@mouseenter="change(index,item)"
				@mouseleave="native(index,item)"
				>					
					<div class="explain">{{item.explain}}</div>
					<ul class="menu_nav" v-show="item.isShow">
						<li v-for="itemMenu,indexIndex in item.menu" :key="indexIndex"
						ref="menu_nav_1" 
						class="menu_nav_1"
						@mouseenter="changeI(index,indexIndex)"
						@mouseleave="nativeI(index,indexIndex)"
						@click="addTab(editableTabsValue2,itemMenu)"
						>
							<div class="menu_nav_1_child">{{itemMenu.groupTitle}}</div>						
						</li>						
					</ul>
				</li>				
			</ul>			
		</div>
		<div class="wp_tabs">
			<div class="wp_tabs_1">
				<ul class="tabs_ul">
					<li :class="{tabs_li:true,'is-active':v1==indexTabs}" 
					 v-for="itemTabs,indexTabs in tabs2"
					 :key="indexTabs"
					 @click="isTabs(indexTabs)">
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
			 v-html="itemTab.content"></div>
		</div>
		
	</div>`,
		data(){
			return {
				v1:0,			
				arr2:[
		          {
		            img:'funcmenu_1.png',
		            img_active:'funcmenu_1_active.png',
		            explain:'统计分析',
		            isShow: false,
		            menu:[
		              {groupTitle:'电能质量历史数据',path:'html/Electricity-quality-history-data/index.html'},
		             
		            ]
		          },
		          {
		            img:'funcmenu_2.png',
		            img_active:'funcmenu_2_active.png',
		            explain:'综合分析',
		            isShow: false,
		            menu:[
		              {groupTitle:'异常综合分析',path:'html/Abnormal-synthesis-analyze/index.html'},
		           
		            ]
		          },
		          {
		            img:'funcmenu_3.png',
		            img_active:'funcmenu_3_active.png',
		            explain:'电能质量分析',
		            isShow: false,
		            menu:[
		              {groupTitle:'重要负荷分析',path:'html/Important-load-analysis/index.html'},
		              {groupTitle:'异常事件统计',path:'html/Abnormal-event-statistics/index.html'},
		              {groupTitle:'电能质量不平衡',path:'html/Electricity-quality-imbalance/index.html'}
		            ]
		          },
		          {
		            img:'funcmenu_4.png',
		            img_active:'funcmenu_4_active.png',
		            explain:'分析与预测',
		            isShow: false,
		            menu:[
		              {groupTitle:'线损实时分析',path:'html/Line-harm-real-time-analyze/index.html'},
		              {groupTitle:'线损历史分析',path:'html/Line-harm-history-analyze/index.html'} 
		            ]
		          },
		          {
		            img:'funcmenu_5.png',
		            img_active:'funcmenu_5_active.png',
		            explain:'设备异常',
		            isShow: false,
		            menu:[
		              {groupTitle:'研判报告4-0',path:'', _isShow: false},
		              {groupTitle:'研判报告4-1',path:'', _isShow: false},
		              {groupTitle:'研判报告4-2',path:'', _isShow: false},
		              {groupTitle:'研判报告4-3',path:'', _isShow: false},
		              {groupTitle:'研判报告4-4',path:'', _isShow: false},
		              {groupTitle:'研判报告4-5',path:'', _isShow: false}
		            ]
		          },
		          {
		            img:'funcmenu_6.png',
		            img_active:'funcmenu_6_active.png',
		            explain:'指标分析',
		            isShow: false,
		            menu:[
		              {groupTitle:'研判报告5-0',path:'', _isShow: false},
		              {groupTitle:'研判报告5-1',path:'', _isShow: false},
		              {groupTitle:'研判报告5-2',path:'', _isShow: false,},
		              {groupTitle:'国网指标5-3',path:'', _isShow: false},
		              {groupTitle:'研控事项5-4',path:'', _isShow: false},
		              {groupTitle:'研判报告5-5',path:'', _isShow: false}
		            ]
		          },
		          {
		            img:'funcmenu_7.png',
		            img_active:'funcmenu_7_active.png',
		            explain:'运行统计',
		            isShow: false,
		            menu:[
		              {groupTitle:'研判报告6-0',path:'', _isShow: false},
		              {groupTitle:'研判报告6-1',path:'', _isShow: false},
		              {groupTitle:'研判报告6-2',path:'', _isShow: false},
		              {groupTitle:'研判报告6-3',path:'', _isShow: false},
		              {groupTitle:'研判报告6-4',path:'', _isShow: false},
		              {groupTitle:'研判报告6-5',path:'', _isShow: false}
		            ]
		          },
		          {
		            img:'funcmenu_8.png',
		            img_active:'funcmenu_8_active.png',
		            explain:'系统管理',
		            isShow: false,
		            menu:[
		              {groupTitle:'研判报告7-0',path:'', _isShow: false},
		              {groupTitle:'研判报告7-1',path:'', _isShow: false},
		              {groupTitle:'研判报告7-2',path:'', _isShow: false},
		              {groupTitle:'研判报告7-3',path:'', _isShow: false},
		              {groupTitle:'研判报告7-4',path:'', _isShow: false,},
		              {groupTitle:'研判报告7-5',path:'', _isShow: false,}
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
		        tabIndex: 1
			}
		},
		methods:{
			change(index,item){
				this.$refs.menu[index].style.backgroundImage = 'url(img/funcmenu/'+ item.img_active + '?v=1.02)';
				item.isShow = true;			
			},
			native(index,item){
				this.$refs.menu[index].style.backgroundImage = 'url(img/funcmenu/'+ item.img + '?v=1.02)';
				item.isShow = false;
			},
			changeI(index,indexIndex){
				this.$refs.menu[index].children[1].children[indexIndex].style.backgroundColor = "orange";
			},
			nativeI(index,indexIndex){
				this.$refs.menu[index].children[1].children[indexIndex].style.backgroundColor = "#102b78"	
			},
			
			addTab(targetName,innerHtml) {  //点击导航菜单创建tabs方法
					var titleT = innerHtml.groupTitle; //菜单文本
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
		          			title: innerHtml.groupTitle,
		          			name: newTabName,
		          			content: `<iframe src="${innerHtml.path}" frameborder="0" width="100%" height="100%"></iframe>`,
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
	       /* removeTab(targetIndex) {
	        	console.log('targetName',targetIndex);  
	        	let tabs = this.tabs2;
	        	// let activeName = this.editableTabsValue2;
	        	let activeName = this.v1; 
	        	let tt = targetIndex;
	        	console.log('v1',this.v1)
	        	// tabs.splice(targetIndex,1);
	        	if (activeName === tt) {  
	          		tabs.forEach((tab, targetIndex) => {
		            	if (tab.name === targetIndex+1) {
		             		let nextTab = tabs[index + 1] || tabs[index - 1];
		             		if (nextTab) {
		                		activeName = nextTab.name;
		              		}
		            	}
	            	});
	            	activeName = tt-2;
	            	console.log('ll',activeName)
	        	}
	        	tabs.splice(targetIndex,1);
	        	// tabs.splice(targetIndex,1);      
	        	this.v1 = activeName;console.log('v1-1',this.v1)
	        	// this.tabs2 = tabs.filter(tab => tab.name !== targetIndex);
	        	console.log('editableTabsValue2',this.tabIndex,'-|-','tabs2',this.tabs2)
	        }*/
	        removeTab(targetIndex) {
	        	console.log('targetName',targetIndex);  
	        	let tabs = this.tabs2;	        
	        	// let activeName = this.v1; 
	        	console.log('v1',this.v1)
	        	if (this.v1 === targetIndex) {
	        	  
	          		tabs.splice(targetIndex,1);
	          		// event.target.parentNode.previousSibling.classList.add("is-active")
	          		this.tabs2 = tabs;
	            	this.v1 = this.tabs2.length - 1;
	            	console.log('ll',this.v1)
	        	}else{
	        		tabs.splice(targetIndex,1);
	        	}
	        	// tabs.splice(targetIndex,1);	              
	        	// this.v1 = activeName;console.log('v1-1',this.v1)
	        	// this.tabs2 = tabs.filter(tab => tab.name !== targetIndex);
	        	// console.log('editableTabsValue2',this.tabIndex,'-|-','tabs2',this.tabs2)
	        }
		},
		
		mounted(){
			this.$watch('v1',(newVal,oldVal)=>{

			})
		}
})