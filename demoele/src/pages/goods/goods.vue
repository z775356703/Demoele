<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" @click="selectMenu(index,$event)"  :class="index===currentIndex?'current':'currentno'">
					<span class="text">
					<span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
					{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
							<div class="icon">
								<img width="57" height="57" :src="food.icon" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">￥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice = "seller.minPrice"></shopcart>
			
		<food :food="selectedFood" ref="food"></food>
		
	</div>
</template>

<script>

import axios from 'axios'
import BScroll from 'better-scroll'
import shopcart from '@/pages/shopcart/shopcart'
import cartcontrol from '@/pages/cartcontrol/cartcontrol'
import food from '@/pages/food/food'
import Vue from 'vue'

export default{
	components: {
		shopcart,
		cartcontrol,
		food
		
	},
	props: {
		seller: {
			Type:Object
		}
	},
	data() {
		return{
			goods: [],
			listHeight: [],
			scrollY: 0,
			selectedFood: {}
			
			
		}
	},
	computed: {
		currentIndex() {
			for(let i=0;i<this.listHeight.length;i++){
				let height1=this.listHeight[i];
				let height2=this.listHeight[i+1];
				
				 if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {					
					return i;					
				}
			}
			return 0;
		},
		selectFoods() {
			let foods=[];
			this.goods.forEach((good) => {
				good.foods.forEach((good) => {
					if(good.count){
						foods.push(good);
					}
				});
			});
			return foods;
		}
	},
	created() {
		this.classMap=['decrease','discount','guarantee','invoice','special'];
		axios.get('static/data.json').then((res) => {
			this.goods = res.data.goods
			this.$nextTick(() => {
				this._initScroll();
				this._calculateHeight();				
			})
			
			
		  
		});
		
	},
	methods: {
		selectMenu(index,event) {
			if(!event._constructed){
				return;
			}
			console.log(index)
			let foodlist=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
			let el=foodlist[index];
			this.foodWrapper.scrollToElement(el,300);
			
		},
		selectFood(food,event) {
			if(!event._constructed){
				return;
			}
			this.selectedFood = food;
			this.$refs.food.show();
		},
		_initScroll() {
			this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
				click:true
			});
			
			this.foodWrapper = new BScroll(this.$refs.foodWrapper, {
				click:true,
				probeType: 3
			});
			this.foodWrapper.on('scroll', (pos) => {
				this.scrollY=Math.abs(Math.round(pos.y));
	           
			});
			
		},
		_calculateHeight() {
			let foodlist=this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
			let height=0;
			this.listHeight.push(height);
			for(let i=0;i<foodlist.length; i++){
				let item=foodlist[i];
				height+=item.clientHeight;
				this.listHeight.push(height);				
			}
			
		}
	}
}
</script>

<style lang="scss">
@import "../../../static/mixin";
	.goods{
		display:flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
		
		.menu-wrapper{
			flex: 0 0 80px;
			width: 80px;
			background: #F3F5F7;
			.menu-item{
				display: table;
				height: 54px;
				width: 56px;
				line-height: 14px;
				padding: 0 12px;
				&.current{
					position: relative;
					z-index: 10;
					background: #fff;
					font-weight: 700;
					margin-top: -1px;
					.text{
						border-bottom: none;
					}
					
				}
			    .icon{
			    	display: inline-block;
					width: 16px;
					height: 16px;
					vertical-align: top;
					margin-right: 2px;
					background-size: 16px 16px;
					background-repeat: no-repeat;
					&.decrease{
					@include bg-image("./img/decrease_3")
					}
					&.discount{
					 @include bg-image("./img/discount_3")
					}
					&.guarantee{
					@include bg-image("./img/guarantee_3")
					 }
					 &.invoice{
					 @include bg-image("./img/invoice_3")
					 }
					&.special{
					 @include bg-image("./img/special_3")
					}          
			    }
			    .text{
			    	display:table-cell;
			    	font-size: 12px;
			    	width: 56px;
			    	vertical-align: middle;
			    	border-bottom: 1px solid rgba(7,17,27,0.1);
			    	text-align: center;
			    }
			}
		}
		.foods-wrapper{
			flex: 1;
			.title{
				padding-left: 14px;
				height: 26px;
				line-height: 26px;
				border-left: 2px solid #42B983;
				font-size: 12px;
				color: rgb(147,153,159);
				background: #f3f5f7;
			}
			.food-item{
				display: flex;
				position: relative;
				margin: 18px;
				padding-bottom: 18px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				&:last-child{
					margin-bottom: 0;
				}
				.icon{
					flex: 0 0 57px;
					margin-right: 10px;
					
				}
				.content{
					flex: 1;
					
					.name{
						margin: 2px 0 8px 0;
						height: 14px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.desc, .extra{
						
						line-height: 10px;
						font-size: 10px;
						color: rgb(147,153,159);
					}
					.desc{
						line-height: 12px;
						margin-bottom: 8px;
					}
					.extra{
						line-height: 10px;
						.count{
							margin-right: 12px;
						}
					}
					.price{
						font-weight: 700;
						line-height: 24px;
						.now{
							margin-right: 8px;
							font-size: 14px;
							color: rgb(240,20,20);
						}
						.old{
							text-decoration: line-through;
							font-size: 10px;
							color: rgb(147,153,159);
						}
					}
					.cartcontrol-wrapper{
						position: absolute;
						right: 0;
						bottom: 10px;
					}
				}
			}
		}
	}
</style>