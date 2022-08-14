<template>
	<!-- 帖子详情界面 -->
	<view>
		<!-- 顶部返回和点赞 -->
		<view class="">
			<uni-icons type="arrow-left" size="30" class="back-icon" @click="back()"></uni-icons>
			<uni-icons :type="like_or_not[like].name" size="30" class="heart-icon" @click="like_it()">
			</uni-icons>
		</view>

		<!-- 发帖人信息和发帖时间 -->
		<view class="infor_time">
			<!-- 发帖人头像	 -->
			<view class="portrait">
				<image :src="icon" alt="" v-model="icon" style=" border-radius: 80rpx;height: 80rpx;width:80rpx;">
			</view>
			<!-- 发帖人昵称 -->
			<view class="nickname">
				{{username}}
			</view>
			<!-- 发帖时间 -->
			<view class="post_time">
				时间：两年半之前
			</view>
		</view>

		<!-- 帖子的图片 -->
		<!-- <view class="home">
			<swiper circular indicator-dots>
				<swiper-item v-for="item in swipers">
					<image :src="item" class=""></image>
				</swiper-item>
			</swiper>
		</view> -->

		<view class="photo">
			<swiper circular indicator-dots>
				<swiper-item v-for="item in swipers">
					<image :src="item" class=""></image>
				</swiper-item>
			</swiper>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				like_or_not: [{
						id: 0,
						name: 'heart'
					},
					{
						id: 1,
						name: 'heart-filled'
					}
				],
				swipers: [
					'/static/Header_img.png',
					'/static/Header_img.png',
					'/static/Header_img.png',
				],
				like: 0,
				icon: '/static/Header_img.png',
				username: 'ikun',
				time: '',
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			like_it() {
				this.like = (this.like + 1) % 2;
			}, //给这个帖子点赞
		}
	}
</script>

<style>
	.back-icon {
		position: fixed;
		top: 90rpx;
		left: 34rpx;
	}

	.heart-icon {
		position: fixed;
		top: 90rpx;
		right: 34rpx;
	}

	.infor_time {
		display: flex;
		margin-top: 150rpx;
		height: 100rpx;
		background-color: bisque;
	}

	.photo {
		background-color: green;
		height: 500rpx;

	}

	.portrait {
		border-radius: 80rpx;
		height: 80rpx;
		width: 80rpx;
		background-color: #ffffff;
		margin-top: 10rpx;
		margin-left: 30rpx;
	}

	.nickname {
		font-weight: 200;
		font-size: 50rpx;
		margin-top: 30rpx;
		margin-left: 20rpx;
	}

	.post_time {
		position: absolute;
		right: 5%;
		margin-top: 25rpx;
		font-weight: 150;
	}

	.home {

		swiper {
			width: 700rpx;
			height: 700rpx;
			margin-top: 100rpx;
			margin-left: 14px;
			margin-right: 15px;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
