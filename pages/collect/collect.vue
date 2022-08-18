<template>
	<view class="container">
		<!-- 头部个人信息 -->
		<head-tab :userInfo="userInfo"></head-tab>

		<view class="white-header"></view>

		<!-- 导航栏：我的收藏 -->
		<view class="collection-click" v-if="showCollection">
			<view class="collection-information-click">我的收藏</view>
		</view>

		<view class="collection-unclick" v-if="showAttention" @click="changeToCollection()">
			<view class="collection-information-unclick">我的收藏</view>
		</view>

		<!-- 导航栏：关注的人 -->
		<view class="attention-click" v-if="showAttention">
			<view class="attention-information-click">关注的人</view>
		</view>

		<view class="attention-unclick" v-if="showCollection" @click="changeToAttention()">
			<view class="attention-information-unclick">关注的人</view>
		</view>

		<!-- 展示收藏帖子 -->
		<view v-if="showCollection" class="collection-post" style="margin-top: 50rpx;">
			<post :postList="postList"></post>
		</view>


		<!-- 展示关注帖子 -->
		<view v-if="showAttention" class="attention-post" style="margin-top: 50rpx;">
			<post :postList="postList"></post>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCollection: true,
				showAttention: false,
				choose: false,
				uid: 79,
				postList: [],
				bpid: 9660530943306,
				userInfo: {}
			}
		},
		onLoad: function(option) {
			this.init();
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
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			this.getselfpost();
		},
		methods: {
			getPost(limit = 10) {
				let that = this;
				this.sendRequest({
					url: "/post/get_all",
					data: {
						limit: limit,
						bpid: 9660530943306
					},
					success: (res) => {
						that.postList = res.data;
					}
				});
			},
			getMore(limit = 10) {
				let that = this;
				this.sendRequest({
					url: "/post/get_all",
					data: {
						limit: limit,
						bpid: that.bpid
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
			getUser() {
				let that = this;
				try {
					this.sendRequest({
						url: "/user/user-info",
						success: (res) => {
							that.userInfo = res.data;
						// 	that.username = res.data.username;
						// 	that.uid = res.data.uid;
						// 	console.log("收到的", that.uid);
						}
					})
				} catch (e) {
					console.log(e)
				};
			},
			init() {
				this.bpid = 9660530943306;
				this.postList = [];
				this.getUser();
				this.getPost();
			},
			turnToPost(pid) {
				console.log(pid);
				let url1 = '/pages/post-details/post-details?pid=' + pid;
				uni.navigateTo({
					url: url1
				})
			},
			changeToCollection() {
				this.showCollection = true;
				this.showAttention = false;
			},
			changeToAttention() {
				this.showCollection = false;
				this.showAttention = true;
			},
			changeInformation() {
				this.choose = !this.choose;
			},
			getFormatDate(data) {
				return getTimeAgo(data);
			},
			getselfpost(limit = 10) {
				let that = this;
				this.sendRequest({
					url: "/post/get_self_posts",
					data: {
						limit: limit,
						bpid: that.bpid
					},
					success: (res) => {
						let datas = res.data;
						if (datas && datas.length != 0) {
							that.flowList.push.apply(that.flowList, datas);
							that.bpid = that.flowList[that.flowList.length - 1].pid;
						}
					}
				});
			},
			getselfuser() {
				let that = this;
				try {
					this.sendRequest({
						url: "/user/user-info",
						success: (res) => {
							that.username = res.data.username;
							that.uid = res.data.uid;
							that.motto = res.data.motto;
							that.iconUrl = res.data.iconUrl;
							that.postNum = res.data.postNum;
							console.log("收到的", that.uid);
						}
					})
				} catch (e) {
					console.log(e)
				};
			},
			pass2explore(obj) {
				if (obj) {
					this.postList[obj.index].is_liked = obj.is_liked;
					this.postList[obj.index].likeNum = obj.numberLike;
					console.log("传回来了");
				}
			}
		}
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.white-header {
		position: fixed;
		background-color: #ffff;
		width: 100%;
		height: 81rpx;
		top: 80px;
		z-index: 999;
		border-bottom: solid #F2F3F5;
	}

	.collection-click {
		position: fixed;
		background-color: rgb(242, 243, 245);
		width: 252rpx;
		height: 81rpx;
		top: 80px;
		left: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
		z-index: 999;
	}

	.collection-unclick {
		position: fixed;
		background-color: #ffff;
		width: 252rpx;
		height: 81rpx;
		top: 80px;
		left: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
		z-index: 999;
	}

	.collection-information-click {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		margin-left: 36rpx;
		color: #4605AD;
	}

	.collection-information-unclick {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		margin-left: 36rpx;
		color: black;
	}

	.attention-click {
		position: fixed;
		background-color: rgb(242, 243, 245);
		width: 252rpx;
		height: 81rpx;
		top: 80px;
		right: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
		z-index: 999;
	}

	.attention-unclick {
		position: fixed;
		background-color: #ffffff;
		width: 252rpx;
		height: 81rpx;
		top: 80px;
		right: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
		z-index: 999;
	}

	.attention-information-click {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		color: #4605AD;
		text-align: center;
	}

	.attention-information-unclick {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		color: #000000;
		text-align: center;
	}
</style>
