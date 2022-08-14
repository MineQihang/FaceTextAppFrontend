<template>
	<view>
		<view class="head_img">
			<image src="/static/Header background.png" style="width: 100%" mode="widthFix">
		</view>

		<view class="set" @click="to_set()">
			<image src="/static/Frame 7064_Iconly_Light_Setting (2).png"
				style="border-radius: 12rpx;height: 50rpx;width:50rpx;">
		</view>
		<view class="portrait">
			<image src="/static/Ellipse 194.png" alt="" style="border-radius: 125rpx;height: 125rpx;width:125rpx;">
		</view>
		<view class="testText1">
			<text selectable='true'>俺的名字捏</text>
		</view>
		<view class="testText2">
			<text selectable='true'>这是俺的id</text>
		</view>
		<view class="middle_a">
			<view class="btn">发帖数:0</view>
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
							<view class="date">{{item.updatedDate}}</view>
							<view class="commentNum">{{item.commentNum}}</view>
						</view>
						<view class="right">
							<view class="clickNum">{{item.likeNum}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import uButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue";
	import dataJson from "../../testData/data.js";
	export default {
		components: {
			uButton
		},
		data() {
			return {
				uid: 79,
				flowList: []
			}
		},
		mounted() {
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
							console.log(res);
							this.text = 'request success';
							if (res.statusCode == 200) {
								that.username = res.data.data.username;
								that.uid = res.data.data.uid;
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
			}
		
			console.log("check");
			console.log(that.uid);
			uni.request({
				url: 'http://124.221.253.187:5000/post/get_all',
				method: 'GET',
				data: {
					uid: that.uid
				},
				success: (res1) => {
					console.log(res1);
					console.log("check");
					if (res1.statusCode == 200) {
						// 获取的data有问题
						let datas = res1.data.data;
						console.log(datas);
						that.flowList = datas;
						console.log(flowList);
						// this.flowList = dataJson.flowList;
					} else {
						this.flowList = dataJson.flowList;
						console.log("获取帖子失败");
					}
				}
			})
		
		},

		methods: {
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
		right: 8%;
		top: 4%;
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
		top: 30%;
		height: 50px;

		text-align: center;

	}

	.testText2 {
		position: absolute;
		font-size: 30rpx;
		font-weight: bold;
		width: 100%;
		top: 34%;
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
		line-height: 45px;
		margin-bottom: 100rpx;
		margin-left: 75rpx;
		margin-right: 70rpx;
	}

	.middle_a {
		position: absolute;
		font-size: 30rpx;
		font-weight: bold;
		width: 100%;
		top: 38%;
		height: 50px;
		font-weight: 300;
		text-align: center;
	}

	.content {
		width: 100%;
		background-color: #ffffff;
		padding: 0px;
		height:400px;
		margin-top:150px;
	}
</style>
