<template>
	<a 
	class="singleItem" 
	:class="{active: isActive,common :!isActive}"
	@click.stop="()=>{isActive = !isActive}">
		<ion-icon :name="props.iicon"></ion-icon>
		<span>{{props.text}}</span>
	</a>
</template>

<script setup>
import {defineProps, ref} from "vue"
const props = defineProps(["text","iicon"])
const isActive = ref(false)
</script>

<style scoped>
.singleItem{
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px 18px;
    border-radius: 7px;
    font-size: 14px;
    font-weight: 400;
    margin: 10px 0;
    transition: all .3s ease-in-out;
	text-decoration: none;
	outline: none;
	cursor: pointer;
}
.active{
	background: rgb(93, 93, 229);
	color: rgb(255, 255, 255);
}
.common{
	background:rgb(255, 255, 255);
	color: black;
}
.common:active, .common:focus, .common:hover {
    text-decoration: none;
    outline: 0;
	background-color: #e0e0e0;
}
.singleItem ion-icon{
	width: 20px;
	height: 20px;
	margin-right: 10px;
}
</style>