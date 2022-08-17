<template>
	<!-- 帖子详情界面 -->
	<view style="">
		<!-- 顶部返回和点赞 -->
		<view class="head">
			<uni-icons type="arrow-left" size="30" class="back-icon" @click="back()"></uni-icons>
			<!-- <uni-icons :type="like_or_not[like].name" size="30" class="heart-icon" @click="like_it()"> -->
			<!-- </uni-icons> -->
		</view>

		<view class="main_con">
			<!-- 发帖人信息和发帖时间 -->
			<view class="infor_time">
				<!-- 发帖人头像	 -->
				<view class="portrait">
					<image :src="icon" alt="" v-model="icon" style=" border-radius: 80rpx;height: 80rpx;width:80rpx;">
				</view>
				<!-- 发帖人昵称 -->
				<view class="nickname">
					{{username}}
				</view>
				<!-- 发帖时间 -->
				<view class="post_time">
					{{time.split("T").join(" ")}}

				</view>
			</view>

			<!-- 帖子的图片 -->
			<view class="photo_" v-show="len">
				<swiper circular indicator-dots>
					<swiper-item v-for="item in swipers">
						<image :src="item" class="" mode="aspectFit"></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 帖子的评论数和点赞数 -->
			<view class="com_like">
				<!-- 评论数 -->
				<view class="" style="margin-top: 20rpx;margin-left: 200rpx;margin-right:100rpx;display: flex;">
					<view class="" style="margin-left: 50rpx;">
						{{numberComment}}
					</view>
					<uni-icons type="chat" size="30" class="comment-icon"></uni-icons>
				</view>
				<!-- 点赞数 -->
				<view class="" style="margin-top: 20rpx; display: flex;">
					<view class="" style="margin-left: 50rpx;">
						{{numberLike}}
					</view>
					<uni-icons :type="like_or_not[like].name" size="30" class="like-icon" @click="like_it()">
					</uni-icons>
				</view>
			</view>

			<!-- 帖子 -->
			<view class="main">
				<!-- 标题 -->
				<view class="title">
					{{post_title}}
				</view>
				<!-- 正文 -->
				<view class="mainText">
					{{post_main}}
				</view>
				<image src="@/static/laba.png" mode="" class="smallLaba"></image>
			</view>

			<!-- 评论区 -->
			<view class="">

				<view class="" style="background-color: #f1f1fe;margin-left: 10rpx;margin-right: 10rpx;">
					<text style="color:#888bf4; font-size:35rpx; font-weight:550; margin-left:10rpx">评论</text>
				</view>

				<view class="" style="height: 300rpx;">
					<view class="comment1" v-for="(item,index) in allComments" :key="index"
						style="margin-left: 1rpx;margin-top: 5rpx;">
						<view class="" style="display:flex;width: 750rpx;">
							<image :src="item.user.iconUrl" style="width: 100rpx;height: 100rpx;border-radius: 100rpx;"
								mode="">
							</image>
							<view class="">
								<view @click="pushUpCommentInput(item)">
									<view class="" style="position:relative;height: 50rpx;font-weight: 800;">
										{{item.user.username}}
									</view>
									<view class="" style="position:relative;height: 50rpx;" @click="com2com()">
										{{item.context}}
									</view>
								</view>
								<view class="" v-for="(item1,index1) in item.comments" :key="index1"
									style=" margin-left: 1rpx;margin-top: 5rpx;" @click="pushUpCommentInput(item1)">

									<view class="" style="display: flex;">
										<image :src="item1.user.iconUrl"
											style="width: 80rpx;height: 80rpx;border-radius: 80rpx;" mode="">
										</image>
										<view class="">
											<view class="" style="height: 40rpx;font-weight: 800;" v-if="item1.reply">
												{{item1.user.username}}回复{{item1.reply.username}}
											</view>
											<view class="" style="height: 40rpx;font-weight: 800;" v-else>
												{{item1.user.username}}
											</view>
											<view class="" style="height: 40rpx;">
												{{item1.context}}
											</view>

										</view>
									</view>

								</view>
							</view>

						</view>
						<!-- <view class="" v-for="(item1,index1) in allComments" :key="index">
						
					</view> -->

					</view>
					<view style="height: 120rpx; width: 100%;"></view>
				</view>
			</view>
		</view>
		<!-- 写评论 -->
		<view class="give_comment" v-show="postOrComment">
			<view class=""
				style="border-radius: 50rpx;width: 84%;height:100rpx;background-color: gainsboro;display: flex;">
				<input type="text" placeholder="发一条友善的评论" style="height: 100rpx;margin-left: 30rpx;"
					v-model="comment_text">
				<button style="position: fixed;right: 0;height: 100rpx;background-color: #8b8ef9;border-radius: 50rpx;color:#ffff
				 ;" @click="send_comment()">发表</button>
			</view>
		</view>
		<!-- 对评论发表评论 -->
		<view class="give_comment" v-show="!postOrComment">
			<view class=""
				style="border-radius: 50rpx;width: 84%;height:100rpx;background-color: gainsboro;display: flex;">
				<input type="text" :placeholder="replyUser" style="height: 100rpx;margin-left: 30rpx;"
					v-model="comment_text" :focus="!postOrComment">
				<button style="position: fixed;right: 0;height: 100rpx;background-color: #8b8ef9;border-radius: 50rpx;color:#ffff
				 ;" @click="send_comment_for_comment()">发表</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.pid = parseInt(option.pid);
			// console.log(this.pid) //打印出上个页面传递的参数。//打印出上个页面传递的参数。
		},
		data() {
			return {
				like_or_not: [{
						id: 0,
						name: 'heart'
					},
					{
						id: 1,
						name: 'heart-filled'
					}
				],
				swipers: [],
				len: 0,
				uid: 0,
				pid: 0, //帖子的id
				comment1_cid: 0,
				comment2_cid: 0, //评论的id
				like: 0, //是否给这篇帖子点赞了
				icon: '/static/Header_img.png', //发帖人头像
				username: 'ikun', //发帖用户名
				time: '两年半之前', //发帖时间
				numberComment: 0, //评论数
				numberLike: 0, //点赞数
				allComments: [], //所有评论
				comment_text: '', //给这个帖子的评论
				post_title: '', //帖子标题
				post_main: '',
				comuser_1: '',
				comuser_2: '',
				postOrComment: true,
				replyUser: '',
				replycid: 0
			}
		},
		onPullDownRefresh() {
			this.sendRequest();
			uni.stopPullDownRefresh()
		},
		mounted() {
			this.sendRequest_();
		},
		methods: {
			sendRequest_() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');

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
									that.time = res.data.createdTime;
									that.swipers = res.data.imgUrls;
									that.allComments = res.data.comments;
									that.icon = res.data.iconUrl;
									that.username = res.data.username;
									that.like = res.data.is_liked == true ? 1 : 0;
									that.uid = res.data.uid;
									that.len = that.swipers.length;
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
			pushUpCommentInput(item) {
				this.postOrComment = !this.postOrComment;
				this.replyUser = "回复: " + item.user.username;
				this.replycid = item.cid;
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
				uni.switchTab({
					url: "/pages/homepage/explore/explore"
				});
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
												that.time = res.data.createdTime;
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
	.head {
		position: fixed;
		height: 158rpx;
		width: 100%;
		background-color: rgb(238, 238, 238);
		z-index: 10;
	}

	.main_con {
		position: relative;
		padding-top: 158rpx;

	}

	.back-icon {
		position: absolute;
		top: 82rpx;
		left: 34rpx;
	}

	.heart-icon {
		position: absolute;
		top: 82rpx;
		right: 34rpx;
	}

	.comment-icon {
		// position: absolute;
		// top: 55%;
		// left: 30%;

	}

	.like-icon {
		// position: absolute;
		// top: 55%;
		// right: 35%;
	}

	.infor_time {
		display: flex;
		// margin-top: 150rpx;
		height: 100rpx;
		// background-color: antiquewhite;
	}

	.photo_ {
		swiper {
			width: 100%;
			height: 500rpx;

			image {
				width: 100%;
				height: 100%;
			}
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
		font-weight: 200;
		font-size: 38rpx;
		margin-top: 20rpx;
		margin-left: 20rpx;
	}

	.post_time {
		position: absolute;
		right: 5%;
		margin-top: 25rpx;
		font-weight: 150;
		font-size: 20rpx;
	}

	.com_like {
		// background-color: aquamarine;
		height: 88rpx;
		display: flex;
	}

	.main {}

	.title {
		padding-top: 20rpx;
		padding-left: 20rpx;
		font-weight: 500;
		font-size: 40rpx;
	}

	.mainText {
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 30rpx;
		font-weight: 200;
	}

	.smallLaba {
		width: 30rpx;
		height: 30rpx;
		padding-left: 710rpx;
	}

	.give_comment {
		position: fixed;
		bottom: 0;
		height: 100rpx;
		width: 750rpx;
		// background-color: sandybrown;
	}

	.comment1 {
		background-color: rgb(246, 240, 249);
		display: flex;
	}
</style>