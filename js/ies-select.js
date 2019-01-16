function IesChosen(json){
	this.id = $(json.id);
	this.idName = json.id.substring(1,json.id.length)
	// this.data = [];
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
					<a href="javascript:;" class="paginate-btn" id="${this.idName}-previous"><</a>
					<span></span>
					<a href="javascript:;" class="paginate-btn" id="${this.idName}-next">></a>
				</div>
			</div>
		</div>`);
	this.index = 0;
	this.page = 0;
	this.arr = json.data!=undefined?json.data:[];
	this.filterArr = [];
	console.log(this.arr)
	this.init();
	this.selectEvent();
	
}  

IesChosen.prototype.init = function(){
	this.id.css('display' , 'none');
	if(this.arr.length == 0){
		this.oLi.each((i,n)=>{
			this.arr.push({name:n.value,id:n.innerHTML})
			console.log(n)
		})
	}
	
	this.page = Math.ceil(this.arr.length / this.pagelength)
	let oSpan = this.oDiv2.find('.chosen-drop').find('.chosen-paginate').find('span')
	for(let i = 0;i < this.page;i++){
		$(`<a href="javascript:;" class="paginate-btn">${i+1}</a>`).appendTo(oSpan)
	}

	let oUl = this.oDiv2.find('.chosen-drop').find('.chosen-results');
	for(let i = 0;i < this.pagelength;i++){
		$(`<li class="active-result">${this.arr[i].name}</li>`).appendTo(oUl)
	}
	// console.log(this.id);
	this.oDiv1.appendTo(this.id.parent())
	this.id.appendTo(this.oDiv1)
	this.oDiv2.appendTo(this.oDiv1)	
}

IesChosen.prototype.selectEvent = function(){
	let oA = this.oDiv2.find('.chosen-single')
	//点击选择框显示下拉
	oA.click(function(){
		event.stopPropagation();
		oA.next('.chosen-drop').show() 
		oA.find('div').find('b').removeClass().addClass('bTop')
		console.log('aaa')
	})
	//点击选中li元素
	let oLi = this.oDiv2.find('.chosen-drop').find('.chosen-results').find('.active-result')
	oLi.click((ev)=>{
		event.stopPropagation();
		// console.log(oA.next('.chosen-drop').css('display'))
		oA.find('span').html(ev.target.innerHTML);
		this.oDiv2.find('.chosen-drop').hide()
		oA.find('div').find('b').removeClass().addClass('bBtm')
		console.log('bbb')
	})
	//上一页按钮
	let oPrevious = this.oDiv2.find('#'+this.idName+'-previous')
	oPrevious.click(()=>{
		event.stopPropagation();
		// console.log(this.index)
		if(this.index == 0){
			oNext.removeClass('disabled')
			oPrevious.addClass('disabled')
			return
		}else{
			this.index--;
			let start = this.pagelength * this.index
			let end = this.pagelength * (this.index + 1)
			let arr2 = []
			if(this.filterArr.length !== 0){
				arr2 = this.filterArr.slice(start,end);
			}else{
				arr2 = this.arr.slice(start,end);
			}
			showLi(oLi,arr2)
			oPrevious.removeClass('disabled')
			oNext.removeClass('disabled')
		}
	})
	//下一页按钮
	let oNext = this.oDiv2.find('#'+this.idName+'-next')
	oNext.click(()=>{
		event.stopPropagation();
		// console.log(this.index)
		if(this.index == this.page-1){
			oPrevious.removeClass('disabled')
			oNext.addClass('disabled')
			return
		}else{
			this.index++;
			let start = this.pagelength * this.index
			let end = this.pagelength * (this.index + 1)
			let arr2 = []
			if(this.filterArr.length !== 0){
				arr2 = this.filterArr.slice(start,end);
				console.log('qq',this.filterArr.length)
			}else{
				arr2 = this.arr.slice(start,end);
				console.log('ww',this.filterArr.length)
			}
			showLi(oLi,arr2)
			oPrevious.removeClass('disabled')
			oNext.removeClass('disabled')

		}
	})
	//点击分页按钮
	let oPageIndex = this.oDiv2.find('#'+this.idName+'-previous').next('span').children('.paginate-btn')
	oPageIndex.click(()=>{
		event.stopPropagation();
		this.index = oPageIndex.index(event.target)
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
	let Input = this.oDiv2.find('.chosen-drop').find('.chosen-search').children('input')
    Input.on({
    	"click":function(){
    		event.stopPropagation();
    		// console.log(event.target)
    	},
    	"input propertychange":function(){
    		this.filterArr = this.arr.filter((item,index)=>{
    			// console.log(item)
    			let ss = item.name.toString()
    			if(ss.indexOf(event.target.value)==-1){

    			}else{
    				return item 
    			}   			  			
    		})
    		console.log(this.filterArr)
    		this.index = 0
    		let start = this.pagelength * this.index
			let end = this.pagelength * (this.index + 1)
			let arr2 = this.filterArr.slice(start,end);
			this.page = Math.ceil(this.filterArr.length / this.pagelength)
			let oSpan = this.oDiv2.find('.chosen-drop').find('.chosen-paginate').find('span')
			let len = this.page
			oSpan.find('.paginate-btn').map(function(index,item){
				// console.log('lll',index,item,len)
				if(index >= len){
					$(this).hide()
				}else{
					$(this).html(index+1).show()
				}
			})
			showLi(oLi,arr2)
    	}.bind(this)
    })
	//点击body隐藏下拉
	this.oDiv1.parents('body').click(()=>{
		event.stopPropagation();
		this.oDiv2.find('.chosen-drop').hide()
		oA.find('div').find('b').removeClass().addClass('bBtm')	
		console.log('ccc')	
	})
	
}
function showLi(arr,arr2){
	arr.map(function(index,item){
		if(index >= arr2.length){
			$(this).hide()
		}else{
			$(this).html(arr2[index].name).show()
		}
	}) 
}




