<template>

	<el-container>
		<el-main>
			<div class="mainpanel">
				<div class="mainhead">
					<img class="mainlogo" src="https://s1.ax1x.com/2023/06/22/pCJe6hj.png" alt="logo">
					<h1 class="mainname">Netboard</h1>
					<span class="miandesc">连接世界，畅享自由—您的数字之路！</span>
					<signin></signin>
				</div>
			</div>
			<el-footer></el-footer>
		</el-main>
	</el-container>

</template>


<script setup>
import signin from "./login/signin.vue"
localStorage.removeItem("Authorization")
</script>
<style scoped>
	.mainpanel {
		box-sizing: border-box;
		margin: 0px;
		padding: 0px;
		width: 100%;
		max-width: 340px;
	}

	.mainhead {
		box-sizing: border-box;
		text-align: center;
		margin-bottom: 30px;
	}

	.mainlogo {
		vertical-align: middle;
		border-style: none;
		height: 60px;
		margin-bottom: 25px;
	}

	.mainname {
		margin-top: 0;
		color: #000000d9;
		font-size: 24px;
		font-weight: 600;
		margin-bottom: 5px;
	}

	.miandesc {
		text-align: center;
		box-sizing: border-box;
		font-size: 14px;
		word-break: break-all;
	}

	.el-header,
	.el-footer,
	.el-main,
	.el-aside {
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.el-header,
	.el-footer {
		/* 	background-color: var(--el-color-primary-light-7);
	color: var(--el-text-color-primary); */
		text-align: center;
		height: 10vh;
	}

	.el-aside {
		background-color: var(--el-color-primary-light-8);
		color: var(--el-text-color-primary);
		text-align: center;
	}

	.el-main {
		/* 	background-color: var(--el-color-primary-light-9);
	color: var(--el-text-color-primary); */
		text-align: center;
		flex-direction: column;
		height: 100vh;
		padding: 130px 20px 100px;
	}
</style>