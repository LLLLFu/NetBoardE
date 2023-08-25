import {defineStore} from "pinia"
export const  useUserStore= defineStore("user",{
	state:()=>({
		account:"",
		password:"",
		info:{},
		sub:{},
	}),
	getters: {
		
	},
	actions:{
	},
	 persist: {
	    enabled: true // true 表示开启持久化保存
	  }
})