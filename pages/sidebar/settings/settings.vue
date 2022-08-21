<template>
	<view>
		<view class="top">
			<view class="return-path" @click="back()">
				<image class="path-icon" src="../../../static/icons/leftArrow.svg"></image>
			</view>
			<view class="focusme our-purple">设置</view>
		</view>

		<view class="bottom_view">
			<view class="btn1 " >音色</view>
			<view class="line"></view>
			<view class="music">
				<view class="title title-font">语速</view>
				<view>
					<slider class="slider" :value="spd" @change="setspd" step="1" min="0" max="9" show-value height=20rpx />
				</view>

				<view class="title title-font">音调</view>
				<view>
					<slider class="slider" :value="pit" @change="setpit" step="1" min="0" max="9" show-value />
				</view>

				<view class="title title-font">音量</view>
				<view>
					<slider class="slider" :value="vol" @change="setvol" step="1" min="0" max="15" show-value />
				</view>
				<view class="title title-font">发音人选择</view>
				<view>
					<view class="percontain">
						<view class="uni-list-cell-left text-font" style="margin-top: 40rpx; margin-left:37rpx">
							当前选择
						</view>
						
						<view class="uni-list-cell-db text-font" style="margin-top: 0rpx; margin-left:37rpx ">
							<picker class="picker" @change="perchange" :value="indexper" :range="array">
								<view class="uni-input" style="background-color:white; height=100rpx margin-left:20rpx">
								{{array[indexper]}}
								</view>
							</picker>
						</view>
					</view>
				</view>


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
				spd:5,
				pit:5,
				vol:5,
				per:'0',
				indexper:0,
				array: ['度小美(默认)', '度小宇', '度逍遥(基础)', '度丫丫', '度逍遥(精品)', '度小鹿', '度博文', '度小童', '度小萌', '度米朵', '度小娇'],
				arrayper: [0, 1, 3, 4, 5003, 5118, 106, 110, 111, 103, 5],
			}
		},
		onLoad(){
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
			reset() {
				try {
					uni.removeStorageSync('authorization');
				} catch (e) {
					console.log(e)
				}
				uni.reLaunch({
					url: '/pages/index/find_back/find_back'
				})
			},
			
			
			setspd(e){

				uni.setStorageSync('spd', e.detail.value)
				
			},
			setpit(e){
				uni.setStorageSync('pit', e.detail.value)
			},
			setvol(e){
				uni.setStorageSync('vol', e.detail.value)
			},
            perchange:function(e){
				uni.setStorageSync('per', this.arrayper[e.detail.value])
				uni.setStorageSync('indexper', e.detail.value)
				this.indexper = e.detail.value;
			},
			back() {
				uni.navigateBack()
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

	.bottom_view {
		background-color: our-gray;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		height: 1488.6rpx;
		z-index: 1 !important;
		/* 		 position:fixed; */
	}

	.music {
		margin-top: 50rpx;
	}
	.line {
		margin: 150rpx 10% 15rpx 4.8%;
		width: 84.5%;
		height: 0;
		border: solid 2rpx;
		border-color: black;
		background-color: black;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.title{
		margin-left:37rpx;
	}

	.slider {
		margin-top: 30rpx;
	}
	.percontain{
		margin-top: 15rpx;
	}
    .picker{
		margin-top: 1rpx;
		margin-right: 80rpx;
	}
	.uni-input{
		height: 100rpx;
		line-height: 100rpx;
		
	}
	.btn1 {
		position: absolute;
		width: 100rpx;
		height: 50rpx;
		top: 190rpx;
		background: $our-gray;
		margin-left: 33rpx;
		color: black;
		font-size: 24px;
		font-weight: 700;
		text-align: center;
		line-height: 60px;
		bottom: 57.6rpx;
		// left: 84.6rpx;
		// right: 84.6rpx;
	}

	.btn2 {
		position: absolute;
		width: 576rpx;
		height: 115.2rpx;
		top: 1280rpx;
		background: $our-purple;
		border-radius: 36px;
		color: #ffffff;
		font-size: 24px;
		font-weight: 400;
		text-align: center;
		line-height: 60px;
		bottom: 57.6rpx;
		left: 84.6rpx;
		right: 84.6rpx;
		border-radius: 36rpx;
	}

	.btn3 {
		position: absolute;
		width: 576rpx;
		height: 115.2rpx;
		top: 1450rpx;
		background: $our-purple;
		border-radius: 36px;
		color: #ffffff;
		font-size: 24px;
		font-weight: 400;
		text-align: center;
		line-height: 60px;
		bottom: 57.6rpx;
		left: 84.6rpx;
		right: 84.6rpx;
		border-radius: 36rpx;
	}
</style>
