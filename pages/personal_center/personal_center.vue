<template>
	<view>
			
			<!-- 头部图片 -->
			<view class="head_img">
				<img src="/static/Header background.png"  style="width: 100%;" alt="">
			</view>
			
			<view class="portrait">
				<img src="/static/Ellipse 194.png" alt="" style="height: 100%;">
			</img>
			</view>
			<view class="set" @click="to_set()">
				<img src="/static/Frame 7064_Iconly_Light_Setting.png" alt="" style="height: 100%;">
			</view>
			<view class="username">俺的名字去哪啦
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		
		methods: {
			to_set(){
				uni.navigateTo({
					url:'/pages/set/set'
				})
			}
		}
	}
</script>

<style>
	.set{
		height: 50rpx;
		width: 50rpx;
		position:absolute;
		right:3%;
		top:3%;
		/* background-color: green; */
	}
	.head_img{
		height: 350rpx;
		background-color: #ffffff;
		z-index: 1!important;
	/* 	position: fixed; */
	}
    .portrait{
			border-radius: 100rpx;
			height: 125rpx;
			width:125rpx;
			background-color: blue;
			z-index: 10!important;
			position:absolute;
			top:20%;
			left:42%;
		}
	.username{
		     top:30%;
			 left:35%;
	}
</style>
