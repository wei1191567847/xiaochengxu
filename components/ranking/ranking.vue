<template>
	<view class='ranking'>
		<image class='ranking-bg-img' :src="getRankBg" mode=""></image>
		<text class='ranking-text'>{{rank}}</text>
	</view>
</template>

<script>
	export default {
		name:"ranking",
		props:{
			rank:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			getRankBg(){
				if(this.rank <= 3){
					return require(`@/static/images/ranking-${this.rank}.png`)
				}else{
					return require(`@/static/images/ranking-other.png`)
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ranking{
		position: relative;
		text-align: center;
		width:18px;
		height:20px;
		.ranking-bg-img{
			width:100%;
			height:100%;
		}
		.ranking-text{
			position: absolute;
			left:50%;
			top:50%;
			transform: translate(-55%, -55%);
			fon-weight:blod;
			color:#333;
		}
	}
</style>
