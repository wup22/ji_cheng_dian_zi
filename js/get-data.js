
async function $ajax(url,list){
	const Axios = axios.create({
	    baseURL: 'http://192.168.21.106:8080/bspower/a/',
	    timeout: 8000,
	    // headers: {'X-Custom-Header': 'foobar'}
	});
	/*return await new Promise((resolve,reject)=>{
		list =  Axios.get(url);
		if(list){
			console.log('list',list.data)       	
			resolve(1) 
		}else{
			reject(0)
		}	
	})*/
	let sss = await Axios.get(url);
	console.log(sss.data)
	let flag = sss.data;				
	if(flag.code.toUpperCase() == 'OK'){
		this.list = flag.data	
		console.log(this)	
		console.log('list',this.list)
		return list
	}else{
		console.log(flag.msg)
	}	
	/*return Axios.get(url).then((res)=>{				
		let flag = res.data;				
		if(flag.code.toUpperCase() == 'OK'){
			list = flag.data
			// return list
			console.log('list',list)
		}else{
			console.log(flag.msg)
		}				
	}).catch((err)=>{
		console.log(err);
	});*/
}

