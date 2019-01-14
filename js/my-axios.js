
const Axios = axios.create({
    baseURL: 'http://192.168.21.106:8080/bspower/a/',
    timeout: 8000,
    // headers: {'X-Custom-Header': 'foobar'}
});
	
Axios.interceptors.response.use(
  	config =>{
	    // console.log('config',config);
	    let code = config.data.code
	    if(code.toUpperCase() == "OK"){
	    	// console.log('aa',config.data.data)
	    	return config.data.data
	    }else{
	    	console.log('有错误',config.data.msg)
	    	// return config.data.msg
	    }
	    
  	},error =>{
  		console.log(error)
  	}
);

function ajaxGet(api, cb){
    Axios.get(api)
        .then(cb)
        .catch(err => {
            console.log(err);
        })
};
function ajaxPost(api, post, cb) {
    Axios.post(api, post)
        .then(cb)
        .catch(err => {
            console.log(err);
        })
}

