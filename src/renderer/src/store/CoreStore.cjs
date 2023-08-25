import {defineStore} from "pinia"
export const  useCoreStore = defineStore("coreInfo",{
	state:()=>({
		start:false,
		timespan:"00:00:00",
	}),
	getters: {
		
	},
	actions:{
		coreaction(){
			this.start = ! this.start;
		}
	}
})