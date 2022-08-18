<template>
	<view>
		<!-- 上面的紫色部分 -->
		<view class="head-purple">
			<!-- 用户自定义背景 -->
			<image :src="back_icon" mode="aspectFit" @click="setIcon()" class="picture-background"></image>
			<!-- 返回按钮 -->
			<view class="" style="position: absolute;top: 0;">
				<image :src="background-icon" style="width: 100%;" mode=""></image>
			</view>
			<view class="" style="display: flex;">
				<view class="" @click="goBack()" style="padding-top: 36rpx;padding-left: 36rpx;">
					<image src="/static/icons/leftArrow.svg" style="width: 54rpx;height: 54rpx;" mode=""></image>
				</view>
				<view class=""
					style="padding-left: 36rpx;padding-top: 36rpx;font-size: 43.2rpx;font-weight: 700;color: #4605AD;">
					个人空间
				</view>
			</view>

		</view>

		<!-- 上面的白色部分 -->
		<view class="head-white">
		</view>

		<!-- 头像 -->
		<view class="user-portrait" style="">
			<image :src="iconUrl" mode="aspectFill" @click="setIcon()" class="portrait"></image>
		</view>

		<!-- 昵称 -->
		<view class="username">
			{{username1}}
		</view>

		<!-- 个性签名 -->
		<view class="" style="">
			<view class="motto" style="">
				{{motto1}}
			</view>
		</view>

		<!-- 个人信息 -->
		<view class="personal-information-unclick" v-if="choose1" @click="changeInformation()">
			<view class="information-click">
				个人信息
			</view>
		</view>

		<view class="personal-information-click" v-if="!choose1" @click="changeInformation()">
			<view class="information-unclick">
				个人信息
			</view>
		</view>

		<!-- 帖子 -->
		<view class="personal-post-unclick" v-if="!choose1" @click="changeInformation()">
			<view class="post-unclick">
				帖子
			</view>
		</view>

		<view class="personal-post-click" v-if="choose1" @click="changeInformation()">
			<view class="post">
				帖子
			</view>
		</view>

		<!-- 点击个人信息展示个人信息 -->
		<view v-if="!choose1">

			<view style="margin-left: 36rpx;margin-right: 36rpx;margin-top: 33.2rpx;">
				<view class="" style="font-size: 43.2rpx;font-weight: 400;">
					昵称
				</view>
				<view class="big-input">
					<input type="text" class="" v-model="username" style="padding-top: 30rpx;padding-left: 18rpx;">
				</view>

			</view>

			<view class="" style="display: flex; ">
				<view class="" style="margin-left: 36rpx;margin-top: 43.2rpx;">
					<view class="" style="font-size: 43.2rpx;font-weight: 400;">
						性别
					</view>
					<view class="" style="">
						<!-- <input type="text" class="small-input" style=""> -->
						<view class="input_btn" style="background-color: #ffffff;">

							<picker style="" mode="selector" :range="checkStudents" range-key="name"
								@change="checkStudent" v-model="checkStudents[studentIndex].name" class=" slect">
								{{checkStudents[studentIndex].name}}
							</picker>

						</view>
					</view>
				</view>

				<view class="" style="position: absolute; margin-top: 43.2rpx;right: 36rpx;">
					<view class="" style="font-size: 43.2rpx;font-weight: 400;">
						年龄
					</view>
					<view class="small-input">
						<input type="number" class="" v-model="age" style="padding-top: 30rpx;padding-left: 18rpx;">
					</view>
				</view>
			</view>

			<view style="margin-left: 36rpx;margin-right: 36rpx;margin-top: 33.2rpx;">
				<view class="" style="font-size: 43.2rpx;font-weight: 400;">
					邮箱
				</view>
				<view class="big-input">
					<input type="text" class="" v-model="mail" style="padding-top: 30rpx;padding-left: 18rpx;">
				</view>

			</view>

			<!-- 个人简介 -->
			<view style="margin-left: 36rpx;
			margin-right: 36rpx; margin-top: 33.2rpx;">
				<view class="" style="font-size: 43.2rpx;font-weight: 400;">
					个性签名
				</view>

				<view class="max-input">
					<input type="text" class="" v-model="motto" style="padding-top: 30rpx;padding-left: 18rpx;">
				</view>
			</view>

			<!-- 保存信息 -->
			<view>
				<button class="save-button" @click="save_inf()">保存信息</button>
			</view>

			<view style="height: 200rpx;">

			</view>
		</view>


		<!-- 点这里展示我的帖子 -->
		<view v-if="choose1">
			<view class="content">
				<view class="flowPanel">
					<view class="itemContainer" v-for="(item,index) in flowList" :key="index"
						@click="turnToPost(item.pid)">

						<view class="">
							<view class="date text-font " v-if="(index==0)||((index!=0)&&((flowList[index].createdTime.split('T'
							)[0])!=flowList[index-1].createdTime.split('T')[0]))">
								{{item.createdTime.split('T')[0]}}

							</view>

							<view class="title title-font">{{item.title}}</view>
							<view class="context text-font">{{item.context}}</view>
							<view class="itemContent" style="background-color: #ffffff;"
								v-for="(url,index2) in item.imgUrls" :key="index2" v-if="index2==0">
								<image class="" style="width: 100%;" :src="url" mode="widthFix">
							</view>
						</view>

						<view class="info">
							<view class="info-up">
								<view class="comment" style="">
									<image src="/static/icons/comment_grey.svg"
										style="width:36rpx;height:36rpx;padding-top: 8rpx;" mode=""></image>
									<view class="commentNum">{{item.commentNum}}</view>
								</view>
								<view class="like" style="">
									<!-- {{item.is_liked}} -->
									<image src="/static/icons/like_grey.svg" v-if="!item.is_liked"
										style="width: 36rpx;height: 36rpx;padding-top: 8rpx;" mode=""></image>
									<image src="/static/icons/like_purple.svg" v-if="item.is_liked"
										style="width: 36rpx;height: 36rpx;padding-top: 8rpx;" mode=""></image>

									<!-- <uni-icons type="heart-filled" size="20" v-if="item.is_liked"></uni-icons>
									<uni-icons type="heart" size="20" v-else></uni-icons> -->


									<view class="likeNum">{{item.likeNum}}</view>
								</view>
							</view>
						</view>

						<view class="" style="height: 5rpx;background-color: rgb(242, 243, 245);">

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

		data() {
			return {
				choose1: false,
				like_or_not: [{
						id: 0,
						name: 'heart'
					},
					{
						id: 1,
						name: 'heart-filled'
					}
				],
				checkStudents: [{
						id: 0,
						name: '女'
					},
					{
						id: 1,
						name: '男'
					},
					{
						id: 2,
						name: '保密'
					}
				],
				back_icon: '', //背景图
				studentIndex: 0,
				username: '',
				username1: '',
				age: '',
				mail: '',
				motto: '',
				motto1: '',
				uid: 0,
				iconUrl: '', //用户头像
				flowList: [],
				pid: 0,
				bpid: 0,

			}
		},
		mounted() {
			let that = this;
			try {
				const authorization = uni.getStorageSync('authorization');
				if (!authorization) throw DOMException("Nope!");
				else {
					this.sendRequest({
						url: '/user/user-info',
						success: (res) => {
							// this.text = 'request success';
							if (res.code == 200) {
								that.username = res.data.username;
								that.username1 = res.data.username;
								that.studentIndex = res.data.gender;
								that.age = res.data.age;
								that.motto = res.data.motto;
								that.motto1 = res.data.motto;
								that.mail = res.data.mail;
								that.iconUrl = res.data.iconUrl;
								// console.log(res.data.data);
								that.uid = res.data.uid;
							}
						}
					})
				}
			} catch (e) {
				console.log(e)
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
			likeIt(item) {
				let that = this;
				console.log(pid);
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
								pid: item.pid,
								uid: that.uid
							},
							success: (res) => {
								console.log(res)
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			checkStudent: function(e) {
				this.studentIndex = e.detail.value;
			},
			turnToPost(pid) {
				console.log(pid);
				let url1 = '/pages/post-details/post-details?pid=' + pid;
				uni.navigateTo({
					url: url1
				})
			},
			changeInformation() {
				this.choose1 = !this.choose1;
			},
			save_inf() {
				let that = this
				try {
					const authorization = uni.getStorageSync('authorization');
					this.sendRequest({
						url: '/user/change', // 路径
						method: 'POST', // 请求方法
						requestDataType: 'json',
						data: {
							uid: that.uid,
							username: that.username,
							gender: that.studentIndex,
							age: that.age,
							mail: that.mail,
							motto: that.motto,
							iconUrl: that.iconUrl
						}, //发送的数据
						success: (res) => {
							uni.showToast({
								title: '保存成功',
							});
							setTimeout(() => {
								uni.navigateBack();
							}, 800)
						}
					})

				} catch (e) {
					console.log(e)
				}
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
						console.log(res.data);
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
			init() {
				this.bpid = 9660530943306;
				this.flowList = [];
				this.getselfpost();
			},
			to_set() {
				uni.navigateTo({
					url: '@/pages/sidebar/settings/settings'
				})
			},

			// #ifdef APP-PLUS
			setIcon() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					crop: {
						width: "250px",
						height: "250px"
					},
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						uni.uploadFile({
							url: 'http://124.221.253.187:5000/service/upload_img',
							filePath: res.tempFilePaths[0],
							name: "img",
							success: (res2) => {

								that.iconUrl = JSON.parse(res2.data)["url"]
								console.log("头像上传成功")
							},
							fail(res2) {
								console.log(res2);
								console.log("头像上传失败")
							}
						});
					}
				});
			},
			// #endif

			// #ifdef H5
			setIcon() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						that.$refs.helangCompress.compress({
							src: res.tempFilePaths[0],
							maxSize: 250,
							fileType: "jpg",
							minSize: 250
						}).then((res2) => {
							// console.log(res2);
							// this.compressPaths = [res];
							uni.uploadFile({
								url: 'http://124.221.253.187:5000/service/upload_img',
								filePath: res2,
								name: "img",
								success: (res3) => {
									// console.log(JSON.parse(res3.data)["url"])
									that.iconUrl = JSON.parse(res3.data)["url"];
									console.log("头像上传成功")
								},
								fail(res3) {
									console.log(res3);
									console.log("头像上传失败")
								}
							});
						}).catch((err) => {
							console.log(err);
						})
					}
				});
			},
			// #endif

			// #ifdef APP-PLUS
			setIconBack() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					crop: {
						width: "250px",
						height: "250px"
					},
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						uni.uploadFile({
							url: 'http://124.221.253.187:5000/service/upload_img',
							filePath: res.tempFilePaths[0],
							name: "img",
							success: (res2) => {

								that.iconUrl = JSON.parse(res2.data)["url"]
								console.log("头像上传成功")
							},
							fail(res2) {
								console.log(res2);
								console.log("头像上传失败")
							}
						});
					}
				});
			},
			// #endif

			// #ifdef H5
			setIcon() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						that.$refs.helangCompress.compress({
							src: res.tempFilePaths[0],
							maxSize: 250,
							fileType: "jpg",
							minSize: 250
						}).then((res2) => {
							// console.log(res2);
							// this.compressPaths = [res];
							uni.uploadFile({
								url: 'http://124.221.253.187:5000/service/upload_img',
								filePath: res2,
								name: "img",
								success: (res3) => {
									// console.log(JSON.parse(res3.data)["url"])
									that.iconUrl = JSON.parse(res3.data)["url"];
									console.log("头像上传成功")
								},
								fail(res3) {
									console.log(res3);
									console.log("头像上传失败")
								}
							});
						}).catch((err) => {
							console.log(err);
						})
					}
				});
			},
			// #endif

		}
	}
</script>

<style>
	.picture-background {
		position: absolute;
		height: 368.2rpx;
		z-index: 0 !important;
	}

	.head-purple {
		height: 368.2rpx;
		background-color: rgb(192, 190, 253);
		z-index: -1 !important;
	}

	.head-white {
		height: 239.4rpx;
		background-color: white;
	}

	.user-portrait {
		position: absolute;
		top: 287.2rpx;
		left: 64.8rpx;
		width: 162rpx;
		height: 162rpx;
		border-radius: 162rpx;
		background-color: rgb(72, 189, 79);
		z-index: 1 !important;
	}

	.portrait {
		width: 162rpx;
		height: 162rpx;
		border-radius: 162rpx;
		z-index: 1 !important;
	}

	.username {
		position: absolute;
		top: 300rpx;
		left: 253.8rpx;
		font-size: 43.2rpx;
		font-weight: 700;
		z-index: 1 !important;
	}

	.motto {
		position: absolute;
		top: 368.2rpx;
		left: 253.8rpx;
		font-size: 32.4rpx;
		font-weight: 400;
		margin-top: 8rpx;
		z-index: 1 !important;
	}

	.personal-information-click {
		position: absolute;
		background-color: rgb(242, 243, 245);
		width: 252rpx;
		height: 81rpx;
		top: 529rpx;
		left: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
	}

	.personal-information-unclick {
		position: absolute;
		background-color: #ffff;
		width: 252rpx;
		height: 81rpx;
		top: 529rpx;
		left: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
	}


	.information-click {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		margin-left: 36rpx;
		color: black;
	}

	.information-unclick {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		margin-left: 36rpx;
		color: #4605AD;
	}

	.personal-post-click {
		position: absolute;
		background-color: rgb(242, 243, 245);
		width: 252rpx;
		height: 81rpx;
		top: 529rpx;
		right: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
	}

	.personal-post-unclick {
		position: absolute;
		background-color: #ffffff;
		width: 252rpx;
		height: 81rpx;
		top: 529rpx;
		right: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
	}

	.post {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		color: #4605AD;
		text-align: center;
	}

	.post-unclick {
		font-size: 43.2rpx;
		font-weight: 700;
		line-height: 50.4rpx;
		margin-top: 12.8rpx;
		color: #000000;
		text-align: center;
	}

	.small-input {

		width: 306rpx;
		height: 108rpx;
		border-radius: 36rpx;
		background-color: #ffffff;
		margin-top: 10rpx;
	}

	.big-input {

		height: 108rpx;
		background-color: #ffffff;
		border-radius: 36rpx;
		margin-top: 15rpx;
	}

	.max-input {
		height: 108rpx;
		background-color: #ffffff;
		border-radius: 36rpx;
		margin-top: 15rpx;
	}

	.save-button {
		position: fixed;
		bottom: 34rpx;
		left: 84.6rpx;
		right: 84.6rpx;
		height: 115.2rpx;
		border-radius: 36rpx;
		background-color: #4605AD;
		color: #ffffff;
		line-height: 110rpx;
	}

	.input_btn {
		margin-top: 10rpx;
		height: 108rpx;
		width: 306rpx;
		background-color: #f5f5f5;
		border-radius: 36rpx;
	}

	.slect {
		/* margin-top: 30rpx; */
		padding-top: 37rpx;
		padding-left: 18rpx;
		font-size: 33.2rpx;
		font-weight: 400;
	}

	.set {
		height: 5rpx;
		width: 5rpx;
		position: absolute;
		right: 11%;
		top: 7%;
		/* background-color: green; */
	}

	.content {
		width: 100%;
		background-color: #ffffff;
		/* height: 400px; */
	}

	@charset "utf-8";

	.flowPanel {
		/* flex-direction: row; */
		justify-content: space-between;
		width: 100%;
		overflow: hidden;
		/* background-color: #f8f8f8; */
	}

	.itemContainer {
		border-color: #f8f8f8;
		width: 100%;
		/* height: 318px; */
		border-radius: 0px;
		display: flex;
		flex-direction: column;
		padding: 0px;
		flex: 1;
		margin: 0px 0px;
		background-color: #ffffff;
		/* border: 2px solid red; */
	}

	.itemContent {
		width: 100%;
		display: block;
		/* height: 250px; */
		/* border: 2px solid red; */
	}

	.itemContent img {
		width: 100%;
		display: block;
		margin: -2px;
		object-fit: scale-down;
		padding-top: 10px;
		/* border: 2px solid blue; */
	}

	.title {
		overflow: hidden;
		color: #333;
		text-align: left;
		padding-top: 15rpx;
		padding-left: 36rpx;
	}

	.info {
		width: 100%;
		color: #8a8a8a;
		overflow: hidden;

	}

	.info-up {
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
	}


	.comment {
		flex-direction: row;
		background-color: white;
		padding-left: 489.6rpx;
	}


	.commentNum {
		margin-left: 10rpx;
		flex-direction: row;
		font-size: 32.4rpx;
		line-height: center;
		float: right;
		font-weight: 400;
		margin-top: 5rpx;
	}


	.like {
		flex-direction: row;
		padding-left: 115.2rpx;
		background-color: white;
	}

	.likeNum {
		margin-left: 15rpx;
		margin-top: 5rpx;
		flex-direction: row;
		font-size: 32.4rpx;
		line-height: center;
		float: right;
		font-weight: 400;
	}

	.flowPanel .itemContainer .info .info-down {
		display: flex;
		flex-direction: row;
	}

	.date {
		font-size: 43.2rpx;
		font-weight: 700;
		padding-top: 36rpx;
		padding-left: 18rpx;
		padding-bottom: 10rpx;
		line-height: center;
		background-color: rgb(242, 243, 245);
		color: rgb(70, 5, 173);
	}

	.context {
		padding-top: 15rpx;
		padding-left: 36rpx;
		padding-right: 36rpx;
		line-height: center;
		background-color: white;
		line-height: 36rpx;
	}
</style>
