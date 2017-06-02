<template>
	<div class="">
	<transition name="fade">
	<div class="list-mask" v-show="listShow" @click="hidelist"></div>
	</transition>
	<div class="shopcart">
	  <div class="content" @click="togglelist">	
		<div class="content-left">
			<div class="logo-wrapper">
				<div class="logo" :class="{'highlight':totaiPrice>0}">
					<i class="el-icon-menu" :class="{'highlight':totaiPrice>0}"></i>
				</div>
				<div class="num" v-show="totaiCount">
					{{totaiCount}}
				</div>
			</div>
			<div class="price" :class="{'highlight':totaiPrice>0}">
				￥{{totaiPrice}}
			</div>
			<div class="desc">
				￥另需配送费{{deliveryPrice}}元
			</div>
		</div>
		<div class="content-right" @click.stop.prevent="pay">
			<div class="pay" :class="payClass">
				{{paydesc}}
			</div>
		</div>		
	  </div>
	  <div class="ball-container">
			<transition name="drop" v-for="(ball,index) in balls">
			<div class="ball" v-show="ball.show">
				<div class="inner"></div>
			</div>
			</transition>
	  </div>
	  <transition name="fold">
	  <div class="shopcart-list" v-show="listShow">
	  	  <div class="list-header">
	  	      <h1 class="title">购物车</h1>
	  	      <span class="empty" @click="empty">清空</span>
	  	  </div>
	  	  <div class="list-content" ref="listContent">
	  	  	   <ul>
	  	  	   	    <li class="food" v-for="food in selectFoods">
	  	  	   	    	<span class="name">{{food.name}}</span>
	  	  	   	    	<div class="price">
	  	  	   	    		<span>￥{{food.price*food.count}}</span>
	  	  	   	    	</div>
	  	  	   	    	<div class="cartcontrol-wrapper">
	  	  	   	    		 <cartcontrol :food="food"></cartcontrol>
	  	  	   	    	</div>
	  	  	   	    </li>
	  	  	   </ul>
	  	  </div>	  	  
	  </div>
	  </transition>
	</div>
	</div>
</template>

<script>
import cartcontrol from '@/pages/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default{
	props: {
	    selectFoods: {
	    	type: Array,
	    	default() {
	    		return[
	    		 
	    		];
	    	}
	    },
		deliveryPrice: {
			type:Number,
			default:0
		},
		minPrice:{
			type:Number,
			default:0
		}
	},
	data() {
		return {
			balls: [
			    {
			      show:false
			    },
			     {
			      show:false
			    },
			     {
			      show:false
			    },
			     {
			      show:false
			    },
			     {
			      show:false
			    }
			],
			fold:true
		}
	},

	components: {
		cartcontrol
	},
	computed: {
		totaiPrice() {
			let total = 0;
			this.selectFoods.forEach((food) => {
				total+=food.price*food.count;
			});
			return total;
		},
		totaiCount() {
			let count=0;
			this.selectFoods.forEach((food) => {
				count+=food.count;
			});
			return count;
		},
		paydesc() {
			if(this.totaiPrice===0){
				return `￥${this.minPrice}元起送`;
			}else if(this.totaiPrice<this.minPrice){
				let diff=this.minPrice-this.totaiPrice;
				return `还差￥${diff}元起送`;
			}else{
				return '去结算 '
			}
		},
		payClass() {
			if(this.totaiPrice<this.minPrice){
				return 'not-enough'
			}else{
				return 'enough'
			}
		},
		listShow() {
			if(!this.totaiCount){
				this.fold = true;
				return  false;
			}
			let show = !this.fold;
			if(show){
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.listContent,{
						click:true
					})
					}else{
						this.scroll.refresh();
					}
					
				})
			}
			return show;
		}
	},
	methods: {
	
	},
	methods: {
		empty() {
			this.selectFoods.forEach((food) => {
				food.count=0
			})
		},
		drop(el) {
			 console.log(el);
		},
		togglelist() {
			if(!this.totaiCount){
				return;
			}
			this.fold=!this.fold;
		},
		hidelist() {
			this.fold=true
		},
		pay() {
			if(this.totaiPrice<this.minPrice){
				return;
			}
			window.alert(`支付${this.totaiPrice}元`);
		}
	},
	created() {
       
       
    }
	
}
</script>

<style lang="scss">
	.shopcart {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
		.content {
			display: flex;
			background: #141d27;
			
			font-size:0;
			.content-left {
				flex: 1;
				.logo-wrapper{
					display: inline-block;
					position: relative;
					top: -10px;
					margin: 0 12px;
					padding: 6px;
					width: 56px;
					height: 56px;
					box-sizing: border-box;
					vertical-align: top;
					border-radius: 50%;
					background: #141d27;
				 .logo{
				 	width: 100%;
				 	height: 100%;
					border-radius: 50%;
					text-align: center;
					background: #2b343c;
					&.highlight{
						background: rgb(0,160,220);
					}
					.el-icon-menu{
						font-size: 24px;
						line-height: 44px;
						color: #80858a;
					&.highlight{
						color: #fff;
					}
					}
				 }
				 .num{
				 	position: absolute;
				 	top: 0;
				 	right: 0;
				 	width: 24px;
				 	height: 16px;
				 	line-height: 16px;
				 	text-align: center;
				 	border-radius: 16px;
				 	font-size: 9px;
				 	font-weight: 700;
				 	color: #fff;
				 	background: rgb(240,20,20);
				 	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
				 }
				}
				.price{
					display: inline-block;
					vertical-align: top;
					margin-top: 12px;
					line-height: 24px;
					padding-right: 12px;
					box-sizing: border-box;
					border-right: 1px solid rgba(255,255,255,0.1);
					font-size: 16px;
					font-weight: 700;
					color:rgba(255,255,255,0.4);
					&.highlight{
						color: #fff;
					}
				}
				.desc{
					display: inline-block;
					vertical-align: top;
					margin: 12px 0 0 12px;
					line-height: 24px;
					color: rgba(255,255,255,0.4);
					font-size: 10px;
				}
			}
			.content-right {
				flex: 0 0 105px;
				width: 105px;
				.pay{
					height: 48px;
					line-height: 48px;
					text-align: center;
					font-size: 12px;
					font-weight: 700;
					color: rgba(255,255,255,0.4);
					
					&.not-enough{
						background: #2b333b;
					}
					&.enough{
						background: #00b43c;
						color: #fff;
					}
				}
			}
		}
		.ball-container{
			
			.ball{
				position: fixed;
				left:32px;
				bottom: 22px;
				z-index: 200;
				&.drop-enter,&.drop-enter-active{
					 transition: all 0.4s;
					 
				}
				.inner{
					width: 16px;
					height: 16px;
					border-radius: 50%;
					background: rgb(0,160,220);
					 transition: all 0.4s;
				}
			}
		}
		.shopcart-list{
			position: absolute;
			left: 0;
			top: 0;
			z-index: -1;
			width: 100%;
			transform:translate3d(0,-100%,0);
			&.fold-enter-active,&.fold-leave-active{
				transition: all 0.5s;
			}
			&.fold-enter,&.fold-leave-active{
				transform: translate3d(0,0,0);
			}
			.list-header{
				height: 40px; 
				line-height: 40px;
				padding: 0 18px;
				background: #f3f5f7;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.title{
					float: left;
					font-size: 14px;
					color: rgb(7,17,27);					
				}
				.empty{
					float: right;
					font-size:12px;
					color: rgb(0,160,220);
				}
			}
			.list-content{
				padding: 0 18px;
				max-height: 217px;
				overflow:hidden;
				background: #FFFFFF;
				.food{
					position: relative;
					padding: 12px 0;
					box-sizing: border-box;
					border-bottom:1px solid rgba(7,17,27,0.1);
					.name{
						  line-height: 24px;
						  font-size: 14;
						  color: rgb(7,17,27);
					}
					.price{
						position: absolute;
						right: 90px;
						bottom: 14px;
						line-height: 24px;
						font-size: 14px;
						color: rgb(240,20,20);
					}
					.cartcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 6px;
					}
				}
			}
		}
	}
	.list-mask{
	 position: fixed;
	 top: 0;
	 left: 0;
	 width: 100%;
	 height: 100%;
	 z-index: 40;
	 backdrop-filter: blur(10px);
	 background: rgba(7,17,27,0.6);
	 &.fade-enter-active,&.fade-leava-active{
	 	transition: opacity 0.5s;
	 }
	 &.fade-enter,&.fade-leave-active{
	 	opacity: 0;
	 }
	}
</style>