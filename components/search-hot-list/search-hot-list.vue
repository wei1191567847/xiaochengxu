<template>
	<view class='search-hot-list-container'>
		<view class="search-hot-title">排行榜</view>
		<block v-for='(item,index) in hotList' :key='item.id'>
			<view class="search-hot-item" @click='selectItem(item)'>
				<!-- 序列号 -->
				<ranking :rank='index+1'/>
				<!-- 文本 -->
				<text class='title'>{{item.label}}</text>
				<!-- 图片 -->
				<image v-if='index <=2 ' class='image' src="/static/images/hot-icon.png"/>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		name:"search-hot-list",
		props:{
			hotList:{
				type:Array,
				default:()=> []			
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			selectItem(item){
				this.$emit('selectItem',item.label)
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-hot-list-container{
	.search-hot-title{
		font-weight: bold;
		font-size:14p;
		color:#f94d2a;
		padding: 0px 12px 12px 12px;
	}
	.search-hot-item{
		display:flex;
		align-items:center;
		padding:12px 0;
		.title{
			color:#333;
			font-size:14px;
			margin:0px 10px;
		}
		.image{
			width:14px;
			height:14px;
		}
	}
}
</style>
