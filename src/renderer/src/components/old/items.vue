<template>
	<div class="items">
		<item v-for="single in itemList" :text="single.name" :iicon="single.icon"></item>
	</div>
</template>

<script setup>
	import item from "./item.vue"
	import {ref} from "vue"
	
	
	const itemList = ref([
		{"name":"仪表盘","icon":"cube-outline"},
		{"name":"我的订单","icon":"card-outline"}
	])
</script>

<style scoped>
	.items{
		padding: 80px 0 50px;
		height: 100vh;
		min-height: 100%;
		overflow-y: auto;
		display: block;
		width: 260px;
	}
</style>