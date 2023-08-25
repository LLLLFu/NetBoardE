import instance from "./instance.js"
class info{
	static send(method,path,params,handler){
		return instance({
		  method: method,
		  url: path,
		  data: params
		})
		.then((result)=>{
			handler(result.data);
		})
		.catch((error)=>{
			let serrorEvent = new Event('clashCommunicateError');
			serrorEvent.e = error;
			window.dispatchEvent(serrorEvent);
			if (error.response) {
			      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
			      console.log(error.response.data);
			      console.log(error.response.status);
			      console.log(error.response.headers);
			    } else if (error.request) {
			      // 请求已经成功发起，但没有收到响应
			      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
			      // 而在node.js中是 http.ClientRequest 的实例
			      console.log(error.request);
			    } else {
			      // 发送请求时出了点问题
			      console.log('Error', error.message);
			    }
			    console.log(error.config);
		});
	}
	static post(path,params,handler){
		return this.send("post",path,params,handler);
	}
	static get(path,params,handler){
		return this.send("get",path,params,handler);
	}	
	static put(path,params,handler){
		return this.send("put",path,params,handler);
	}
	static patch(path,params,handler){
		return this.send("patch",path,params,handler);
	}
}
export default info