<template>

	<view class="container">
		<header>
			上面的内容
		</header>
		<!-- 帖子展示 -->
		<view class="content-container">
			<view class="item-container" v-for="(item, index) in flowList" :key="index">
				<view class="user-container">
					<image class="user-icon icon" :src="item.user.iconUrl" />
					<view class="username" style="padding-left: 20rpx; font-weight: 500;">{{ item.user.username }}
					</view>
				</view>
				<view class="item-content" v-for="(url, index2) in item.imgUrls" :key="index2" v-if="index2 == 0">
					<image class="post-photo" :src="url" mode="widthFix" style="max-height: 400rpx;" />
				</view>
				<view class="title">{{ item.title }}</view>
				<view class="info">
					<view class="info-up">
						<view class="comment">
							<uni-icons class="comment-icons" type="chat" size="20"></uni-icons>
							<view class="commentNum">{{ item.commentNum }}</view>
						</view>
						<view class="zan">
							<uni-icons type="heart-filled" size="20" v-if="item.is_liked"></uni-icons>
							<uni-icons type="heart" size="20" v-else></uni-icons>
							<view class="likeNum">{{ item.likeNum }}</view>
						</view>
					</view>

					<view class="info-down">
						<uni-icons type="calendar" size="20"></uni-icons>
						<view class="date">{{ getFormatDate(item.updatedTime) }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import {getTimeAgo} from "@/common/js/utils.js"
export default {
	data() {
		return {
			uid: 79,
			flowList: [],
			bpid: 9660530943306,
		}
	},
	onLoad: function (option) {
		this.init();
		setTimeout(function () {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		this.init();
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onReachBottom() {
		// 触底的时候请求数据，即为上拉加载更多
		this.getPost();
	},
	onShow() {
		this.init();
	},
	methods: {
		getPost(limit = 10) {
			let that = this;
			this.sendRequest({
				url: "/post/get_all",
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
		getUser() {
			let that = this;
			try {
				this.sendRequest({
					url: "/user/user-info",
					success: (res) => {
						that.username = res.data.username;
						that.uid = res.data.uid;
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
			this.getUser();
			this.getPost();
		},
		turnToLogin() {
			uni.redirectTo({
				url: '/pages/log/log'
			});
		},
		turnToPost(pid) {
			let url1 = '/pages/post_details/post_details?pid=' + pid;
			uni.navigateTo({
				url: url1
			})
		},
		getFormatDate(data){
			return getTimeAgo(data);
		}
	},
}
</script>

<style>
.user-container {
	display: flex;
	align-items: center;
}
</style>
