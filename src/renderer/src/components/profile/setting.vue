<template>
	<el-card class="settings">
		<el-scrollbar>
			<settingitem tips="账户"><User/></settingitem>
			<settingitem tips="邀请"><Share /></settingitem>
			<settingitem tips="流量明细"><Histogram /></settingitem>
			<settingitem tips="加入群组"><Connection/></settingitem>	
		</el-scrollbar>
	</el-card>
</template>

<script setup>
	import settingitem from "./settingitem.vue"
</script>

<style scoped>
	.settings{
		height: calc(100% - 200px);
		width: 90%;
		display: flex;
		flex-direction: column;
	}
</style>