<template>
	<view class='search-result-box'>
		<!-- 标题 -->
		<rich-text :nodes='data.title' class="item-title text-2"></rich-text>
		<!-- 内容 -->
		<rich-text :nodes='data.description' class="item-desc text-2"></rich-text>
		<view class="item-desc-bottom">
			<!-- 作者 -->
			<view class="item-author">{{data.nickname}}</view>
			<view class="item-time">
				<uni-icons class='item-time-icon' type='compose' color="#999"/>
				<text >{{dayTime(data.updateTime)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {dayTime} from '@/utils/day.js'
	export default {
		name:"search-result-item-1",
		props:{
			data:{
				type:Object,
				default:()=>{
					
				}
			}
		},
		data() {
			return {
				dayTime
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5*/
	/deep/ em{
		color:#f94d2a !important;
		margin:0 3px !important;
	}
	/* #endif */
.search-result-box{
	margin-bottom:16px;
	.item-title{
		font-size:14px;
		color:#000;
		font-weight: bold;
	}
	.item-desc{
		margin-top:8px;
		font-size: 14px;
		color:#555;
	}
	.item-desc-bottom{
		margin-top:8px;
		display: flex;
		color:#999;
		font-size: 12px;
		.item-author{
			margin-right:12px;
		}
		.item-time{
			.item-time-icon{
				margin-right:5px;
			}
		}
	}
}
</style>
