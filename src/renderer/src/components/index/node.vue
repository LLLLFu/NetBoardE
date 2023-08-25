<template>
	<el-form>
		 <el-form-item label="规则:">
		        <el-select
				v-model="thisrule"
				placeholder="Select"
         @click="getRule"
				>
		          <el-option
		            v-for="item in nodes"
		            :label="item.name"
		            :value="item.name"
		          />
		        </el-select>
		</el-form-item>
		<el-form-item label="节点:" v-if="thisrule">
		        <el-select
				v-model="thisnode"
				placeholder="Select"
				@change="choose"
				>
		          <el-option
		            v-for="item in nodes[thisrule]['proxies']"
		            :label="item.name"
		            :value="item.name"
		          />
		        </el-select>
		</el-form-item>
		<el-form-item label="模式:">
		        <el-select
				placeholder="Select"
				v-model="thismode"
				@change="choosemode"
				>
		          <el-option
		            v-for="item in mode"
		            :label="item.name"
		            :value="item.value"
		          />
		        </el-select>
		</el-form-item>
	</el-form>
</template>

<script setup>
import { ref } from 'vue';
import implement from "../../clash/implement.js"

const thisrule = ref("");
const thisnode = ref("");
const thismode = ref("");
const nodes = ref("");
const mode = [
	{"name":"全局","value":"Global"},
	{"name":"规则","value":"Rule"},
	{"name":"直连","value":"Direct"},
	{"name":"脚本","value":"Script"},
];
const choosemode = async (val)=>{
	await implement.setMode(val)
}
const choose = async (val)=>{
	await implement.setProxy(thisrule.value,val)
}
const getRule = async ()=>{
  console.log("hh")
 await implement.getProxies(nodes);
}


</script>

<style scoped>
	.el-form{
		justify-content: center;
		align-items: center;
		display: flex;
		width: 100%;
		flex-direction: column;
	}
	.el-form-item{
		justify-content: center;
		align-items: left;
		text-align: left;
		margin-left: 0;
	}
</style>
