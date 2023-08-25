<template>
	<div class="btnFir" @click="core">
		<div class="btnSec">
		</div>
		<el-icon
		size=50
		color="rgb(93, 93, 229)"
		class="startbtn"
		><SwitchButton /></el-icon>
		<p v-if="CoreStore.start">{{CoreStore.timepan}}</p>
		<p v-if="!CoreStore.start">启动</p>
	</div>

</template>

<script setup>
import { ref } from 'vue';
import {useCoreStore} from "../../store/CoreStore.cjs"
import { storeToRefs } from "pinia"
	const CoreStore = new useCoreStore();
	// 定义全局变量
	var timer;
	// 启动定时器函数
	function startTimer() {
	  if (!timer) {
		CoreStore.timepan = "00:00:00"
	    var hours = 0;
	    var minutes = 0;
	    var seconds = 0;
	    timer = setInterval(function() {
	      seconds++;
	      if (seconds >= 60) {
	        seconds = 0;
	        minutes++;
	        if (minutes >= 60) {
	          minutes = 0;
	          hours++;
	        }
	      }
	      CoreStore.timepan = formatTime(hours, minutes, seconds); // 打印时间
	    }, 1000); // 每秒执行一次
	  }
	}

	// 关闭定时器函数
	function stopTimer() {
	  clearInterval(timer);
	  timer = null;
	}

	// 将时间格式化为 HH:MM:SS 格式
	function formatTime(hours, minutes, seconds) {
	  return padZero(hours) + ':' + padZero(minutes) + ':' + padZero(seconds);
	}

	// 将个位数补零
	function padZero(num) {
	  return (num < 10 ? '0' : '') + num;
	}
	const core = ()=>{
		if(CoreStore.start){
			console.log("关闭内核")
	     window.api.stop();
			stopTimer();// 关闭定时器
		}else{
			console.log("开启内核")
	    window.api.start();
			startTimer(); // 开启定时器
		}
		CoreStore.coreaction();
	}
</script>

<style scoped>
	.btnFir{
		height: 220px;
		width: 220px;
		margin: 0;
		padding: 0;
		z-index: 8;
		border-color: rgba(93, 93, 229, 0.41);
		border-width: 3px;
		border-style: dashed;
		border-radius: 100%;
		box-shadow: none;
		position: relative;

	}
	.btnSec{
		align-items: top;
		position: absolute;
		top: 7px;
		left: 7px;
		height: 200px;
		width: 200px;
		z-index: 8;
		border-color: rgba(93, 93, 229, 0.41);
		border-width: 5px;
		border-style: solid;
		border-radius: 100%;
		box-shadow: none;
	}
	.startbtn{
		position: absolute;
		top: 50px;
		left: 85px;
	}
	.btnFir p{
		position: absolute;
		bottom: 60px;
		left: 60px;
		display: inline-block;
		width: 100px;
	}
</style>
