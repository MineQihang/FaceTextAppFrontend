<template>

	<view class="container">
		<!-- 头部个人信息 -->
		<head-tab style="position: fixed; z-index: 999; width: 100%; "></head-tab>
		<!-- 帖子展示 -->
		<view class="content-container">
			<view class="post-container" v-for="(post, index) in postList" :key="index" @click="turnToPost(post.pid)">
				<view class="user-container">
					<view class="user-info">
						<image class="user-icon icon" :src="post.user.iconUrl" />
						<view class="username" style="padding-left: 20rpx; font-weight: 500; ">
							{{ post.user.username }}
						</view>
					</view>
					<view class=" date">{{ getFormatDate(post.updatedTime) }}</view>
				</view>
				<view class="photo-content" v-for="(url, index2) in post.imgUrls" :key="index2" v-if="index2 == 0">
					<image class="post-photo" :src="url" mode="widthFix" />
				</view>
				<view class="title">{{ post.title }}</view>
				<view class="info">
					<view class="info-up">
						<view class="comment">
							<uni-icons class="comment-icons" type="chat" size="20"></uni-icons>
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
	</view>
</template>

<script>
	import {
		getTimeAgo
	} from "@/common/js/utils.js"
	// import "../../common/css/flowPanel.css"
	export default {
		data() {
			return {
				uid: 79,
				postList: [],
				bpid: 9660530943306,
			}
		},
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
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			this.getMore();
		},
		onShow() {
			this.getPost();
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
			turnToPost(pid) {
				let url1 = '/pages/post-details/post-details?pid=' + pid;
				uni.navigateTo({
					url: url1
				})
			},
			getFormatDate(data) {
				return getTimeAgo(data);
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
		margin-top: 50rpx;
	}

	.container .content-container .post-container .user-container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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

	.container .content-container .post-container .photo-content {
		margin-top: 10rpx;
		/* display: flex;
		flex-direction: row; */
	}

	.container .content-container .post-container .photo-content .post-photo {
		width: 100%;
		/* max-height: 800rpx; */
		object-fit: cover;
	}

	.container .content-container .post-container .title {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-wrap: break-word;
		word-break: break-all;
		/* color: #333; */
		text-align: center;
		padding: 0.2em 0.5em;
		/* font-size: 20px; */
	}

	.container .content-container .post-container .info {
		/* width: 100%; */
		border-top: 1px #e9e9e9 solid;
	}

	.container .content-container .post-container .info .info-up {
		display: flex;
		flex-direction: row;
	}

	.container .content-container .post-container .info .info-up .comment {
		display: flex;
		flex-direction: row;
	}

	.container .content-container .post-container .info .info-up .like {
		display: flex;
		flex-direction: row;
		padding-left: 40%;
	}
</style>
