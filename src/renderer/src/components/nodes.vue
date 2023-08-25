<template>
  <el-scrollbar height="calc(100vh - 100px)">
<!--    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p> -->
	<el-table :data="status" style="width: 100%" height="calc(100vh - 100px)">
		<el-table-column prop="id" label="节点" width="100"/>
		<el-table-column prop="name" label="节点名称"  />
		<el-table-column 
		prop="is_online" 
		label="状态"
		:filters="[
			{ text: '正常', value: 1 },
			{ text: '异常', value: 0 },
			]"
		:filter-method="filterTag"
		filter-placement="bottom-end"
		>
		  <template #default="scope">
			<el-tag
				  :type="scope.row.is_online === 1 ? 'success' : 'danger'"
				  disable-transitions
				  >{{ scope.row.is_online === 1 ? '正常' : '异常'}}
			</el-tag>
		  </template>
		</el-table-column>
		<el-table-column prop="rate" label="倍率" />
		<el-table-column prop="type" label="节点类型" />
	</el-table>
  </el-scrollbar>
</template>
<script setup>
	import {ref,onBeforeMount} from "vue"
	import implement from "../v2board/implement.js"
	const status =  ref();
	onBeforeMount(()=>{
		implement.getStatus(status);	
	});
	const filterTag = (value, row) => {
	  return row.is_online === value
	}
</script>

