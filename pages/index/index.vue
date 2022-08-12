<template>
	<view class="content" :style="{background: 'url('+imageURL+')'}">
		<!-- 如果是设置background-image则写成：<view class="content" :style="{backgroundImage: 'url('+imageURL+')'}"> -->
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
				imageURL: ""
			}
		},
		mounted() {
			uni.request({
				url: '/api/user/login',
				method: 'POST',
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
						}, 500)

					} else {
						uni.showToast({
							title: "您在一段时间内没有登录账号，请登录",
							duration: 2000,
							icon: "error"
						})
						setTimeout(() => {
							uni.redirectTo({
							url: '/pages/log/log'
							});
						}, 2000)
					}
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
