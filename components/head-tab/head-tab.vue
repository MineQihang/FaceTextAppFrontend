<template>
	<view style="width: 100%;">
		<view class="container">
			<view class="user-container" @click="showDrawer('showLeft')">
				<view class="icon-container">
					<image class="self-icon" :src="userInfo.iconUrl" mode="aspectFill"></image>
				</view>
				<view class="self-username">{{ userInfo.username }}</view>
			</view>
		</view>
		<view style="height: calc(90rpx + 2 * 0rpx); "></view>
		<view class="swiper">
		</view>
		<!--侧边栏-->
		<view>
			<uni-drawer ref="showLeft" mode="left" :width="280" @change="change($event,'showLeft')"
				style="z-index: 99999;">
				<view class="drawer-container">
					<view class="user-info" @click="turnToPersonalSpace()">
						<!-- 发帖人头像	 -->
						<view>
							<image class="user-icon" :src="userInfo.iconUrl" mode="aspectFill">
						</view>
						<!-- 发帖人昵称 -->
						<view class="username">
							{{userInfo.username}}
						</view>
						<!-- 个性签名 -->
						<view class="user-motto">
							{{userInfo.motto}}

						</view>
					</view>
					<view class="sidebar-list">
						<!--下方三个数值-->
						<view class="title">
							<view class="title-detail" @click="turnToPost()">
								<view style="color:rgb(70, 5, 173);">
									{{"发帖数"}}
								</view>
								<view class="number">
									{{userInfo.postNum}}
								</view>
							</view>
							<view class="title-detail" @click="turnToFans()">
								<view style="color:rgb(70, 5, 173);">
									{{"粉丝数"}}
								</view>
								<view class="number">
									{{userInfo.fansNum}}
								</view>
							</view>
							<view class="title-detail" @click="turnToAttention()">
								<view style="color:rgb(70, 5, 173);">
									{{"我的关注"}}
								</view>
								<view class="number">
									{{userInfo.subscribeNum}}
								</view>
							</view>
						</view>
						<view class="line"></view>
						<!--个人空间-->
						<view class="button" @click="turnToPersonalSpace()">
							<view>
								<image src="/static/icons/personalSpace.svg" class="image-style"></image>
							</view>
							<view class="text-style">
								个人空间
							</view>
						</view>
						<view class="line"></view>
						<!--设置-->
						<view class="button" @click="turnToSetting()">
							<view>
								<image src="/static/icons/settings.svg" class="image-style"></image>
							</view>
							<view class="text-style">
								设置
							</view>
						</view>
						<view class="line"></view>
					</view>
				</view>
			</uni-drawer>
		</view>
	</view>
</template>

<script>
	import {
		sendRequest
	} from "../../common/js/utils.js"
	export default {
		name: "head-tab",
		props: {
			userInfo: {
				type: Object,
				default: () => {
					return {
						iconUrl: "",
						username: "",
						motto: "",
						postNum: "",
						fansNum: "",
						subscribeNum: ""
					}
				},
				required: true
			}
		},
		data() {
			return {
				showLeft: false,
			}
		},
		onShow() {
			sendRequest()
		},
		methods: {

			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open();
				let page = getCurrentPages().pop();

				page.getUser()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				// console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			//跳转到粉丝页面
			turnToFans() {
				uni.navigateTo({
					url: '/pages/sidebar/fans/fans'
				})
			},
			//跳转到个人空间-帖子页面
			turnToPost() {
				uni.navigateTo({
					url: '/pages/sidebar/personal-space/personal-space?key=false'
				})
			},
			//跳转到我的关注
			turnToAttention() {
				uni.navigateTo({
					url: '/pages/sidebar/attention/attention'
				})
			},
			//跳转到个人空间-个人信息页面
			turnToPersonalSpace() {
				uni.navigateTo({
					url: '/pages/sidebar/personal-space/personal-space?key=true'
				})
			},
			//跳转到设置
			turnToSetting() {
				uni.navigateTo({
					url: '/pages/sidebar/settings/settings'
				})
			},
			onNavigationBarButtonTap(e) {
				if (this.showLeft) {
					this.$refs.showLeft.close()
				} else {
					this.$refs.showLeft.open()
				}
			},


			// app端拦截返回事件 ，仅app端生效
			onBackPress() {
				if (this.showRight || this.showLeft) {
					this.$refs.showLeft.close()
					this.$refs.showRight.close()
					return true
				}
			}
		},
	}
</script>

<style lang="scss">
	.container {
		background-color: #fff;
		position: fixed;
		width: 100%;
		z-index: 99;
		border-bottom: solid #F2F3F5;
	}

	.user-container {
		display: flex;
		align-items: center;
		padding: 4rpx 30rpx;
	}

	.drawer-container {
		display: flex;
		flex-direction: column;
		background-color: white;
		height: 100vh;
	}

	.sidebar-list {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 30.6rpx 16.2rpx 43.2rpx 16.2rpx;
		margin: 0rpx 36rpx 0 36rpx;
		background-color: white;
	}

	.title {
		display: flex;
		align-items: center;
		justify-content: space-around;
		background-color: white;

		font-size: 18px;
		font-weight: 700;
		line-height: 21px;
		height: 70.2rpx;
		flex-direction: row;
		width: 100%;
		height: 136.8rpx;

	}

	.number {
		display: flex;
		justify-content: center;
		align-items: flex-end;

		background-color: white;
		font-size: 18px;
		font-weight: 700;
		line-height: 21px;
		height: 70.2rpx;
		width: 100%;

	}

	.line {
		margin: 0 0 15rpx 0;
		width: 100%;
		height: 0;
		border: solid 1rpx;
		border-color: black;
		background-color: black;
	}

	.button {
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		background-color: white;
		width: 100%;
		height: 136.8rpx;
		padding: 0 0 10rpx 25.2rpx;

	}

	.image-style {
		width: 54rpx;
		height: 54rpx;
		margin: 0 12.6rpx 0 0;
	}

	.text-style {
		font-size: 32.4rpx;
		font-weight: 400;
		line-height: 37.8rpx;
		margin: 0 0 17rpx 0;

	}


	.user-info {
		/* 矩形 7 */
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		padding: 30.6rpx 34.2rpx 43.2rpx 34.2rpx;
		margin: 82.8rpx 36rpx 0 36rpx;
		background-color: $our-gray;
		border-radius: 25px;
	}


	.user-icon {
		/* 头像 */
		justify-content: center;

		width: 162rpx;
		height: 162rpx;
		border-radius: 162rpx;
	}

	.username {
		font-size: 28px;
		font-weight: 700;
		line-height: 70.2rpx;
		text-overflow: ellipsis;
		overflow: hidden;

	}

	.user-motto {
		/* motto */
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		max-width: 400rpx;
		height: 21px;
		font-size: 18px;
		// text-align: center;
		// font-weight: 400;
		// line-height: 21px;
		// letter-spacing: 0.1rpx;
	}
</style>
