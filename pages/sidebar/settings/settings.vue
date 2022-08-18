<template>
	<view>
		<view class="top">
			<view class="return-path" @click="back()">
				<image class="path-icon" src="../../../static/icons/leftArrow.svg"></image>
			</view>
			<view class="focusme our-purple">设置</view>
		</view>

		<view class="bottom_view">
			<button class="btn" @click="index()">退出登录</button>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gender: 0,
				username: '',
				age: '',
				mail: '',
				motto: '',
				icon: '',
				uid: '',
			}
		},
		onShow() {

			this.get_inf();

		},
		methods: {
			get_inf() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');
					if (!authorization) throw DOMException("Nope!");
					else {
						that.sendRequest({
							url: '/user/user-info',
							method: 'GET',
							success: (res) => {
								this.text = 'request success';
								if (res.code == 200) {
									that.username = res.data.username;
									that.studentIndex = res.data.gender;
									that.age = res.data.age;
									that.motto = res.data.motto;
									that.mail = res.data.mail;
									that.icon = res.data.iconUrl;
									that.uid = res.data.uid;
								}
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			index() {
				try {
					uni.removeStorageSync('authorization');
				} catch (e) {
					console.log(e)
				}
				uni.reLaunch({
					url: '/pages/index/login/login'
				})
			},
			back() {
				uni.navigateBack()
			}

		}
	}
</script>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		height: 126rpx;
		background-color: white;
	}

	.focusme {
		font-size: 24px;
		font-weight: 700;
	}

	.return-path {}

	.path-icon {
		width: 54rpx;
		height: 54rpx;
		margin: 40rpx 40rpx 27rpx 28.8rpx;
		background-color: white;
	}

	.bottom_view {
		background-color: our-gray;
		height: 1488.6rpx;
		z-index: 1 !important;
		/* 		 position:fixed; */
	}

	.btn {
		position: absolute;
		width: 576rpx;
		height: 115.2rpx;
		background: $our-purple;
		border-radius: 36px;
		color: #ffffff;
		font-size: 24px;
		font-weight: 400;
		text-align: center;
		line-height: 60px;
		bottom: 57.6rpx;
		left: 84.6rpx;
		right: 84.6rpx;
		border-radius: 36rpx;
	}
</style>
