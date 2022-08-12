<template>
	<view class="container">
		<uni-icons type="arrow-left" size="40" class="back-icon" @click="back()"></uni-icons>
		<view class="text_con">
			<textarea class="text" cols="30" rows="10" v-model="text"></textarea>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				text: ""
			}
		},
		methods: {
			back(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	.container {

	}
	.back-icon {
		position: fixed;
		top: 26rpx;
		left: 8rpx;
	}
	.text_con {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.text {
		width: 337px;
		height: 230px;
		top: 92px;
		background: rgba(196, 196, 196, 0.14);
		border-radius: 16px;
	}
</style>
