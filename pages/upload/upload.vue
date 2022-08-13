<template>
	<view class="container">
		<uni-icons type="arrow-left" size="30" class="back-icon" @click="back()"></uni-icons>
		<button size="30" class="publish" @click="publish()"></button>
		<view class="text_con">
			<textarea class="text" cols="30" rows="10" v-model="text" placeholder="编辑内容"></textarea>
		</view>
		<view class="upload">
			<view class="">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" :maxCount="9"
					:multiple="false">
				</u-upload>
			</view>
		</view>
	</view>
</template>

<script>
	import COS from '@/labs/cos-js-sdk-v5.min.js.js';
	export default {
		data() {
			return {
				text: "",
				files: [],
				fileList1: [],
				cos: Object,
				// lists: []
			}
		},
		mounted() {
			// 存储桶名称，由bucketname-appid 组成，appid必须填入，可以在COS控制台查看存储桶名称。 https://console.cloud.tencent.com/cos5/bucket
			var Bucket = 'summer-1306873228'; /* 存储桶，必须字段 */

			// 存储桶region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
			// 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
			var Region = 'ap-chengdu'; /* 存储桶所在地域，必须字段 */

			// 接下来可以通过 cos 实例调用 COS 请求。

			// var COS = require('cos-js-sdk-v5');
			this.cos = new COS({
				// getAuthorization 必选参数
				getAuthorization: function(options, callback) {
					// 服务端例子：https://github.com/tencentyun/qcloud-cos-sts-sdk/blob/master/scope.md
					// 异步获取临时密钥
					var url = 'http://124.221.253.187:5000/service/cos'; // url替换成您自己的后端服务
					var xhr = new XMLHttpRequest();
					xhr.open('POST', url, true);
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.onload = function(e) {
						try {
							var data = JSON.parse(e.target.responseText);
							var credentials = data.credentials;
							// console.log(credentials)
						} catch (e) {}
						// console.log(typeof(data))
						// console.log(credentials)
						if (!data || !credentials) {
							return console.error('credentials invalid:\n' + JSON.stringify(data,
								null, 2))
						};
						callback({
							TmpSecretId: credentials.tmpSecretId,
							TmpSecretKey: credentials.tmpSecretKey,
							SecurityToken: credentials.sessionToken,
							// 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
							StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
							ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
							ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
						});
					};
					xhr.send(JSON.stringify(options.Scope));
				}
			});
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
			// async afterRead(event) {
			// 	// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			// 	this.files.push(event.file);


			// },
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				console.log(event.file.constructor.name);
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFile(lists[i])
					// console.log("上传完成");
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			uploadFile(file_) {
				// const reader = new FileReader();
				// reader.readAsDataURL(file_["blob"]); //发起异步请求
				// reader.onload = function(readRes) {
				// 	console.log('加载完成', readRes.target.result)
				// }

				const doit = (file_) => {
					const file = file_ // fileObject
					console.log(file)
					console.log(fetch(file.thumb).then(r => r.blob()).constructor.name);
					console.log(new Blob([fetch(file.thumb).then(r => r.blob())], {
						endings: "transparent"
					}))
					this.cos.sliceUploadFile({
							Bucket: "summer-1306873228",
							/* 必须 */
							Region: "ap-chengdu",
							/* 存储桶所在地域，必须字段 */
							Key: 'img/' + file.name,
							/* 必须 */
							StorageClass: 'STANDARD',
							Body: file, // 上传文件对象
							// Body: new Blob(["<html><h2>Hello Semlinker</h2></html>"], {
							// 	type: 'text/html',
							// 	endings: "transparent"
							// }),
							// FilePath: file.url,
							onProgress: function(progressData) {
								console.log(JSON.stringify(progressData));
							}
						},
						function(err, data) {
							console.log(err || data);
						});
				}
				doit(file_);
			},
			publish() {


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
		top: 44px;
		left: 269px;
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
