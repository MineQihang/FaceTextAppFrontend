<template>
	<view class="container">
		<uni-icons type="arrow-left" size="30" class="back-icon" @click="back()"></uni-icons>
		<button size="30" class="publish" @click="publish()">发布</button>
		<view class="text">
			<view class="">
				<textarea class="title" v-model="title" placeholder="编辑标题"></textarea>
			</view>
			<view class="">
				<textarea class="context" v-model="context" placeholder="编辑内容"></textarea>
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
				// lists: []
			}
		},
		methods: {

			back() {
				uni.navigateBack();
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
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
					// console.log(lists[i]);
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
				return new Promise((resolve, reject) => {
					let url_tmp;
					uni.compressImage({
						src: url,
						quality: 50,
						success: res => {
							// console.log(res.tempFilePath)
							let a = uni.uploadFile({
								url: 'http://124.221.253.187:5000/service/upload_img',
								filePath: res.tempFilePath,
								name: "img",
								success: (res) => {
									this.imgUrls.push(JSON.parse(res.data)["url"]);
									// console.log(this.imgUrls);
									setTimeout(() => {
										resolve(res.data.data)
									}, 1000)
								}
							});
						}
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
						console.log(res);
						if (res.statusCode == 200) {
							console.log(res)
							uni.redirectTo({
								url: "../post_details/post_details?pid=" + res.data.pid
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

	.back-icon {
		position: fixed;
		top: 90rpx;
		left: 34rpx;
	}

	.publish {
		position: fixed;
		width: 89px;
		height: 37px;
		top: 100rpx;
		right: 44rpx;
		color: white;
		border-radius: 36px;
		text-align: center;
		line-height: 200%;
		background-color: rgb(85, 92, 253)
	}

	.text {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 40rpx;
	}

	.title {
		display: flex;
		width: 650rpx;
		height: 1.5rem;
		top: 92px;
		margin-bottom: 1rem;
		background: rgba(196, 196, 196, 0.14);
		border-radius: 16px;
		padding: 0.5rem;
	}

	.context {
		width: 650rpx;
		height: 230px;
		top: 92px;
		background: rgba(196, 196, 196, 0.14);
		border-radius: 16px;
		padding: 18rpx;
		overflow-x: scroll;
	}

	.upload {
		margin-top: 250rpx;
		margin-left: 50rpx;
	}
</style>
