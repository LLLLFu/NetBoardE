<template>
	<keep-alive>
		<el-scrollbar height="calc(100vh - 100px)">
		<div class="cartshow">
			<cartitem v-for="singleplan in  plans" :plan="singleplan"></cartitem>
		</div>			  
		</el-scrollbar>
	
	</keep-alive>

</template>

<script setup>
	import {ref,onBeforeMount} from "vue"
	import cartitem from "./cartitem.vue"
	import implement from "../v2board/implement.js"
	const plans =  ref();
	onBeforeMount(()=>{
		implement.getPlan(plans);	
	})

	
</script>

<style scoped>
.cartshow {
	display: grid;
	grid-template-columns: repeat(3,1fr);
	grid-gap: 20px;
}
</style>