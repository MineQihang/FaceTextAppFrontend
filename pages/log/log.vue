<template>
	<view class="container">

		<image src="../../static/log_img1.png" class="log_img1"></image>
		<view class="containerB">
			<view class="menu">
				<view class="uni-form-item uni-column horViewStyle box">
					<image src="../../static/log1.svg" class="picture" mode=""></image>
					<input class="uni-input input-box" type="number" placeholder="请输入手机号" v-model="iphoneValue" />
				</view>

				<view class="uni-form-item uni-column horViewStyle box">
					<image src="../../static/log2.svg" class="picture" mode=""></image>
					<input class="uni-input input-box" type="password" placeholder="请输入密码" v-model="passwordValue" />
				</view>

				<button class="login-btn" @click="login()">登录</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				iphoneValue: '', //手机号码
				passwordValue: '', //密码
				access_token: '',
				token_type: '',
			}
		},
		mounted() {

		},
		methods: {
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},

			login() {
				let that = this
				if (!that.iphoneValue || !this.isMobile(that.iphoneValue)) {
					uni.showToast({
						title: '请输入正确电话号码',
						icon: 'none'
					})
					return false
				}
				if (!that.passwordValue) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				// console.log(this.passwordValue)
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
								title: res.data.detail,
								duration: 1000,
								icon: "error"
							})
						}
					}
				})


			},

		}
	}
</script>
<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.log_img1 {
		width: 100%;
		height: 600rpx;
	}

	.containerB {
		width: 375px;
		height: 540px;
		top: 272px;
		left: 0;
		background: rgb(255, 255, 255);
		border-radius: 28px 28px 0px 0px;
		position: absolute;
		z-index: 50 !important;
	}

	.menu {
		padding-top: 100rpx;
	}

	.box {
		height: 100upx;
		width: 600upx;
		margin-top: 10upx;
		margin-bottom: 20upx;
		margin-left: 70upx;
		background-color: #f0f0f0;
		border-radius: 36px;
		display: flex;
	}

	.picture {
		height: 100%;
		width: 50upx;
		margin-left: 20upx;
		border-radius: 36upx;
	}

	.wrap {
		width: 100%;
		height: 500upx;
	}

	.blank {
		border: 1px #000;
		width: 100%;
		height: 400upx;
		flex: 1;
	}

	.input-box {
		margin-top: 25upx;
		margin-left: 10upx;
	}

	.input-btn {
		border-radius: 36px;
		background-color: #000;
		height: 100upx;
		width: 600upx;
		margin-left: 80upx;
	}

	.login-btn {
		width: 80%;
		height: 100rpx;
		background: #000000;
		border-radius: 36px;
		color: #ffffff;
		font-size: 20px;
		text-align: center;
		line-height: 45px;
		position: absolute;
		margin-bottom: 500rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}
</style>
