<template>
	<view class="container">
		
		
		<button @click="topage_log">点击登录</button>
		<button @click="topage_reg">点击注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			topage_log() {
				uni.navigateTo({
					url:"../log/log"
				})
			},
			topage_reg() {
				uni.navigateTo({
					url:"../reg/reg"
				})
			}
		}
	}
</script>

<style>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
	}
</style>
