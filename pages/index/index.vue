<template>
	<view class="container">
		<view class="content-container">
			<image src="/static/icons/logo.svg" style="width:270rpx; height:270rpx;"></image>
			<view class="name-container" mode-class="fade">
				<image src="/static/icons/LookAtYours.svg"></image>
				<text class="app-name">记录·分享·交流</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		mounted() {
			this.sendRequest({
				url: "/user/user-info",
				success: (res) => {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/homepage/explore/explore'
						})
					}, 1000)
				},
				failRequest: () => {
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/index/login/login'
						})
					}, 1000)
				}
			});
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/log/log'
				});
			},
			register() {
				uni.navigateTo({
					url: '/pages/reg/reg'
				});
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $our-purple;
	}

	.content-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-bottom: 100rpx;
	}

	.app-name {
		color: white;
		font-size: 35rpx;
		font-weight: 700;
	}

	.name-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		animation: fadenum 0.5s;
	}

	@keyframes fadenum {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>
