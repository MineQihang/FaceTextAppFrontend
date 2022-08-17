<template>
	<view class="container" :style="{ height: screenHeight }">
		<view class=""></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0,
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			this.sendRequest({
				url: "/user/user-info",
				success: (res) => {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/homepage/explore/explore'
						})
					}, 2000)
				},
				failRequest: () => {
					setTimeout(() => {
						uni.showToast({
							title: '请登录或注册',
							icon: 'none',
							duration: 1000
						});
					}, 2000)
					
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/index/login/login'
						})
					}, 3000)
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

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
