function IesChosen(json){
	this.id = $(json.id);
	this.idName = json.id.substring(1,json.id.length)
	this.pagelength = json.pagelength!=undefined?json.pagelength : 5;
	this.oLi = $(json.id).children('option')
	this.oDiv1 = $(`<div class="input-group"></div>`)
	this.oDiv2 = $(`<div class="chosen-container chosen-container-single" style="width:100%" title="" id="byRtuModelSel_3_chosen">
			<a href="javascript:;" class="chosen-single">
				<span>请选择</span>
				<div>
					<b class="bBtm"></b>
				</div>
			</a>
			<div class="chosen-drop" style="display:none">
				<div class="chosen-search">
					<input type="text" autocomplete="off" tabindex="2">
				</div>
				<div class="chosen-scroll">
					<ul class="chosen-results"></ul>
				</div>
				<div class="chosen-paginate">
					<a href="javascript:;" class="paginate-btn disabled" id="${this.idName}-previous"><</a>
					<span></span>
					<a href="javascript:;" class="paginate-btn" id="${this.idName}-next">></a>
				</div>
			</div>
		</div>`);
	this.index = 0;
	this.oIndex = 0;
	this.page = 0;
	this.arr = json.data!=undefined?json.data:[];
	this.filterArr = [];
	// console.log(this.arr)
	this.init();
	this.selectEvent();
	
}  
IesChosen.prototype.createEle = function(){
	
}

IesChosen.prototype.init = function(){
	this.id.css('display' , 'none');
	if(this.arr.length == 0){
		this.oLi.each((i,n)=>{
			this.arr.push({name:n.value,id:n.innerHTML})
			// console.log(n)
		})
	}
	//创建分页按钮
	this.page = Math.ceil(this.arr.length / this.pagelength)
	let oSpan = this.oDiv2.find('.chosen-drop').find('.chosen-paginate').find('span')
	if(this.page < 10){
		for(let i = 0;i < this.page;i++){
			$(`<a href="javascript:;" class="paginate-btn">${i+1}</a>`).appendTo(oSpan)
		}
	}else{
		for(let i = 0;i < 9;i++){
			$(`<a href="javascript:;" class="paginate-btn">${i+1}</a>`).appendTo(oSpan)
		}
		$(`<i>...</i><a href="javascript:;" class="paginate-btn">${this.page}</a>`).appendTo(oSpan)
	}
	//布局展示在li中
	let oUl = this.oDiv2.find('.chosen-drop').find('.chosen-results');
	for(let i = 0;i < this.pagelength;i++){
		$(`<li class="active-result">${this.arr[i].name}</li>`).appendTo(oUl)
	}
	// console.log(this.id);
	this.oDiv1.appendTo(this.id.parent())
	this.id.appendTo(this.oDiv1)
	this.oDiv2.appendTo(this.oDiv1)	
	let oPageIndex = this.oDiv2.find('#'+this.idName+'-previous').next('span').children('.paginate-btn')
	oPageIndex.eq(0).css('color','orange')
}

IesChosen.prototype.selectEvent = function(){
	//展示框
	let oA = this.oDiv2.find('.chosen-single')
	//搜索框
	let Input = this.oDiv2.find('.chosen-drop').find('.chosen-search').children('input')
	//点击选择框显示下拉
	oA.click(function(){
		event.stopPropagation();
		oA.next('.chosen-drop').toggle() 
		oA.find('div').find('b').removeClass().addClass('bTop')
		// console.log('aaa')
	})
	//点击选中li元素
	let oLi = this.oDiv2.find('.chosen-drop').find('.chosen-results').find('.active-result')
	oLi.click((ev)=>{
		event.stopPropagation();
		// console.log(oA.next('.chosen-drop').css('display'))
		oA.find('span').html(ev.target.innerHTML);
		this.oDiv2.find('.chosen-drop').hide()
		oA.find('div').find('b').removeClass().addClass('bBtm')
		// console.log('bbb')
	})
	//获取上一页按钮
	let oPrevious = this.oDiv2.find('#'+this.idName+'-previous')
	//获取下一页按钮
	let oNext = this.oDiv2.find('#'+this.idName+'-next')
	//获取分页按钮
	let oPageIndex = this.oDiv2.find('#'+this.idName+'-previous').next('span').children('.paginate-btn')
	//上一页点击事件
	oPrevious.click(()=>{
		event.stopPropagation();
		// console.log(this.index)
		if(this.index == 0){
			oNext.removeClass('disabled')
			oPrevious.addClass('disabled')
			oPageIndex.css('color','#bad9fb')
			oPageIndex.eq(0).css('color','orange')
			return
		}else{
			this.index--;
						
			if(this.index == 0){
				oNext.removeClass('disabled')
				oPrevious.addClass('disabled')
				// console.log(this.index)
			}else{
				oPrevious.removeClass('disabled')
				oNext.removeClass('disabled')
			}
			//分页操作
			if((this.page - this.index + 1) > 10){
				oPageIndex.siblings('i').show()
				// oPageIndex.css('color','#bad9fb')
				for(let i = 0;i < 9;i++){
					oPageIndex.eq(i).html(this.index+i+1)
					// console.log('m---',oPageIndex.eq(i).html()) 
				}	
				oPageIndex.css('color','#bad9fb').eq(0).css('color','orange')
				// console.log('mmmmm----')			
			}else if((this.page - this.index + 1) <= 10){
				oPageIndex.siblings('i').hide()
				this.oIndex--;
				for(let i = 0;i < 10;i++){
					oPageIndex.eq(9-i).html(this.page-i)
					// console.log('m>>>',oPageIndex.eq(9-i).html())
				}	
				oPageIndex.css('color','#bad9fb')
				oPageIndex.map((index,item)=>{
					if(item.innerHTML == this.index+1){
						item.style.color = 'orange'
					}
				})
				// oPageIndex.css('color','#bad9fb').eq(this.oIndex).css('color','orange')
				// console.log('mmmmm====')
			}
			let start = this.pagelength * this.index
			let end = this.pagelength * (this.index + 1)
			let arr2 = []
			if(this.filterArr.length !== 0 && Input.val()!=''){
				arr2 = this.filterArr.slice(start,end);
				// console.log('cc',this.filterArr.length,Input.val())
			}else{
				arr2 = this.arr.slice(start,end);
				// console.log('vv',this.filterArr.length,Input.val())
			}
			showLi(oLi,arr2)
		}
	})
	//下一页点击事件
	oNext.click(()=>{
		event.stopPropagation();
		// console.log(this.index)
		if(this.index == this.page-1){
			oPrevious.removeClass('disabled')
			oNext.addClass('disabled')
			oPageIndex.css('color','#bad9fb')
			oPageIndex.last().css('color','orange')
			return
		}else{
			this.index++;
			
			if(this.index == this.page-1){
				oPrevious.removeClass('disabled')
				oNext.addClass('disabled')
				oPageIndex.css('color','#bad9fb')
				oPageIndex.last().css('color','orange')				
				// console.log(this.index)
			}else{
				oPrevious.removeClass('disabled')
				oNext.removeClass('disabled')
			}
			//分页操作
			if((this.page - this.index + 1) > 10){
				oPageIndex.siblings('i').show()
				for(let i = 0;i < 9;i++){
					oPageIndex.eq(i).html(this.index+i+1)
					// console.log('m+++',oPageIndex.eq(i).html()) 
				}	
				oPageIndex.eq(0).css('color','orange')
				// console.log('mmmmm----')			
			}else if((this.page - this.index + 1) <= 10){
				oPageIndex.siblings('i').hide()
				this.oIndex++;
				for(let i = 0;i < 10;i++){
					oPageIndex.eq(9-i).html(this.page-i)
					// console.log('m>>>',oPageIndex.eq(9-i).html())
				}	
				oPageIndex.css('color','#bad9fb')
				oPageIndex.map((index,item)=>{
					if(item.innerHTML == this.index+1){
						item.style.color = 'orange'
					}
				})
				// oPageIndex.css('color','#bad9fb').eq(this.oIndex).css('color','orange')
				// console.log('mmmmm====')
			}
			let start = this.pagelength * this.index
			let end = this.pagelength * (this.index + 1)
			let arr2 = []
			if(this.filterArr.length > 0 && Input.val()!=''){
				arr2 = this.filterArr.slice(start,end);
				// console.log('qq',this.filterArr.length,Input.val())
			}else{
				arr2 = this.arr.slice(start,end);
				// console.log('ww',this.filterArr.length)
			}
			showLi(oLi,arr2)
		}
	})
	//分页按钮点击事件
	oPageIndex.click(()=>{
		event.stopPropagation();
		oPageIndex.css('color','#bad9fb')  
		 this.index = parseInt(event.target.innerText) - 1 ;		
		if(this.index==0){
			oNext.removeClass('disabled')
			oPrevious.addClass('disabled')
			oPageIndex.css('color','#bad9fb').eq(this.oIndex).css('color','orange')
		}else if(this.index==this.page-1){
			oPrevious.removeClass('disabled')
			oNext.addClass('disabled')
			event.target.style.color = 'orange'
		}else if(this.index>0 && this.page>10){
			oPrevious.removeClass('disabled')
			oNext.removeClass('disabled')
			//分页判断
			if((this.page - this.index + 1) > 10){
				//多余10页显示省略号
				this.index--;
				oPageIndex.siblings('i').show()
				for(let i = 0;i < 9;i++){
					oPageIndex.eq(i).html(this.index+i+1)
					// console.log('m+++',oPageIndex.eq(i).html()) 
				}	
				oPageIndex.eq(0).css('color','orange')
				// console.log('mmmmm----')			
			}else if((this.page - this.index + 1) <= 10){
				//少于10页不显示省略号
				oPageIndex.siblings('i').hide()
				for(let i = 0;i < 10;i++){
					oPageIndex.eq(9-i).html(this.page-i)
					// console.log('m>>>',oPageIndex.eq(9-i).html())
				}
				oPageIndex.map((index,item)=>{
					if(item.innerHTML == this.index+1){
						item.style.color = 'orange'
					}
				})
				// event.target.style.color = 'orange'	
				// console.log('mmmmm====')
			}
		}else{
			oPrevious.removeClass('disabled')
			oNext.removeClass('disabled')
		}
		this.oIndex = $(event.target).index()
		console.log('dsd',$(event.target).index(),this.oIndex)
		//截取数据展示
		let start = this.pagelength * this.index
		let end = this.pagelength * (this.index + 1)
		let arr2 = [];
		if(this.filterArr.length!==0){
			arr2 = this.filterArr.slice(start,end);
		}else{
			arr2 = this.arr.slice(start,end);
		}
		showLi(oLi,arr2)
	})
	//搜索框事件
    Input.on({
    	"click":function(){
    		event.stopPropagation();
    		// console.log(event.target)
    	},
    	"input propertychange":function(){

    		//过滤关键字
    		this.filterArr = this.arr.filter((item,index)=>{
    			// console.log(item)
    			let ss = item.name.toString()
    			if(ss.indexOf(event.target.value)==-1){

    			}else{
    				return item 
    			}   			  			
    		})
    		// console.log(this.filterArr)
    		this.index = 0
    		oNext.removeClass('disabled')
			oPrevious.addClass('disabled')
			oPageIndex.css('color','#bad9fb')
			oPageIndex.eq(0).css('color','orange')
    		let start = this.pagelength * this.index
			let end = this.pagelength * (this.index + 1)
			let arr2 = this.filterArr.slice(start,end);
			this.page = Math.ceil(this.filterArr.length / this.pagelength)
			let oSpan = this.oDiv2.find('.chosen-drop').find('.chosen-paginate').find('span')
			let len = this.page
			let oPage = oSpan.find('.paginate-btn')
			if(len >= 10){
				oPage.siblings('i').show()
				oPage.last().show().html(len)
				// console.log(len)
			}else if(len < 9){
				oPage.siblings('i').hide()
				oPage.last().hide()
				console.log()
			}
			for(let i = 0;i < 9;i++){
				if(i >= len){
					oPage.eq(i).hide()
				}else{
					oPage.eq(i).html(i+1).show()
				}
				
			}
		
			showLi(oLi,arr2)
    	}.bind(this)
    })
	//点击body隐藏下拉
	this.oDiv1.parents('body').click(()=>{
		event.stopPropagation();
		this.oDiv2.find('.chosen-drop').hide()
		oA.find('div').find('b').removeClass().addClass('bBtm')	
		// console.log('ccc')	
	})
	
}
//展示切换li的文本
function showLi(tagName,arr2){
	tagName.map(function(index,item){
		if(index >= arr2.length){
			$(this).hide()
		}else{
			$(this).html(arr2[index].name).show()
		}
	}) 
}

//根据id获取对象
function $(id){
	return document.getElementById(id);
}
//根据标签名获取指定对象下的所有的元素。
function $get(obj,tagName){
	if(typeof obj == 'object'){
		return obj.getElementsByTagName(tagName);
	}else if(typeof obj == 'string' && $(obj)){
		return $(obj).getElementsByTagName(tagName);
	}
}
//创建对象
function $create(tagName){
	return document.createElement(tagName);
}


