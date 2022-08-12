<template>
	<view class="">

		<!-- 空白部分 -->
		<cover-view class="blank" style="background-color: antiquewhite;">
			<img src="../../static/log_img1.png" alt="" style="width: 100%;height: 600rpx;">
		</cover-view>

		<!-- 主体 -->
		<cover-view class="white_next">
			
			<view class="box" >
				<image src="../../static/log1.svg" class="picture" mode=""></image>
				<input class="uni-input input-box" type="number" placeholder="请输入手机号码" v-model="iphoneValue" style="width: 100%;"/>
			</view>

			<view class="box" style="background-color: #f0f0f0;">
				<image src="../../static/log2.svg" class="picture" mode=""></image>
				<input class="uni-input input-box" type="password" placeholder="请设置密码" v-model="passwordValue1" style="width: 100%;"/>
			</view>

			<view class="box">
				<image src="../../static/log2.svg" class="picture" mode=""></image>
				<input class="uni-input input-box" type="password" placeholder="请确认密码" v-model="passwordValue2" style="width: 100%;"/>
			</view>
		
			<button class="login-btn" @click="reg()">注册</button>
		
		</cover-view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				iphoneValue: '', //手机号码
				passwordValue1: '',
				passwordValue2: '', //密码
			}
		},
		methods: {
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},
			reg() {
				let that = this
				if (!that.iphoneValue || !that.isMobile(that.iphoneValue)) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return false
				}
				if (!that.passwordValue1) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				if (!that.passwordValue2) {
					uni.showToast({
						title: '请再次输入密码',
						icon: 'none'
					})
					return false
				}
				if (that.passwordValue1 != that.passwordValue2) {
					uni.showToast({
						title: '两次输入密码不一致，请重新输入',
						icon: 'none'
					})
					return false
				}

				uni.request({
					url: 'http://124.221.253.187:5000/user/register',
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						phoneNumber: that.iphoneValue,
						password: that.passwordValue1
					},
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							})
							uni.request({
								url: 'http://124.221.253.187:5000/user/login',
								method: 'POST',
								header: {
									"content-type": "application/x-www-form-urlencoded"
								},
								data: {
									phoneNumber: that.iphoneValue,
									password: that.passwordValue1
								},
								success: (res2) => {
									console.log('登录成功');
									if (res2.statusCode == 200) {
										uni.setStorageSync('authorization', res2.data.token_type +
											' ' + res2.data.access_token);
									}
								}
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/homepage/homepage'
								});
							}, 400)

						} else {
							uni.showToast({
								title: '该账号已存在',
								icon: 'none'
							})
						}
					}
				});
			}
		}
	}
</script>
<style>
	.iphone,
	.password,
	.test {
		position: relative;
		margin-bottom: 30rpx;
	}

	.box {
		height: 100rpx;
		width: 80%;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		margin-left: 60rpx;
		margin-right: 60rpx;
		background-color: #f0f0f0;
		border-radius: 36rpx;
		display: flex;
	}
	
	.white_next{
		border-radius: 50rpx;
		background-color: #ffffff;
		height: 1000rpx;
		width: 100%;
/* 		top: 544rpx; */
		z-index: 10！important;
		position: fixed;
		margin-top: 530rpx;
	}
	.picture {
		height: 100%;
		width: 50rpx;
		margin-left: 20rpx;
		border-radius: 36rpx;
	}

	.wrap {
		display: flex;
		width: 100%;
		height: 500rpx;
	}

	.blank {
		border: 1px #000;
		width: 100%;
		height: 600rpx;
		z-index: -1！important;
		position: fixed
	}

	.input-box {
		margin-top: 25rpx;
		margin-left: 10rpx;
	}

	.input-btn {
		border-radius: 36px;
		background-color: #000;
		height: 100rpx;
		width: 600rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}

	.login-btn {
		width: 80%;
		height: 100rpx;
		background: #aa55ff;
		border-radius: 36px;
		color: #ffffff;
		font-size: 20px;
		text-align: center;
		line-height: 45px;
		position: absolute;
		margin-top: 50rpx;
		margin-bottom: 500rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
	}
</style>
