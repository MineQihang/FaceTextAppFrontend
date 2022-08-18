<template>
	<text class="iconfont" :class="'icon-' + icon" @click="onClick"></text>
</template>

<script>
/**
 * iconfont 图标
 * @description 用于展示 iconfont 图标
 * @property {Number} size 图标大小
 * @property {String} type 图标图案，参考示例
 * @property {String} color 图标颜色
 * @event {Function} click 点击 Icon 触发事件
 */
export default {
	name: 'iconfont',
	props: {
		icon: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	},
	methods: {
		onClick(e) {
			this.$emit('click', e);
		}
	}
};
</script>

<style lang="scss" scoped>
@import url('./iconfont.css');
</style>
