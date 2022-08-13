<template>
	<view class="container">

		<image src="../../static/log_img1.png" class="log_img1"></image>
		<view class="containerB">
			<view class="menu">
				<view class="box">
					<image src="../../static/log1.svg" class="picture" mode=""></image>
					<input class="uni-input input-box" type="number" placeholder="请输入手机号" v-model="iphoneValue" />
				</view>

				<view class="box">
					<image src="../../static/log2.svg" class="picture" mode=""></image>
					<input class="uni-input input-box" type="password" placeholder="请输入密码" v-model="passwordValue" />
				</view>

				<button class="login-btn" @click="login()">登录</button>
				<navigator url="../reg/reg" class="reg">
					需要注册？
				</navigator>
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
					url: 'http://124.221.253.187:5000/user/login',
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
							uni.setStorageSync('authorization', res.data.token_type + ' ' +
								res.data.access_token);

							uni.showToast({
								title: res.data.detail,
								duration: 1000
							});
							setTimeout(() => {
								uni.switchTab({
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
		width: 100%;
		height: 540px;
		top: 530rpx;
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
		margin-top: 30rpx;
		margin-bottom: 50rpx;
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

	.input-box {
		margin-top: 25upx;
		margin-left: 10upx;
		margin-right: 30upx;
		width: 100%;
	}

	.login-btn {
		width: 80%;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 36px;
		color: #ffffff;
		font-size: 1rem;
		text-align: center;
		line-height: 45px;
		position: absolute;
		margin-bottom: 500rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}

	.reg {
		position: absolute;
		top: 550rpx;
		left: 100rpx;
		color: rgb(82, 82, 199);
		font-size: 36rpx;
		line-height: 54rpx;
	}
</style>
