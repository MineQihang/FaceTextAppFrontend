<template>
	<view>
		<!-- 顶部导航栏 -->
		<view class="delete" v-if="ismypost" @click="trash">
			<image src="/static/icons/delete.svg" />
		</view>
		<view class="collect">
			<image @click="collect" v-show="iscollect" src="/static/icons/star_purple.svg" />
		</view>
		<view class="collect">
			<image @click="collect" v-show="!iscollect" src="/static/icons/star.svg" />
		</view>

		<view class="post-content">
			<!-- 发帖人信息和发帖时间 -->
			<view class="poster-head">
				<!-- 发帖人头像	 -->
				<view class="portrait" @click="go_person(uid)">
					<image :src="icon" alt="" v-model="icon" mode="aspectFill"
						style=" border-radius: 80rpx;height: 80rpx;width:80rpx;">
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
				<swiper circular indicator-dots @change="change_pic">
					<swiper-item v-for="item in swipers">
						<image :src="item" mode="aspectFit" @click="see_photo(current_pic)"></image>

					</swiper-item>
				</swiper>
				<view class="photo-info" @click="photo_info(current_pic)">
					<uni-icons type="info-filled" v-if="len" size="28" color="rgb(74, 129, 226)"></uni-icons>
				</view>
			</view>

			<!-- 帖子文本 -->
			<view class="text" @click="com2post()">
				<!-- 标题 -->
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="title">
						{{post_title}}
					</view>
					<uni-icons :type="voicing?'sound-filled':'sound'" size="26" class='voice' @click="play_voice()">
					</uni-icons>
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
					<uni-icons :type="like_or_not[like].name" color="#6161d3" size="30" @click="like_it()">
					</uni-icons>
					<view style="width: 40rpx;">
						{{numberLike}}
					</view>
				</view>
			</view>
		</view>

		<!-- 评论区 -->
		<view class="comment-area" @click="com2post()" v-show="allComments.length">
			<view class="" style="background-color: white; margin-top: 8px; padding:14rpx"></view>
			<!-- 第一级评论 -->
			<view class="" style="background-color: #fff;">
				<view class="comment1" v-for="(item,index) in allComments" :key="index"
					style="margin-left: 1rpx;padding-top: 0;">
					<view class="" style="display:flex;width: 100%;">
						<image :src="item.user.iconUrl" @click="go_person(item.uid)" mode="aspectFill"
							style="width: 74rpx;height: 74rpx;border-radius: 50%;margin: 10rpx 10rpx 10rpx 18rpx; ">
						</image>
						<view class="" style="flex: 1 0;">
							<view @click="pushUpCommentInput(item)">
								<view class="" style="position:relative; height: 40rpx;margin-top: 4px;">
									{{item.user.username}}
								</view>
								<view @click="com2com()"
									style="position:relative;padding-bottom:10rpx; color: rgb(70, 70, 70); padding-right: 10rpx;">
									{{item.context}}
								</view>
							</view>
							<!-- 第二级评论 -->
							<view class="" v-for="(item1,index1) in item.comments" :key="index1"
								style="margin-top: 5rpx;">
								<view class="" style="display: flex;">
									<image @click="go_person(item1.uid)" :src="item1.user.iconUrl" mode="aspectFill"
										class="head-icon1">
									</image>
									<view @click="pushUpCommentInput(item1)" style="flex: 1 0;">
										<view class="" style="height: 20px;" v-if="item1.reply">
											<text style="">{{item1.user.username+' '}}</text>
											<text style="color: rgb(70, 70, 70);">回复</text>
											<text style="">{{' '+item1.reply.username}}</text>
										</view>
										<view style="height: 20px;" v-else>
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
		<!-- 人脸信息弹出层 -->
		<uni-popup ref="popup" type="bottom" class="popup" background-color="#fff" v-if="get_features">
			<view class="popup-content">
				<view class="feature-title">识别结果</view>
				<view class="features">
					<view class="res">
						<view class="" v-for="(item,index) in feature_items">
							{{item[1] + ': ' + features[current_pic][item[0]].res}}
						</view>
					</view>
					<view class="rate">
						<view class="" v-for="(item,index) in feature_items">
							{{'置信度: ' + format_rate(features[current_pic][item[0]].rate)}}
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
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
				uid: 0, //帖主的id
				pid: 0, //帖子的id
				comment1_cid: 0,
				comment2_cid: 0, //评论的id
				like: 0, //是否给这篇帖子点赞了
				icon: '/static/icons/info.svg', //发帖人头像
				current_pic: 0, //当前图的index
				username: '', //发帖用户名
				time: '', //发帖时间
				numberComment: 0, //评论数
				numberLike: 0, //点赞数
				allComments: [], //所有评论
				comment_text: '', //给这个帖子的评论
				post_title: '', //帖子标题
				features: [], //人脸特征
				voice: '', //音频url
				voicing: false,
				paused: false,
				innerAudioContext: Object,
				iscollect: false,
				ismypost: false,
				feature_items: [
					['score', '颜值'],
					['sex', '性别'],
					['age', '年龄'],
					['expression', '表情']
				],
				get_features: false,
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
			this.get_post();
			setTimeout(
				() => {
					uni.stopPullDownRefresh();
				}, 700)
		},
		mounted() {
			this.get_post();
		},
		onBackPress() {
			this.back();
		},
		methods: {
			get_post() {
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
									that.features = res.data.features;
									if (that.swipers.length) that.get_features = true;
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
									this.get_voice()
								}
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			// 获取远程语音合成结果
			get_voice() {
				let spd = uni.getStorageSync('spd')
				let pit = uni.getStorageSync('pit')
				let vol = uni.getStorageSync('vol')
				let per = uni.getStorageSync('per')
				let text = this.post_title + ' 。' + this.post_main
				this.sendRequest({
					url: "/service/speech_synthesis",
					method: 'POST',
					requestDataType: "form",
					data: {
						text: text,
						spd: spd,
						pit: pit,
						vol: vol,
						per: per
					},
					success: (res) => {
						this.voice = res.url
					},
				});
			},
			// 收藏帖子
			collect() {
				this.iscollect = !this.iscollect;
				this.sendRequest({
					url: "/post/collect",
					method: 'POST',
					requestDataType: "form",
					data: {
						pid: this.pid,
					},
					success: (res) => {

					}
				});
			},
			// 删除帖子(仅自己的)
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
						var pages = getCurrentPages(); // 获取页面栈
						var prevPage = pages[pages.length - 2]; // 上一个页面
						let obj = {
							isTrashed: 1,
							numberComment: this.numberComment,
							numberLike: this.numberLike,
							is_liked: this.like,
							index: this.lastIndex
						}
						prevPage.$vm.pass2explore(obj)
						uni.navigateBack();
					},
				});
			},
			init() {},
			// 点击个人头像
			go_person(uid) {
				uni.navigateTo({
					url: '/pages/sidebar/personal-space/personal-space?uid=' + uid
				})
			},
			see_photo(index) {
				//在Safari上预览图片后退出会有约1秒白屏，推测是uni的api适配有问题
				uni.previewImage({
					urls: this.swipers,
					current: index,
				})
			},
			// 滑动图片
			change_pic(e) {
				this.current_pic = e.detail.current;
			},
			// 查看图片人脸信息
			photo_info(index) {
				this.$refs.popup.open()
			},
			format_rate(rate) {
				return (Number(rate) * 100).toFixed(0) + '%'
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
			play_voice() {
				if (this.voicing) {
					this.innerAudioContext.stop()
					this.voicing = false
					return
				}
				this.voicing = true;
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.src = this.voice;
				this.innerAudioContext.play();
				this.innerAudioContext.onEnded(() => {
					this.voicing = false
				})
			},
			send_comment_for_comment() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');
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
								this.text = 'request success';
								if (res.code == 200) {
									that.comment_text = '';
									this.get_post();
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
					numberComment: this.numberComment,
					numberLike: this.numberLike,
					is_liked: this.like,
					index: this.lastIndex
				}
				// 调用$vm 注册一个自定义方法 将参数传入进去
				prevPage.$vm.pass2explore(obj)
			},
			send_comment() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');
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
								this.text = 'request success';
								if (res.code == 200) {
									that.comment_text = '';
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
			// 点赞或取消点赞
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
								this.text = 'request success';
								if (res.statusCode != 200) {
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
			},
		}
	}
</script>

<style lang="scss">
	.post-content,
	.comment-area,
	.give_comment {
		animation: fade 0.5s;
	}

	@keyframes fade {
		0% {
			opacity: 0;

		}

		100% {
			opacity: 100;
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
		right: 24rpx;
		margin-top: 25rpx;
		font-weight: 150;
		font-size: 14px;
	}

	.com_like {
		height: 88rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.title {
		padding-top: 20rpx;
		padding-left: 20rpx;
		font-size: 20px;
		line-height: 1.4em;
	}

	.voice {
		width: 24px;
		height: 24px;
		padding: 20rpx 20rpx 4rpx 10rpx;
	}

	.mainText {
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 17px;
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
		height: 70rpx;
		width: 100%;
		background-color: rgb(242, 242, 242);
		padding-top: 12rpx;
		padding-bottom: 12rpx;
		border-top: 1px solid rgb(227, 227, 227);
	}

	.give_comment>view {
		position: fixed;
		width: 100%;
		height: 70rpx;
	}

	.give_comment input {
		position: fixed;
		border-radius: 40rpx;
		padding-left: 24rpx;
		padding-right: 24rpx;
		height: 70rpx;
		width: 500rpx;
		margin-left: 20rpx;
		background-color: gainsboro;
	}

	.give_comment button {
		position: fixed;
		right: 20rpx;
		height: 70rpx;
		width: 150rpx;
		line-height: 70rpx;
		background-color: #7073c9;
		border-radius: 50rpx;
		color: #fff;
	}

	.comment1 {
		display: flex;
	}

	.popup {}

	.feature-title {
		font-size: 16px;
		margin: 10rpx 16rpx;
		color: rgb(74, 129, 226);
	}

	.features {
		display: flex;
		font-size: 16px;
		margin: 8rpx 16rpx;
	}

	.rate {
		margin-left: 50rpx;
	}
</style>
