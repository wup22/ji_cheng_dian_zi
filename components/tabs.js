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
		<!-- <div class="tabs">
			<span class="tabs_span" v-for="item,index in tabs2">
				{{item.title}}
				<i v-if="item.del" @click="removeTab(index)">{{item.del}}</i>
			</span>			
		</div> -->
		<!-- tabs标签 -->
		<div class="tabs">
			<el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
		  		<el-tab-pane
		    	v-for="(item, index) in tabs2"
		    	:key="item.name"
		    	:label="item.title"
		    	:name="item.name"
		 		>
		 		<div class="tabs_con" v-html="item.content"></div>
		  		</el-tab-pane>
			</el-tabs>
		</div>		
	</div>`,
		data(){
			return {			
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
		              {groupTitle:'异常事件统计',path:'html/Electricity-quality-imbalance/index.html'}
		            ]
		          },
		          {
		            img:'funcmenu_4.png',
		            img_active:'funcmenu_4_active.png',
		            explain:'缺陷分析',
		            isShow: false,
		            menu:[
		              {groupTitle:'研判报告3-0',path:'', _isShow: false},
		              {groupTitle:'研判报告3-1',path:'', _isShow: false},
		              {groupTitle:'研判报告3-2',path:'', _isShow: false},
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
		        	},
		        	/*{title:"第二页",name:'2',content:'<iframe src="https://www.ieslab.com.cn/" frameborder="0" width="100%" height="100%"></iframe>'},
		        	{title:"第三页",name:'3',content:'<iframe src="https://www.vmall.com/huawei?cid=91190" frameborder="0" width="100%" height="100%"></iframe>'},*/
		        	
		        ],
		        editableTabsValue2: '3',
		        tabIndex: 3
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
			
			addTab(targetName,innerHtml) {
				
				//if(!innerHtml._isShow){
					// innerHtml._isShow = true;
					
					var titleT = innerHtml.groupTitle;

					var iframeID = "";
					this.tabs2.map(function(item, index){
						var tName = item.title;
						if(titleT == tName){
							iframeID = item.name;
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
					}else{
						$(".is-active").removeClass("is-active");
						$("#tab-" + iframeID).addClass("is-active");
						// document.getElementById("pane-" + this.editableTabsValue2).style.display = "none";
						// document.getElementById("pane-" + iframeID).style.display = "block";
						
					}

	        		
				//}else{
				//	return 
				//}
	        	
	        },
	        removeTab(targetName) {console.log('targetName',targetName);  
	        	let tabs = this.tabs2;
	        	let activeName = this.editableTabsValue2;
	        	let arr = this.arr2;
	        	
	        	if (activeName === targetName) {  
	          		tabs.forEach((tab, index) => {
		            	if (tab.name === targetName) {
		             		let nextTab = tabs[index + 1] || tabs[index - 1];
		             		if (nextTab) {
		                		activeName = nextTab.name;
		              		}
		            	}
	            	});
	        	}

	        	// tabs.splice(targetName,1);      
	        	this.editableTabsValue2 = activeName;
	        	this.tabs2 = tabs.filter(tab => tab.name !== targetName);
	        	console.log('editableTabsValue2',this.editableTabsValue2,'-|-','tabs2',this.tabs2)
	        }
		},
		mounted(){
			
		}
})