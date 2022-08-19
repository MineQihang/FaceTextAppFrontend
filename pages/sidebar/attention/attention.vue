<template>
	<view class="our-gray">
		<view class="top">
			<view class="return-path" @click="back()">
				<image class="path-icon" src="../../../static/icons/leftArrow.svg"></image>
			</view>
			<view class="focusme our-purple">我关注的人</view>
		</view>
		<view class="content">

			<view class="list-content"  v-for="(item, index) in flowList" :key="index">
				<view class="list-content-icon" @click="turnToPerson(item.uid)">
					<image class="iconUrl" :src='item.iconUrl' mode="aspectFill">
				</view>
				<view class="list-content-username title-font" @click="turnToPerson(item.uid)">
					{{item.username}}
				</view>
				<view class="list-content-motto text-font" @click="turnToPerson(item.uid)">
					{{item.motto}}
				</view>
				<view class="list-content-fans text-font" v-if="!item.isSubscribed" @click="trueisSubscribed(index);">
					+关注
				</view>
				<view class="list-content-fans text-font" v-else @click="falseisSubscribed(index);">
					已关注
				</view>
			</view>
		</view>
		<view class="bottom-picture" v-if="flowList.length<6">
			<image src='../../../static/icons/likeBackground.svg'></image>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				username: '',
				motto: '',
				iconUrl: '',
				uid: '',
				flowList: ""
			}

		},
		mounted() {
			this.init();
		},

		methods: {
			onLoad: function(option) {
				// this.init();
				setTimeout(function() {
					console.log('start pulldown');
				}, 1000);
				uni.startPullDownRefresh();
			},
			onPullDownRefresh() {
				this.init();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			turnToPerson(uid) {
				uni.navigateTo({
					url: '/pages/sidebar/personal-space/personal-space?uid=' + uid
				})
			},
			postSubscribed(uid) {
				this.sendRequest({
					url: "/user/subscribe",
					method: 'POST',
					requestDataType: "form",
					data: {
						uid2: uid
					},
					success: (res) => {
						uni.showToast({
							title: res.detail,
							duration: 1000
						});
					}
				});
			
			},
			
			trueisSubscribed(index) {
				this.flowList[index]["isSubscribed"] = true;
				this.postSubscribed(this.flowList[index]["uid"])
				
			},
			falseisSubscribed(index) {
				this.flowList[index]["isSubscribed"] = false;
			    this.postSubscribed(this.flowList[index]["uid"])
			},

			getUser() {
				let that = this;
				try {
					this.sendRequest({
						url: "/user/all_subscribed",
						success: (res) => {
							// that.username = res.data.username;
							// that.uid = res.data.uid;
							// that.iconUrl=res.data.iconUrl;
							// that.motto=res.data.motto;
							//that.isSubscribed=res.data.isSubscribed;
							that.flowList = res.data;
							console.log("关注收到的", that.uid);
						}
					})
				} catch (e) {
					console.log(e)
				};
			},
			init() {
				this.getUser();
			},
			
			back() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.init(); 
				    }
				});
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

	.iconUrl {
		width: 81rpx;
		height: 81rpx;
		border-radius: 50%;
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
		background: rgb(255, 255, 255);
	}

	.list-content-username {
		position: absolute;
		width: 400rpx;
		height: 70.2rpx;
		margin-top: 0rpx;
		margin-bottom: 46.8rpx;
		margin-left: 142.2rpx;
		color: rgb(0, 0, 0);
		font-weight: 400;
		line-height: 50.4rpx;
		letter-spacing: 0rpx;
		text-align: left;
		display: flex;
		flex-direction: row;
		align-items: center;
		// text-shadow: 1rpx 1rpx #21;
	}

	.list-content-motto {
		/* mottomottomottomotto */
		/* mottomottomottomotto */
		position: absolute;
		width: 360rpx;
		height: 70.2rpx;
		margin-top: 46.8rpx;
		margin-left: 142.2rpx;
		color: #212121;
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
