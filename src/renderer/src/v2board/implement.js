import info from "./info.js"
export default {
	"Login":(form,success)=>{
		return info.post("/passport/auth/login",form,(res,status)=>{
			success(res,status);
		})
	},
	"getPlan":(plans)=>{
		return info.get("/user/plan/fetch",{},(res)=>{
			plans.value = res
		})
	},
	"getStatus":(status)=>{
		return info.get("/user/server/fetch",{},(res)=>{
			status.value = res
		})
	},
	"getOrder":(order)=>{
		return info.get("/user/order/fetch",{},(res)=>{
			order.value = res
		})
	},
	"getInfo":(userInfo)=>{
		return info.get("/user/info",{},(res)=>{
			userInfo.value = res
		})
	},
	"getSub":(userInfo)=>{
		return info.get("/user/getSubscribe",{},(res)=>{
			userInfo.sub = res
		})
	},
	"Init":(userInfo)=>{
		return info.get("/user/info",{},(res)=>{
			userInfo.info = res
		})
	},
}
