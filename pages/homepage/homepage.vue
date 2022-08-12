<template>

	<view class="container">
		<view>
			<view>
				<u--image src="../../static/successful_log.png" width="16rem" height="12rem"></u--image>
				<view>{{ username }}</view>
			</view>
		</view>


		<view class="btn-container">
			<u-button type="primary" @click="log()" class='btn'>退出登录</u-button>
		</view>
	</view>
</template>

<script>
	import uButton from "../../uni_modules/uview-ui/components/u-button/u-button.vue"
	export default {
		components: {
			uButton
		},
		data() {
			return {
				username: ''
			}
		},
		mounted() {
			let that = this;
			try {
				const authorization = uni.getStorageSync('authorization');
				if (!authorization) throw DOMException("Nope!");
				else{
					uni.request({
						url: '/api/user/user-info',
						header:{
							'Authorization': authorization
						},
						success: (res) => {
							console.log(res);
							this.text = 'request success';
							if (res.statusCode == 200) {
								that.username = res.data.data.username;
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
		},
		methods: {
			log() {
				uni.redirectTo({
					url: '/pages/log/log'
				});
			}

		}
	}
</script>

<style>
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
</style>
