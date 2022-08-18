<template>
	<view>
		<!--<head-tab></head-tab>-->
		<view class="container">
			<view class="search-bar">
				<input type="text"  style="height: 100rpx;margin-left: 30rpx;"v-model="comment_text">
				<image class="search-icon" src="/static/icons/search.svg" @click="search()"></image>
			</view>
		</view>
		<view class="post-container">
			<view clss = "post-list">
				<post :postList = "postList"></post>
			</view>
			<view class="backgrount-icon">
				<image src="../../static/icons/searchBackground.svg"></image>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "search",
		data() {
			return {
				isShowFocus: false,
				inpuval: '',
				width: "90%",
				postList:[],
			};
		},
		methods: {
			onFocusInput: function(event) {
				//console.log('输入框聚焦时触发:',event)
				// this.inputValue = event.target.value
				this.isShowFocus = true;
				this.width = "80%";
				this.$emit("focus")
			},
			onBlurInput: function(event) {
				//console.log("输入框失去焦点时触发:",event); 
				this.$emit("blur")

			},
			inputCances: function() {
				this.isShowFocus = false;
				this.inpuval = '';
				this.width = "90%"
				this.$emit("cancel");
			},
			search(){
				
			}
		}

	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: 174.6rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		background-color: $our-gray;
	}
	.search-bar{
		margin: 19.8rpx  36rpx 19.8rpx 36rpx;
		border-radius: 20px;
		width: 84%;
		height:100rpx;
		background-color: white;
		display: flex;
		justify-content: space-between;
	}
	
	.post-list{
		
	}
	.search-icon{
		width: 100rpx;
		height: 100rpx;
		margin-right: 30rpx;
		}
	
	.backgrount-icon{
		margin-top: 113.4rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		
	}
</style>
