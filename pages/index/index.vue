<template>
	<view class="container">
		
		<u--image
		:src="img_url"
		width="16rem"
		height="12rem"
		></u--image>
		<view class="btn-container">
			<u-button type="primary" @click="login()" class='btn'>登录</u-button>
			<u-button type="primary" @click="register()" class='btn'>注册</u-button>
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
				img_url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp09%2F210F2130512J47-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662730360&t=95e52f173a611d284f26155a3ed8b36e"
			}
		},
		// mounted() {
		// 	uni.request({
		// 	    url: '/api/user/register', 
		// 		method: 'POST',
		// 		header: {
		// 			"content-type": "application/x-www-form-urlencoded"
		// 		},
		// 		data: {
		// 			phoneNumber: "12345678901",
		// 			password: "1234567asf"
		// 		},
		// 	    success: (res) => {
		// 	        console.log(res.data);
		// 	        this.text = 'request success';
		// 	    }
		// 	});
		// },
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/log/log'
				});
			},
			register() {
				uni.navigateTo({
					url: '/pages/reg/reg'
				});
			}
		}
	}
</script>

<style>
	.container{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		padding-top: 250rpx;
	}
	.btn-container{
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
