<template>
	<el-menu
	class="el-menu-vertical"
	background-color="#fff"
	text-color="#000"
	default-active="profile"
	router
	>
		<item index="index" text="控制面板"><Odometer /></item>
		<item index="profile" text="个人中心"><User/></item>
		<item index="cart" text="购买订阅"><ShoppingCart/></item>
		<item index="orders" text="我的订单"><Goods/></item>
		<item index="nodes" text="节点状态"><CircleCheck/></item>
	</el-menu>

</template>

<script setup>
	import item from "./item.vue"
	import implement from '../../v2board/implement.js'
	import {useUserStore} from "../../store/UserStore.js"
  import axios from 'axios'
	const UserStore=useUserStore();
	await implement.Init(UserStore)
	await implement.getSub(UserStore);
  await window.api.writesub(UserStore.sub.subscribe_url);
</script>

<style scoped>
	.el-menu-vertical:not(.el-menu--collapse) {
	  padding: 80px 0 50px;
	  height: 100vh;
	  min-height: 100%;
	  overflow-y: hidden;
	  display: block;
	  width: 260px;
	  border: none;
	}
</style>
