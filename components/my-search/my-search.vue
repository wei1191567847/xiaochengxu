<template>
	<view class='my-search-container'>
		<view v-if='isShowInput' class='my-search-bar'>
			<uni-search-bar 
			:placeholder='placeholder' 
			:bgColor="config.bgColor"
			:value='value'
			:radius='100'
			@confirm='confirm'
			@input='input'
			@cancel='cancel'
			@clear='clear'
			@focus='focus'
			@blur='blur'
			>
				<uni-icons slot="clearIcon" color="#999999" type="clear"/>
			</uni-search-bar>
		</view>
		<view class='my-search-box' v-else>
			<image class="icon" src="@/static/images/search.png" mode=""></image>
			<text class='placeholder'>
				{{placeholder}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		
		props:{
			placeholder:{
				type:String,
				default:''
			},
			isShowInput:{
				type:Boolean,
				default:false
			},
			config:{
				type:Object,
				default:()=>{
					return {
						bgColor:'#ccc'
					}
				}
			},
			value:{
				type:String,
				default:'',
				require:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			confirm(){
				this.$emit('confirm',this.value)
			},
			input(val){
				this.$emit('input',val)
			},
			cancel(){
				this.$emit('cancel',this.value)
			},
			clear(){
				this.$emit('clear',this.value)
			},
			focus(){
				this.$emit('focus',this.value)
			},
			blur(){
				this.$emit('blur',this.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-search-container{
		display:flex;
		align-items: center;
		.my-search-bar{
			width:100%;
			
		}
		.my-search-box{
			height:36px;
			background-color: #fff;
			border-radius:17px;
			border:1px solid #c9c9c9;
			width:100%;
			display:flex;
			align-items: center;
			padding:0 10px;
			.icon{
				width:20px;
				height:20px;
			}
			.placeholder{
				font-size:12px;
				margin-left:5px;
				color:#454545;
			}
		}
	}
</style>
