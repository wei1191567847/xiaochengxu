<template>
	<view class='hot-container'>
		<!--logo-->
		<image src="@/static/images/logo.png" class="logo" mode="aspectFit"></image>
		<!--搜索框-->
		<view class="search-box">
			<my-search :placeholder='placeholder' @click.native='showSearchBlog'></my-search>
		</view>
		
		<!--tabBar-->
		<view class='sticky'>	
			<my-tabs :tabs='tabs' :defaultIndex='defaultIndex' @tabClick='tabClick'/>
		</view>
		<!--文章列表-->
		<view>
			<swiper @animationfinish="animationfinish" duration="500" :style="{height:listHeight+'px'}" class='swiper' :current='defaultIndex' @change='swiperChange'>
				<!-- 
				1.item 的数量取决于 tabs的数量
				2.每个swiper-item 的内容一致
				3.高度问题
					什么时候计算高度
				4.swiper 滑动的时候 和 tab做联动
				5.loading 位置偏差
					原因:tab切换的是 1.请求列表数据 2.swiper动画执行，1 2共同执行
					产生loading的位置有问题
					解决：先动画执行，再请求数据
				 -->
				<swiper-item class='swiper-item' v-for='(tab,tabIndex) in tabs' :key='tabIndex'>
					<uni-load-more status='loading' v-if='isLoading'></uni-load-more>
					<block v-else>
						<hot-list-item @click.native='showDetail(item)' :class="'hots_list_'+tabIndex" v-for='(item,index) in listData_[tabIndex]' :key='index' :data='item' :rank='index+1'/>
					</block>
				</swiper-item>
			</swiper>
			
			
		</view>
		
	</view>
</template>

<script>
	import * as api from '@/api/hot.js'
	export default {
		created(){
			this.getTabs()
		},
		data() {
			return {
				placeholder:'千里之行始于足下',
				tabs:[],
				defaultIndex:0,
				listData:[],
				listData_:{}, //存放缓存数据
				isLoading:false,
				listHeight:100
			};
		},
		methods:{
			showDetail(item){
				uni.navigateTo({
					url:`/subpkg/pages/detail/detail?author=${item.user_name}&id=${item.id}`
				})
			},
			//跳转到详情
			showSearchBlog(){
				uni.navigateTo({
					url:'/subpkg/pages/search-blog/search-blog'
				})
			},
			async getTabs(){
				//请求接口
				const res = await api.getTarbars()
				this.tabs = res.data.data.list
				// setTimeout(()=>{
					this.getList()
				// },1000)
			},
			async getList(){	
				/*
					1.没有数据
						1.1.显示loading
						1.2.获取数据
						1.3.加入缓存
						1.4.隐藏loading
					2.有数据
						2.1.直接渲染
				*/
			   if(!this.listData_[this.defaultIndex]){
				   this.isLoading = true;
				   const res = await api.getListByTabId(this.tabs[this.defaultIndex].id)
				   this.listData = res.data.data.list
				   this.listData_[this.defaultIndex] = res.data.data.list
				   this.isLoading = false;
			   }
			   
			   //dom 完毕后 才能获取高度
			   this.$nextTick(async ()=>{
					//获取每一个list的高度
					const height = await this.getListHeight()
					this.listHeight = height
				})	
			},
			//tab 切换swiper
			animationfinish(){
				//请求文章的列表数据
					this.getList()
			},
			//监听到的子组件的点击tab 的事件
			tabClick(index){
				this.defaultIndex = index
			},
			
			//swiper滑动事件
			swiperChange(e){
				this.defaultIndex = e.detail.current
			},
			//获取每一个list的高度
			getListHeight(){
				return new Promise((resolve,reject)=>{
					const query = uni.createSelectorQuery().in(this);
					let totalHeight = 0
					query
						.selectAll(`.hots_list_${this.defaultIndex}`)
						.boundingClientRect(data =>{
							data.map(item=>{
								totalHeight += item.height
							})
							resolve(totalHeight)
						})
						.exec();
				})
				// console.log('total',totalHeight)
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container{
		.logo{
			width:100%;
			height:80px;
		}
		.search-box{
			padding:0 12px;
			margin-bottom:8px;
		}
		.sticky{
			position: -webkit-sticky;
			position:sticky;
			top:0;
			z-index:99;
			/* #ifdef H5 */
			top:44px;
			/* #endif */	
		}
	}
</style>
