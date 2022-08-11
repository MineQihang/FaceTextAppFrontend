<template>
	<view class="">

		<!-- 空白部分 -->
		<view class="blank">

		</view>

		<!-- 主体 -->
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
</template>

<script>
	export default {
		data() {
			return {
				iphoneValue: '', //手机号码
				passwordValue: '', //密码
			}
		},
		methods: {
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},

			login() {
				let that = this
				if (!that.iphoneValue || !this.isMobile(that.iphoneValue) ) {
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
						console.log(res.data);
						this.text = 'request success';
					}
				})
				uni.redirectTo({
						url: '/pages/homepage/homepage'
					});

			},

			// Login(){
			// 	uni.request({
			// 		let that = this
			// 		url: 'http://app/login', // 路径
			// 		method: 'POST', // 请求方法
			// 		data: {
			// 			phone: that.iphoneValue,
			// 			password: that.passwordValue
			// 		}, //发送的数据
			// 		success: (res) => {
			// 			if (res.data.code == 200) {
			// 				//存储token
			// 				that.token = res.data.token;
			// 				uni.setStorageSync('token', that.token); // 将登录信息以token的方式存在硬盘中
			// 				uni.setStorageSync('userInfo', JSON.stringify(res.data)); // 将用户信息存储在硬盘中
			// 				uni.switchTab({ // 跳转到新闻页面
			// 					url: "../index/index",
			// 				})
			// 				uni.showToast({
			// 					title: '登录成功',
			// 					icon: 'none'
			// 				})
			// 			} else {
			// 				uni.showToast({
			// 					title: '登录失败',
			// 					icon: 'none'
			// 				})
			// 			}
			// 		}
			// 	})
			// }
		}
	}
</script>
<style>
	.iphone,
	.password,
	.test {
		position: relative;
		margin-bottom: 30px;
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
		display: flex;
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