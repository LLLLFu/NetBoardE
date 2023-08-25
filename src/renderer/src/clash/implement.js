import info from "./info.js"
export default {
	"getConfig":(config)=>{
		return info.get("/configs",{},(res)=>{
			config.value = res
		})	
	},
	"getVersion":(version)=>{
		return info.get("/version",{},(res)=>{
			version.value = res
		})	
	},
	"getProxies":(proxies)=>{
		return info.get("/providers/proxies",{},(res)=>{
			proxies.value = res.providers
		})	
	},
	"setProxy":(rule,proxy)=>{
		return info.put("/proxies/"+rule,{"name":proxy},()=>{
			console.log("设置成功！")
		})	
	},
	"setMode":(mode)=>{
		return info.patch("/configs",{"mode":mode},()=>{
			console.log("设置成功！")
		})	
	},
	
}
		