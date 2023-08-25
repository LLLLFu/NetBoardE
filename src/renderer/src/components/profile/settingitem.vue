<template>
	<el-link :underline="false">
	    <el-icon size="30px"><slot></slot></el-icon>
		<p>{{prop.tips}}</p>
	</el-link>
</template>

<script setup>
	const prop = defineProps(["tips"])
</script>

<style scoped>
	.el-link{
		display: flex;
		justify-content: flex-start;
		font-size: 20px;
		padding: 18px;
		color: rgb(93, 93, 229);
		border-radius: 8px;
	}
	.el-link .el-icon{
		padding-right: 10px;
	}
	.el-link:hover{
		color: #000;
		background-color: rgba(204, 204, 204,0.3);
	}
</style>