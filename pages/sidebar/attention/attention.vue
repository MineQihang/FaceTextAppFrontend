<template>
	<view class="our-gray">
		<view class="top">
			<view class="return-path" @click="to_return()">
				<image class="path icon" src=''></image>
			</view>
			<view class="focusme our-purple">我的关注</view>
		</view>
		<view class="content">

			<view class="list-content" v-for="(item, index) in flowList" :key="index">
				<view class="list-content-icon" @click="to_fans()">
					<image src='static/icons/add.svg' mode="aspectFill">
				</view>
				<view class="list-content-username username-font">
					{{item.username}}
				</view>
				<view class="list-content-motto text-font">
					{{item.motto}}
				</view>
				<view class="list-content-fans text-font" v-if="!item.attention" @click="item.attention=1;">
					+关注
				</view>
				<view class="list-content-fans text-font" v-else @click="item.attention=0;">
					已关注
				</view>
			</view>
		</view>
		<view class="bottom-picture">
			<image src="@/static/icons/fansBackground.svg"></image>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				like_or_not: [{
						id: 0,
						name: '+关注'
					},
					{
						id: 1,
						name: '取消关注'
					}
				],
				flowList: [{
						index: "1",
						username: 'Frank Smith',
						motto: "不懂哦",
						attention: 1
					}, {
						index: "2",
						username: 'yhr',
						motto: "mottomotto"
					}, {
						index: "3",
						username: 'llll',
						motto: "真的不会"
					}, {
						index: "4",
						username: 'lll',
						motto: "真的不会"
					}, {
						index: "5",
						username: '纯纯不懂',
						motto: "真的不会"
					}, {
						index: "6",
						username: '回去',
						motto: "真的不会"
					},
					{
						index: "7",
						username: 'Frank Smith',
						motto: "不懂哦"
					}, {
						index: "8",
						username: 'yhr',
						motto: "太难了"
					}, {
						index: "9",
						username: 'llll',
						motto: "真的不会"
					}, {
						index: "10",
						username: 'lll',
						motto: "真的不会"
					}, {
						index: "11",
						username: '纯纯不懂',
						motto: "真的不会"
					},
				]
			}

		}
	}

	// onLoad: function(option) {
	// 		// this.init();
	// 		setTimeout(function() {
	// 			console.log('start pulldown');
	// 		}, 1000);
	// 		uni.startPullDownRefresh();
	// 	},
	// 	onPullDownRefresh() {
	// 		this.init();
	// 		setTimeout(function() {
	// 			uni.stopPullDownRefresh();
	// 		}, 1000);
	// 	},
	// 	onShow() {
	// 		this.getPost();
	// 	},

	// 	methods: {
	// 		getUser() {
	// 			let that = this;
	// 			try {
	// 				this.sendRequest({
	// 					url: "/user/user-fans",
	// 					success: (res) => {
	// 						// that.username = res.data.username;
	// 						// that.uid = res.data.uid;
	// 						// that.iconUrl=res.data.iconUrl;
	// 						// that.motto=res.data.motto;
	// 						// that.attention=res.data.attention;
	// 						that.flowList = res.data;
	// 						// console.log("收到的", that.uid);
	// 					}
	// 				})
	// 			} catch (e) {
	// 				console.log(e)
	// 			};
	// 		},
	// 		init() {
	// 			this.getUser();
	// 		}
	// 	},
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

	.path {
		width: 54rpx;
		height: 54rpx;
		margin: 40rpx 40rpx 27rpx 28.8rpx;
	}

	.content {
		width: 100%;
		justify-content: center;
		margin-top: 28.8rpx;
	}

	.list {}

	.list-content {
		/* 这是list中的内容捏 */
		// width: 745.2rpx;
		height: 117rpx;
		background-color: white;
		width: 100%;
		display: flex;
	}

	.list-content-icon {
		display: flex;
		width: 81rpx;
		height: 81rpx;
		margin-top: 18rpx;
		margin-bottom: 18rpx;
		margin-left: 36rpx;
		border-radius: 50%;
		background: rgb(183, 212, 185);
	}

	.list-content-username {
		position: absolute;
		width: 400rpx;
		height: 70.2rpx;
		margin-top: 0rpx;
		margin-bottom: 46.8rpx;
		margin-left: 142.2rpx;
		color: rgb(0, 0, 0);
		font-weight: 700;
		line-height: 50.4rpx;
		letter-spacing: 0rpx;
		text-align: left;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.list-content-motto {
		/* mottomottomottomotto */
		/* mottomottomottomotto */
		position: absolute;
		width: 360rpx;
		height: 70.2rpx;
		margin-top: 46.8rpx;
		margin-left: 142.2rpx;
		color: rgb(0, 0, 0);
		font-weight: 400;
		line-height: 37.8rpx;
		letter-spacing: 0rpx;
		text-align: right;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.list-content-fans {
		/* +关注 */
		position: absolute;
		width: 108rpx;
		height: 59.4rpx;
		margin-top: 36rpx;
		right: 36rpx;
		margin-bottom: 21.6rpx;
		color: rgb(70, 5, 173);
		font-weight: 700;
		line-height: 37.8rpx;
		letter-spacing: 0rpx;
		text-align: left;
		flex-direction: row;
		align-items: center;

	}

	.bottom-picture {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 113.4rpx;
		margin-bottom: 100rpx;

	}
</style>