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
		<view class="drawer-container">
			<uni-drawer ref="showLeft" mode="left" :width="320" @change="change($event,'showLeft')">
				<view class = "user-info">
					
				</view>
				<view  class = "sidebar">
					<view class="" v-for="(item,index) in items">
						{{item}}
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
<<<<<<< HEAD
				defaultUserIcon: "/static/Iconly_Light_Profile.svg",
				showLeft: false,
				items: ["个人空间","个人信息修改","设置"]
=======
				defaultUserIcon: "/static/icons/user.svg",
				showLeft: false
>>>>>>> bfb0409a386e2fa9eb401e25abda19a91aa92f94
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

<style>
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
</style>
