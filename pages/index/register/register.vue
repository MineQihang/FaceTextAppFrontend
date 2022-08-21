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

			<view class="" style="margin-top: 52.2rpx;height: 115.2rpx;display: flex;">

				<view class="box1">
					<view class="lock-picture">
						<image src="@/static/icons/lock.svg" class="picture" mode=""></image>
					</view>
					<view class="" style="margin-left: 50rpx;margin-top: 10rpx;width: 100%;">
						<input class="uni-input input-box" type="password" placeholder="请输入验证码" v-model="code" />
					</view>

				</view>
				<view class="code-button-container">
					<view class="code-button" style="color: #4605AD;" @click="getCode()">
						{{getCodeText}}
					</view>
				</view>


			</view>

			<view class="" style="margin-top: 52.2rpx; height: 115.2rpx;">
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
				code: '', //验证码
				passwordValue: '', //密码
				getCodeText: '获取验证码',
				getCodeisWaiting: false,
				getCodeBtnColor: "#ffffff"
			}
		},
		methods: {

			Timer() {},
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},
			getCode() {
				let that = this
				uni.hideKeyboard() //隐藏已经显示的软键盘，如果软键盘没有显示则不做任何操作。
				if (this.getCodeisWaiting) {
					return;
				}
				if (!(that.isMobile(that.iphoneValue))) { //校验手机号码是否有误
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}
				this.sendRequest({
					url: '/user/register/get_verification_code',
					method: 'POST',
					requestDataType: 'form',
					data: {
						phoneNumber: that.iphoneValue,
					},
					success: (res) => {
						console.log(res)
						if (res.code == 200) {
							setTimeout(() => {
								uni.showToast({
									title: '验证码已发送',
									icon: "none"
								}); //弹出提示框
								that.setTimer(); //调用定时器方法
							}, 1000)
							//发送验证码
							that.getCodeisWaiting = true;
							that.getCodeBtnColor = "rgba(255,255,255,0.5)" //追加样式，修改颜色
						} else if (res.code == 400) {
							uni.showToast({
								title: '请输入正确手机号',
								icon: "none"
							});
						}
					}
				});

			},
			setTimer() {
				let holdTime = 60; //定义变量并赋值
				this.getCodeText = "重新获取(60)"
				//setInterval（）是一个实现定时调用的函数，可按照指定的周期（以毫秒计）来调用函数或计算表达式。
				//setInterval方法会不停地调用函数，直到 clearInterval被调用或窗口被关闭。
				this.Timer = setInterval(() => {
					if (holdTime <= 0) {
						this.getCodeisWaiting = false;
						this.getCodeBtnColor = "#ffffff";
						this.getCodeText = "获取验证码"
						clearInterval(this.Timer); //清除该函数
						return; //返回前面
					}
					this.getCodeText = "重新获取(" + holdTime + ")"
					holdTime--;
				}, 1000)
			},
			reg() {
				let that = this
				if (!that.passwordValue) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				if (!that.code) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return false
				}
				if (that.passwordValue.length < 6) {
					uni.showToast({
						title: '请输入6位以上密码',
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
						password: that.passwordValue,
						verificationCode: that.code,
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
						} else if (res.code == 400) {
							uni.showToast({
								title: '验证码错误',
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

	.box1 {
		height: 115.2rpx;
		width: 100%;
		margin-left: 84.6rpx;
		margin-right: 27rpx;
		margin-bottom: 20rpx;
		background-color: rgb(242, 243, 245);
		border-radius: 36rpx;
		display: flex;
	}

	.code-button-container {
		height: 115.2rpx;
		margin-right: 84.6rpx;
		border-radius: 36rpx;
		background-color: rgb(242, 243, 245);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.code-button {
		width: 225rpx;
		font-size: 18px;
		font-weight: 700;
		text-align: center;
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
		position: absolute
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
