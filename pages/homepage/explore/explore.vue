<template>
	<view class="container">
		<!-- 头部个人信息 -->
		<head-tab :userInfo="userInfo"></head-tab>
		<!-- 帖子展示 -->
		<post :postList="postList"></post>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid: 79,
				postList: [],
				bpid: 9660530943306,
				userInfo: {}
			}
		},
		onLoad: function(option) {
			setTimeout(function() {
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			uni.showLoading({
				title: "正在加载"
			})
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
			getPost(limit = 10) {
				let that = this;
				this.sendRequest({
					url: "/post/get_all",
					data: {
						limit: limit,
						bpid: 9660530943306
					},
					success: (res) => {
						uni.hideLoading();
						that.postList = res.data;
						that.bpid = that.postList[that.postList.length - 1].pid;
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
							uni.setStorageSync('uid', res.data.uid)
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
				};
			},
			init() {
				this.bpid = 9660530943306;
				this.postList = [];
				this.getUser();
				this.getPost();
			},
			turnToLogin() {
				uni.redirectTo({
					url: '/pages/index/login/login'
				});
			},
			turnToPost(pid, index) {
				let url1 = '/pages/post-details/post-details?pid=' + pid + '&index=' + index;
				uni.navigateTo({
					url: url1,
				})
			},
			getFormatDate(data) {
				return getTimeAgo(data);
			},
			// 这个方法就是B页面中调用$vm注册的方法，参数为B页面中传递过来的数据
			pass2explore(obj) {
				if (obj) {
					if (obj.isTrashed) {
						this.postList.splice(obj.index, 1);
					} else {
						this.postList[obj.index].commentNum = obj.numberComment;
						this.postList[obj.index].is_liked = obj.is_liked;
						this.postList[obj.index].likeNum = obj.numberLike;
					}
				}
			}
		},
	}
</script>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}
</style>
