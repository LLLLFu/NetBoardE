<template>
	<slicklist></slicklist>
	<div class="control">
		<KeepAlive>
		<controllbtn class="btnc"></controllbtn>		
		</KeepAlive>
	</div>
	<suspense v-if="CoreStore.start">
		<template #default>
			<node class="node"> </node>
		</template>
	</suspense>
	
<!-- 	<node class="node"> </node> -->
	
</template>

<script setup>
	import controllbtn from "./index/btn.vue"
	import node from "./index/node.vue"
	import slicklist from "./index/slicklist.vue"
	import info from "../v2board/info.js"
	import {useCoreStore} from "../store/CoreStore.cjs"
	const CoreStore = new useCoreStore(); 
</script>

<style scoped>
	.node{
		justify-content: center;
		align-items: center;
		display: flex;
		width: 100%;
		padding-top: 20px;
		margin-left: -20px;
	}
	.control{
		flex-direction: row;
		display: flex;
		width: 100%;
		justify-content: center;
		padding-top: 25px;
	}

</style>