<template>
	<el-menu-item :index="props.index"  class="singleItem">
	  <el-icon><slot></slot></el-icon>
	  <span>{{props.text}}</span>
	</el-menu-item>
</template>

<script setup>
	import {defineProps} from "vue"
	const props = defineProps(["index","text"])
</script>

<style scoped>
	.is-active{
		background: rgb(93, 93, 229);
		color: rgb(255, 255, 255);
	}
	.singleItem{
	    display: flex;
	    align-items: center;
	    width: 100%;
		height: 45px;
	    padding: 10px 18px;
	    border-radius: 7px;
	    font-size: 14px;
	    font-weight: 400;
	    margin: 10px 0;
	    transition: all .3s ease-in-out;
		text-decoration: none;
		outline: none;
		cursor: pointer;
	}
	el-icon{
		margin-right: 8px;
	}
</style>