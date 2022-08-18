<template>
	<view>
		<view class="head-img" style="background-color: #f5f5f5;">
			<image src="/static/Header_background.png" style="width: 100%" mode="widthFix">
		</view>

		<view class="set" @click="to_set()">
			<image src="/static/Frame_7064_Iconly_Light_Setting2.png" style="height: 60rpx;width:60rpx;">
		</view>
		<view class="personal-icon">
			<image :src="iconUrl" mode="aspectFill" style="border-radius: 125rpx;height: 125rpx; width:125rpx;">
		</view>
		<view class="username-class">
			<text selectable='true'>{{username}}</text>
		</view>
		<view class="motto-class">
			<text selectable='true'>{{motto}}</text>
		</view>
		<view class="postnum-class">
			<view class="btn">发帖数:{{postNum}}</view>
		</view>


		<view class="content">
			<view class="flowPanel">
				<view class="itemContainer" v-for="(item,index) in flowList" :key="index" @click="turnToPost(item.pid)">
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
							<view class="like">
								<!-- {{item.is_liked}} -->
								<uni-icons type="heart-filled" size="20" v-if="item.is_liked"></uni-icons>
								<uni-icons type="heart" size="20" v-else></uni-icons>
								<view class="likeNum">{{item.likeNum}}</view>
							</view>
						</view>

						<view class="info-down">
							<uni-icons class="dateIcon" type="calendar" size="20"></uni-icons>
							<view class="date">{{getFormatDate(item.updatedTime)}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getTimeAgo
	} from "@/common/js/utils.js"
	export default {
		data() {
			return {
				username: '',
				uid: 0,
				flowList: [],
				bpid: 9660530943306,
				iconUrl: "",
				motto: "",
				postNum: "",
			}
		},
		onLoad: function(option) {
			this.init();
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			this.getselfpost();
		},
		onShow() {
			this.init();
		},
		methods: {
			turnToPost(pid) {
				console.log(pid);
				let url1 = '/pages/post-details/post-details?pid=' + pid;
				console.log(url1);
				uni.navigateTo({
					url: url1
				})
			},
			getselfpost(limit = 10) {
				let that = this;
				this.sendRequest({
					url: "/post/get_self_posts",
					data: {
						limit: limit,
						bpid: that.bpid
					},
					success: (res) => {
						let datas = res.data;
						if (datas && datas.length != 0) {
							that.flowList.push.apply(that.flowList, datas);
							that.bpid = that.flowList[that.flowList.length - 1].pid;
						}
					}
				});
			},
			getselfuser() {
				let that = this;
				try {
					this.sendRequest({
						url: "/user/user-info",
						success: (res) => {
							that.username = res.data.username;
							that.uid = res.data.uid;
							that.motto = res.data.motto;
							that.iconUrl = res.data.iconUrl;
							that.postNum = res.data.postNum;
							console.log("收到的", that.uid);
						}
					})
				} catch (e) {
					console.log(e)
				};
			},
			init() {
				this.bpid = 9660530943306;
				this.flowList = [];
				this.getselfuser();
				this.getselfpost();
			},
			to_set() {
				uni.navigateTo({
					url: '@/pages/sidebar/settings/settings'
				})
			},
			getFormatDate(data) {
				return getTimeAgo(data);
			}
		},
	}
</script>

<style>
	/* @import "../../testCss/personal_flowpanel.css"; */

	/* @font-face {
		font-family: "myfont";
		src: url('https://at.alicdn.com/t/c/font_3587359_4gnvrajxdln.ttf?t=1660441794186') format('truetype'); */
	/* url生成方式：https://cloud.tencent.com/developer/article/1590373?from=article.detail.1848497 */
	/* } */

	.set {
		height: 5rpx;
		width: 5rpx;
		position: absolute;
		right: 11%;
		top: 7%;
		/* background-color: green; */
	}

	.head-img {
		height: 300rpx;
		background-color: #ffffff;
		z-index: 1 !important;
		top: -10%;
		/* 	position: fixed; */
	}

	.personal-icon {
		border-radius: 125rpx;
		height: 125rpx;
		width: 125rpx;
		background-color: #ffffff;
		z-index: 10 !important;
		position: absolute;
		top: 18%;
		left: 42%;
	}

	.username-class {
		position: absolute;
		font-size: 32rpx;
		font-weight: bold;
		width: 100%;
		top: 27%;
		height: 50px;

		text-align: center;

	}

	.motto-class {
		position: absolute;
		font-size: 30rpx;
		font-weight: bold;
		width: 100%;
		top: 30%;
		height: 50px;
		font-weight: 300;
		text-align: center;

	}

	.postnum-class {
		width: 80%;
		height: 50px;
		top: 33%;
		position: absolute;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 0px;
		color: #ffffff;
		font-size: 1.5rem;
		text-align: center;
		line-height: 50px;
		margin-left: 39px;
		margin-right: 70rpx;

	}

	.content {
		width: 100%;
		background-color: #f5f5f5;
		padding: 0 0px;
		/* height: 400px; */
		margin-top: 180px;
	}

	@charset "utf-8";

	.flowPanel {
		/* flex-direction: row; */
		justify-content: space-between;
		width: 100%;
		overflow: hidden;
		/* background-color: #f8f8f8; */
	}

	.flowPanel .itemContainer {
		border: 2px solid;
		border-color: #f8f8f8;
		width: 99%;
		/* height: 318px; */
		border-radius: 0px;
		display: flex;
		flex-direction: column;
		padding: 0px;
		align-items: center;
		flex: 1;
		margin: 0px 0px;
		background-color: #ffffff;
		/* border: 2px solid red; */
	}

	.flowPanel .itemContainer .itemContent {
		width: 90%;
		display: block;
		margin: 0px;
		/* height: 250px; */
		/* border: 2px solid red; */
	}

	.flowPanel .itemContainer .itemContent img {
		width: 100%;
		display: block;
		margin: -2px;
		object-fit: scale-down;
		padding-top: 10px;
		/* border: 2px solid blue; */
	}

	.flowPanel .itemContainer .title {
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-wrap: break-word;
		word-break: break-all;
		color: #333;
		text-align: left;
		padding: 0.3em 0.5em;
	}

	.flowPanel .itemContainer .info {
		width: 100%;
		color: #8a8a8a;
		overflow: hidden;
		padding: 0px;
		border-top: 1px #e9e9e9 solid;

	}

	.flowPanel .itemContainer .info .info-up {
		display: flex;
		flex-direction: row;
		/* justify-content: space-between; */
	}


	.flowPanel .itemContainer .info .info-up .comment {
		flex-direction: row;
	}

	.flowPanel .itemContainer .info .info-up .comment-icons {}

	.flowPanel .itemContainer .info .info-up .commentNum {
		flex-direction: row;
		font-size: 15px;
		line-height: center;
		float: right;
	}


	.flowPanel .itemContainer .info .info-up .like {
		flex-direction: row;
		padding-left: 40%;
	}

	.flowPanel .itemContainer .info .info-up .likeNum {
		flex-direction: row;
		font-size: 15px;
		line-height: center;
		float: right;
	}

	.flowPanel .itemContainer .info .info-down {
		display: flex;
		flex-direction: row;
	}

	.flowPanel .itemContainer .info .info-down .date {
		flex-direction: row;
		font-size: 15px;
		line-height: center;
	}
</style>
