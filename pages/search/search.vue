<template>
	<view style="background">
		<!--<head-tab></head-tab>-->
		<view class="container">
			<view class="search-bar">
				<input type="text" style="height: 100rpx;margin-left: 30rpx; width: 100%;" v-model="text"
					@focus="onFocusInput" @blur="onBlurInput" @input="onKeyInput()">
				<image class="search-icon" src="/static/icons/search.svg" @click="search()"></image>
			</view>
		</view>
		<view class="not-found" v-show="this.notFoundUser||this.notFoundPost">{{"抱歉，没有搜索到相关结果。"}}</view>

		<view class="post-container">
			<view clss="post-list" v-show="postList.length">
				<post :postList="postList" style=" display:flex;"></post>
			</view>

			<view class="backgrount-icon" v-show="!(postList.length||userList.length||this.notFoundUser||this.notFoundPost)">
				<image src="../../static/icons/searchBackground.svg" style="width:684rpx; height: 507.6rpx;"></image>
			</view>
			<view class="content" v-show="userList.length">

				<view class="list-content" v-for="(item, index) in userList" :key="index">
					<view class="list-content-icon" @click="turnToPerson(item.uid)">
						<image class="iconUrl" :src='item.iconUrl' mode="aspectFill">
					</view>
					<view class="list-content-username title-font" @click="turnToPerson(item.uid)">
						{{item.username}}
					</view>
					<view class="list-content-motto text-font" @click="turnToPerson(item.uid)">
						{{item.motto}}
					</view>
					<view class="list-content-fans text-font" v-if="!item.is_subscribed"
						@click="trueisSubscribed(index);">
						+关注
					</view>
					<view class="list-content-fans text-font" v-else @click="falseisSubscribed(index);">
						已关注
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {
				isShowFocus: false,
				postList: [],
				text: '',
				bpid: 9660530943306,
				username: '',
				motto: '',
				iconUrl: '',
				uid: '',
				isSubscribed: '',
				userList: [],
				notFoundUser:false,
				notFoundPost:false
			};
		},
		onLoad: function(option) {
			setTimeout(function() {}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			this.init();
			this.postList = [];
			this.text = '';
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			// 触底的时候请求数据，即为上拉加载更多
			if (this.postList.length) {
				this.getMore();
			} else {
				this.getMoreUser();
			}
		},
		onShow() {
			this.init()
		},

		methods: {
			onFocusInput: function(event) {
				//console.log('输入框聚焦时触发:',event)
				// this.inputValue = event.target.value
				this.isShowFocus = true;
				this.width = "100%";
				this.$emit("focus")
			},
			onBlurInput: function(event) {
				//console.log("输入框失去焦点时触发:",event); 
				this.$emit("blur")

			},
			inputCances: function() {
				this.isShowFocus = false;
				this.text = '';
				this.width = "100%"
				this.$emit("cancel");
			},
			init() {
				// this.text = '';
				this.bpid = 9660530943306;
				//this.postList = [];
				this.userList = [];
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
				this.userList[index]["is_subscribed"] = true;
				this.postSubscribed(this.userList[index]["uid"]);
			},
			falseisSubscribed(index) {
				this.userList[index]["is_subscribed"] = false;
				this.postSubscribed(this.userList[index]["uid"])
			},
			onKeyInput: function(event) {
				// this.text = event.target.value;
				this.postList = [];
				this.searchUser()
			},
			searchUser() {
				let that = this;
				that.postList = [];
				if (that.text == "" || that.text == " ") {
					that.postList = [];
					that.userList = [];
				} else {
					this.sendRequest({
						url: "/user/search",
						data: {
							text: that.text,
							buid: 9660530943306
						},
						success: (res) => {
							let datas = res.data;
							if (datas && datas.length != 0) {
								that.userList = res.data;
								that.notFoundPost = false;
								that.notFoundUser = false
							} else {
								that.userList = [];
								that.notFoundUser = true;
								that.notFoundPost = false
								
							}
						}
					});
				}

			},
			search() {
				let that = this;
				that.userList = [];
				if (that.text == "" || that.text == " ") {
					that.postList = [];
					that.userList = [];
					uni.showToast({
						title: "搜索内容不能为空",
						icon: "none"

					});
				} else {
					this.sendRequest({
						url: "/post/search",
						data: {
							text: that.text,
							bpid: 9660530943306

						},
						success: (res) => {
							let datas = res.data;
							if (datas && datas.length != 0) {
								that.postList = res.data;
								that.bpid = that.postList[that.postList.length - 1].pid;
								that.notFoundUser = false;
								that.notFoundPost = false;
								
							} else {
								that.postList = [];
								that.notFoundPost = true;
								that.notFoundUser = false
							}
						}
					});
				}
			},
			getMore(limit = 10) {
				let that = this;
				this.sendRequest({
					url: "/post/search",
					data: {
						limit: limit,
						bpid: that.bpid,
						text: that.text
					},
					success: (res) => {
						let datas = res.data;
						if (datas && datas.length != 0) {
							that.postList.push.apply(that.postList, datas);
							that.bpid = that.postList[that.postList.length - 1].pid;
						}
					}
				});
			},
			pass2explore(obj) {
				if (obj) {
					this.postList[obj.index].commentNum = obj.numberComment;
					this.postList[obj.index].is_liked = obj.is_liked;
					this.postList[obj.index].likeNum = obj.numberLike;
					console.log("传回来了");
				}
			}
		}

	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 174.6rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		background-color: #f5f5f5;
	}

	.post-container {
		background-color: $our-gray;
	}

	.search-bar {
		margin: 30rpx 36rpx 19.8rpx 36rpx;
		border-radius: 20px;
		width: 84%;
		height: 100rpx;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.search-icon {
		width: 24px;
		height: 24px;
		margin-right: 30rpx;
	}

	.not-found {
		width: 100%;
		height: 174.6rpx;
		display: flex;
		align-items: center;
		font-size: 18px;
		font-weight: 400;
		justify-content: center;
	}


	.backgrount-icon {
		margin-top: 439.2rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		background-color: #f5f5f5;
	}

	.content {
		width: 100%;
		justify-content: center;
		margin-top: 28.8rpx;
		
	}


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
		background: rgb(183, 212, 185);
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
</style>
