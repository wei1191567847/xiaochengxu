<template>
	<view class='tab-container'>
		<view class="tab-box">
			<scroll-view :scroll-x='true' class='scroll-view' scroll-with-animation="" :scroll-Left='scrollLeft'>
				<view class="scroll-content">
					<view class="scroll-item-box">
						<block v-for='(item,index) in tabList' :key='index'>
							<view
							:id='`tab_item_${index}`'
							 class='tab-item'
							 :class='index===defaultIndex ? "active":""'
							 @click='tabClick(index)'
							 >
								{{item.label}}
							</view>
						</block>
						<!--滑块-->
						<view class="line" :style="{transform: `translateX(${silder.left}px)`}">
							
						</view>
					</view>	
				</view>
			</scroll-view>	
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-tabs",
		props:{
			
			//父组件传递的数据 单项数据流
			tabs:{
				type:Array,
				default:()=>{
					return []
				}
			},
			
			defaultIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				currentIndex:-1,
				tabList:[],
				silder:{
					left:16.5
				},
				scrollLeft:0, //tabBar滚动距离
			};
		},
		methods:{
			tabClick(index){
				this.currentIndex = index
				this.$emit('tabClick',index)
			    this.tabToINdex()
			},
			tabToINdex(){
				if(this.tabs.length === 0) return;
				console.log(this.tabList[this.currentIndex].silder.left)
				this.silder.left= this.tabList[this.currentIndex].silder.left
				this.scrollLeft = this.currentIndex*25
			},
			//计算dom中的left相关距离
			updateTabsData(){
				if(this.tabList.length===0) return;
				this.tabList.map((item,index)=>{
					/*
						1.获取每一个tab
						2.计算增加属性   silder:{left:33px}
					*/
				   const query = uni.createSelectorQuery().in(this);
				   query
					   .select(`#tab_item_${index}`)
					   .boundingClientRect(data =>{
						   const left = data.left+(data.width-25)/2
						   item.silder = {left}
						   if(this.tabList.length-1 === index){
								this.tabToINdex()
						   }
					   })
					   .exec();
				   
				})
				
			}
		},
		watch:{
			tabs:{
				handler(val){
					this.tabList = val
					
					//保证dom渲染完毕后
					this.$nextTick(()=>{
						this.updateTabsData()
					})
					
				},
				immediate:true
			},
			defaultIndex:{
				handler(val){
					this.currentIndex = val
					this.tabToINdex()
				},
				immediate:true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tab-container{
		font-size:14px;
		height:45px;
		line-height:45px;
		background-color: #fff;
		.tab-box{
			width:100%;
			height:45px;
			display:flex;
			position: relative;
			.scroll-view{
				white-space: nowrap;
				width:100%;
				height:100%;
				box-sizing: border-box;
				.scroll-content{
					width:100%;
					height:100%;
					position: relative;
					.scroll-item-box{
						height:100%;
						.tab-item{
							height:100%;
							display:inline-block;
							padding:0 15px;
							position:relative;
							text-align: center;
							&.active{
								color:#f94d2a;
								font-weight:700;
							}
						}
						.line{
							height:2px;
							width:25px;
							background-color:#f01401;
							border-radius:3px;
							transition: 0.5s;
							position: absolute;
							bottom:0px;
						}
					}
				}
			}
		}
	}
	
/*
	单独针对h5平台  样式兼容设置
*/
/* #ifdef */
	 /deep/.uni-scroll-view::-webkit-scrollbar{
	  display: none;
	  width: 0 !important;
	  height: 0 !important;
	  -webkit-appearance:none;
	  background: transparent;
	  color: transparent;
 }
/* #endif */

</style>
