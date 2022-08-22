<template>
	<view class="container">
		<!-- 头部个人信息 -->
		<head-tab :userInfo="userInfo"></head-tab>

		<view class="head-bar">

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
		</view>

		<!-- 展示收藏帖子 -->
		<view v-if="showCollection" class="posts">
			<post :postList="postList"></post>
			<view class = "not-found" v-show="!postList.length">{{"您还没有收藏帖子"}}</view>
		</view>


		<!-- 展示关注帖子 -->
		<view v-if="showAttention" class="posts">
			<post :postList="postList"></post>
			<view class = "not-found" v-show="!postList.length">{{"您还没有关注的人"}}</view>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCollection: true,
				showAttention: false,
				uid: 79,
				postList: [],
				bpid: 9660530943306,
				userInfo: {},
				// collectionList:[],
				// attentionList:[],
				bpid0: 9660530943306,
				bpid1: 9660530943306
			}
		},
		onLoad: function(option) {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			uni.showLoading({
				title:"正在加载帖子呢"
			})
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			if (this.showCollection) {
				this.getMore(10, 0);
			} else {
				console.log("获取更多的关注的人");
				this.getMore(10, 1);
			}

		},
		onShow() {
			if (this.showCollection) {
				this.getPost(10, 0);
			}
		},
		methods: {
			getPost(limit = 10, type = 0) { //0:收藏 1:关注
				let that = this;
				if (type) {
					this.sendRequest({
						url: "/user/all_subscribed_posts",
						data: {
							limit: limit,
							bpid: 9660530943306
						},
						success: (res) => {
							uni.hideLoading();
							that.postList = res.data;
							that.bpid1 = that.postList[that.postList.length - 1].pid;
						}
					});
				} else {
					this.sendRequest({
						url: "/post/collections",
						data: {
							limit: limit,
							bpid: 9660530943306
						},
						success: (res) => {
							uni.hideLoading();
							that.postList = res.data;
							that.bpid0 = that.postList[that.postList.length - 1].pid;
						}
					});
				}
			},
			getMore(limit = 10, type = 0) { //0:收藏 1:关注
				let that = this;
				if (type) {
					this.sendRequest({
						url: "/user/all_subscribed_posts",
						data: {
							limit: limit,
							bpid: that.bpid1
						},
						success: (res) => {
							uni.hideLoading();
							console.log(res);
							let datas = res.data;
							if (datas && datas.length != 0) {
								that.postList.push.apply(that.postList, datas);
								that.bpid1 = that.postList[that.postList.length - 1].pid;
								console.log(that.bpid1.toString());
							}
						}
					});
				} else {
					this.sendRequest({
						url: "/post/collections",
						data: {
							limit: limit,
							bpid: that.bpid0
						},
						success: (res) => {
							let datas = res.data;
							if (datas && datas.length != 0) {
								that.postList.push.apply(that.postList, datas);
								that.bpid0 = that.postList[that.postList.length - 1].pid;
							}
						}
					});
				}

			},
			getUser() {
				let that = this;
				try {
					this.sendRequest({
						url: "/user/user-info",
						success: (res) => {
							that.userInfo = res.data;
						},
						failRequest: (res) => {
							if (res.statusCode == 401) {
								uni.reLaunch({
									url: '/pages/index/login/login'
								})
							}
						}
					})
				} catch (e) {
					console.log(e)
				};
			},
			init() {
				this.bpid0 = 9660530943306;
				this.bpid1 = 9660530943306;
				this.postList = [];
				this.getUser();

				if (this.showCollection) {
					this.getPost(10, 0);
				} else {
					this.getPost(10, 1);
				}

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
				this.getPost(10, 0);
			},
			changeToAttention() {
				this.showCollection = false;
				this.showAttention = true;
				this.getPost(10, 1);
			},
			changeInformation() {
				this.choose = !this.choose;
			},
			getFormatDate(data) {
				return getTimeAgo(data);
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

	.head-bar {
		position: fixed;
		width: 100%;
		height: 88rpx;
		top: 106rpx;
		background-color: #fff;
		z-index: 99;
	}

	.head-bar>view {
		position: fixed;
		width: 35%;
		height: 76rpx;
		top: 118rpx;
		/* 88+106-76 */
		border-radius: 36rpx 36rpx 0rpx 0rpx;
		z-index: 99;
	}

	.collection-information-click,
	.collection-information-unclick,
	.attention-information-click,
	.attention-information-unclick {
		font-size: 22px;
		font-weight: 700;
		line-height: 76rpx;
	}

	.posts {
		margin-top: 92rpx;
	}

	.collection-click,
	.collection-unclick {
		display: flex;
		left: 15%;
		justify-content: center;
	}

	.attention-click,
	.attention-unclick {
		right: 15%;
		display: flex;
		justify-content: center;
	}

	.collection-click,
	.attention-click {
		background-color: rgb(242, 243, 245);
	}

	.collection-unclick,
	.attention-unclick {
		background-color: #fff;
	}

	.collection-information-click,
	.attention-information-click {
		color: #4605AD;
	}

	.collection-information-unclick,
	.attention-information-unclick {
		color: rgb(90, 90, 90);
	}
	.not-found {
		width: 100%;
		height: 174.6rpx;
		display: flex;
		align-items: center;
		background-color: $our-gray;
		font-size: 18px;
		font-weight: 400;
		justify-content: center;
	}
</style>
