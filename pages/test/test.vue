<template>
	<view class="login-content">
		<view class="login-title">
			登录
		</view>
		
		<view class="iphone">
			<input type="number" placeholder="请输入手机号码" :value="iphoneValue" @input="clearInput" />
			<uni-icons type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
		</view>
 
		<view class="password" v-if="type==2">
			<!-- <input type="password" placeholder="输入密码" /> 要显示密码就不要设置type="password"-->
			<input placeholder="请输入密码" v-model="passwordValue" :password="showPassword" />
			<uni-icons type="eye-filled" color="#808080" size="25" @click="changePassword"></uni-icons>
		</view>
		
		<view class="test" v-if="type==1">
			<input type="text" placeholder="输入验证码" v-model="testValue" />
			<view class="get-test" type="default" @click="getTest()" v-if="showTimer">获取验证码</view>
			<view class="get-test" type="default" v-else>{{timer+'s'}}</view>
		</view>
		<view class="test-btn" v-if="type==2" @click="setLoginType(1)">手机验证码登录>></view>
		<view class="password-btn" v-if="type==1" @click="setLoginType(2)">密码登录>></view>
		<view class="login-btn" @click="Login()">登录</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				iphoneValue: '', //手机号码
				passwordValue: '', //密码
				testValue: '', //验证码
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮
				type: 2, //登录的状态 - - - 1是验证码登录、2是密码登录
				token: '',
				timer: 0, //验证码时间
				showTimer: true, //是否显示验证码时间
			}
		},
 
		methods: {
			// 显示隐藏密码
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.iphoneValue = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.iphoneValue = '';
				this.showClearIcon = false;
			},
			// 切换登录的方式
			setLoginType(type) {
				this.type = type
			},
			// 密码登录
			Login() {
				let that = this
				//当手机号为空或者手机号不正确时
				if (!that.iphoneValue || !this.isMobile(that.iphoneValue)) {
					uni.showToast({
						title: '请输入正确电话号码',
						icon: 'none'
					})
					return false
				}
				// 当使用密码登录并且未输入密码时
				if (that.type == 2 && !that.passwordValue) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				// 当使用验证码登录并且未输入验证码时
				if (that.type == 1 && !that.testValue) {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return false
				}
				uni.request({
					url: 'http://app/login', // 路径
					method: 'POST', // 请求方法
					data: {
						phone: that.iphoneValue,
						type: that.type,
						code: that.testValue,
						password: that.passwordValue
					}, //发送的数据
					success: (res) => {
						if (res.data.code == 200) {
							//存储token
							that.token = res.data.token;
							uni.setStorageSync('token', that.token); // 将登录信息以token的方式存在硬盘中
							uni.setStorageSync('userInfo', JSON.stringify(res.data)); // 将用户信息存储在硬盘中
							uni.switchTab({ // 跳转到新闻页面
								url: "../index/index",
							})
							uni.showToast({
								title: '登录成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							})
						}
					}
				})
			},
			// 获取验证码
			getTest() {
				let that = this
				//当手机号为空或者手机号不正确时
				if (!that.iphoneValue || !this.isMobile(that.iphoneValue)) {
					uni.showToast({
						title: '请输入正确电话号码',
						icon: 'none'
					})
					return false
				}
				uni.request({
					url: 'http://app/login/sendSms', // 路径
					method: 'GET', // 请求方法
					data: {
						phone: that.iphoneValue,
						type: '1',
					}, //发送的数据
					success: (res) => {
						if (res.data.code == 200) {
							uni.showToast({
								title: '验证码发送成功',
								icon: 'none'
							})
							that.timer=60//设置时间初始化
							that.timeDown(that.timer)//调用时间减少
						}
					}
				})
			},
			// 设置验证码时间动态减少
			timeDown(num){
				let that=this;
				// 当时间为0时,恢复为按钮,清除定时器
				if(num==0){
					that.showTimer=true;
					return clearTimeout();
				}else{
					that.showTimer=false;
					setTimeout(function(){
						that.timer=num-1
						that.timeDown(num-1)
					},1000)//定时每秒减一
				}
			},
			// 下面是可以封装起来引入的部分
			// 判断是否是正确的手机号码
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},
		}
	}
</script>
 
<style scoped>
	.login-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
	}
 
	.login-title {
		font-size: 26px;
		font-weight: bold;
		margin-bottom: 31px;
	}
 
	.login-content input {
		height: 50px;
		background: #F8F8F8;
		border-radius: 25px;
		text-align: left;
		padding: 15px;
		box-sizing: border-box;
		font-size: 15px;
	}
 
	.iphone,
	.password,
	.test {
		position: relative;
		margin-bottom: 30px;
	}
 
	.iphone .uni-icons,
	.password .uni-icons {
		position: absolute;
		top: 14px;
		right: 30px;
	}
 
	.test-btn,
	.password-btn {
		color: #ff8b33;
		font-size: 15px;
		text-align: right;
	}
 
	.get-test {
		color: #ff8b33;
		font-size: 15px;
		width: 122px;
		height: 50px;
		border: 1px solid #FF8B33;
		border-radius: 25px;
		line-height: 50px;
	}
 
	.test {
		display: flex;
		justify-content: space-between;
	}
 
	.login-btn {
		width: 355px;
		height: 45px;
		background: #FF8B33;
		border-radius: 36px;
		color: #ffffff;
		font-size: 20px;
		text-align: center;
		line-height: 45px;
		position: fixed;
		bottom: 60px;
	}
</style>