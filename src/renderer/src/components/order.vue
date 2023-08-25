<template>
  <el-scrollbar height="calc(100vh - 100px)">
	<el-table :data="orders" style="width: 100%" height="calc(100vh - 100px)">
		<el-table-column prop="trade_no" label="订单号" />
		<el-table-column prop="period" label="周期">
			<template #default="scope">
				{{periodDetail(scope.row.period)}}
			</template>
		</el-table-column>
		<el-table-column prop="status" label="状态" >
			<template #default="scope">
				<el-tag
					  :type="scope.row.status === 3 ? 'success' : 'warning'"
					  disable-transitions
					  >{{statusDetail(scope.row.status)}}
				</el-tag>
			</template>
		</el-table-column>			
		<el-table-column prop="created_at" label="创建时间" width="250">
			<template #default="scope">
				{{timeFormat(scope.row.created_at)}}
			</template>
		</el-table-column>			
		<el-table-column prop="total_amount" label="金额" >
			<template #default="scope">
				{{(scope.row.total_amount)/100}}
			</template>
		</el-table-column>			
		<el-table-column label="操作">
		  <template #default="scope">
			<el-button  v-if = "scope.row.status === 3"
			size="small" 
			@click="handleDetail(scope.$index, scope.row)"
			  >查看详情</el-button
			>
			<el-button v-if = "scope.row.status === 0"
			  size="small"
			  type="danger"
			  @click="handleCancle(scope.$index, scope.row)"
			  >取消订单</el-button
			>
		  </template>
		</el-table-column>
	</el-table>
  </el-scrollbar>
</template>
<script setup>
	import {ref,onBeforeMount} from "vue"
	import implement from "../v2board/implement.js"
	const orders =  ref();
	onBeforeMount(()=>{
		implement.getOrder(orders);	
	});
	const handleDetail = (index,row)=>{
		
	}
	const handleCancle = (index,row)=>{
		
	}
	const periodDetail = (period)=>{
		let detail = "";
		switch(period){
				case "month_price":
					detail = "\u6708\u4ed8";
				break;
				case "quarter_price":
					detail = "\u5b63\u4ed8";
				break;
				case "half_year_price":
					detail = "\u534a\u5e74\u4ed8";
				break;
				case "year_price":
					detail = "\u4e24\u5e74\u4ed8";
				break;
				case "two_year_price":
					detail = "\u6708\u4ed8";
				break;
				case "three_year_price":
					detail = "\u4e09\u5e74\u4ed8";
				break;
				case "onetime_price":
					detail = "\u4e00\u6b21\u6027";
				break;
				case "reset_price":
					detail = "\u6d41\u91cf\u91cd\u7f6e\u5305";
				break;
				case "onetime_price":
					detail = "\u4e00\u6b21\u6027";
				break;
			}
		return detail;
	}
	const statusDetail = (status)=>{
		let detail = "";
		switch(status){
			case 0: detail =  "\u5f85\u652f\u4ed8";
			break;
			case 1: detail = "\u5f00\u901a\u4e2d";
			break;
			case 2: detail = "\u5df2\u53d6\u6d88";
			break;
			case 3: detail = "\u5df2\u5b8c\u6210";
			break;
			case 4: detail = "\u5df2\u6298\u62b5";
			break;
		}
		return detail;
	}
	const timeFormat = (timestamp)=>{
		let date = new Date(timestamp * 1000);
		let Y = date.getFullYear() + "-";
		let M =
		(date.getMonth() + 1 < 10
		  ? "0" + (date.getMonth() + 1)
		  : date.getMonth() + 1) + "-";
		let D =
		(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
		let h =
		(date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";

		let m =
		(date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
		":";
		let s =
		date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		return Y + M + D + h + m + s;
	}
</script>
