<template>
	<view>
		<!-- 头部图片 -->
		<view class="head_img">
			<image src="/static/Header_img.png" style="width: 100%;height: 350rpx;" alt="">
		</view>

		<!-- 中部图片 -->
		<view class="mid_img">
			<image src="/static/mid_img1.png" alt="" style="width: 100%;height: 100%;">
		</view>

		<!-- 底部 -->
		<view class="bottom_view">

			<button class="btn" @click="Reset_information">修改信息</button>
			<button class="btn" @click="index()">退出登录</button>
			<button class="btn">注销账户</button>

		</view>

		<!-- 用户头像 -->
		<view class="portrait">
			<image src="icon" alt="" style="border-radius: 125rpx;height: 125rpx;width:125rpx;">
		</view>

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
				gender: 0,
				username: '',
				age: '',
				mail: '',
				motto: '',
				icon: '/static/Header_img.png',
				uid: '',
			}
		},
		mounted() {
			let that = this;
			try {
				const authorization = uni.getStorageSync('authorization');
				if (!authorization) throw DOMException("Nope!");
				else {
					uni.request({
						url: '/api/user/user-info',
						header: {
							'Authorization': authorization
						},
						success: (res) => {
							console.log(res);
							this.text = 'request success';
							if (res.statusCode == 200) {
								that.username = res.data.data.username;
								that.studentIndex = res.data.data.gender;
								that.age = res.data.data.age;
								that.motto = res.data.data.motto;
								that.mail = res.data.data.mail;
								that.icon = res.data.data.iconUrl;
								that.uid = res.data.data.uid;
							} else {
								uni.showToast({
									title: res.data.detail,
									icon: 'none'
								})
							}
						}
					})
				}
			} catch (e) {
				console.log(e)
			}
		},
		methods: {
			Reset_information() {
				uni.navigateTo({
					url: '/pages/reset_inform/reset_inform'
				})
			},
			index() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			}

		}
	}
</script>

<style>
	.head_img {
		height: 350rpx;
		background-color: #ffffff;
		z-index: 1 !important;
		/* 		position: fixed; */
	}

	.mid_img {
		height: 600rpx;
		z-index: -1 !important;
		/* position: fixed; */
	}

	.bottom_view {
		background-color: #ffffff;
		height: 600rpx;
		z-index: 1 !important;
		/* 		 position:fixed; */
	}

	.btn {
		width: 80%;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 36px;
		color: #ffffff;
		font-size: 1rem;
		text-align: center;
		line-height: 45px;
		margin-bottom: 100rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}

	.portrait {
		border-radius: 125rpx;
		height: 125rpx;
		width: 125rpx;
		background-color: #ffffff;
		z-index: 10 !important;
		position: absolute;
		top: 20%;
		left: 42%;
	}
</style>
