
import instance from "./instance.js"
class info{
	static send(method,path,params,handler){
		return instance({
		  method: method,
		  url: path,
		  data: params
		})
		.then((result)=>{
			handler(result.data.data,true);
		})
		.catch((error)=>{
			handler(error.response,false);
			let serrorEvent = new Event('apiCommunicateError');
			serrorEvent.e = error;
			window.dispatchEvent(serrorEvent);
		});
	}
	static post(path,params,handler){
		return this.send("post",path,params,handler);
	}
	static get(path,params,handler){
		return this.send("get",path,params,handler);
	}	
}
export default info