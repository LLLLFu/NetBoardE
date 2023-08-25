<template>

<div>
	<div class="styles_JP-Du">
		<div class="styles_pbYIU">{{props.plan.name}}</div>
		<div class="styles_v88pc">
			<div>
				<p>¥ {{planclass.price}} CNY</p><span>{{planclass.type}}</span>
			</div>
		</div>
		<div class="styles_a1mQ8" v-html="props.plan.content"></div>
		<div class="styles_sb3uM">
			<el-button  plain>立即订阅</el-button>
		</div>
	</div>
</div>	

</template>

<script setup>
	import {defineProps,ref} from "vue"
	const props = defineProps(["plan"])
	const planclass = ref({
		type:"",
		price:""
	});
	for (let plantype in props.plan) {
	    if(plantype.includes("price") && props.plan[plantype]){
			switch(plantype){
				case "month_price":
					planclass.value.type = "\u6708\u4ed8";
				break;
				case "quarter_price":
					planclass.value.type = "\u5b63\u4ed8";
				break;
				case "half_year_price":
					planclass.value.type = "\u534a\u5e74\u4ed8";
				break;
				case "year_price":
					planclass.value.type = "\u4e24\u5e74\u4ed8";
				break;
				case "two_year_price":
					planclass.value.type = "\u6708\u4ed8";
				break;
				case "three_year_price":
					planclass.value.type = "\u4e09\u5e74\u4ed8";
				break;
				case "onetime_price":
					planclass.value.type = "\u4e00\u6b21\u6027";
				break;
				case "reset_price":
					planclass.value.type = "\u6d41\u91cf\u91cd\u7f6e\u5305";
				break;
				case "onetime_price":
					planclass.value.type = "\u4e00\u6b21\u6027";
				break;
			}
			planclass.value.price = props.plan[plantype]/100;
			break;
		}
	}
	if(props.plan.content.includes("feature") ){
		 let contentArray = JSON.parse(props.plan.content);
		let newContent = "";
		contentArray.forEach(
			(s)=>{
				newContent += s.feature +"<br>";
			}
		)
		props.plan.content = newContent;
	}
</script>

<style scoped>
	.el-button.is-plain {
	    --el-button-hover-text-color:#8a8ef2;
	    --el-button-hover-bg-color: #fff;
	    --el-button-hover-border-color: #8a8ef2;
	}
	.styles_tz6z1 {
	    display: grid;
	    grid-template-columns: repeat(3,1fr);
	    grid-gap: 20px;
	}
	.styles_JP-Du {
	    padding: 20px;
	    border-radius: 7px;
	    border: 2px solid #1414140d;
	}
	.styles_pbYIU {
	    font-size: 20px;
	    font-weight: 600;
	    margin-bottom: 10px;
	}
	.styles_a1mQ8 {
	    font-size: 14px;
	    margin: 20px 0;
	    opacity: .7;
	}
	.styles_sb3uM {
	    margin-top: 30px;
	}
</style>