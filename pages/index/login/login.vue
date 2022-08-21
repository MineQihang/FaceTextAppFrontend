<template>
	<view class="">

		<!-- 空白部分 -->
		<view class="blank" style="background-color:#4605AD;">
			<image src="@/static/icons/logo.svg" alt="" style="width:30%;top: 7%;margin-left: 38%;">
		</view>

		<!-- 主体 -->
		<view class="white_next">

			<view class="" style="margin-top: 158.4rpx; height: 115.2rpx;">
				<view class="box">
					<view class="phone-picture">
						<image src="@/static/icons/phone.svg" class="picture" mode=""></image>
					</view>
					<view class="" style="margin-left: 50rpx;margin-top: 10rpx;width: 100%;">
						<input class="uni-input input-box" type="number" placeholder="请输入手机号码" v-model="iphoneValue"
							maxlength="11" />
					</view>
				</view>
			</view>

			<view class="" style="margin-top: 52.2rpx;height: 115.2rpx;">
				<view class="box">
					<view class="lock-picture">
						<image src="@/static/icons/lock.svg" class="picture" mode=""></image>
					</view>
					<view class="" style="margin-left: 50rpx;margin-top: 10rpx;width: 100%;">
						<input class="uni-input input-box" type="password" placeholder="请输入密码" v-model="passwordValue"
							maxlength="32" />
					</view>
				</view>
			</view>


			<view><button @click="login()" class="login-btn">
					登录
				</button></view>

			<view style="display: flex;width: 100%;">
				<view class="reg our-purple" style="">
					<navigator url="../register/register" class="">
						需要注册？
					</navigator>
				</view>

				<view class="find-back-container" style="">
					<view class="find-back" style="">
						<navigator url="../find_back/find_back" class="" style="">
							忘记密码
						</navigator>
					</view>
				</view>

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
				this.sendRequest({
					url: "/user/login",
					method: 'POST',
					requestDataType: "form",
					data: {
						phoneNumber: this.iphoneValue,
						password: this.passwordValue
					},
					success: (res) => {
						uni.setStorageSync('authorization', res.token_type + ' ' +
							res.access_token);
						// console.log(uni.getStorageSync('authorization'))
						uni.showToast({
							title: res.detail,
							duration: 1000
						});
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/homepage/explore/explore'
							});
						}, 500)
					}
				});
			},
		}
	}
</script>
<style>
	.reg {
		font-size: 43.2rpx;
		font-weight: 400;
		margin-left: 84.6rpx;
		margin-top: 52.2rpx;
		width: 100%;
	}

	.find-back {
		width: 200%;
		color: #4605AD;
	}

	.find-back-container {
		font-size: 43.2rpx;
		font-weight: 400;
		margin-top: 52.2rpx;
		margin-right: 155.4rpx;
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
		height: 1100rpx;
		background-color: #ffffff;
		width: 100%;
		/* 		top: 544rpx; */
		z-index: 10！important;
		position: absolute;
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
		position: absolute;
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
