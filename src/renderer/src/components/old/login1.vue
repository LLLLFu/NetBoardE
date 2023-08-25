<template>
  <el-dialog
    v-model="dialogVisible"
    title="身份验证"
    width="30%"
    :before-close="handleClose"
	v-loading = "loading"
  >
   <el-form  :model="form">
	    <el-text class="mx-1" :type="isFailure?'danger':'success'">{{msg}}</el-text>
	   <el-form-item label="账户">
	         <el-input v-model="form.account" />
	    </el-form-item>
		<el-form-item label="密码">
		      <el-input v-model="form.password" />
		 </el-form-item>
   </el-form>
    <template #footer>
      <span class="dialog-footer">
<!--        <el-button @click="dialogVisible = false">Cancel</el-button> -->
        <el-button type="primary" @click="loginhandle" :loading="isLoading">
          登录
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref,reactive  } from 'vue'
import { ElMessageBox,ElNotification,ElMessage } from 'element-plus'
import implement from '../v2board/implement.js'
import { useRouter } from 'vue-router';
const router = useRouter();
if(localStorage.getItem("Authorization")){
	router.push({
	  path:"/index"
	});
}
const form = reactive({
  account: 'yangningmou@gmail.com',
  password: 'q1w2e3r4t5',
})
const dialogVisible = ref(true)
const isLoading = ref(false);
const isFailure = ref(false);
const msg = ref("");
const handleClose = (done) => {
	done();
}

const loginhandle = ()=>{
	isLoading.value = true;
	implement.Login({
		"email": form.account,
		"password": form.password,
	},(res,status)=>{
		isLoading.value = false;
		if(status){
			setTimeout(()=>{
				dialogVisible.value = false;
			},2000)
			localStorage.setItem("Authorization",res.auth_data);
			msg.value =  "登录成功";			
		}else{
			console.log(res);
			isFailure.value = true;
			msg.value = res.message ;
		}
		
	})
}

</script>
<style scoped>
.dialog-footer{
	display: flex;
	justify-content: center;
	align-items: center;
}
.dialog-footer button{
	
}
.el-text{
	margin-bottom: 10px;
}
</style>
