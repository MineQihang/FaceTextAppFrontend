<template>
	<view class="container">
		<view class="content-container">
			<image src="/static/icons/logo.svg" style="width:270rpx; height:270rpx;"></image>
			<text class="app-name">
				看看你的
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
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
						uni.showToast({
							title: '请登录或注册',
							icon: 'none',
							duration: 1000
						});
					}, 500)
					
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
	}
	.app-name{
		margin-top: 342rpx;
		color: white;
		font-size: 115.2rpx;
		font-weight: 700;
	}
</style>
