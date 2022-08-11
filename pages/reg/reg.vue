<template>
	<view class="">
		
		<!-- 空白部分 -->
		<view class="blank">

		</view>
			
		<!-- 主体 -->
		<view class="uni-form-item uni-column horViewStyle box">	
			<image src="../../static/log1.svg" class="picture" mode=""></image>
			<input class="uni-input input-box" type="number" placeholder="请输入手机号码" v-model="iphoneValue" />
		</view>
				
		<view class="uni-form-item uni-column horViewStyle box">
			<image src="../../static/log2.svg" class="picture" mode=""></image>
			<input class="uni-input input-box" type="password" placeholder="请设置密码" v-model="passwordValue1"/>
		</view>
		
		<view class="uni-form-item uni-column horViewStyle box">
			<image src="../../static/log2.svg" class="picture" mode=""></image>
			<input class="uni-input input-box" type="password" placeholder="请确认密码" v-model="passwordValue2"/>
		</view>
		
			<button class="login-btn" @click="reg()">注册</button>

		
					
	</view>
</template>

<script>
	export default {
	    data() {
	        return {
				iphoneValue: '', //手机号码
				passwordValue1: '',
				passwordValue2: '',//密码
		}
	    },
	    methods: {
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},
			reg() {
				if (!this.iphoneValue || !this.isMobile(this.iphoneValue) ) {
					uni.showToast({
						title: '请输入正确的手机号码',
						icon: 'none'
					})
					return false
				}
				if(!this.passwordValue1){
					uni.showToast({
								title: '请输入密码',
								icon: 'none'
							})
							return false
				}
				if(!this.passwordValue2){
					uni.showToast({
								title: '请再次输入密码',
								icon: 'none'
							})
							return false
				}
				if (this.passwordValue1!=this.passwordValue2) {
					uni.showToast({
						title: '两次输入密码不一致，请重新输入',
						icon: 'none'
					})
					return false
				}
				// console.log(this.passwordValue1)
				uni.request({
				    url: '/api/user/register', 
					method: 'POST',
					header: {
						"content-type": "application/x-www-form-urlencoded"
					},
					data: {
						phoneNumber: this.iphoneValue,
						password: this.passwordValue1
					},
				    success: (res) => {
				        console.log(res);
				        this.text = 'request success';
				    }
				});
			}
	    }
	}

</script>
<style>
	
		.iphone,
		.password,
		.test {
			position: relative;
			margin-bottom: 30rpx;
		}
		.box {
			height: 100rpx;
			width: 80%;
			margin-top: 10rpx;
			margin-bottom: 20rpx;
			margin-left: 60rpx;
			margin-right: 60rpx;
			background-color: #f0f0f0;
			border-radius: 36rpx;
			display: flex;
		}
		.picture{
			height:100%;
			width: 50rpx;
			margin-left: 20rpx;
			border-radius: 36rpx;
		}
        .wrap{
            display: flex;
            width: 100%;
            height: 500rpx;
        }
        .blank{
            border: 1px  #000;
			width:100%;
			height:400rpx;
            flex: 1;
        }
		.input-box {
			margin-top: 25rpx;
			margin-left:10rpx;
		}
		.input-btn{
			border-radius: 36px;
			background-color: #000;
			height: 100rpx;
			width: 600rpx;
			margin-left: 70rpx;
			margin-right: 70rpx;
		}
		.login-btn {
			width: 80%;
			height: 100rpx;
			background: #000000;
			border-radius: 36px;
			color: #ffffff;
			font-size: 20px;
			text-align: center;
			line-height: 45px;
			position: absolute;
			margin-bottom: 500rpx;
			margin-left: 70rpx;
			margin-right: 70rpx;
		}
 </style>