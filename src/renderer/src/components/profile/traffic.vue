<template>
	<el-card class="traffic">
		<template #header>
		  <div class="card-header">
			<span>我的订阅</span>
			<el-button class="button">续订</el-button>
		  </div>
		</template>
		<div class="details">
			<span class="mysub">{{UserStore.sub.plan.name}}</span>
			<span>有效期{{daysBetween(UserStore.sub.expired_at)}}天</span>
			<span>总流量：{{((UserStore.sub.transfer_enable)/(1024*1024*1024)).toFixed(2)}}G</span>
		</div>
		<div class="progress">
			<span class="used">{{((UserStore.sub.d)/(1024*1024*1024)).toFixed(2)}} GB/ 
			{{((UserStore.sub.transfer_enable)/(1024*1024*1024)).toFixed(2)}} GB</span>
			<el-progress  
			:stroke-width="15" 
			:percentage="((UserStore.sub.d)/(1024*1024*1024)).toFixed(2)"
			:show-text="false"
			:color="customColorMethod"/>			
		</div>

	</el-card>
</template>

<script setup>
	import {ref,onBeforeMount} from "vue"
	import {useUserStore} from "../../store/UserStore.js"
	const UserStore=useUserStore();
	// import implement from "../../v2board/implement.js"
	// const sub =  ref();
	// await implement.getSub(sub);	
	const customColorMethod = (percentage) => {
	  if (percentage >= 100) {
	    return '#909399'
	  }else if (percentage > 90) {
	    return '#f56c6c'
	  }else if (percentage > 70) {
	    return '#e6a23c'
	  }
	  return '#67c23a'
	}
	const daysBetween = (expired)=>{
		let current = new Date().getTime();
		let timespan = expired*1000-current;
		return Math.floor(timespan / (24 * 3600 * 1000));
	}
</script>

<style scoped>
	
	.mysub{
		font-weight: 500;
		font-size: 32px;
	}
	.details{
		display: flex;
		flex-direction: column;
		height: 65vh;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
	.details span{
		text-align: center;
		color: #fff;
	}
	.traffic{
		height: 100%;
		width: 90%;
		display: flex;
		flex-direction: column;
		background-color: rgba(93, 93, 229, 0.5);
		background-image: url("../../assets/purplemap.png");
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	.card-header{
		display: flex;
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.progress{
		display: flex;
		flex-direction: column;
		margin-top: 10px;
		gap: 8px;
	}
	
	.used{
		align-self: flex-start;
		font-size: 12px;
		color: #fff;
	}
</style>