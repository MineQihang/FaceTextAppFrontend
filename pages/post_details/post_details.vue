<template>
	<!-- 帖子详情界面 -->
	<view style="">
		<!-- 顶部返回和点赞 -->
		<view class="head">
			<uni-icons type="arrow-left" size="30" class="back-icon" @click="back()"></uni-icons>
			<uni-icons :type="like_or_not[like].name" size="30" class="heart-icon" @click="like_it()">
			</uni-icons>
		</view>

		<!-- 发帖人信息和发帖时间 -->
		<view class="infor_time">
			<!-- 发帖人头像	 -->
			<view class="portrait">
				<image :src="icon" alt="" v-model="icon" style=" border-radius: 80rpx;height: 80rpx;width:80rpx;">
			</view>
			<!-- 发帖人昵称 -->
			<view class="nickname">
				{{username}}
			</view>
			<!-- 发帖时间 -->
			<view class="post_time">
				时间：两年半之前
			</view>
		</view>

		<!-- 帖子的图片 -->
		<view class="photo_">
			<swiper circular indicator-dots>
				<swiper-item v-for="item in swipers">
					<image :src="item" class="photo"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 帖子的评论数和点赞数 -->
		<view class="com_like">
			<!-- 评论数 -->
			<view class="" style="margin-top: 30rpx;margin-left: 300rpx;">
				{{numberComment}}
				<uni-icons type="chat" size="30" class="comment-icon"></uni-icons>
			</view>
			<!-- 点赞数 -->
			<view class="" style="margin-top: 30rpx; margin-left:190rpx">
				{{numberLike}}
				<uni-icons type="heart" size="30" class="like-icon"></uni-icons>
			</view>
		</view>

		<!-- 帖子 -->
		<view class="main">
			<!-- 标题 -->
			<view class="title">
				{{post_title}}
			</view>
			<!-- 正文 -->
			<view class="mainText">
				{{post_main}}
			</view>
			<image src="../../static/laba.png" mode="" class="smallLaba"></image>
		</view>

		<!-- 评论区 -->
		<view class="">

			<view class="" style="background-color: #f1f1fe;margin-left: 10rpx;margin-right: 10rpx;">
				<text style="color:#888bf4; font-size:35rpx; font-weight:550; margin-left:10rpx">评论</text>
			</view>
			<view class="" style="height: 300rpx;">
				这是评论区
			</view>
			<!-- 写评论 -->
			<view class="give_comment">
				<view class=""
					style="border-radius: 50rpx;width: 80%;height:100rpx;background-color: gainsboro;margin-left: 80rpx;">
					<input type="text" placeholder="添加评论" style="height: 100rpx;margin-left: 30rpx;">
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				like_or_not: [{
						id: 0,
						name: 'heart'
					},
					{
						id: 1,
						name: 'heart-filled'
					}
				],
				swipers: [
					'/static/Header_img.png',
					'/static/Header_img.png',
					'/static/Header_img.png',
				],
				like: 0, //是否给这篇帖子点赞了
				icon: '/static/Header_img.png', //发帖人头像
				username: 'ikun', //发帖用户名
				time: '', //发帖时间
				numberComment: 0, //评论数
				numberLike: 0, //点赞数
				post_title: '滕王阁序', //帖子标题
				post_main: '豫章故郡，洪都新府。星分翼轸，地接衡庐。襟三江而带五湖，控蛮荆而引瓯越。物华天宝，龙光射牛斗之墟；人杰地灵，徐孺下陈蕃之榻。雄州雾列，俊采星驰。台隍枕夷夏之交，宾主尽东南之美。都督阎公之雅望，棨戟遥临；宇文新州之懿范，襜帷暂驻。十旬休假，胜友如云；千里逢迎，高朋满座。腾蛟起凤，孟学士之词宗；紫电青霜，王将军之武库。家君作宰，路出名区；童子何知，躬逢胜饯时维九月，序属三秋。潦水尽而寒潭清，烟光凝而暮山紫。俨骖騑于上路，访风景于崇阿。临帝子之长洲，得天人之旧馆。层峦耸翠，上出重霄；飞阁流丹，下临无地。鹤汀凫渚，穷岛屿之萦回；桂殿兰宫，即冈峦之体势', //帖子正文
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			like_it() {
				this.like = (this.like + 1) % 2;
			}, //给这个帖子点赞
		}
	}
</script>

<style lang="scss">
	.head {
		height: 100rpx;
	}

	.back-icon {
		position: absolute;
		top: 30rpx;
		left: 34rpx;
	}

	.heart-icon {
		position: absolute;
		top: 30rpx;
		right: 34rpx;
	}

	.comment-icon {
		position: absolute;
		top: 55%;
		left: 30%;
	}

	.like-icon {
		position: absolute;
		top: 55%;
		right: 35%;
	}

	.infor_time {
		display: flex;
		// margin-top: 150rpx;
		height: 100rpx;
		// background-color: antiquewhite;
	}

	.photo_ {
		swiper {
			width: 100%;
			height: 500rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.portrait {
		border-radius: 80rpx;
		height: 80rpx;
		width: 80rpx;
		background-color: #ffffff;
		margin-top: 10rpx;
		margin-left: 30rpx;
	}

	.nickname {
		font-weight: 200;
		font-size: 50rpx;
		margin-top: 30rpx;
		margin-left: 20rpx;
	}

	.post_time {
		position: absolute;
		right: 5%;
		margin-top: 25rpx;
		font-weight: 150;
	}

	.com_like {
		// background-color: aquamarine;
		height: 88rpx;
		display: flex;
	}

	.main {}

	.title {
		padding-top: 20rpx;
		padding-left: 20rpx;
		font-weight: 500;
		font-size: 40rpx;
	}

	.mainText {
		padding-top: 10rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		font-size: 30rpx;
		font-weight: 200;
	}

	.smallLaba {
		width: 30rpx;
		height: 30rpx;
		padding-left: 710rpx;
	}

	.give_comment {
		position: fixed;
		bottom: 0;
		height: 100rpx;
		width: 750rpx;
		// background-color: sandybrown;
	}
</style>
