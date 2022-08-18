<template>
	<view style="width: 100%;">
		<view class="container">
			<view class="user-container" @click="showDrawer('showLeft')">
				<view class="icon-container">
					<image class="self-icon" :src="userIcon ? userIcon : defaultUserIcon"></image>
				</view>
				<view class="self-username">{{ username }}</view>
			</view>
		</view>
		<view style="height: calc(108rpx + 2 * 36rpx); "></view>
		<view class="swiper">
		</view>
		<view>
			<uni-drawer ref="showLeft" mode="left" :width="280" @change="change($event,'showLeft')">
				<view class="drawer-container">
					<view class="user-info">
						<!-- 发帖人头像	 -->
						<view class="user-icon">
							<image :src="icon" alt="" v-model="icon">
						</view>
						<!-- 发帖人昵称 -->
						<view class="username">
							{{"username"}}
						</view>
						<!-- 个性签名 -->
						<view class="user-motto">
							{{"motto"}}
						</view>
					</view>
					<view class="sidebar-list">
						<view class="title">
							<view style="color:rgb(70, 5, 173);">
								{{"发帖数"}}
							</view>
							<view style="color:rgb(70, 5, 173);" @click="turnToFans()">
								{{"粉丝数"}}
							</view>
							<view style="color:rgb(70, 5, 173);">
								{{"我的关注"}}
							</view>
						</view>
						<view class="number">
							<view>
								{{"1"}}
							</view>
							<view>
								{{"1"}}
							</view>
							<view>
								{{"1"}}
							</view>
						</view>
						<view class="line"></view>
						<view class="button">
							<view>
								<image src="/static/icons/personalSpace.svg" class="image-style"></image>
							</view>
							<view class="text-style">
								个人空间
							</view>
						</view>
						<view class="line"></view>
						<view class="button">
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
	export default {
		name: "head-tab",
		data() {
			return {
				username: "",
				userIcon: "",
				userMotto: "",
				showLeft: false,
				items: ["个人空间", "个人信息修改", "设置"],

				defaultUserIcon: "/static/icons/user.svg",
			};
		},
		mounted() {
			let that = this;
			this.sendRequest({
				url: "/user/user-info",
				success: (res) => {
					that.username = res.data.username;
					that.userIcon = res.data.iconUrl;
				}
			});
		},
		methods: {
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
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
					url:'/pages/search/search'
				})
			}
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
	}
</script>

<style lang="scss">
	.container {
		background-color: white;
		position: fixed;
		width: 100%;
		z-index: 999;
		border-bottom: solid #F2F3F5;
	}

	.user-container {
		display: flex;
		align-items: center;
		padding: 36rpx;
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
	}

	.number {
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
		background: rgb(72, 189, 79);
	}

	.username {
		font-size: 24px;
		font-weight: 700;
		line-height: 70.2rpx;
	}

	.user-motto {
		/* motto */
		font-size: 18px;
		font-weight: 400;
		line-height: 21px;
		// letter-spacing: 0.1rpx;
	}
</style>
