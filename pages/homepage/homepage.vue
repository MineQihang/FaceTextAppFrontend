
<template>

	<view>
		<view>
			<view>
				<uni-search-bar placeholder=" " @confirm="search" :focus="true" v-model="searchValue" @input="input"
					@change="change">
				</uni-search-bar>
				<!-- 当前输入为：{{ searchValue }} -->
			</view>
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<view>
				<scroll-view class="scroll-view" scroll-y="true" refresher-enabled="true"  show-scrollbar="true" scroll-top="scrollTop" @scroll="scroll"
					@scrolltoupper="upper" @scrolltolower="lower">
					<view class="scroll-view-item top">注册地址</view>
					<view class="scroll-view-item center">注册地址</view>
					<view class="scroll-view-item bottom">注册电话</view>
					<view class="scroll-view-item top">注册地址</view>
					<view class="scroll-view-item center">注册地址</view>
					<view class="scroll-view-item bottom">注册电话</view>
				</scroll-view>
			</view>
		</view>
	</view>

	<!-- <view class="container">
		<view>
			<view>
				<u--image src="../../static/successful_log.png" width="16rem" height="12rem"></u--image>
				<view>{{ username }}</view>
			</view>
		</view> -->


	<!-- <view class="btn-container">
			<u-button type="primary" @click="log()" class='btn'>退出登录</u-button>
		</view> -->
	<!-- </view> -->
</template>

<script>
	import uButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue"
	export default {
		components: {
			uButton
		},
		data() {
			return {
				flag: 0, //1向左滑动,2向右滑动,3向上滑动 4向下滑动
				text: '', //向哪里滑动
				lastX: 0,
				lastY: 0,
				index: 0,
				username: '',
				searchValue: ''

			}
		},
		mounted() {
			let that = this;
			try {
				const authorization = uni.getStorageSync('authorization');
				if (!authorization) throw DOMException("Nope!");
				else {
					uni.request({
						url: 'http://124.221.253.187:5000/user/user-info',
						header: {
							'Authorization': authorization
						},
						success: (res) => {
							console.log(res);
							this.text = 'request success';
							if (res.statusCode == 200) {
								that.username = res.data.data.username;
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
			scroll(event) {
				//距离每个边界距离
				console.log(event.detail)
			},
			//滚动到底部/右边触发
			scrolltolower() {
				console.log(123213213213);
			},
			// 滚动到顶部/左边触发
			scrolltoupper() {
				console.log(2232332);
			}
		},

		log() {
			uni.redirectTo({
				url: '/pages/log/log'
			});
		},

		search(res) {
			uni.showToast({
				title: '搜索：' + res.value,
				icon: 'none'
			})
		},

		input(res) {
			console.log('----input:', res)
		},
	}
</script>

<style>
	.scroll-view {
		white-space: nowrap;
		height: 800px;
		width: 100%;
	}

	.top {
		height: 200px;
		width: 100%;
		background: red;
	}

	.center {
		height: 200px;
		width: 100%;
		background: green;
	}

	.bottom {
		height: 200px;
		width: 100%;
		background: blue;
	}

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