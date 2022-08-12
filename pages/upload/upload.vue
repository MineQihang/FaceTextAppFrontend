<template>
	<view class="container">
		<uni-icons type="arrow-left" size="40" class="back-icon" @click="back()"></uni-icons>
		<view class="text_con">
			<textarea class="text" cols="30" rows="10" v-model="text" placeholder="编辑内容"></textarea>
		</view>
		<view class="upload">
			<view class="">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="9"></u-upload>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: "",
				fileList1: [],
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
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
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
		top: 26rpx;
		left: 8rpx;
	}

	.text_con {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.text {
		width: 337px;
		height: 230px;
		top: 92px;
		background: rgba(196, 196, 196, 0.14);
		border-radius: 16px;
		padding: 18rpx;
	}

	.upload {
		margin-top: 250rpx;
		margin-left: 50rpx;
	}
</style>
