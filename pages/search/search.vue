<template>
	<view>
		<!--<head-tab></head-tab>-->
		<view class="container">
			<view class="search-bar">
				<input type="text" style="height: 100rpx;margin-left: 30rpx; width: 100%;" v-model="text"
					@focus="onFocusInput" @blur="onBlurInput">
				<image class="search-icon" src="/static/icons/search.svg" @click="search()"></image>
			</view>
		</view>
		<view class="post-container">
			<view clss="post-list" v-show="postList.length">
				<post :postList="postList" style=" display:flex;"></post>
			</view>

			<view class="backgrount-icon" v-show="!(postList.length&&userList.length)">
				<image src="../../static/icons/searchBackground.svg" style="width:684rpx; height: 507.6rpx;"></image>
			</view>
			<view class="content" v-show="userList.length">

				<view class="list-content" v-for="(item, index) in userList" :key="index">
					<view class="list-content-icon" @click="to_fans()">
						<image class="iconUrl" :src='item.iconUrl' mode="aspectFill">
					</view>
					<view class="list-content-username title-font">
						{{item.username}}
					</view>
					<view class="list-content-motto text-font">
						{{item.motto}}
					</view>
					<view class="list-content-fans text-font" v-if="!item.isSubscribed"
						@click="trueisSubscribed(index);">
						+关注
					</view>
					<view class="list-content-fans text-font" v-else @click="falseisSubscribed(index);">
						已关注
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {
				isShowFocus: false,
				postList: [],
				text: '',
				bpid: 9660530943306,
				username: '',
				motto: '',
				iconUrl: '',
				uid: '',
				isSubscribed: '',
				userList: []
			};
		},
		onLoad: function(option) {
			this.init();
			setTimeout(function() {}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			this.getMore();
		},

		methods: {
			onFocusInput: function(event) {
				//console.log('输入框聚焦时触发:',event)
				// this.inputValue = event.target.value
				this.isShowFocus = true;
				this.width = "100%";
				this.$emit("focus")
			},
			onBlurInput: function(event) {
				//console.log("输入框失去焦点时触发:",event); 
				this.$emit("blur")

			},
			inputCances: function() {
				this.isShowFocus = false;
				this.text = '';
				this.width = "100%"
				this.$emit("cancel");
			},
			init() {
				this.text = '';
				this.bpid = 9660530943306;
				this.postList = [];
			},
			search() {
				console.log("发送搜索请求成功");
				let that = this;
				this.sendRequest({
					url: "/post/search",
					data: {
						text: that.text,
						bpid: 9660530943306

					},
					success: (res) => {
						let datas = res.data;
						if (datas && datas.length != 0) {
							console.log(datas);
							that.postList = res.data;
						} else {
							that.postList = [];
							uni.showToast({
								title: "没有找到",
								icon: "none"
							})
						}
					}
				});
			},
			getMore(limit = 10) {
				let that = this;
				this.sendRequest({
					url: "/post/search",
					data: {
						limit: limit,
						bpid: that.bpid,
						text: that.text
					},
					success: (res) => {
						let datas = res.data;
						if (datas && datas.length != 0) {
							that.postList.push.apply(that.postList, datas);
							that.bpid = that.postList[that.postList.length - 1].pid;
						}
					}
				});
			},

		}

	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 174.6rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		background-color: $our-gray;
	}

	.search-bar {
		margin: 19.8rpx 36rpx 19.8rpx 36rpx;
		border-radius: 20px;
		width: 84%;
		height: 100rpx;
		background-color: white;
		display: flex;
		justify-content: space-between;
	}

	.search-icon {
		width: 100rpx;
		height: 100rpx;
		margin-right: 30rpx;
	}

	.backgrount-icon {
		margin-top: 113.4rpx;
		width: 100%;
		display: flex;
		justify-content: center;

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
</style>
