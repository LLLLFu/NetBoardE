<template>
	<el-container>
		<el-main>
			<wallet></wallet>
			<setting></setting>
		</el-main>
		<el-main>
			<suspense>
				<template #default>
					<traffic></traffic>
				</template>
			</suspense>
			
		</el-main>
	</el-container>
</template>

<script setup>
	import setting from "./profile/setting.vue"
	import wallet from "./profile/wallet.vue"
	import traffic from "./profile/traffic.vue"
</script>

<style scoped>
		.el-container{
			flex-grow: 1;
			flex-basis: 0;
			overflow-x: auto;
		}
	  .el-header,
	  .el-footer {
	    background-color: var(--el-color-primary-light-7);
	    color: var(--el-text-color-primary);
	    text-align: center;
	  }
	
	  .el-aside {
	    background-color: var(--el-color-primary-light-8);
	    color: var(--el-text-color-primary);
	    text-align: center;
	  }
	
	  .el-main {
		flex-grow: 1;
		flex-basis: 0;
		gap: 20px;
		flex-direction: column;
/* 	    background-color: var(--el-color-primary-light-9);
	    color: var(--el-text-color-primary); */
	    text-align: center;
/* 		border: 2px black dashed; */
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: top;
	  }
	  


</style>