<template>
	<el-form >
		<el-input v-model="UserStore.account" size="large" placeholder="账户" />
		<el-input v-model="UserStore.password" type="password" show-password size="large" placeholder="密码" />
		<el-button color="#626aef" :loading="isLoading" @click.stop="loginhandle">登录</el-button>
	</el-form>
</template>

<script setup>
	import {reactive,ref} from 'vue'
	import implement from '../../v2board/implement.js'
	import { ElNotification } from 'element-plus'
	import {useUserStore} from "../../store/UserStore.js"
	const UserStore=useUserStore();
	// const {account,password} = storeToRefs(new useUserStore());
	const isLoading = ref(false);
	const loginhandle = ()=>{
		isLoading.value = true;
		implement.Login({
			"email":UserStore.account,
			"password": UserStore.password,
		},(res,status)=>{
			isLoading.value = false;
			if(status){
				localStorage.setItem("Authorization",res.auth_data);
				setTimeout(()=>{
					window.location.reload();
				},2000)
			}else{
				alert("登录失败！"+res.data.message) ;
			}
			
		})
	}
	
</script>

<style scoped>
	.el-form {
		display: flex;
		margin-top: 30px;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.el-form-item {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	
	}
	
	.el-button {
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		margin: 0;
		font-family: inherit;
		overflow: visible;
		text-transform: none;
		border-radius: 7px !important;
		line-height: 1.5715;
		position: relative;
		display: inline-block;
		font-weight: 400;
		white-space: nowrap;
		text-align: center;
		cursor: pointer;
		transition: all .3s cubic-bezier(.645, .045, .355, 1);
		user-select: none;
		touch-action: manipulation;
		border: 1px solid #d9d9d9;
		outline: 0;
		height: 40px;
		padding: 6.4px 15px;
		font-size: 16px;
		color: #fff;
		text-shadow: 0 -1px 0 rgba(0, 0, 0, .12);
		box-shadow: 0 2px #0000000b;
		-webkit-appearance: button;
		width: 80%;
	}
	
	.el-input {
		justify-content: center;
		align-items: center;
		overflow: visible;
		border-radius: 7px !important;
		position: relative;
		width: 80%;
		min-width: 0;
		border: 1px solid #d9d9d9;
		transition: all .3s;
		font-size: 16px;
		-webkit-appearance: none;
		touch-action: manipulation;
		text-overflow: ellipsis;
		margin-bottom: 20px;
	}
</style>