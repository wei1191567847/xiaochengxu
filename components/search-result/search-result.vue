<template>
	<view class='search-result-container'>
		<empty v-if='isEmpty' />
		<mescroll-body 
			v-else
			ref="mescrollRef"
			@init="mescrollInit"
			@down="downCallback"
			@up="upCallback"
			
		>
			<block v-for='(item,index) in searchList' :key='index'>
				<view class="search-result-box" @click='showDetail(item)'>
					<!-- 组件1  没有图片-->
					<search-result-item-1  :data='item' v-if='!item.pic_list || item.pic_list.length==0' />
					<!-- 组件2  1张图片-->
					<search-result-item-2  :data='item' v-else-if='item.pic_list && item.pic_list.length==1' />
					<!-- 组件3  其他组件-->
					<search-result-item-3  :data='item' v-else/>
				</view>
			</block>
		</mescroll-body>
	</view>
</template>

<script>
	import * as api from '@/api/search.js'
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	export default {
		name:"search-result",
		mixins:[MescrollMixin],
		props:{
			searchValue:{
				type:String,
			}
		},
		data() {
			return {
				page:1, //请求页数
				searchList:[],
				isFirst:true,
				isEmpty:false
			};
		},
		methods:{
			showDetail(item){
				uni.navigateTo({
					url:`/subpkg/pages/detail/detail?author=${item.author}&id=${item.id}`
				})
			},
			//处理mescroll 的相关事件
			async mescrollInit(mescroll){
				this.mescroll = mescroll
				console.log('首次加载')
				//加载数据以后
				await this.loadSearch()	
				setTimeout(()=>{
					this.isFirst = false	
					this.mescroll.endSuccess()
				},500)
				//首页加载完毕后  必须调用   否则插件认为没有结束首页加载，所以加载更多不会执行
				// 但是下拉刷新是可以触发的   原因是跟首次加载业务一致
			},
			async downCallback(){
				if(this.isFirst) return
				this.page = 1
				await this.loadSearch()
				setTimeout(()=>{
					this.mescroll.endSuccess()
				},500)
				console.log('下拉刷新')
			},
			async upCallback(){
				if(this.isFirst) return
				this.page +=1
				await this.loadSearch()
				setTimeout(()=>{
					this.mescroll.endSuccess()
				},500)
				console.log('加载更多')
			},
			
			async loadSearch(){
				const data = await api.getSearch({
					p:this.page,
					q:this.searchValue
				})
				//针对微信为了实现高亮 替换<em>xxx</em>
				// #ifdef MP-WEIXIN
				data.data.data.list.map(item=>{
					item.title=item.title.replace(/<em>/g,"<em style='color:#f94d2a;margin:0 3px'>")
					item.description=item.description.replace(/<em>/g,"<em style='color:#f94d2a;margin:0 3px'>")
				})
				//#endif
				//首次加载 和 下拉刷新
				if(this.page === 1){
					this.searchList = data.data.data.list
				}else{
					//加载更多
					this.searchList = [...this.searchList,...data.data.data.list]
				}
				
				if(this.searchList.length===0){
					this.isEmpty=true
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
.search-result-container{
	padding:12px 15px;
	.search-result-box{
		margin-bottom:12px;
	}
}
</style>
