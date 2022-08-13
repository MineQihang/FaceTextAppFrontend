<template>
	<view class="question-wrap" :style="{ height: screenHeight }">
		<!-- 内容区域 -->
		<view class="content-wrap">
			<view class="countdown-wrap"> </view>
			<view class="question-content-wrap"></view>
		</view>
		<!-- 内容区域 -->
	</view>
</template>

<script>
	import uButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue"
	export default {
		components: {
			uButton
		},
		data() {
			return {
				screenHeight: 0,
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
		},
		mounted() {
			uni.request({
				url: 'http://124.221.253.187:5000/user/user-info',
				method: 'GET',
				header: {
					"content-type": "application/x-www-form-urlencoded"
				},
				data: {
					phoneNumber: this.iphoneValue,
					password: this.passwordValue
				},
				success: (res) => {
					console.log(res);
					if (res.statusCode == 200) {
						//存储Authorization
						uni.setStorageSync('authorization', res.data.token_type + ' ' + res.data
							.access_token);
						uni.showToast({
							title: res.data.detail,
							duration: 1000
						});
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/homepage/homepage'
							});
						}, 3000)

					} else {

						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/log/log'
							});
						}, 3000)
					}
				},
				fail(res) {
					console.log(res);

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
	page {
		width: 100%;
		height: 100%;
	}

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

	.question-wrap {
		background: url("../../static/Boarding.png") no-repeat;
		background-size: 100%;
		width: 100%;
		min-height: 100%;

		.content-wrap {}
	}
</style>
