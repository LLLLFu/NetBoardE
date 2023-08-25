<template>
	<div class="toolbar">
		<div class="desc">
			<span>主面板</span>
		</div>
		<div>
			<el-dropdown class="info">
				<span class="user">
					<el-icon><User /></el-icon>
					<span class="username">{{UserStore.info.email}}</span>
					<el-icon><ArrowDown /></el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
					<el-dropdown-item @click="logout">登出</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>

	</div>
</template>
<script setup>
	import { useRouter } from 'vue-router';
	import {useUserStore} from "../../store/UserStore.js"
	const UserStore=useUserStore();
	const logout = ()=>{
		localStorage.removeItem("Authorization");
		window.location.reload();
	}
</script>
<style scoped>
.user{
	display: flex;
}
	
.username{
	display: inline-flex;
	justify-content: center;
	align-items: center;
	margin-left: 5px;
	margin-right: 5px;
	margin-top: -4px;
	vertical-align: text-top;
	
}
.info{
	position: relative;
	font-weight: 400;
	white-space: nowrap;
	text-align: center;
	cursor: pointer;
	transition: all .3s cubic-bezier(.645,.045,.355,1);
	user-select: none;
	touch-action: manipulation;
	height: 32px;
	font-size: 14px;
	border: 1px solid #d9d9d9;
	outline: 0;
	color: #000000d9;
	border-color: transparent;
	background: transparent;
	box-shadow: none;
	display: flex;
	align-items: center;
	justify-content: center;
	-webkit-appearance: button;
	margin-left: 8px;
	padding: 8px;
}

.toolbar {
	width: calc(100% - 260px);
    max-width: 1280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
	margin: 0;
    position: fixed;
    top: 0;
    z-index: 99;
  
}
.desc {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
}

</style>