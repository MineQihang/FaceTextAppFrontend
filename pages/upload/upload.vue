<template>
	<view class="container">
		<view class="navibar">
			<uni-icons type="arrow-left" size="30" class="back-icon" @click="back()"></uni-icons>
			<view class="publish"><button size="30" class="pub-but" @click="publish()">发布</button></view>
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
					// console.log("up")
					that.$refs.helangCompress.compress({
						src: url,
						maxSize: 1920,
						fileType: "jpg",
						minSize: 1920
					}).then((res2) => {
						// console.log(res2);
						// this.compressPaths = [res];
						uni.uploadFile({
							url: 'http://124.221.253.187:5000/service/upload_img',
							filePath: res2,
							name: "img",
							success: (res3) => {
								console.log(JSON.parse(res3.data)["url"])
								that.imgUrls.push(JSON.parse(res3.data)["url"]);
								// console.log(that.imgUrls);
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

	.navibar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.back-icon {
		padding: 40rpx;
	}

	.publish {
		padding: 40rpx;

	}

	.pub-but {
		width: 89px;
		height: 37px;
		color: white;
		border-radius: 36px;
		text-align: center;
		line-height: 200%;
		background-color: rgb(85, 92, 253)
	}

	.content {}

	.text textarea {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* margin-top: 40rpx; */
	}

	.title textarea {
		display: flex;
		width: 650rpx;
		height: 1.5rem;
		/* top: 92px; */
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
