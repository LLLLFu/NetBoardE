<template>
	<div class="slickList">
		<div class="slickStack">
			<el-image src="/src/assets/noticebg.jfif" fit="cover"></el-image>
			<el-container class="notice">
				<h1>通告</h1>
				<p>2023/07/07</p>
			</el-container>
			<div class="tips">
				公告
			</div>
		</div>
	</div>
</template>

<script>
</script>

<style scoped>
	.slickList{
		-webkit-tap-highlight-color: transparent;
		box-sizing: border-box;
		border-radius: 6px;
		position: relative;
		display: block;
		margin: 0;
		padding: 0;
		overflow: hidden;
		transform: translateZ(0);
		touch-action: pan-y;
		min-height: 200px;
		flex-basis: 200px;
		flex-grow: 0;
		flex-shrink: 0;
	}
	.el-image{
		border-radius: 10px;
		height: 100%;
		width: 100%;
	}
	.slickStack{
		position: relative;
		height: 100%;
	}
	.notice{
		position: absolute;
		margin-left: 2.5%;
		margin-right: 2.5%;
		width: 95%;
		bottom: 30px;
		left: 0;
		border-radius: 10px;
		background-color: #fff;
		opacity: .7;
		cursor: pointer;
		display: inline-block;
		height: 60px;
		text-align: left;
	}
	.notice p{
		font-size: 16px;
		margin-left: 10px;
		margin-top: 5px;
	}
	.notice h1{
		font-size: 18px;
		margin: 4px;
		margin-left: 10px;
	}
	.tips{
		position: absolute;
		top:20px;
		left: 20px;
		padding: 3px 6px;
		background-color: red;
		color: #fff;
		display: initial;
		border-radius: 7px;
		font-size: 12px;
		opacity: .7;
	}
</style>