<template>
	<view>
		<view class="background-layer"></view>
		<view class="course">
			<!-- 头部图片 -->
			<view class="head_img">
				<image src="/static/Header_img.png" style="width: 100%;height: 350rpx;" alt="">
			</view>

			<!-- 用户头像 -->
			<view class="portrait">
				<image src="icon" alt="" v-model="icon" style="border-radius: 125rpx;height: 125rpx;width:125rpx;">
			</view>

			<!-- 修改信息区 -->
			<view class="mid_view">

				<view class="hanzi0">
					<view class="">
						用户名
						<view class="input_btn">
							<input type="text" class="input" v-model="username">
						</view>
					</view>
				</view>

				<view class="gaa">
					<view class="hanzi">
						性别
						<!-- <picker mode="selector" :range="checkGender" range-key="name" @change="checkGender"
							:value="genderIndex" class="right">{{checkGender[genderIndex].name}}</picker> -->
						<view class="input_btn">
							<view class="">
								<picker style="" mode="selector" :range="checkStudents" range-key="name"
									@change="checkStudent" v-model="checkStudents[studentIndex].name"
									class="right slect">
									{{checkStudents[studentIndex].name}}
								</picker>
							</view>
						</view>
					</view>
					<view class="hanzi">
						年龄
						<view class="input_btn">
							<input type="number" class="input" v-model="age">
						</view>
					</view>
				</view>

				<view class="">
					<view class="hanzi1">
						签名
						<view class="input_btn">
							<input type="text" class="input" v-model="motto">
						</view>
					</view>
				</view>

				<view class="">
					<view class="hanzi1">
						Email
						<view class="input_btn">
							<input type="text" class="input" v-model="mail">
						</view>
					</view>
				</view>

			</view>


			<button class="btn" @click="save_inf()">保存信息</button>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				checkStudents: [{
						id: 0,
						name: '女'
					},
					{
						id: 1,
						name: '男'
					},
					{
						id: 2,
						name: '保密'
					}
				],
				studentIndex: 0,
				username: '',
				age: '',
				mail: '',
				motto: '',
				icon: '/static/Header_img.png',
				uid: '',

			}
		},
		mounted() {
			let that = this;
			try {
				const authorization = uni.getStorageSync('authorization');
				if (!authorization) throw DOMException("Nope!");
				else {
					uni.request({
						url: 'http://124.221.253.187:5000/user/user-info',
						method: 'GET',
						header: {
							'Authorization': authorization
						},
						success: (res) => {

							this.text = 'request success';
							if (res.statusCode == 200) {
								that.username = res.data.data.username;
								that.studentIndex = res.data.data.gender;
								that.age = res.data.data.age;
								that.motto = res.data.data.motto;
								that.mail = res.data.data.mail;
								that.icon = res.data.data.iconUrl;
								that.uid = res.data.data.uid;
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
			checkStudent: function(e) {
				this.studentIndex = e.detail.value;
			},
			save_inf() {
				let that = this
				try {
					const authorization = uni.getStorageSync('authorization');
					uni.request({
						url: 'http://124.221.253.187:5000/user/change', // 路径
						method: 'POST', // 请求方法
						header: {
							'Authorization': authorization,
							"content-type": "application/json"
						},
						data: {
							uid: that.uid,
							username: that.username,
							gender: that.studentIndex,
							age: that.age,
							mail: that.mail,
							motto: that.motto,
							iconUrl: that.icon
						}, //发送的数据
						success: (res) => {

							if (res.data.code == 200) {
								uni.showToast({
									title: '保存成功',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								})
							}
						}
					})

				} catch (e) {
					console.log(e)
				}
			}
		}
	}
</script>

<style>
	.gaa {
		display: flex;
	}

	.head_img {
		height: 300rpx;
		background-color: #ffffff;
		z-index: 1 !important;
		/* 	position: fixed; */
	}

	.slect {
		/* margin-top: 30rpx; */
		padding-top: 20rpx;
		padding-left: 10rpx;
	}

	.portrait {
		border-radius: 125rpx;
		height: 125rpx;
		width: 125rpx;
		background-color: #ffffff;
		z-index: 10 !important;
		position: absolute;
		top: 28%;
		left: 42.5%;
	}

	.blank {
		height: 200rpx;
		background-color: #ffffff;
	}

	.mid_view {
		background-color: #ffffff;
	}

	.hanzi0 {
		margin-top: 150rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		font-size: 30rpx;
		font-weight: 200;
		background-color: #ffffff;
	}

	.hanzi {
		width: 50%;
		margin-top: 50rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		font-size: 30rpx;
		font-weight: 200;
		background-color: #ffffff;
	}

	.hanzi1 {
		margin-top: 50rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		font-size: 30rpx;
		font-weight: 200;
		background-color: #ffffff;
	}

	.input_btn {
		margin-top: 10rpx;
		height: 80rpx;
		background-color: #f5f5f5;
		border-radius: 36rpx;
	}

	.input {
		margin-top: 10rpx;
		margin-left: 15rpx;
		height: 80rpx;
		background-color: #f5f5f5;
		border-radius: 36rpx;
	}

	.btn {
		position: absolute;
		bottom: 100;
		width: 80%;
		height: 100rpx;
		background: linear-gradient(270deg, rgba(136, 139, 244, 1) 0%, rgba(81, 81, 198, 1) 100%);
		box-shadow: 0px 6px 8px rgba(134, 136, 242, 0.2);
		border-radius: 36px;
		color: #ffffff;
		font-size: 1rem;
		text-align: center;
		line-height: 45px;
		margin-top: 50rpx;
		margin-left: 70rpx;
		margin-right: 70rpx;
	}

	.background-layer {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #ffffff;
		z-index: 0;
	}

	.course {
		position: relative;
		z-index: 1;
	}
</style>
