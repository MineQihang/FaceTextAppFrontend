<template>
	<view>
		
		
		<view class="background-layer"></view>
		<view class="course">
		<!-- 头部图片 -->
		<view class="head_img">
			<img src="/static/Header_img.svg"  style="width: 100%;" alt="">
		</view>
		
		<!-- 用户头像 -->
		<view class="portrait">
			<img src="/static/logo.png" alt="" style="border-radius: 100rpx;height: 100rpx;width:100rpx;">
		</view>
		
		<view class="blank">
			
		</view>
		<!-- 修改信息区 -->
		<view class="mid_view">
			
			<view class="">
				<view class="hanzi">
					名称
					<view class="input_btn">
						<input type="text" class="input">
					</view>
				</view>
			</view>
			
			<view class="">
				<view class="hanzi1">
					简介
					<view class="input_btn">
						<input type="text" class="input">
					</view>
				</view>
			</view>
			
			<view class="">
				<view class="hanzi1">
					Email
					<view class="input_btn">
						<input type="text" class="input">
					</view>
				</view>
			</view>
			
		</view>
		
		
			<button class="btn">保存信息</button>
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
			
		}
	}
</script>

<style>
	.head_img{
		height: 300rpx;
		background-color: #ffffff;
		z-index: 1!important; 
	/* 	position: fixed; */
	}	
	.portrait{
		border-radius: 100rpx;
		height: 100rpx;
		width:100rpx;
		background-color: red;
		z-index: 10!important;
		position:absolute;
		top:26.1%;
		left:45%;
	}
	.blank{
		height: 200rpx;
		background-color: #ffffff;
	}
	.mid_view{
		background-color:#ffffff;
	}
	.hanzi{
	
		margin-left: 50rpx;
		margin-right: 50rpx;
		font-size: 30rpx;
		font-weight: 200;
		background-color: #ffffff;
	}
	.hanzi1{
		margin-top: 50rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		font-size: 30rpx;
		font-weight: 200;
		background-color: #ffffff;
	}
	.input_btn{
		margin-top: 10rpx;
		height: 80rpx;
		background-color: #f5f5f5;
		border-radius: 36rpx;
	}
	.input{
		margin-top: 10rpx;
		margin-left: 15rpx;
		height: 80rpx;
		background-color: #f5f5f5;
		border-radius: 36rpx;
	}
	.btn{
		position: absolute;
		bottom: 100;
		width: 80%;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 36px;
		color: #ffffff;
		font-size: 1rem;
		text-align: center;
		line-height: 45px;
		margin-top: 50rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}
	.background-layer{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff;
		z-index: 0;
	}
	.course{
		position: relative;
		z-index: 1;
	}
</style>
