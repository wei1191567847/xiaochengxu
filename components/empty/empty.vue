<template>
	<view class='empty-container'>
		<image class='image' src="@/static/images/empty-data.png" mode=""></image>
		<text class=;text>暂无数据</text>
	</view>
</template>

<script>
	export default {
		name:"empty",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.empty-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top:30px;
	.image{
		width:64px;
		height:65px;
	}
	.text{
		margin-top:10px;
		color:#999;
		font-size:14px;
	}
}
</style>
