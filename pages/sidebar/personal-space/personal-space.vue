<template>
	<view>
		<!-- 上面的紫色部分 -->
		<view class="head-purple" style="">
			<!-- 用户自定义背景 -->

			<!-- 返回按钮 -->
			<view class="" style="display: flex;">
				<view class="" @click="goBack()"
					style="color: #4605AD;z-index: 2!important; padding-top: 36rpx;padding-left: 36rpx;">
					<image src="/static/icons/leftArrow.svg" style="width: 54rpx;height: 54rpx;color: #4605AD;" mode="">
					</image>
				</view>

				<view class=""
					style="color: #4605AD;z-index: 2!important;padding-left: 36rpx;width: 100%; padding-top: 40rpx;font-size: 43.2rpx;font-weight: 700;">
					<view class="" style="color: #4605AD">

					</view>
				</view>

				<view class="" @click="subscribe()" v-if="uid!=othersId&&othersId!=-1"
					style="z-index: 100!important;padding-top: 36rpx;margin-right:43.2rpx;font-size: 43.2rpx;font-weight: 700;color: #4605AD;">
					<view class="" style="width: 144rpx;text-align: end;" v-if="subscribe_or_not===false">
						+关注
					</view>
					<view class="" style="width: 144rpx;text-align: end;" v-if="subscribe_or_not===true">
						已关注
					</view>
				</view>
			</view>
		</view>
		<image :src="other_back_icon" v-if="uid!=othersId && othersId!=-1" mode="aspectFill" class="picture-background">
		</image>
		<image :src="back_icon" v-if="uid===othersId || othersId===-1" @click="setBackgroundIcon()" mode="aspectFill"
			class="picture-background">
		</image>



		<!-- 上面的白色部分 -->
		<view class="head-white">
		</view>

		<!-- 头像 -->
		<view class="user-portrait" style="">
			<image :src="iconUrl" mode="aspectFill" @click="setIcon()" v-if="uid===othersId|| othersId===-1"
				class="portrait"></image>
			<image :src="otherIconUrl" mode="aspectFill" @click="previewImg(otherIconUrl)" class="portrait"
				v-if="uid!=othersId && othersId!=-1"></image>
		</view>

		<!-- 昵称 -->
		<view class="username" v-if="uid===othersId || othersId===-1">
			{{username1}}
		</view>
		<view class="username" v-if="uid!=othersId">
			{{otherUsername}}
		</view>

		<!-- 个性签名 -->
		<view class="" style="" v-if="uid===othersId|| othersId===-1">
			<view class="motto" style="">
				{{motto1}}
			</view>
		</view>

		<view class="" style="" v-if="uid!=othersId">
			<view class="motto" style="">
				{{otherMotto}}
			</view>
		</view>

		<!-- 个人信息 -->
		<view class="personal-information-unclick" v-if="choose1" @click="changeInformation()">
			<view class=" information-click">
				个人信息
			</view>
		</view>

		<view class="personal-information-click" v-if="!choose1">
			<view class=" information-unclick">
				个人信息
			</view>
		</view>

		<!-- 帖子 -->
		<view class="personal-post-unclick" v-if="!choose1" @click="changeInformation()">
			<view class="post-unclick">
				帖子
			</view>
		</view>

		<view class="personal-post-click" v-if="choose1">
			<view class="post">
				帖子
			</view>
		</view>

		<!-- 点击个人信息展示个人信息 -->
		<view v-if="uid===othersId || othersId===-1">
			<view v-show="!choose1">

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


				<!-- 个人简介 -->
				<view style="margin-left: 36rpx;
				margin-right: 36rpx; margin-top: 33.2rpx;">
					<view class="" style="font-size: 43.2rpx;font-weight: 400;">
						个性签名
					</view>

					<view class="max-input">
						<input type="text" class="" v-model="motto" @input="descInput"
							style="padding-top: 30rpx;padding-left: 18rpx;" v-if="display">
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





				<view style="height: 100rpx;">

				</view>
				<!-- 保存信息 -->
				<view>
					<button class="save-button" @click="save_inf()">保存信息</button>
				</view>

				<view style="height: 50rpx;">

				</view>
			</view>
		</view>

		<view v-if="uid!=othersId &&othersId!=-1">
			<view v-show="!choose1">

				<view style="margin-left: 36rpx;margin-right: 36rpx;margin-top: 33.2rpx;">
					<view class="" style="font-size: 43.2rpx;font-weight: 400;">
						昵称
					</view>
					<view class="big-input">
						<view class="" style="font-size:18px; padding-top: 30rpx;padding-left: 18rpx;">
							{{otherUsername}}
						</view>
					</view>

					<view class="" style="display: flex;">
						<view class="" style="margin-top: 43.2rpx;">
							<view class="" style="font-size: 43.2rpx;font-weight: 400;">
								性别
							</view>

							<!-- <input type="text" class="small-input" style=""> -->
							<view class="input_btn" style="background-color: #ffffff;">
								<view style="font-size:18px;" class=" slect">
									{{checkStudents[studentIndex1].name}}
								</view>
							</view>

						</view>

						<view class="" style="position: absolute; margin-top: 43.2rpx;right: 36rpx;">
							<view class="" style="font-size: 43.2rpx;font-weight: 400;">
								年龄
							</view>
							<view class="small-input">
								<view class="" style="font-size:18px;padding-top: 30rpx;padding-left: 18rpx;">
									{{otherAge}}
								</view>
							</view>
						</view>



					</view>


					<!-- 个人简介 -->
					<view style=" margin-top: 33.2rpx;">
						<view class="" style="font-size: 43.2rpx;font-weight: 400;">
							个性签名
						</view>

						<view class="max-input">
							<view class="" style="font-size: 18px; padding-top: 30rpx;padding-left: 18rpx;">
								{{otherMotto}}
							</view>
						</view>

					</view>
					<view style="margin-top: 33.2rpx;">
						<view class="" style="font-size: 43.2rpx;font-weight: 400;">
							邮箱
						</view>
						<view class="big-input">
							<view class="" style="font-size:18px;padding-top: 30rpx;padding-left: 18rpx;">
								{{otherMail}}
							</view>

						</view>
						<view style="height: 200rpx;">
						</view>
					</view>



				</view>
			</view>
		</view>






		<!-- 点这里展示我的帖子 -->
		<view v-show="choose1">
			<view class="content">
				<view class="flowPanel">
					<view class="itemContainer" v-for="(item,index) in flowList" :key="index"
						@click="turnToPost(item.pid, index)">

						<view class="">
							<view class="date text-font " v-if="(index==0)||((index!=0)&&((flowList[index].createdTime.split('T'
							)[0])!=flowList[index-1].createdTime.split('T')[0]))">
								{{item.createdTime.split('T')[0]}}

							</view>
							<view class="title title-font">{{item.title}}</view>
							<view class="context text-font" v-if="item.context">{{item.context}}</view>
							<view class="itemContent" style="background-color: #ffffff;"
								v-for="(img,index2) in item.imgUrls" :key="index2" v-if="index2==0">
								<image class="" style="width: 100%;" :src="img" mode="widthFix">
							</view>
						</view>

						<view class="info">
							<view class="info-up">
								<view class="comment" style="">
									<uni-icons type="chat" size="30"
										style="width: 36rpx;height: 36rpx;padding-top: 15rpx;">
									</uni-icons>
									<view class="commentNum">{{item.commentNum}}</view>
								</view>
								<view class="like" style="">
									<uni-icons type="hand-up" size="30" color="#6161d3"
										style="width: 36rpx;height: 36rpx;padding-top: 15rpx;" v-if="!item.is_liked">
									</uni-icons>
									<uni-icons type="hand-up-filled" size="30" color="#6161d3"
										style="width: 36rpx;height: 36rpx;padding-top: 15rpx;" v-if="item.is_liked">
									</uni-icons>

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
		<helang-compress ref="helangCompress"></helang-compress>
	</view>
</template>

<script>
	import {
		getTimeAgo
	} from "@/common/js/utils.js"
	export default {
		data() {
			return {
				choose1: true,
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
				back_icon: 'https://baotangguo.cn:8081/', //背景图
				other_back_icon: 'https://baotangguo.cn:8081/', //别人空间背景图
				studentIndex: 0,
				username: '',
				username1: '',
				age: '',
				mail: '',
				motto: '',
				motto1: '',
				uid: 0, //本人的uid
				othersId: 0, //他人的id
				iconUrl: '', //用户头像
				flowList: [],
				pid: 0,
				bpid: 0,
				subscribe_or_not: false,
				otherUsername: '',
				otherUsername1: '',
				otherStudentIndex: 0,
				otherAge: '',
				otherMotto: '',
				otherMotto1: '',
				otherMail: '',
				otherIconUrl: '',
				studentIndex1: 0,
				remnant: "0",
				display: true
			}
		},
		mounted() {
			let that = this;
			// console.log(that.othersId)
			// console.log(that.uid)
			try {
				const authorization = uni.getStorageSync('authorization');
				if (!authorization) throw DOMException("Nope!");
				else {
					if (this.othersId == -1) {
						this.sendRequest({
							url: '/user/user-info', // 路径
							requestDataType: 'form',
							success: (res) => {
								if (res.code == 200) {
									that.username = res.data.username;
									that.username1 = res.data.username;
									that.studentIndex = res.data.gender;
									that.age = res.data.age;
									that.motto = res.data.motto;
									that.motto1 = res.data.motto;
									that.mail = res.data.mail;
									that.iconUrl = res.data.iconUrl;
									// console.log(res.data);
									that.uid = res.data.uid;
									that.back_icon = (res.data.bgUrl === null ?
										'https://baotangguo.cn:8081/' :
										res.data.bgUrl);

								}
							}
						})
					} else {
						this.sendRequest({
								url: '/user/other-info', // 路径
								method: 'POST', // 请求方法
								requestDataType: 'form',
								data: {
									uid2: that.othersId
								}, //发送的数据
								success: (res) => {
									if (res.code == 200) {
										that.otherUsername = res.data.username;
										that.otherUsername1 = res.data.username;
										that.otherStudentIndex = res.data.gender;
										that.otherAge = res.data.age;
										that.otherMotto = res.data.motto;
										that.otherMotto1 = res.data.motto;
										that.otherMail = res.data.mail;
										that.otherIconUrl = res.data.iconUrl;
										that.studentIndex1 = res.data.gender;
										that.other_back_icon = (res.data.bgUrl === null ?
											'https://baotangguo.cn:8081/' :
											res.data.bgUrl);
										// console.log(res.data.data);
									}
								}

							}),
							this.sendRequest({
								url: '/user/user-info', // 路径
								requestDataType: 'form',
								success: (res) => {
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
										that.back_icon = (res.data.bgUrl === null ?
											'https://baotangguo.cn:8081/' :
											res.data.bgUrl);
									}
								}
							})

					}
				}
			} catch (e) {
				console.log(e)
			}

			this.sendRequest({
				url: '/user/subscribe_or_not',
				method: 'POST',
				requestDataType: 'form',
				data: {
					uid2: that.othersId
				}, //发送的数据
				success: (res) => {
					that.subscribe_or_not = res.is_subscribed
				}
			})
			// console.log(that.uid)
			// console.log(that.othersId)
		},
		onShow() {
			this.flowList = []
			if (this.othersId === -1) {
				this.init1();
			} else {
				this.init();
			}
		},
		onLoad: function(option) {
			if (option.uid) {
				this.othersId = parseInt(option.uid);
				this.choose1 = false;
			} else {
				this.othersId = -1;
				this.choose1 = option.key === "false";
			}

			setTimeout(function() {
				// console.log('start pulldown');
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
			this.getselfpost2();
		},
		methods: {
			// throttle: function() {   //保存信息节流
			// 	let timer = true;
			// 	return function() {
			// 		let that = this;
			// 		if(!timer){
			// 		   return false;
			// 		}
			// 		timer = false;
			// 		setTimeout(() => {
			// 			this.save_inf();
			// 			timer = true;
			// 		}, 3000)
			// 	}
			// }
			checkEmail(email) {
				return RegExp(
						/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
					.test(email);
			},

			onchange(e) {
				console.log(e);
				this.$set(this.obj, this.motto, e);
			},
			descInput: function(event) {
				var value = event.target.value
				if (value.length > 20) {
					var value1 = value.slice(0, 20);
					this.motto = value1;
					uni.showToast({
						title: "字数超过限制",
						icon: 'none'
					})
					this.display = false;
					setTimeout(() => {
						this.display = true;
					}, 10)

				}
			},
			previewImg(imgUrl) {
				let imgsArray = [];
				imgsArray[0] = imgUrl;
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});

			},
			goBack() { //返回并刷新
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
					success: function() {
						beforePage.init();
					}
				})
			},
			subscribe() {
				let that = this
				// console.log(that.uid)
				// console.log(that.othersId)
				// console.log(that.authorization)
				that.subscribe_or_not = !that.subscribe_or_not
				this.sendRequest({
					url: '/user/subscribe',
					method: 'POST',
					requestDataType: 'form',
					data: {
						uid2: that.othersId
					}, //发送的数据
					success: (res) => {
						// console.log(res)
					}
				})
			},
			checkStudent: function(e) {
				this.studentIndex = e.detail.value;
			},
			turnToPost(pid, index) {
				let url1 = '/pages/post-details/post-details?pid=' + pid + '&index=' + index;
				uni.navigateTo({
					url: url1,
				})
			},
			changeInformation() {
				this.choose1 = !this.choose1;
			},
			save_inf() {
				let that = this
				if (!this.checkEmail(that.mail)) {
					uni.showToast({
						title: '邮箱格式错误',
						icon: "none"
					})
				} else {
					try {
						const authorization = uni.getStorageSync('authorization');
						this.sendRequest({
							url: '/user/change',
							method: 'POST',
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
								let pages = getCurrentPages(); // 当前页面
								let beforePage = pages[pages.length - 2]; // 上一页
								uni.showToast({
									title: '保存成功',
								});
								setTimeout(() => {
									uni.navigateBack({
										success: function() {
											beforePage.init();
										}
									})
								}, 800)
							}
						})

					} catch (e) {
						console.log(e)
					}
				}


			},
			getselfpost(limit = 10) {
				let that = this; //他人的空间获取帖子
				this.sendRequest({
					url: "/post/get_post_by_uid",
					data: {
						limit: limit,
						bpid: that.bpid,
						uid: that.othersId
					},
					success: (res) => {
						// console.log(res.data);
						let datas = res.data;
						if (datas && datas.length != 0) {
							that.flowList.push.apply(that.flowList, datas);
							that.bpid = that.flowList[that.flowList.length - 1].pid;
						}
					}
				});
			},

			getselfpost1(limit = 10) { //自己的空间获取帖子
				let that = this;
				this.sendRequest({
					url: "/post/get_self_posts",
					data: {
						limit: limit,
						bpid: that.bpid,
					},
					success: (res) => {
						// console.log(res.data);
						let datas = res.data;
						if (datas && datas.length != 0) {
							that.flowList.push.apply(that.flowList, datas);
							that.bpid = that.flowList[that.flowList.length - 1].pid;
						}
					}
				});
			},
			getselfpost2(limit = 10) { //共有的获取帖子
				let that = this;
				this.sendRequest({
					url: "/post/get_post_by_uid",
					data: {
						limit: limit,
						bpid: that.bpid,
						uid: ((that.othersId === -1) ? that.uid : that.othersId)
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


			init() {
				this.bpid = 9660530943306;
				this.flowList = [];
				this.getselfpost();
			},
			init1() {
				this.bpid = 9660530943306;
				this.flowList = [];
				this.getselfpost1();
			},

			to_set() {
				uni.navigateTo({
					url: '@/pages/sidebar/settings/settings'
				})
			},
			// 这个方法就是B页面中调用$vm注册的方法，参数为B页面中传递过来的数据
			pass2explore(obj) {

				if (obj) {
					this.flowList[obj.index].is_liked = obj.is_liked;
					this.flowList[obj.index].likeNum = obj.numberLike;
					console.log("传回来了");
				}
			},

			// 上传头像
			setIcon() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// console.log(res.tempFilePaths[0])
						that.$refs.helangCompress.compress({
							src: res.tempFilePaths[0],
							maxSize: 400,
							fileType: "jpg",
							minSize: 400
						}).then((res2) => {
							uni.showLoading({
								title: "正在上传"
							})
							that.iconUrl = res2;
							// this.compressPaths = [res];
							uni.uploadFile({
								url: 'http://124.221.253.187:5000/service/upload_img',
								filePath: res2,
								name: "img",
								success: (res3) => {
									that.sendRequest({
										url: "/user/change_icon_img",
										method: 'POST',
										requestDataType: "form",
										data: {
											url: JSON.parse(res3.data)["url"],
										},
										success: (res4) => {
											uni.hideLoading();
											// console.log("头像上传成功")
										}
									});
								},
								fail(res3) {
									// console.log("头像上传失败")
								}
							});
						}).catch((err) => {
							console.log(err);
						})
					}
				});
			},


			// 上传背景图片
			setBackgroundIcon() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sourceType: ['album'], //从相册选择
					success: function(res) {
						that.$refs.helangCompress.compress({
							src: res.tempFilePaths[0],
							maxSize: 1080,
							fileType: "jpg",
							minSize: 1080
						}).then((res2) => {
							uni.showLoading({
								title: "正在上传"
							})
							that.back_icon = res2;
							uni.uploadFile({
								url: 'http://124.221.253.187:5000/service/upload_img',
								filePath: res2,
								name: "img",
								success: (res3) => {
									// console.log(JSON.parse(res3.data)["url"])
									// that.back_icon = JSON.parse(res3.data)["url"];
									that.sendRequest({
										url: "/user/change_background_img",
										method: 'POST',
										requestDataType: "form",
										data: {
											url: JSON.parse(res3.data)["url"],
										},
										success: (res4) => {
											// console.log("背景图上传成功")
											uni.hideLoading();
										}
									});
								},
								fail(res3) {
									console.log(res3);
									console.log("背景图上传失败")
								}
							});
						}).catch((err) => {
							console.log(err);
						})
					}
				});
			},


		}
	}
</script>

<style>
	.picture-background {
		width: 100%;
		position: absolute;
		top: 0;
		height: 368.2rpx;
		z-index: 1 !important;
		text-shadow: 0 0 5px white;

	}

	.head-purple {
		height: 368.2rpx;
		background-color: rgb(192, 190, 253);
		z-index: 0 !important;

	}

	.head-white {
		height: 239.4rpx;
		background-color: white;
	}

	.user-portrait {
		border: #ffffff solid 2rpx;
		position: absolute;
		top: 287.2rpx;
		left: 64.8rpx;
		width: 162rpx;
		height: 162rpx;
		border-radius: 162rpx;
		background-color: rgb(72, 189, 79);
		z-index: 2 !important;
	}

	.portrait {
		width: 162rpx;
		height: 162rpx;
		border-radius: 162rpx;
		z-index: 2 !important;
	}

	.username {
		position: absolute;
		top: 300rpx;
		left: 253.8rpx;
		font-size: 43.2rpx;
		font-weight: 700;
		text-shadow: 0 0 4px white;
		z-index: 2 !important;
	}

	.motto {
		position: absolute;
		top: 368.2rpx;
		left: 253.8rpx;
		font-size: 32.4rpx;
		font-weight: 400;
		margin-top: 8rpx;
		padding-right: 20rpx;
		z-index: 1 !important;
	}

	.personal-information-click {
		position: absolute;
		background-color: rgb(245, 245, 245);
		width: 252rpx;
		height: 81rpx;
		top: 527rpx;
		left: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
	}

	.personal-information-unclick {
		position: absolute;
		background-color: #ffffff;
		width: 252rpx;
		height: 81rpx;
		top: 527rpx;
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
		top: 527rpx;
		right: 72rpx;
		border-radius: 36rpx 36rpx 0rpx 0rpx;
	}

	.personal-post-unclick {
		position: absolute;
		background-color: #ffffff;
		width: 252rpx;
		height: 81rpx;
		top: 526rpx;
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

		/* left: 84.6rpx;
		height: 115.2rpx;
		border-radius: 36rpx;
		background-color: #4605AD;
		color: #ffffff;
		line-height: 110rpx; */
		height: 115.2rpx;
		margin-left: 84.6rpx;
		margin-right: 84.6rpx;
		border-radius: 36rpx;
		background-color: rgb(70, 5, 173);
		color: #ffffff;
		font-size: 43.2rpx;
		font-weight: 400;
		text-align: center;
		line-height: 110.4rpx;

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
		max-height: 850rpx;
		overflow: hidden;
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
		padding-top: 20rpx;
		padding-left: 36rpx;
		padding-bottom: 20rpx;
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
		width: 100%;
		flex-direction: row;
		background-color: white;
		padding-left: 459.6rpx;
		display: flex;
		margin-bottom: 15rpx;
	}


	.commentNum {
		margin-left: 40rpx;
		font-size: 32.4rpx;
		line-height: center;
		float: right;
		font-weight: 400;
		margin-top: 10rpx;
	}


	.like {
		flex-direction: row;
		padding-left: 35.2rpx;
		background-color: white;
		width: 500rpx;
		margin-top: 10rpx;
	}

	.likeNum {
		/* 		margin-left: 5rpx; */
		margin-right: 18rpx;
		margin-top: 3rpx;
		margin-bottom: 10rpx;
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
		padding-left: 36rpx;
		padding-right: 36rpx;
		line-height: center;
		background-color: white;
		line-height: 45rpx;
		margin-bottom: 20rpx;
	}
</style>
