<template>
	<view class="our-gray">
		<!-- 顶部组件 -->
		<view class="top">
			<view class="return-path" @click="back()">
				<image class="path-icon" src="../../../static/icons/leftArrow.svg"></image>
			</view>
			<view class="focusme our-purple">我关注的人</view>
		</view>
		<view class="content">

			<view class="list-content"  v-for="(item, index) in flowList" :key="index"> <!-- 对flowList遍历 -->
				<view class="list-content-icon" @click="turnToPerson(item.uid)"> <!-- 获取用户头像 -->
					<image class="iconUrl" :src='item.iconUrl' mode="aspectFill">
				</view>
				<view class="list-content-username title-font" @click="turnToPerson(item.uid)"><!-- 获取用户名字 -->
					{{item.username}}
				</view>
				<view class="list-content-motto text-font" @click="turnToPerson(item.uid)"> <!-- 获取用户motto -->
					{{item.motto}}
				</view>
				<view class="list-content-fans text-font" v-if="!item.isSubscribed" @click="trueisSubscribed(index);"> <!-- 获取用户是否被我关注 -->
					+关注
				</view>
				<view class="list-content-fans text-font" v-else @click="falseisSubscribed(index);">
					已关注
				</view>
			</view>
		</view>
		<view class="bottom-picture" v-if="flowList.length<6"> <!-- 如果列表数小于六 显示图片 -->
			<image src='../../../static/icons/likeBackground.svg'></image>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				username: '',
				motto: '',
				iconUrl: '',
				uid: '',
				flowList: ""
			}

		},
		mounted() {
			this.init();
		},

		methods: {
			onLoad: function(option) {
				// this.init();
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
			turnToPerson(uid) {
				uni.navigateTo({
					url: '/pages/sidebar/personal-space/personal-space?uid=' + uid
				})
			},
			postSubscribed(uid) {
				this.sendRequest({
					url: "/user/subscribe",
					method: 'POST',
					requestDataType: "form",
					data: {
						uid2: uid
					},
					success: (res) => {
						uni.showToast({
							title: res.detail,
							duration: 1000
						});
					}
				});
			
			},
			
			trueisSubscribed(index) {
				this.flowList[index]["isSubscribed"] = true;
				this.postSubscribed(this.flowList[index]["uid"])
				
			},
			falseisSubscribed(index) {
				this.flowList[index]["isSubscribed"] = false;
			    this.postSubscribed(this.flowList[index]["uid"])
			},

			getUser() {
				let that = this;
				try {
					this.sendRequest({
						url: "/user/all_subscribed",
						success: (res) => {
							that.flowList = res.data;
						}
					})
				} catch (e) {
					console.log(e)
				};
			},
			init() {
				this.getUser();
			},
			
			back() {
				let pages = getCurrentPages(); // 当前页面
				let beforePage = pages[pages.length - 2]; // 上一页
				uni.navigateBack({
				    success: function() {
				        beforePage.init(); 
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.top {
		display: flex;
		align-items: center;
		height: 126rpx;
		background-color: white;
	}

	.focusme {
		font-size: 24px;
		font-weight: 700;
	}

	.return-path {}

	.path-icon {
		width: 54rpx;
		height: 54rpx;
		margin: 40rpx 40rpx 27rpx 28.8rpx;
		background-color: white;
	}

	.content {
		width: 100%;
		justify-content: center;
		margin-top: 28.8rpx;
	}

	.list {}

	.list-content {
		/* 这是list中的内容捏 */
		// width: 745.2rpx;
		height: 117rpx;
		background-color: white;
		width: 100%;
		display: flex;
	}

	.iconUrl {
		width: 81rpx;
		height: 81rpx;
		border-radius: 50%;
		display: flex;
	}

	.list-content-icon {
		display: flex;
		width: 81rpx;
		height: 81rpx;
		margin-top: 18rpx;
		margin-bottom: 18rpx;
		margin-left: 36rpx;
		border-radius: 50%;
		background: rgb(255, 255, 255);
	}

	.list-content-username {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		position: absolute;
		width: 470rpx;
		height: 70.2rpx;
		margin-top: 15rpx;
		margin-bottom: 46.8rpx;
		margin-left: 142.2rpx;
		color: rgb(0, 0, 0);
		font-weight: 400;
		
	}

	.list-content-motto {
		/* mottomottomottomotto */
		/* mottomottomottomotto */
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 450rpx;
		height: 24px;
		margin-top: 60rpx;
		margin-left: 30rpx;
		color: #212121;
		
	}

	.list-content-fans {
		/* +关注 */
		position: absolute;
		width: 130rpx;
		height: 59.4rpx;
		margin-top: 36rpx;
		right: 10rpx;
		margin-bottom: 21.6rpx;
		color: rgb(70, 5, 173);
		font-weight: 700;
		line-height: 37.8rpx;
		letter-spacing: 0rpx;
		text-align: left;
		flex-direction: row;
		align-items: center;
	
	}

	.bottom-picture {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 113.4rpx;
		margin-bottom: 100rpx;

	}
</style>
