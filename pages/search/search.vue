<template>
	<view>
		<head-tab></head-tab>
		<view class="search-bar">
			<uni-search-bar placeholder="搜索" @confirm="search" v-model="searchValue" bgColor="rgb(238, 238, 238)"
				radius="30">
			</uni-search-bar>
		</view>
		<view class="">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
			}
		},
		methods: {
			search(value) {

			},
		}
	}
</script>

<style lang='scss'>
	.search-bar {
		position: fixed;
		top: 190rpx;
		width: 90%;
		left: 5%;
		right: 5%;
		/* background-color: rgb(238, 238, 238); */
	}
</style>
