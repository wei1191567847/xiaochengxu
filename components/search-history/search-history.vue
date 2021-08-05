<template>
	<view class='search-history-container'>
		<view class="search-history-title-box">
			<view class="search-history-title">历史搜索</view>
			<view v-if='isShowTrash'>
				<uni-icons type='trash' @click='isShowTrash = false'/>
			</view>
			<view v-else>
				<text class='txt' @click='clearAllHistory'>全部删除</text>
				<text class='txt' @click='isShowTrash=true'>完成</text>
			</view>
		</view>
		<view class="search-history-box">
			<block v-for='(item,index) in historyData' :key='index'>
				<view class="search-history-item" @click='selectItem(item,index)'>
					<view class="history-txt text-1" >{{item}}</view>
					<uni-icons type='clear' v-show='!isShowTrash' />
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {createNamespacedHelpers} from 'vuex'
	const searchStore = createNamespacedHelpers('search')
	export default {
		name:"search-history",
		data() {
			return {
				isShowTrash:true,
			}
		},
		methods:{
			...searchStore.mapMutations(['deleteAllHistory','deleteOneHistory']),
			clearAllHistory(){
				uni.showModal({
					title:'提示',
					content:'确认清空历史记录?',
					success:(res) => {
						if(res.confirm){
							this.deleteAllHistory()
							this.isShowTrash = true
						}
					}
				})
			},
			
			selectItem(item,index){
				if(this.isShowTrash){
					this.$emit('selectItem',item)
				}else{
					this.deleteOneHistory(index)
				}
				
			},
			deleteDistory(){
				console.log('删除当前的历史记录')
			}
		},
		computed:{
			...searchStore.mapGetters(['historyData'])
		}
	}
</script>

<style lang="scss" scoped>
.search-history-container{
	padding:12px 15px;
	.search-history-title-box{
		display:flex;
		justify-content: space-between;
		.search-history-title{
			font-size: 14px;
			color:#000;
			padding:4px 5px;
			font-weight: bold;
		}
		.txt{
			font-size:12px;
			color:#333;
			padding:4px 5px;
		}
	}
	.search-history-box{
		margin-top:15px;
		.search-history-item{
			width:50%;
			box-sizing: border-box;
			display: inline-block;
			padding:8px 10px;
			position: relative;
			
			.history-txt{
				width:85%;
				display: inline-block;
				color:#cc;
				font-size: 14px;
			}
		}
		.search-history-item:nth-child(odd):before{
			content:'';
			border-left:1px solid #999;
			display: inline-block;
			height:10px;
			position: absolute;
			top:35%;
			right:0;
		}
	}
}
</style>
