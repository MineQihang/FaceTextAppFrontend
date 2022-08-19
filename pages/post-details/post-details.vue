<template>
	<view style="">
		<view class="edit" v-if="ismypost" @click="edit">
			<image src="/static/icons/edit.svg" />
		</view>
		<view class="delete" v-if="ismypost" @click="trash">
			<image src="/static/icons/delete.svg" />
		</view>
		<view class="collect">
			<image @tap="collect" v-show="iscollect" src="/static/icons/collect_purple.svg" />
		</view>
		<view class="collect">
			<image @tap="collect" v-show="!iscollect" src="/static/icons/collect.svg" />
		</view>

		<view class="post-content">
			<!-- 发帖人信息和发帖时间 -->
			<view class="poster-head">
				<!-- 发帖人头像	 -->
				<view class="portrait">
					<image :src="icon" alt="" v-model="icon" style=" border-radius: 80rpx;height: 80rpx;width:80rpx;">
				</view>
				<!-- 发帖人昵称 -->
				<view class="nickname username-font">
					{{username}}
				</view>
				<!-- 发帖时间 -->
				<view class="post_time">
					{{time}}
				</view>
			</view>

			<!-- 帖子的图片 -->
			<view class="photo" v-if="len">
				<swiper circular indicator-dots>
					<swiper-item v-for="item in swipers">
						<image :src="item" mode="aspectFit"></image>

					</swiper-item>

				</swiper>
				<view class="photo-info" @click="photo_info">
					<!-- <image src="@/static/icons/info.svg" v-if="len"></image> -->
					<uni-icons type="info-filled" v-if="len" size="28" color="rgb(74, 129, 226)"></uni-icons>
				</view>
			</view>



			<!-- 帖子 -->
			<view class="text" @click="com2post()">
				<!-- 标题 -->
				<view class="title">
					{{post_title}}
				</view>

				<!-- 正文 -->
				<view class="mainText">
					{{post_main}}
				</view>

			</view>

			<!-- 帖子的评论数和点赞数 -->
			<view class="com_like">
				<!-- 评论数 -->
				<view style="margin-right:60rpx; display: flex;">
					<uni-icons type="chat" size="30" class="comment-icon"></uni-icons>
					<view style="">
						{{numberComment}}
					</view>

				</view>
				<!-- 点赞数 -->
				<view style="display:flex; justify-content: flex-end; align-items: center; 
					margin-right: 20rpx; width: 100rpx;">
					<uni-icons :type="like_or_not[like].name" color="rgb(97, 97, 211)" size="30" class="like-icon"
						@click="like_it()">
					</uni-icons>
					<view style="width: 40rpx;">
						{{numberLike}}
					</view>

				</view>
			</view>
		</view>

		<!-- 评论区 -->
		<view class="comment-area" @click="com2post()" v-show="allComments.length">

			<view class="" style="background-color: white; margin-top: 8px; padding:14rpx">
				<!-- <text style="font-size:20px; font-weight:550;">评论</text> -->
			</view>

			<view class="" style="background-color: #fff;">
				<view class="comment1" v-for="(item,index) in allComments" :key="index"
					style="margin-left: 1rpx;padding-top: 0;">
					<view class="" style="display:flex;width: 100%;">
						<image :src="item.user.iconUrl"
							style="width: 74rpx;height: 74rpx;border-radius: 50%;margin: 10rpx 10rpx 10rpx 18rpx; ">
						</image>
						<view class="" style="flex: 1 0;">
							<view @click="pushUpCommentInput(item)">
								<view class=""
									style="position:relative; height: 40rpx;font-weight: 700;margin-top: 4px;">
									{{item.user.username}}
								</view>
								<view @click="com2com()"
									style="position:relative;padding-bottom:10rpx; color: rgb(70, 70, 70); padding-right: 10rpx;">
									{{item.context}}
								</view>
							</view>

							<view class="" v-for="(item1,index1) in item.comments" :key="index1"
								style="margin-top: 5rpx;">
								<view class="" style="display: flex;">
									<image :src="item1.user.iconUrl" class="head-icon1">
									</image>
									<view @click="pushUpCommentInput(item1)" style="flex: 1 0;">
										<view class="" style="height: 20px;font-weight: 400;" v-if="item1.reply">
											<text style="font-weight: bold;">{{item1.user.username+' '}}</text>
											<text style="color: rgb(70, 70, 70);">回复</text>
											<text style="font-weight: bold;">{{' '+item1.reply.username}}</text>
										</view>
										<view style="height: 20px;font-weight: bold;" v-else>
											{{item1.user.username}}
										</view>
										<view style="padding-bottom:5px; padding-right: 10rpx; color: rgb(70, 70, 70);">
											{{item1.context}}
										</view>
									</view>
								</view>
							</view>
						</view>

					</view>
				</view>
				<view style="height: 64px; width: 100%;"></view>
			</view>
		</view>

		<!-- 写评论 -->
		<view class="give_comment" v-show="postOrComment">
			<view class="">
				<input type="text" placeholder="发一条友善的评论" v-model="comment_text" maxlength=100 />
				<button @click="send_comment()">发表</button>
			</view>
		</view>
		<!-- 对评论发表评论 -->
		<view class="give_comment" v-show="!postOrComment">
			<view class="">
				<input type="text" :placeholder="replyUser" v-model="comment_text" :focus="!postOrComment"
					maxlength=100 />
				<button @click="send_comment_for_comment()">发表</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getTimeAgo
	} from "@/common/js/utils.js"
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.pid = parseInt(option.pid);
			this.lastIndex = parseInt(option.index);
			this.is_from_tabbar = true;
			this.from_url = '';
		},
		data() {
			return {
				like_or_not: [{
						id: 0,
						name: 'hand-up'
					},
					{
						id: 1,
						name: 'hand-up-filled'
					}
				],
				swipers: [],
				len: 0,
				uid: 0,
				pid: 0, //帖子的id
				comment1_cid: 0,
				comment2_cid: 0, //评论的id
				like: 0, //是否给这篇帖子点赞了
				iscollect: false,
				ismypost: false,
				icon: '@/static/icons/info.svg', //发帖人头像
				username: '', //发帖用户名
				time: '', //发帖时间
				numberComment: 0, //评论数
				numberLike: 0, //点赞数
				allComments: [], //所有评论
				comment_text: '', //给这个帖子的评论
				post_title: '', //帖子标题
				post_main: '',
				comuser_1: '',
				comuser_2: '',
				postOrComment: true,
				inner_click: false,
				replyUser: '',
				replycid: 0,
				is_from_tabbar: true,
				from_url: '/pages/homepage/explore/explore',
			}
		},
		onPullDownRefresh() {
			this.sendRequest_();
			setTimeout(
				() => {
					uni.stopPullDownRefresh();
				}, 700)
		},
		mounted() {
			this.sendRequest_();
		},
		onBackPress() {
			this.back();
		},
		methods: {
			sendRequest_() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');
					const my_uid = uni.getStorageSync('uid');
					if (!authorization) throw DOMException("Nope!");
					else {
						that.sendRequest({
							url: '/post/get_post_by_pid',
							method: 'POST',
							requestDataType: 'form',
							data: {
								pid: that.pid
							},
							success: (res) => {
								this.text = 'request success';
								if (res.code == 200) {
									that.numberComment = res.data.commentNum;
									that.numberLike = res.data.likeNum;
									that.post_title = res.data.title;
									that.post_main = res.data.context;
									that.time = getTimeAgo(res.data.createdTime);
									that.swipers = res.data.imgUrls;
									that.allComments = res.data.comments;
									that.icon = res.data.iconUrl;
									that.username = res.data.username;
									that.like = res.data.is_liked == true ? 1 : 0;
									that.uid = res.data.uid;
									that.ismypost = that.uid == my_uid ? true : false;
									that.len = that.swipers.length;
									that.iscollect = res.data.is_collected;

									if (res.data.comments && res.data.comments.length) {
										if (res.data.comments.user) {
											that.comment1_cid = res.data.comments.cid;
											that.comuser_1 = res.data.comments.user.username;
										}
										if (res.data.comments.comments && res.data.comments.comments
											.length) {
											that.comuser_2 = res.data.comments.comments.user.username;
											that.comment2_cid = res.data.comments.comment.cid;
										}
									}
								}
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			collect() {
				this.sendRequest({
					url: "/post/collect",
					method: 'POST',
					requestDataType: "form",
					data: {
						pid: this.pid,
					},
					success: (res) => {
						this.iscollect = !this.iscollect;
					}
				});
			},
			edit() {
				uni.navigateTo({
					url: "/pages/publish/edit-post?pid=" + this.pid
				})
			},
			trash() {
				let that = this;
				this.sendRequest({
					url: "/post/delete_post",
					method: 'POST',
					requestDataType: "form",
					data: {
						pid: this.pid,
					},
					success: (res) => {
						// console.log("成功删除");
						uni.navigateBack();
					},
				});
			},
			pushUpCommentInput(item) {
				this.postOrComment = !this.postOrComment;
				this.inner_click = true;
				// this.postOrComment = false;
				this.replyUser = "回复: " + item.user.username;
				this.replycid = item.cid;
			},
			com2post() {
				if (!this.postOrComment && !this.inner_click)
					this.postOrComment = true;
				this.inner_click = false;
			},
			send_comment_for_comment() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');
					console.log(authorization)
					if (!authorization) throw DOMException("Nope!");
					else {
						that.sendRequest({
							url: '/comment/comment_for_comment',
							method: 'POST',
							requestDataType: 'form',
							data: {
								pid: that.pid,
								context: that.comment_text,
								parent: that.replycid
							},
							success: (res) => {
								console.log(res)
								this.text = 'request success';
								if (res.code == 200) {
									that.comment_text = '';
									this.sendRequest_();
									console.log(res.detail)
								}
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			back() {
				var pages = getCurrentPages(); // 获取页面栈
				var prevPage = pages[pages.length - 2]; // 上一个页面
				let obj = {
					numberLike: this.numberLike,
					is_liked: this.like,
					index: this.lastIndex
				}
				// 调用$vm 注册一个自定义方法 将参数传入进去
				prevPage.$vm.pass2explore(obj)
				// uni.navigateBack();
			},
			send_comment() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');
					console.log(authorization)
					if (!authorization) throw DOMException("Nope!");
					else {
						that.sendRequest({
							url: '/comment/comment_for_post',
							method: 'POST',
							requestDataType: 'form',
							data: {
								pid: that.pid,
								context: that.comment_text
							},
							success: (res) => {
								console.log(res)
								this.text = 'request success';
								if (res.code == 200) {
									that.comment_text = '',
										that.sendRequest({
											url: '/post/get_post_by_pid',
											method: 'POST',
											requestDataType: 'form',
											data: {
												pid: that.pid
											},
											success: (res) => {
												this.text = 'request success';
												that.numberComment = res.data.commentNum;
												that.numberLike = res.data.likeNum;
												that.post_title = res.data.title;
												that.post_main = res.data.context;
												that.time = getTimeAgo(res.data.createdTime);
												that.swipers = res.data.imgUrls;
												that.allComments = res.data.comments;
												that.icon = res.data.iconUrl;
												that.username = res.data.username;
												that.like = res.data.is_liked == true ? 1 : 0;
												that.uid = res.data.uid;
												that.len = that.swipers.length;

											}
										})

								}
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			like_it() {
				let that = this;
				if (that.like == 0) {
					that.numberLike++;
					that.like = that.like + 1;
				} else {
					that.numberLike--;
					that.like = that.like - 1;
				}
				try {
					const authorization = uni.getStorageSync('authorization');
					if (!authorization) throw DOMException("Nope!");
					else {
						uni.request({
							url: 'http://124.221.253.187:5000/post/like',
							method: 'POST',
							header: {
								'Authorization': authorization,
								"content-type": "application/x-www-form-urlencoded"
							},
							data: {
								pid: that.pid,
								uid: that.uid
							},
							success: (res) => {
								console.log(res)
								this.text = 'request success';
								if (res.statusCode == 200) {} else {
									uni.showToast({
										title: res.data.detail,
										icon: 'none'
									})
								}
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			}, //给这个帖子点赞
		}
	}
</script>

<style lang="scss">
	.edit {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 80px;
		padding: 10px 8px;

		image {
			height: 24px;
			width: 24px;
		}
	}

	.delete {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 40px;
		padding: 10px 8px;

		image {
			height: 24px;
			width: 24px;
		}
	}

	.collect {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		padding: 10px 8px;

		image {
			height: 24px;
			width: 24px;
		}
	}

	.post-content {
		position: relative;
		padding-top: 10px;
		background-color: #fff;
	}

	.poster-head {
		display: flex;
		height: 100rpx;
	}

	.photo {
		swiper {
			width: 100%;
			height: 750rpx;

			swiper-item {
				image {
					width: 100%;
					height: 100%;
				}
			}

		}
	}

	.photo-info {
		position: absolute;
		z-index: 10;
		top: 800rpx;
		right: 10rpx;
		padding: 10rpx;

		image {
			width: 25px;
			height: 25px;
		}
	}

	.portrait {
		border-radius: 80rpx;
		height: 80rpx;
		width: 80rpx;
		background-color: #ffffff;
		margin-top: 10rpx;
		margin-left: 30rpx;
	}

	.nickname {
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.post_time {
		position: absolute;
		right: 5%;
		margin-top: 25rpx;
		font-weight: 150;
		font-size: 14px;
	}

	.com_like {
		// background-color: aquamarine;
		height: 88rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.text {}

	.title {
		padding-top: 20rpx;
		padding-left: 20rpx;
		font-size: 19px;
		line-height: 1.4em;
	}

	.mainText {
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 30rpx;
		font-weight: 200;
		line-height: 1.5em;
		color: rgb(40, 40, 40);
	}

	.head-icon1 {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin: 5rpx 10rpx 10rpx 0rpx;
	}


	.give_comment {
		position: fixed;
		bottom: 0;
		height: 76rpx;
		width: 100%;
		background-color: white;
		padding-top: 4rpx;
		padding-bottom: 4rpx;
	}

	.give_comment>view {
		position: fixed;
		width: 100%;
		height: 76rpx;
		// background-color: gainsboro;
	}

	.give_comment input {
		position: fixed;
		border-radius: 40rpx;
		padding-left: 24rpx;
		height: 76rpx;
		width: 500rpx;
		margin-left: 20rpx;
		background-color: gainsboro;
	}

	.give_comment button {
		position: fixed;
		right: 20rpx;
		height: 76rpx;
		width: 150rpx;
		line-height: 76rpx;
		background-color: #7073c9;
		border-radius: 50rpx;
		color: #fff;
	}

	.comment1 {
		display: flex;
	}
</style>
