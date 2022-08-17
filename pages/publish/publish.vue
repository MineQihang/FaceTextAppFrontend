<template>
	<view class="container">
		<view class="navibar">
			<view class="">
				<view class="back">
					<uni-icons type="arrow-left" size="30" @click="back()"></uni-icons>
				</view>
				<view class="publish"><button size="30" @click="publish()">发布</button></view>
			</view>
		</view>

		<view class="content">
			<view class="text">
				<view class="title">
					<textarea v-model="title" placeholder="编辑标题"></textarea>
				</view>
				<view class="context">
					<textarea v-model="context" placeholder="编辑内容"></textarea>
				</view>
			</view>

			<view class="upload">
				<view class="">
					<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="9"
						multiple>
					</u-upload>
				</view>
			</view>
		</view>
		<helang-compress ref="helangCompress"></helang-compress>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				context: "",
				title: "",
				files: [],
				fileList1: [],
				imgUrls: [],
				tags: [],
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
								console.log(JSON.parse(res3.data)["url"])
								that.imgUrls.push(JSON.parse(res3.data)["url"]);
								setTimeout(() => {
									resolve("")
								}, 1000)
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
				const authorization = uni.getStorageSync('authorization');
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
						"imgUrls": this.imgUrls,
						"tags": this.tags
					},
					success: (res) => {
						// console.log(res);
						if (res.statusCode == 200) {
							console.log("成功发布");
							uni.redirectTo({
								url: "/pages/post-details/post-details?pid=" + res.data.pid
							})

						} else {
							uni.showToast({
								title: res.data.detail,
								icon: "error"
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.container {
		position: flex;
		flex-direction: column;
	}

	.navibar {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.navibar>view {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 90%;
	}

	.back {
		padding: 30rpx;
	}

	.publish {
		padding: 30rpx;

	}

	.publish button {
		width: 89px;
		height: 37px;
		color: white;
		border-radius: 36px;
		text-align: center;
		line-height: 200%;
		background-color: rgb(85, 92, 253)
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
</style>
