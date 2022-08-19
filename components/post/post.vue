<template>
	<view class="container">
		<view class="content-container" style="width: 100%;">
			<view class="post-container" v-for="(post, index) in postList" :key="index">

				<view class="user-container">
					<view class="user-info">
						<image class="user-icon icon" :src="post.user.iconUrl" />
						<view class="username  username-font" style="padding-left: 20rpx; font-weight: 500; ">
							{{ post.user.username }}
						</view>
					</view>
					<view class=" date text-font">{{ getFormatDate(post.updatedTime) }}</view>
				</view>

				<view class="click-container" @click="turnToPost(post.pid,index)">
					<view class="title title-font">{{ post.title }}</view>

					<view class="text text-font">{{ post.context }}</view>

					<view class="photo-content" v-for="(url, index2) in post.imgUrls" :key="index2" v-if="index2 == 0">
						<image class="post-photo" :src="url" mode="widthFix" />
					</view>

					<view class="info text-font">
						<view class="comment">
							<uni-icons type="chat" size="30" class="comment-icon"></uni-icons>
							<view class="commentNum">{{ post.commentNum }}</view>
						</view>

						<view class="like">
							<uni-icons class="like-icons" type="hand-up-filled" color="rgb(97, 97, 211)" size="30"
								v-if="post.is_liked"></uni-icons>
							<uni-icons class="like-icons" type="hand-up" color="rgb(97, 97, 211)" size="30" v-else>
							</uni-icons>
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

	export default {
		name: "post",
		props: {
			// 检测类型 + 其他验证
			postList: {
				type: Array,
				default: [],
				required: true
			}
		},
		methods: {
			turnToPost(pid, index) {
				console.log("跳转到第" + index + "个帖子");
				console.log(pid);
				let url1 = '/pages/post-details/post-details?pid=' + pid + '&index=' + index;
				uni.navigateTo({
					url: url1
				})
			},
			getFormatDate(data) {
				return getTimeAgo(data);
			},
		}
	}
</script>

<style>
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
		/* background-color: gray; */
	}

	.container .content-container .post-container .info .comment .comment-icons {}

	.container .content-container .post-container .info .comment .commentNum {}

	.container .content-container .post-container .info .like {
		display: flex;
		flex-direction: row;
		padding-left: 15%;
		margin-right: 10%;
	}
</style>
