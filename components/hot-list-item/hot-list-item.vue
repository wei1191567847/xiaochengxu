<template>
	<view class='item-container'>
		<view class="item-box">
			<!--排名-->
			<view class="item-box-left">
				<ranking :rank='rank'/>
			</view>
			<!--文章内容-->
			<view class="item-box-right">
				<!--标题-->
				<view class="item-title text-2">{{data.title}}</view>
				<!--简介-->
				<view class="item-desc text-2">{{data.desc}}</view>
				<!--作者相关-->
				<view class="item-bottom-box">
					<view class="item-author">{{data.nickname}}</view>
					<view class="box-hot">
						<image class='hot-icon' src="@/static/images/hot-icon.png" mode=""></image>
						<text class='hot-text'>{{addThousands(+data.views)}} 热度</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {addThousands} from '@/utils/functions.js'
	export default {
		name:"hot-list-item",
		props:{
			data:{
				type:Object,
				default:()=>{},
				required:true
			},
			rank:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				addThousands
			};
		}
	}
</script>

<style lang="scss" scoped>
	.item-container{
		padding-bottom:12px;
		.item-box{
			display:flex;
			margin:0 10px;
			padding:12px 10px;
			background-color: #fff;
			border-radius:6px;
			box-shadow: 2px 2px 5px 1px rgba(143,143,143,.3);
			.item-box-left{
				margin-rigth:5px;
			}
			.item-box-right{
				width:100%;
				.item-title{
					font-size:16px;
					font-weight: bold;
					color:#000;
				}
				.item-desc{
					padding-top:4px;
					font-size:14px;
					color:#333;
					overflow: hidden;
					width:316px;
				}
				.item-bottom-box{
					margin-top:5px;
					display:flex;
					justify-content: space-between;
					align-items: center;
					.item-author{
						font-size:12px;
						color:#999;
					}
					.box-hot{
						.hot-icon{
							width:16px;
							height:16px;
						}
						.hot-text{
							margin-left:5px;
							font-size:12px;
							color:#f94d2a;
							margin-top: 20px;
						}
					}
				}
				
			}
		}
	}
</style>
