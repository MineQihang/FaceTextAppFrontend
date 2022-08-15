<template>
	<view>
		<view class="head_img">
			<image src="/static/Header_background.png" style="width: 100%" mode="widthFix">
		</view>

		<view class="set" @click="to_set()">
			<image src="/static/Frame_7064_Iconly_Light_Setting2.png" style="height: 60rpx;width:60rpx;">
		</view>
		<view class="portrait">
			<image :src="iconUrl" mode="aspectFill" style="border-radius: 125rpx;height: 125rpx;width:125rpx;">
		</view>
		<view class="testText1">
			<text selectable='true'>{{username}}</text>
		</view>
		<view class="testText2">
			<text selectable='true'>{{motto}}</text>
		</view>
		<view class="middle_a">
			<view class="btn">发帖数:{{postNum}}</view>
		</view>


		<view class="content">
			<view class="flowPanel">
				<view class="itemContainer" v-for="(item,index) in flowList" :key="index">
					<view class="itemContent" v-for="(url,index2) in item.imgUrls" :key="index2" v-if="index2==0">
						<img :src="url" mode="widthFix">
					</view>
					<view class="title">{{item.title}}</view>
					<view class="info">
						<view class="left">
							<view class="myfont icon-shijian"></view>
							<uni-icons type="calendar" size="20"></uni-icons>
							<view class="date">{{item.updatedTime.split("T").join(" ")}}</view>
							<uni-icons class="comment-icons" type="chat" size="20"></uni-icons>
							<view class="commentNum">{{item.commentNum}}</view>
						</view>
						<view class="right">
							<uni-icons type="heart-filled" size="20" v-if="item.is_liked"></uni-icons>
							<uni-icons type="heart" size="20" v-else></uni-icons>
							<view class="clickNum">{{item.likeNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import dataJson from "../../testData/data.js";
	export default {
		data() {
			return {
				username: '',
				uid: 0,
				flowList: [],
				authorization: "",
				iconUrl: "",
				motto: "",
				postNum: ""
			}
		},
		onShow() {
			this.onload();
			let that = this;
			that.authorization = uni.getStorageSync("authorization");
			uni.request({
				url: 'http://124.221.253.187:5000/post/get_self_posts',
				method: 'GET',
				header: {
					'Authorization': that.authorization
				},
				success: (res1) => {
					console.log(res1);
					console.log("check");
					if (res1.statusCode == 200) {
						// 获取的data有问题
						let datas = res1.data.data;
						// console.log(datas);
						that.flowList = datas;
						// console.log(that.flowList);
						// this.flowList = dataJson.flowList;
					} else {
						this.flowList = dataJson.flowList;
						console.log("获取帖子失败");
					}
				}
			})
		},
		mounted() {


		},

		methods: {
			onload() {
				let that = this;
				console.log("mounted");
				try {
					const authorization = uni.getStorageSync('authorization');
					console.log(authorization);
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
									that.iconUrl = res.data.data.iconUrl;
									that.postNum = res.data.data.postNum;
									that.motto = res.data.data.motto;
									console.log("check");
									console.log(res);
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

			},

			to_set() {
				uni.navigateTo({
					url: '/pages/set/set'
				})
			}
		}
	}
</script>

<style>
	@import "../../testCss/personal_flowpanel.css";

	@font-face {
		font-family: "myfont";
		src: url('https://at.alicdn.com/t/c/font_3587359_4gnvrajxdln.ttf?t=1660441794186') format('truetype');
		/* url生成方式：https://cloud.tencent.com/developer/article/1590373?from=article.detail.1848497 */
	}

	.set {
		height: 5rpx;
		width: 5rpx;
		position: absolute;
		right: 11%;
		top: 7%;
		/* background-color: green; */
	}

	.head_img {
		height: 300rpx;
		background-color: #ffffff;
		z-index: 1 !important;
		top: -10%;
		/* 	position: fixed; */
	}

	.portrait {
		border-radius: 125rpx;
		height: 125rpx;
		width: 125rpx;
		background-color: #ffffff;
		z-index: 10 !important;
		position: absolute;
		top: 18%;
		left: 42%;
	}

	.testText1 {
		position: absolute;
		font-size: 32rpx;
		font-weight: bold;
		width: 100%;
		top: 27%;
		height: 50px;

		text-align: center;

	}

	.testText2 {
		position: absolute;
		font-size: 30rpx;
		font-weight: bold;
		width: 100%;
		top: 30%;
		height: 50px;
		font-weight: 300;
		text-align: center;

	}

	.btn {
		width: 80%;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 0px;
		color: #ffffff;
		font-size: 1.5rem;
		text-align: center;
		line-height: 50px;
		margin-bottom: 100rpx;
		margin-left: 75rpx;
		margin-right: 70rpx;

	}

	.middle_a {
		position: absolute;
		font-size: 30rpx;
		font-weight: bold;
		width: 100%;
		top: 33%;
		height: 50px;
		font-weight: 300;
		text-align: center;
	}

	.content {
		width: 100%;
		background-color: #f5f5f5;
		padding: 0px;
		height: 400px;
		margin-top: 150px;
	}
</style>