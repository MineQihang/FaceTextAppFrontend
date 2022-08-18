<template>

	<view class="container">
		<!-- 头部个人信息 -->
		<head-tab></head-tab>
		<!-- 帖子展示 -->
		<view class="content-container">
			<view class="post-container" v-for="(post, index) in postList" :key="index"
				@click="turnToPost(post.pid,index)">
				<view class="user-container">
					<view class="user-info">
						<image class="user-icon icon" :src="post.user.iconUrl" />
						<view class="username  username-font" style="padding-left: 20rpx; font-weight: 500; ">
							{{ post.user.username }}
						</view>
					</view>
					<view class=" date text-font">{{ getFormatDate(post.updatedTime) }}</view>
				</view>
				<view class="title title-font">{{ post.title }}</view>
				<view class="text text-font">{{ post.context }}</view>
				<!-- <iconfont icon:'collect'></iconfont> -->
				<view class="photo-content" v-for="(url, index2) in post.imgUrls" :key="index2" v-if="index2 == 0">
					<image class="post-photo" :src="url" mode="widthFix" />
				</view>

				<view class="info text-font">
					<view class="comment">
						<image class="comment-icons" src="../../../static/icons/comment.svg"
							style="width: 36rpx; height:36rpx"></image>
						<view class="commentNum">{{ post.commentNum }}</view>
					</view>
					<view class="like">
						<uni-icons type="heart-filled" size="20" v-if="post.is_liked"></uni-icons>
						<uni-icons type="heart" size="20" v-else></uni-icons>
						<view class="likeNum">{{ post.likeNum }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTimeAgo
	} from "@/common/js/utils.js"

	export default {
		data() {
			return {
				uid: 79,
				postList: [],
				bpid: 9660530943306,
			}
		},
		onLoad: function(option) {
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
			this.getMore();
		},
		onShow() {
			// this.getPost();
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
							that.username = res.data.username;
							that.uid = res.data.uid;
							console.log("收到的", that.uid);
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
					this.postList[obj.index].is_liked = obj.is_liked;
					this.postList[obj.index].likeNum = obj.numberLike;
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

	.container .content-container {}

	.container .content-container .post-container {
		margin-top: 22.5rpx;
		background-color: white;
		padding-bottom: 10rpx;
	}

	.container .content-container .post-container .user-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-top: 37.5rpx;
	}

	.container .content-container .post-container .user-container .user-icon {
		width: 81rpx;
		height: 81rpx;
		margin-left: 45rpx;
	}

	.container .content-container .post-container .user-container .user-info {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.container .content-container .post-container .user-container .username {
		justify-content: flex-start;
		font-size: $font-size-username;
	}

	.container .content-container .post-container .user-container .date {
		margin-right: 45rpx;
	}


	.container .content-container .post-container .photo-content {
		margin-top: 10rpx;
	}

	.container .content-container .post-container .photo-content .post-photo {
		width: 100%;
		object-fit: cover;
	}

	.container .content-container .post-container .title {
		/* overflow: hidden; */
		/* display: -webkit-box; */
		/* -webkit-box-orient: vertical; */
		/* -webkit-line-clamp: 2; */
		/* word-wrap: break-word; */
		/* word-break: break-all; */
		text-align: left;
		margin: 45rpx 45rpx;
		/* padding: 0.2em 0.5em; */
	}

	.container .content-container .post-container .text {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		word-wrap: break-word;
		word-break: break-all;
		text-align: left;
		margin-left: 45rpx;
		/* padding: 0.2em 0.5em; */
	}

	.container .content-container .post-container .info {
		display: flex;
		flex-direction: row;
	}

	.container .content-container .post-container .info .comment {
		margin-left: 60%;
		display: flex;
		flex-direction: row;
	}

	.container .content-container .post-container .info .like {
		display: flex;
		flex-direction: row;
		padding-left: 15%;
		margin-right: 10%;
	}
</style>
