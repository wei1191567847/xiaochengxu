<template>
	<view class='search-blog-container'>

		<!-- 搜索模块 -->
		<view class="search-bar-box">
			<my-search 
			:isShowInput='true' 
			v-model='searchText'
			:config='{"bgColor":"#f1f0f3"}' 
			:placeholder="searchDeafultText"
			@confirm='confirm'
			@cancel='cancel'
			@clear='clear'
			@focus='focus'
			@blur='blur'
		/>
		</view>
		<!-- 热搜列表 -->
		<view class="card" v-if='showType === HOT_LIST '>
			<search-hot-list :hotList='hotList' @selectItem='selectItem'/>
		</view>
		
		<!-- 历史记录 -->
		<view class="card" v-else-if='showType === HISTORY_LIST'>
			<search-history @selectItem='selectItem'/>
		</view>
		
		<!-- 搜索结果 -->
		<view class="" v-else>
			<!-- 1.起一个引用 ref='' -->
			<search-result ref='mescrollItem' :searchValue='searchText'/>
		</view>
		
	</view>
</template>

<script>
	/*
		vue v-model
			满足两个条件 , 父组件就可以使用v-model 代替  value=''
			1.父组件必须传递一个value属性
			2.子组件必须触发一个 input  事件
		3个功能组件的显示规则:
			默认情况 || 点击输入框取消按钮   显示【搜索列表】
			当searchBar 聚焦 || 点击输入框清空按钮   显示【历史记录】
			点击列表item || 点击历史记录   || 用户按下搜索按钮  【搜索结果】
	*/
   import * as api from '@/api/search.js'
   const HOT_LIST = '0'
   const HISTORY_LIST = '1'
   const SEARCH_RESULT ='2'
   import {createNamespacedHelpers} from 'vuex'
   const searchStore = createNamespacedHelpers('search')
   
   // 2.引入一个mixins
   import MescrollCompMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-comp.js'
	export default {
		mixins:[MescrollCompMixin],
		data() {
			return {
				searchText:'',  //文本框的输入
				searchDeafultText:'',   //文本框的placeholder
				HOT_LIST,
				HISTORY_LIST,
				SEARCH_RESULT,
				showType:HOT_LIST,
				hotList:[]
				
			};
		},
		created(){
			this.loadText()
			this.loadHotList()
		},
		methods:{
			...searchStore.mapMutations(['addHistoryItem']),
			//热门列表点击
			selectItem(searchText){
				//1.改变input 的val
				//2.请求接口数据
				//3.展示搜索结果
				this.searchText = searchText
				this.showType = SEARCH_RESULT
			},
			async loadHotList(){
				const {data:{data:{list}}} = await api.getHotList()
				this.hotList = list
				console.log(list)
			},
			async loadText(){
				const {data:{data:{defaultText}}} = await api.getSearchDeafultText()
				this.searchDeafultText = defaultText
			},
			confirm(value){
				this.searchText = value ? value : this.searchDeafultText
				
				if(this.searchText){
					this.showType = SEARCH_RESULT
					//添加历史记录
					this.addHistoryItem(this.searchText)
				}
			},
			cancel(value){
				this.showType = HOT_LIST
			},
			clear(value){
				this.showType = HISTORY_LIST
			},
			focus(value){
				this.showType = HISTORY_LIST
			},
			blur(value){
				console.log('blur',value)
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-blog-container{
	.search-bar-box{
		background-color: #fff;
		padding:3px;
		top:0px;
	}
}
</style>
