<template>
	<view>
		<!-- 顶部组件 -->
		<view class="top">
			<view class="return-path" @click="back()">
				<image class="path-icon" src="../../../static/icons/leftArrow.svg"></image>
			</view>
			<view class="focusme our-purple">设置</view>
		</view>
		<!-- 使用滚动条来设置语音 -->
		<view class="bottom_view">
			<view class="title ">语音播报设置</view>
			<view class="line"></view>
			<view class="music">
				<view class="subtitle">语速</view>
				<view>
					<slider class="slider" :value="spd" @change="setspd" step="1" min="0" max="9" show-value
						height=20rpx />
				</view>

				<view class="subtitle">音调</view>
				<view>
					<slider class="slider" :value="pit" @change="setpit" step="1" min="0" max="9" show-value />
				</view>

				<view class="subtitle">音量</view>
				<view>
					<slider class="slider" :value="vol" @change="setvol" step="1" min="0" max="15" show-value
						style="margin-bottom: 35rpx;" />
				</view>
				<view class="subtitle">发音人选择</view>
				<view>
					<view class="percontain">
						<view class="" style="margin-top: 30rpx; margin-left:37rpx ">
							<picker class="picker" @change="perchange" :value="indexper" :range="array">
								<view class="uni-input"
									style="font-size: 16px; background-color:white; height=100rpx margin-left:20rpx;padding-left:20rpx;border-radius:10px">
									{{array[indexper]}}
								</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 音频试听 -->
				<view style="display: flex; align-items:center; height: 100rpx; padding-left:40rpx; margin-top:10rpx;">
					<text style="font-size: 18px;">点击试听: </text>
					<uni-icons :type="voicing?'sound-filled':'sound'" size="30" class='voice' @click="voice()">
					</uni-icons>
				</view>

				<!-- 修改密码，退出登录button -->
				<button class="btn2" @click="reset()">修改密码</button>
				<button class="btn3" @click="index()">退出登录</button>
			</view>



		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gender: 0,
				username: '',
				age: '',
				mail: '',
				motto: '',
				icon: '',
				uid: '',
				spd: 5,
				pit: 5,
				vol: 5,
				per: '0',
				indexper: 0,
				array: ['度小美(默认)', '度小宇', '度逍遥(基础)', '度丫丫', '度逍遥(精品)', '度小鹿', '度博文', '度小童', '度小萌', '度米朵', '度小娇'],
				arrayper: [0, 1, 3, 4, 5003, 5118, 106, 110, 111, 103, 5],
				voicing: false
			}
		},
		onLoad() {
			this.spd = uni.getStorageSync("spd");
			this.pit = uni.getStorageSync("pit");
			this.vol = uni.getStorageSync("vol");
			this.per = uni.getStorageSync("per");
			this.indexper = uni.getStorageSync("indexper");
			this.indexper = this.indexper ? this.indexper : 0;
		},
		onShow() {

			this.get_inf();

		},
		methods: {
			// 获取用户信息
			get_inf() {
				let that = this;
				try {
					const authorization = uni.getStorageSync('authorization');
					if (!authorization) throw DOMException("Nope!");
					else {
						that.sendRequest({
							url: '/user/user-info',
							method: 'GET',
							success: (res) => {
								this.text = 'request success';
								if (res.code == 200) {
									that.username = res.data.username;
									that.studentIndex = res.data.gender;
									that.age = res.data.age;
									that.motto = res.data.motto;
									that.mail = res.data.mail;
									that.icon = res.data.iconUrl;
									that.uid = res.data.uid;
								}
							}
						})
					}
				} catch (e) {
					console.log(e)
				}
			},
			// 退出登录,remove用户信息
			index() {
				try {
					uni.removeStorageSync('authorization');
				} catch (e) {
					console.log(e)
				}
				uni.reLaunch({
					url: '/pages/index/login/login'
				})
			},
			//修改密码方法
			reset() {
				uni.navigateTo({
					url: '/pages/index/find_back/find_back'
				})
			},

			// 语速设置方法
			setspd(e) {

				uni.setStorageSync('spd', e.detail.value)

			},
			// 音调设置方法
			setpit(e) {
				uni.setStorageSync('pit', e.detail.value)
			},
			// 音量设置方法
			setvol(e) {
				uni.setStorageSync('vol', e.detail.value)
			},
			perchange: function(e) {
				uni.setStorageSync('per', this.arrayper[e.detail.value])
				uni.setStorageSync('indexper', e.detail.value)
				this.indexper = e.detail.value;
			},
			back() {
				uni.navigateBack()
			},
			// 发音人选择
			voice() {
				if (this.voicing) {
					this.innerAudioContext.stop()
					this.voicing = false
					return
				}
				// 输入当前的相关参数
				let spd = uni.getStorageSync('spd')
				let pit = uni.getStorageSync('pit')
				let vol = uni.getStorageSync('vol')
				let per = uni.getStorageSync('per')
				let text = "天气炎热，请大家注意避暑，节约用电"
				this.voicing = true;
				// 从后端获取试听语音
				this.sendRequest({
					url: "/service/speech_synthesis",
					method: 'POST',
					requestDataType: "form",
					data: {
						text: text,
						spd: spd,
						pit: pit,
						vol: vol,
						per: per
					},
					success: (res) => {
						this.innerAudioContext = uni.createInnerAudioContext();
						this.innerAudioContext.autoplay = true;
						this.innerAudioContext.src = res.url;
						this.innerAudioContext.play();
						this.innerAudioContext.onEnded(() => {
							this.voicing = false
						})
					},
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
		font-size: 22px;
	}

	.return-path {}

	.path-icon {
		width: 54rpx;
		height: 54rpx;
		margin: 40rpx 40rpx 27rpx 28.8rpx;
		background-color: white;
	}

	.bottom_view {
		background-color: our-gray;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		height: 80vh;
		z-index: 1 !important;
	}

	.music {
		margin-top: 50rpx;
	}

	.line {
		margin: 100rpx 6% 15rpx 6%;
		width: 88%;
		height: 0;
		background-color: black;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.subtitle {
		margin-left: 37rpx;
		font-size: 19px;
	}

	.slider {
		margin-top: 30rpx;
	}

	.percontain {
		margin-top: 15rpx;
	}

	.picker {
		margin-top: 1rpx;
		margin-right: 80rpx;
	}

	.uni-input {
		height: 90rpx;
		line-height: 90rpx;

	}

	.title {
		position: absolute;
		width: 80%;
		top: 150rpx;
		margin-left: 10%;
		margin-right: 10%;
		color: black;
		font-size: 24px;
		text-align: center;
		line-height: 60px;
	}

	.btn2 {
		position: absolute;
		width: 500rpx;
		height: 55px;
		top: 1100rpx;
		background: linear-gradient(120deg, rgb(70, 5, 173), rgb(19, 93, 173));
		border-radius: 36px;
		color: #ffffff;
		font-size: 19px;
		text-align: center;
		line-height: 55px;
		bottom: 57.6rpx;
		left: 84.6rpx;
		right: 84.6rpx;
		border-radius: 36rpx;
	}

	.btn3 {
		position: absolute;
		width: 500rpx;
		height: 55px;
		top: 1280rpx;
		background: linear-gradient(120deg, rgb(70, 5, 173), rgb(19, 93, 173));
		border-radius: 36px;
		color: #ffffff;
		font-size: 19px;
		text-align: center;
		line-height: 55px;
		bottom: 57.6rpx;
		left: 84.6rpx;
		right: 84.6rpx;
		border-radius: 36rpx;
	}

	.voice {
		padding-top: 3rpx;
		padding-left: 20rpx;
	}
</style>
