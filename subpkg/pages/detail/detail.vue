<template>
	<view class='detail-container'>
		
		<block v-if='articleObj'>	
			<!-- 标题 -->
			<view class="title text-2">{{articleObj.title}}</view>
			<!-- 作者相关 -->
			<view class="detail-info">
				<view class="detail-left">
					<view class="avator-box">
						<!-- #ifdef H5-->
							<image class='image' :src="getImgUrl(articleObj.avatar)"></image>
						<!-- #endif -->
						<!-- #ifndef H5-->
							<image class='image' :src="articleObj.avatar"></image>
						<!-- #endif -->
					</view>
					<view class="author-box">
						<text class='author'>{{articleObj.nickName}}</text>
						<text class='time'>{{dayTime(articleObj.date)}}</text>
					</view>
				</view>
				<view class="detail-right">
					<button size='mini'>关注</button>
				</view>
			</view>
			
			<!-- 简介 rich-text 目的为了解析html标记
			
				插件
			-->
			<!-- <rich-text :nodes='articleObj.content' /> -->
			<mp-html :content="articleObj.content"/>
		</block>
		
		<!-- 评论区域 -->
		<!-- 留言区域 -->
	</view>
</template>

<script>
	import * as api from '@/api/article.js'
	import {getImgUrl} from '@/utils/getImg.js'
	import {dayTime} from '@/utils/day.js'
	import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html'
	export default {
		components:{mpHtml},
		data() {
			return {
				data:{
					id:'',
					author:''
				},
				articleObj:{},
				getImgUrl,
				dayTime
			};
		},
		async onLoad(options){
			this.data = options
			const data = await api.getDetail(this.data)
			this.articleObj = data.data.data.data
		},
		
	}
</script>

<style lang="scss" scoped>
	/deep/ img{
		width:380px !important;
		height:200px !important;
	}
.detail-container{
	padding:8px 10px;
	.title{
		font-size:16px;
		color:#000;
		font-weight:bold;
	}
	.detail-info{
		padding:8px 0px;
		display: flex;
		justify-content: space-between;
		.detail-left{
			display: flex;
			.avator-box{
				image{
					width:32px;
					height:32px;
					border-radius: 50%;
					border:2px solid #e5e5e5;
				}
			}
			.author-box{
				margin-left:10px;
				display: flex;
				flex-direction: column;
				.author{
					font-size:14px;
					font-weight: bold;
					color:#2c405a;
				}
				.time{
					font-size: 12px;
					color:#999;
				}
			}
		}
		.detail-right{
			display: flex;
			align-items: center;
		}
	}
}
</style>
