<template>
	<view>

		<!-- 头部图片 -->
		<view class="head_img">
			<image src="/static/Header background.png" style="width: 100%;" alt="">
		</view>

		<view class="set" @click="to_set()">
			<image src="/static/Frame 7064_Iconly_Light_Setting.png" alt="" style="height: 100%;">
		</view>
		<view class="portrait">
			<image src="/static/Ellipse 194.png" alt="" style="border-radius: 125rpx;height: 125rpx;width:125rpx;">
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
			to_set() {
				uni.navigateTo({
					url: '/pages/set/set'
				})
			}
		}
	}
</script>

<style>
	.set {
		height: 50rpx;
		width: 50rpx;
		position: absolute;
		right: 3%;
		top: 3%;
		/* background-color: green; */
	}

	.head_img {
		height: 350rpx;
		background-color: #ffffff;
		z-index: 1 !important;
		/* 	position: fixed; */
	}
	
	.portrait {
		border-radius: 125rpx;
		height: 125rpx;
		width: 125rpx;
		background-color: #ffffff;
		z-index: 10 !important;
		position: absolute;
		top: 30%;
		left: 42%;
	}
</style>
