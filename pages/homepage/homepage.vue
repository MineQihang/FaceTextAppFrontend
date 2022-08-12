<template>
	<view @touchstart="start" @touchmove="mid" @touchend="end" style="position: relative;">
		<view class="all" :style="{width:widthVal + 'px'}">
			<view class="one" :style="{
				width:3*widthVal + 'px',
				left:leftVal + 'px',
				right:rightVal + 'px',
				transition:'all' + ' ' + miao + 's'
			}">
				<view class="one-li" :style="{width:widthVal + 'px'}" v-for="(item,index) in list">
					<text v-for="item2 in item.name">{{item2}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var subX;
	var subY;
	var duShu;
	export default {
		data() {
			return {
				startData:{clientX:'',clientY:''},   //滑动
				widthVal:0,
				fourVal:0,
				fiveVal:0,
				leftVal:0,
				rightVal:0,
				miao:0,
				list:[
					{
						
					},
					{
						name:[1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
					},
					{
						
					}
				],
				addList:{
					name:[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
				},
				delList:{
					name:[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
				}
			}
		},
		onReady:function(){
			uni.getSystemInfo({
				success: (res) => {
					this.widthVal = res.windowWidth;
					this.fourVal = res.windowWidth / 4;
					this.fiveVal = res.windowWidth / 5;
				}
			})
		},
		methods: {
			// 滑动开始
			start:function(e){	
				this.miao = 0.3;
				this.startData.clientX = e.changedTouches[0].clientX;
				this.startData.clientY = e.changedTouches[0].clientY;
				
			},
			// 滑动中
			mid:function(e){
				subX = e.changedTouches[0].clientX - this.startData.clientX;
				subY = e.changedTouches[0].clientY - this.startData.clientY;
				
				var subXs = Math.abs(subX);
				var subYs = Math.abs(subY);
				duShu = getAngle(subXs,subYs);
				if(duShu < 20){
					if(subX > 1){
						this.leftVal = subX;
						this.rightVal = -subX;
						this.list[0] = this.addList;
					}else if(subX < -1){
						this.leftVal = subX;
						this.rightVal = -subX;
						this.list[2] = this.delList;
					}else{
						console.log('无效')
					}
				}else{
					this.leftVal = 0;
					this.rightVal = 0;
				}
			},
			// 滑动结束
			end:function(){
				if(duShu < 20){
					if(subX > 0){
						if(subX < this.fourVal){
							this.leftVal = 0;
							this.rightVal = 0;
						}
						if(subX >= this.fourVal){
							this.leftVal = this.widthVal;
							this.rightVal = -this.widthVal;
							var timer = setTimeout(() => {
								this.list.unshift({});
								this.list.pop();
								this.miao = 0;
								this.leftVal = 0;
								this.rightVal = 0;
							},500)
						}
					}else{
						let r = Math.abs(subX);
						if(r < this.fourVal){
							this.leftVal = 0;
							this.rightVal = 0;
						}
						if(r >= this.fourVal){
							this.leftVal = -this.widthVal;
							this.rightVal = this.widthVal;
							var timer = setTimeout(() => {
								this.list.push({});
								this.list.shift();
								this.miao = 0;
								this.leftVal = 0;
								this.rightVal = 0;
							},500)
						}
					}
				}
			}
		}
	}
	
	//计算角度 判断滑动的手势
	function getAngle(angx, angy) {
		return 360 * Math.atan(angy / angx) / (2 * Math.PI);
	};
</script>

<style>
.all{display: flex;align-items: center;justify-content: center;overflow: hidden;}
.all .one{display: flex;align-content: center;justify-content: center;flex-shrink: 0;position: relative;}
.all .one .one-li{text-align: center;line-height: 100rpx;border: 1rpx solid #3F536E;}
.all .one .one-li text{display: block;}
</style>

