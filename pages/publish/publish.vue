<template>
	<view class="container">
		<view class="navibar">
			<view class="">
				<!-- <view class="back">
					<uni-icons type="arrow-left" size="30" @click="back()"></uni-icons>
				</view> -->
				<view class="publish">记录~分享~交流</view>
			</view>
		</view>

		<view class="content">
			<view class="text">
				<view class="title">
					<view class="title-font" style="align-self: flex-start;; margin-bottom:18rpx">标题</view>
					<textarea v-model="title" placeholder="编辑标题" maxlength=20></textarea>
				</view>
				<view class="context">
					<view class="title-font" style="align-self: flex-start; margin-bottom:18rpx">正文</view>
					<textarea v-model="context" placeholder="编辑内容" maxlength=500></textarea>
				</view>
			</view>

			<view class="upload">
				<view class="">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="9"
						multiple maxSize="10485760" @oversize="oversize">
						<!-- 10MB -->
					</u-upload>
				</view>
			</view>
		</view>
		<button class="publish-btn" @click="publish()">确认发布</button>
		<helang-compress ref="helangCompress"></helang-compress>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				context: "",
				fileList1: [],
				// imgUrls: [],
			}
		},
		methods: {

			back() {
				uni.navigateBack();
			},

			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},

			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},

			oversize(event) {
				// console.log(event)
				uni.showToast({
					title: "图片过大",
					icon: "none"
				})
			},


			uploadFilePromise(url) {
				let that = this;
				return new Promise((resolve, reject) => {
					that.$refs.helangCompress.compress({
						src: url,
						maxSize: 1920,
						fileType: "jpg",
						minSize: 1920
					}).then((res2) => {
						// console.log(res2);
						uni.uploadFile({
							url: 'http://124.221.253.187:5000/service/upload_img',
							filePath: res2,
							name: "img",
							success: (res3) => {
								// console.log(that.fileList1)
								setTimeout(() => {
									resolve(JSON.parse(res3.data)["url"])
								}, 600)
							},
							fail(res3) {
								console.log(res3);
							}
						});
					}).catch((err) => {
						console.log(err);
					})
				})
			},

			publish() {
				let title_p = /^\s+$/;
				if (this.title == '' || title_p.test(this.title)) {
					uni.showToast({
						title: '请输入标题',
						icon: 'none'
					})
					return
				}
				const authorization = uni.getStorageSync('authorization');
				let imgUrls = [];
				for (let img of this.fileList1) {
					imgUrls.push(img.url);
				}
				// console.log("图片云端地址: ",imgUrls)
				uni.showLoading({
					title:"正在发布"
				})
				uni.request({
					url: 'http://124.221.253.187:5000/post/create',
					method: 'POST',
					header: {
						"content-type": "application/json",
						"Authorization": authorization
					},
					data: {
						"title": this.title,
						"context": this.context,
						"imgUrls": imgUrls,
						"tags": this.tags
					},
					
					success: (res) => {
						// console.log(res);
						this.title = "";
						this.context = "";
						this.fileList1 = [];
						this.imgUrls = [];
						if (res.statusCode == 200) {
							console.log("成功发布");
							uni.hideLoading()
							uni.switchTab({
								url: "/pages/homepage/explore/explore",
								success() {
									let page = getCurrentPages().pop(); //跳转页面成功之后
									if (!page) return;
									page.init(); //如果页面存在，则重新刷新页面
								}
							})
						} else {
							uni.showToast({
								title: res.data.detail,
								icon: "error"
							})
						}
					},
					fail: (res) => {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: column;
	}

	.navibar {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #F7F7F7;
		height: 116rpx;
	}

	.navibar>view {
		display: flex;
		align-items: center;
		height: 90rpx;
		width: 90%;
	}

	.back {
		display: flex;
		align-items: center;
	}

	.publish {
		margin-left: 30rpx;
		size: 30px;
		font-size: 20px;
		color: $our-purple;
		text-align: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 80%;
	}

	.title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;
		width: 100%;
	}

	.title textarea {
		width: 100%;
		height: 1.5rem;
		background: rgba(196, 196, 196, 0.14);
		border-radius: 16px;
		padding: 0.5rem;
	}

	.context {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.context textarea {
		width: 100%;
		height: 230px;
		background: rgba(196, 196, 196, 0.14);
		border-radius: 16px;
		padding: 18rpx;
		overflow-x: scroll;
	}

	.upload {
		margin-top: 30rpx;
		width: 80%;
	}

	.publish-btn {
		position: fixed;
		bottom: 76rpx;
		margin: 5% 15%;
		width: 70%;
		background-color: $our-purple;
		color: white;
		font-weight: 400;
		border-radius: 40rpx;
	}
</style>
