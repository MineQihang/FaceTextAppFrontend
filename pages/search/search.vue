<template>
	<view>
		<!--<head-tab></head-tab>-->
		<view class="container">
			<view class="search-bar">
				<input type="text" style="height: 100rpx;margin-left: 30rpx; width: 100%;" v-model="text"
					@focus="onFocusInput" @blur="onBlurInput">
				<image class="search-icon" src="/static/icons/search.svg" @click="search(10)"></image>
			</view>
		</view>
		<view class="post-container">
			<view clss="post-list" v-if="!postList">
				<post :postList="postList"></post>
			</view>
			<view class="backgrount-icon" v-if="postList">
				<image src="../../static/icons/searchBackground.svg"></image>
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
				// bpid: 9660530943306,

			};
		},
		// onLoad: function(option) {
		// 	setTimeout(function() {}, 1000);
		// 	uni.startPullDownRefresh();
		// },
		// onPullDownRefresh() {
		// 	this.init();
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		// onReachBottom() {
		// 	// 触底的时候请求数据，即为上拉加载更多
		// 	this.getMore();
		// },

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
				// this.bpid = 9660530943306;
				this.postList = [];
				this.search();
			},
			search(limit = 10) {
				try {
					const authorization = uni.getStorageSync('authorization');
					if (!authorization) throw DOMException("Nope!");
					else {
						that = this;
						this.sendRequest({
							url: "/post/search",
							data: {
								limit: limit,
								text: that.text
							},
							success: (res) => {
								if (res.code == 200) {
									that.postList = res.data;
									that.text = '';
								}
								else{
									console.log("搜索不到")
								}
							}
						});
					}
				} catch (e) {
					console.log(e);
				}
			},
			// getMore(limit = 10) {
			// 	let that = this;
			// 	this.sendRequest({
			// 		url: "/post/search",
			// 		data: {
			// 			limit: limit,
			// 			bpid: that.bpid,
			// 			text: that.text
			// 		},
			// 		success: (res) => {
			// 			let datas = res.data;
			// 			if (datas && datas.length != 0) {
			// 				that.postList.push.apply(that.postList, datas);
			// 				that.bpid = that.postList[that.postList.length - 1].pid;
			// 			}
			// 		}
			// 	});
			// },

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

	.post-list {}

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
