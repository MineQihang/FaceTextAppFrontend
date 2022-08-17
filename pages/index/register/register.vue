<template>
	<view class="">

		<!-- 空白部分 -->
		<view class="blank" style="background-color:#4605AD;">
			<image src="@/static/icons/logo.svg" alt="" style="width:30%;margin-top: 10%;margin-left: 38%;">
		</view>

		<!-- 主体 -->
		<view class="white_next">

			<view class="" style="margin-top: 158.4rpx; height: 115.2rpx;">
				<view class="box">
					<view class="phone-picture">
						<image src="@/static/icons/phone.svg" class="picture" mode=""></image>
					</view>
					<view class="" style="margin-left: 50rpx;margin-top: 10rpx;width: 100%;">
						<input class="uni-input input-box" type="number" placeholder="请输入手机号码" v-model="iphoneValue" />
					</view>
				</view>
			</view>

			<view class="" style="margin-top: 52.2rpx;height: 115.2rpx;">
				<view class="box">
					<view class="lock-picture">
						<image src="@/static/icons/lock.svg" class="picture" mode=""></image>
					</view>
					<view class="" style="margin-left: 50rpx;margin-top: 10rpx;width: 100%;">
						<input class="uni-input input-box" type="number" placeholder="请输入密码" v-model="iphoneValue" />
					</view>
				</view>
			</view>

			<view class="" style="margin-top: 52.2rpx; height: 115.2rpx;">
				<view class="box">
					<view class="lock-picture">
						<image src="@/static/icons/lock.svg" class="picture" mode=""></image>
					</view>
					<view class="" style="margin-left: 50rpx;margin-top: 10rpx;width: 100%;">
						<input class="uni-input input-box" type="number" placeholder="请确认密码" v-model="iphoneValue" />
					</view>
				</view>
			</view>

			<view><button @click="reg()" class="login-btn">
					注册
				</button></view>


		</view>


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

				this.sendRequest({
					url: '/user/register',
					method: 'POST',
					requestDataType: 'form',
					data: {
						phoneNumber: that.iphoneValue,
						password: that.passwordValue1
					},
					success: (res) => {
						if (res.code == 200) {
							uni.showToast({
								title: '注册成功',
								icon: 'none'
							})
							this.sendRequest({
								url: '/user/register',
								method: 'POST',
								requestDataType: 'form',
								data: {
									phoneNumber: that.iphoneValue,
									password: that.passwordValue1
								},
								success: (res2) => {
									// console.log('登录成功');
									uni.setStorageSync('authorization', res2.data.token_type +
										' ' + res2.data.access_token);
								}
							})
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/homepage/explore/explore'
								});
							}, 400)
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
		height: 115.2rpx;
		margin-left: 84.6rpx;
		margin-right: 84.6rpx;
		margin-top: 50rpx;
		margin-bottom: 20rpx;
		background-color: rgb(242, 243, 245);
		border-radius: 36rpx;
		display: flex;
	}

	.phone-picture {
		height: 63rpx;
		width: 43.2rpx;
		margin-top: 25.2rpx;
		margin-left: 28.8rpx;
	}

	.lock-picture {
		height: 54rpx;
		width: 43.2rpx;
		margin-top: 26.2rpx;
		margin-left: 28.8rpx;
	}

	.white_next {
		border-radius: 90rpx;
		height: 1500rpx;
		background-color: #ffffff;
		width: 100%;
		/* 		top: 544rpx; */
		z-index: 10！important;
		position: fixed;
		margin-top: 532.8rpx;
	}

	.picture {
		height: 100%;
		width: 50rpx;
		margin-left: 20rpx;
	}


	.wrap {
		display: flex;
		width: 100%;
		height: 500rpx;
	}

	.blank {
		border: 1px #000;
		width: 100%;
		height: 700rpx;
		z-index: -1！important;
		position: fixed
	}

	.input-box {
		margin-top: 25rpx;
		margin-left: 10rpx;
	}


	.login-btn {
		margin-top: 52.2rpx;
		height: 115.2rpx;
		margin-left: 84.6rpx;
		margin-right: 84.6rpx;
		border-radius: 36rpx;
		background-color: rgb(70, 5, 173);
		color: #ffffff;
		font-size: 43.2rpx;
		font-weight: 400;
		text-align: center;
		line-height: 110.4rpx;
	}
</style>
