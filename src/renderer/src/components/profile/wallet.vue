<template>
	<el-card class="wallet">
		<template #header>
			<div class="wallet-header">
				<h3>钱包余额</h3>
			</div>
		</template>
		<p class="money">{{(UserStore.info.balance)/100}} + {{UserStore.info.commission_balance/100}}</p>
		<p class="tips">账户余额(仅消费)+邀请返利</p>
	</el-card>
</template>

<script setup>
	import {ref,onBeforeMount} from "vue"
	import {useUserStore} from "../../store/UserStore.js"
	const UserStore=useUserStore();
</script>

<style scoped>
	.wallet {
		min-height: 100px;
		width: 90%;

	}

	.wallet-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.money {
		font-size: 2rem;
		text-align: left;
	}

	.money::before {
		content: "￥";
	}

	.tips {
		margin-top: 10px;
		font-size: 1rem;
		text-align: left;
	}
</style>