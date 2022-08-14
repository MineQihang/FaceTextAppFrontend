<template>

	<view>
		<!-- 搜索框 -->
		<view class="search-bar">
			<uni-search-bar placeholder=" " @confirm="search" v-model="searchValue" @input="input" @change="change">
			</uni-search-bar>
			<!-- 			当前输入为：{{ searchValue }} -->
		</view>

		<!-- 帖子展示 -->
		<view class="content">
			<view class="flowPanel">
				<view class="itemContainer" v-for="(item,index) in flowList" :key="index">
					<!-- <view class="top">

					</view> -->
					<view class="itemContent" v-for="(url,index2) in item.imgUrls" :key="index2" v-if="index2==0">
						<img :src="url" mode="widthFix">
					</view>
					<view class="title">{{item.title}}</view>
					<view class="info">
						<view class="info-up">
							<view class="comment">
								<uni-icons class="comment-icons" type="chat" size="20"></uni-icons>
								<view class="commentNum">{{item.commentNum}}</view>
							</view>
							<view class="zan">
								<uni-icons type="heart-filled" size="20" v-if="item.is_liked"></uni-icons>
								<uni-icons type="heart" size="20" v-else></uni-icons>
								<view class="likeNum">{{item.likeNum}}</view>
							</view>
						</view>

						<view class="info-down">
							<uni-icons type="calendar" size="20"></uni-icons>
							<view class="date">{{item.updatedTime.split("T").join(" ")}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	</view>
</template>

<script>
	import dataJson from "../../testData/data.js"; // 测试用数据
	export default {
		data() {
			return {
				username: '', //用户信息
				searchValue: '', //搜索栏数据
				uid: 79,
				flowList: [],
				authorization: ""
			}
		},
		onLoad: function(option) {
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			console.log('refresh');
			this.getPost();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		mounted() {
			this.loadData();
		},
		methods: {
			loadData() {
				this.getUser();
				this.getPost();
			},

			getUser() {
				// return new Promise(() => {
				let that = this;
				try {
					that.authorization = uni.getStorageSync('authorization');
					// console.log(authorization);
					if (!authorization) throw DOMException("Nope!");
					else {
						uni.request({
							url: 'http://124.221.253.187:5000/user/user-info',
							header: {
								'Authorization': authorization
							},
							success: (res) => {
								// console.log(res);
								this.text = 'request success';
								if (res.statusCode == 200) {
									that.username = res.data.data.username;
									that.uid = res.data.data.uid;
									console.log("收到的", that.uid);
								} else {
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
				};
				// })
			},

			getPost() {
				let that = this;
				console.log("发送的", that.uid);
				uni.request({
					url: 'http://124.221.253.187:5000/post/get_all',
					method: 'GET',
					header: {
						'Authorization': that.authorization
					},
					success: (res1) => {
						// console.log(res1);
						// console.log("check");
						if (res1.statusCode == 200) {
							let datas = res1.data.data;
							// console.log(datas);
							that.flowList = datas;
							// console.log(flowList);
							// this.flowList = dataJson.flowList;
						} else {
							that.flowList = dataJson.flowList;
							console.log("获取帖子失败");
						}
					}
				})
			},

			log() {
				uni.redirectTo({
					url: '/pages/log/log'
				});
			},

			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},

			input(res) {
				console.log('----input:', res)
			},
		},
	}
</script>

<style>
	/* uni-search-bar {
		position: absolute;
		top: 0%;
	} */

	/* .search-bar {
		position: fixed;
		top: 2rem;
		width: 100%;
	}
 */
	@import "../../testCss/flowPanel.css";

	@font-face {
		font-family: "myfont";
		src: url('https://at.alicdn.com/t/c/font_3587359_4gnvrajxdln.ttf?t=1660441794186') format('truetype');
		/* url生成方式：https://cloud.tencent.com/developer/article/1590373?from=article.detail.1848497 */
	}

	view {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.content {
		/* margin-top: 3rem; */
		align-self: center;
		width: 100%;
		background-color: #ffffff;
		padding: 0 15px;
		/* border: 2px solid red; */
	}

	.scroll-view {
		white-space: nowrap;
		height: 800px;
		width: 100%;
	}

	.top {
		height: 200px;
		width: 100%;
		background: red;
	}

	.center {
		height: 200px;
		width: 100%;
		background: green;
	}

	.bottom {
		height: 200px;
		width: 100%;
		background: blue;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		padding-top: 250rpx;
	}

	.btn-container {
		padding: 150rpx;
	}

	.btn {
		width: 12rem;
		height: 3rem;
		line-height: 23rpx;
		border-radius: 50rpx;
		border-color: black;
		background-color: rgba(16, 16, 16, 100);
		color: rgba(255, 255, 255, 100);
		font-size: 1rem;
		text-align: center;
		font-family: Arial;
		margin-bottom: 100rpx;
	}

	.login-btn {
		width: 80%;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 36px;
		color: #ffffff;
		font-size: 1rem;
		text-align: center;
		line-height: 45px;
		position: absolute;
		margin-bottom: 500rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}

	.reg {
		position: absolute;
		top: 550rpx;
		left: 100rpx;
		color: rgb(82, 82, 199);
		font-size: 36rpx;
		line-height: 54rpx;
	}
</style>
