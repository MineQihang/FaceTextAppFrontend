<template>
	<view>	
		<view class="head_img">
			<image src="/static/Header background.png" style="width: 100%" mode="widthFix">
		</view>

		<view class="set" @click="to_set()">
			<image src="/static/Frame 7064_Iconly_Light_Setting (2).png" style="border-radius: 12rpx;height: 50rpx;width:50rpx;">
		</view>
		<view class="portrait">
		 	<image src="/static/Ellipse 194.png" alt="" style="border-radius: 125rpx;height: 125rpx;width:125rpx;">
		</view>
		<view class="testText1">
			 <text selectable='true'>俺的名字捏</text>
		</view>
		<view class="testText2">
			 <text selectable='true'>这是俺的id</text>
		</view>
	    <view class="middle_a">
		<view class="btn">发帖数:0</view>
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
		height: 5rpx;
		width: 5rpx;
		position: absolute;
		right: 8%;
		top: 4%;
		/* background-color: green; */
	}

	.head_img {
		height: 300rpx;
		background-color: #ffffff;
		z-index: 1 !important;
		top: -10%;
		/* 	position: fixed; */
	}
	
	.portrait {
		border-radius: 125rpx;
		height: 125rpx;
		width: 125rpx;
		background-color: #ffffff;
		z-index: 10 !important;
		position: absolute;
		top: 18%;
		left: 42%;
	}
	.testText1{
	position: absolute;
    font-size:32rpx;
    font-weight:bold;
    width: 100%;
    top: 30%;
    height:50px;
	
	    text-align: center;
	
	}
	.testText2{
	position: absolute;
	font-size:30rpx;
	font-weight:bold;
	width: 100%;
	top: 34%;
	height:50px;
	font-weight: 300;
	    text-align: center;
	
	}
	
	.btn {
		width: 80%;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 0px;
		color: #ffffff;
		font-size: 1.5rem;
		text-align: center;
		line-height: 45px;
		margin-bottom: 100rpx;
		margin-left: 75rpx;
		margin-right: 70rpx;
	}
	.middle_a{
		position: absolute;
		font-size:30rpx;
		font-weight:bold;
		width: 100%;
		top: 38%;
		height:50px;
		font-weight: 300;
		    text-align: center;
	}
</style>
