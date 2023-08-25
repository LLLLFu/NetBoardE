<script setup>
import logo from "./components/app/logo.vue"
import leftmenu from "./components/app/menu.vue"	
import toolbar from "./components/app/toolbar.vue"	
import error from "./components/error.vue"
import login from "./components/login.vue"	
import {ref} from 'vue'
const RequestError = ref({"status":false,"reason":"","isLogin":true})
window.addEventListener("clashCommunicateError",(e)=>{
	console.log("clashCommunicateError",e)
})
window.addEventListener("apiCommunicateError",(e)=>{
	RequestError.value.status = true;
	if (e.e.response) {
		RequestError.value.reason = e.e.response.data.message;
		RequestError.value.isLogin = false;
	} else if (e.e.request) {
	  RequestError.value.reason = "请求已经成功发起，但没有收到响应";
	} else {
		RequestError.value.reason ="发送请求时出了点问题";
	}
})

</script>

<template>
  <div class="common-layout" v-if="!RequestError.status">
    <el-container>
      <el-aside >
		  <logo></logo>
		  <Suspense><leftmenu></leftmenu></Suspense>
		  <img class="gura" src="/src/assets/GuraAprilfoolL2D.jpg" />	
	  </el-aside>
      <el-container>
		<el-header><toolbar></toolbar></el-header>
        <el-main class="appmain">
			<router-view ></router-view>
		</el-main>
      </el-container>
    </el-container>
  </div>
  <error v-if="RequestError.status && RequestError.isLogin"></error>
  <login v-if="RequestError.status && !RequestError.isLogin"></login>
</template>

<style>
*{
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
.gura{
	position: fixed;
	height:180px;
	left: 0;
	bottom: 0;
}
.common-layout {
  .el-aside {
    display: flex;
    justify-content: center;
    align-items: center;
	
  }
  
  .el-footer {
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
	position: relative;
	height: 30px;
  }
	.el-header{
	position: relative;
	--el-header-padding: 0 0;
	background-color: #fff;
	}

  .el-aside {
    text-align: center;
	max-width: 260px;
	padding: 15px 20px;
	height: 100vh;
	overflow: hidden;
  }

  .appmain {
    text-align: center;
	display: flex;
	justify-content: top;
	align-items: stretch;
	flex-direction: column;
	overflow: auto;
	min-width: 450px;
	min-height: 500px;
  }


}
 
</style>
