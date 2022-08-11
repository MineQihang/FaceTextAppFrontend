<template>

	<view class="container">
		<view>
			<view>
				<u--image src="../../static/successful_log.png" width="16rem" height="12rem"></u--image>
			</view>
		</view>


		<view class="btn-container">
			<u-button type="primary" @click="index()" class='btn'>退出登录</u-button>
		</view>
	</view>
</template>

<script>
	import uButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue"
	export default {
		components: {
			uButton
		},
		data() {
			return {}
		},
		methods: {
			index() {
				uni.redirectTo({
					url: '/pages/index/index'
				});
			}

		}
	}
</script>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		padding-top: 250rpx;
	}

	.btn-container {
		padding: 150rpx;
	}

	.btn {
		width: 12rem;
		height: 3rem;
		line-height: 23rpx;
		border-radius: 50rpx;
		border-color: black;
		background-color: rgba(16, 16, 16, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 1rem;
		text-align: center;
		font-family: Arial;
		margin-bottom: 100rpx;
	}
</style>
