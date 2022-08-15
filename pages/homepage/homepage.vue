<template>

	<view class="container">
		<!-- 搜索框 -->
		<view class="search-bar">
			<uni-search-bar placeholder=" " @confirm="search" v-model="searchValue" @input="input">
			</uni-search-bar>
			<!-- 			当前输入为：{{ searchValue }} -->
		</view>

		<!-- 帖子展示 -->
		<view class="content">
			<view class="flowPanel">
				<view class="itemContainer" v-for="(item,index) in flowList" :key="index" @click="turnToPost(item.pid)">
					<view class="top">
						<img class="userIcon" :src="item.user.iconUrl"></image>
						<view class="username">{{item.user.username}}</view>
					</view>
					<view class="itemContent" v-for="(url,index2) in item.imgUrls" :key="index2" v-if="index2==0">
						<img class="postPhoto" :src="url" mode="widthFix">
					</view>
					<view class="title">{{item.title}}</view>
					<view class="info">
						<view class="info-up">
							<view class="comment">
								<uni-icons class="comment-icons" type="chat" size="20"></uni-icons>
								<view class="commentNum">{{item.commentNum}}</view>
							</view>
							<view class="zan">
								<!-- {{item.is_liked}} -->
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
				bpid: 9660530943306,
				authorization: ""
			}
		},
		onLoad: function(option) {
			this.flowList = [];
			this.getUser();
			this.getPost();
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
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			this.getMore();
		},
		onShow() {
			this.flowList = [];
			this.getUser();
			this.getPost();
		},
		// mounted() {
		// 	this.loadData();
		// },
		methods: {
			turnToPost(pid) {
				console.log(pid);
				let url1 = '/pages/post_details/post_details?pid=' + pid;
				console.log(url1);
				uni.navigateTo({
					url: url1
				})
			},

			// loadData() {
			// 	this.getUser();
			// 	this.getPost();
			// },

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
				// console.log("发送的", that.uid);
				uni.request({
					url: 'http://124.221.253.187:5000/post/get_all',
					method: 'GET',
					header: {
						'Authorization': that.authorization
					},
					data: {
						limit: 10,
						bpid: 9660530943306
					},
					success: (res1) => {
						// console.log(res1);
						// console.log("check");
						if (res1.statusCode == 200) {
							let datas = res1.data.data;
							// console.log(datas);
							that.flowList = datas;
							that.bpid = that.flowList[that.flowList.length - 1].pid;
							console.log(that.flowList[that.flowList.length - 1].pid);
							// console.log(flowList);
							// this.flowList = dataJson.flowList;
						} else {
							that.flowList = dataJson.flowList;
							that.bpid = 9660530943306;
							console.log("获取帖子失败");
						}
					}
				})
			},

			getMore() {
				let that = this;
				console.log("发送的", that.uid);
				uni.request({
					url: 'http://124.221.253.187:5000/post/get_all',
					method: 'GET',
					header: {
						'Authorization': that.authorization
					},
					data: {
						limit: 10,
						bpid: that.bpid
					},
					success: (res1) => {
						// console.log(res1);
						// console.log("check");
						if (res1.statusCode == 200) {
							let datas = res1.data.data;
							console.log(datas);
							// that.flowList = datas;
							if (datas && datas.length != 0) {
								that.flowList.push.apply(that.flowList, datas);
								that.bpid = that.flowList[that.flowList.length - 1].pid;
							}
							// that.bpid = that.flowList[8].bpid;
							// console.log(flowList);
							// this.flowList = dataJson.flowList;
						} else {
							// that.flowList = dataJson.flowList;
							that.bpid = 9660530943306;
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
	}*/

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

	.container {
		/* 		border-radius: 12px; */
		/* background: linear-gradient(145deg, #e0ffe9, #bce6c4);
		box-shadow: 6px 6px 12px #b2d9b9,
			-6px -6px 12px #f0fffb; */
	}

	.content {
		/* margin-top: 3rem; */
		align-self: center;
		width: 100%;
		background-color: #ffffff;
		padding: 0 15px;
		/* border: 2px solid red; */

		/* border-radius: 12px;
		background: linear-gradient(145deg, #e0ffe9, #bce6c4);
		box-shadow: 6px 6px 12px #b2d9b9,
			-6px -6px 12px #f0fffb; */
	}
</style>
