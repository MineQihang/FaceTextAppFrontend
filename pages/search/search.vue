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
		<view class="post-container" style="width: 100%; ">
			<view clss="post-list" v-show="postList.length">
				<post :postList="postList" style="width: 100%; display:flex;"></post>
			</view>
			
			<view class="backgrount-icon" v-show="!postList.length">
				<image src="../../static/icons/searchBackground.svg" style="width:600rpx; height: 600rpx;"></image>
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
				this.bpid = 9660530943306;
				this.postList = [];
			},
			search() {
				console.log("发送搜索请求成功");
				let that = this;
				this.sendRequest({
					url: "/post/search",
					data: {
						text: that.text
					},
					success: (res) => {
						let datas = res.data;
						if (datas && datas.length != 0) {
							console.log(datas);
							that.postList = res.data;
							that.text = '';
						} else {
							postList = [];
							console.log("输入为空");
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

	// .post-list {
	// 	width: 500rpx;
	// 	height: 500rpx;
	// 	display: flex;
	// 	flex-direction: column;
	// 	background-color: aqua;
	// }
	
	// .post-list {
	// 	display: flex;
	// 	flex-direction: column;
	// }

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
</style>
