<template>
	<div class="cartcontrol">
		<transition name="move">
		<div class="cart-decrease  " @click.stop.prevent="decreaseCart" v-show="food.count>0">
			<span class="el-icon-minus  inner" ></span>
		</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add "  @click.stop.prevent="addCart">
			<i class="el-icon-plus"></i>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
export default{
	props: {
		food: {
			type:Object
		}
	},
	methods: {
		addCart(event) {			
			if(!event._constructed){
				return;
			}
			if(!this.food.count){
				Vue.set(this.food,'count',1);
			}else{
				this.food.count++;
			
			}
	       
		},
		decreaseCart(event) {
			if(!event._constructed){
				return;
			}
			if(this.food.count){
				this.food.count--;
			}
		}
	},
	created() {
		
	}
}
</script>

<style lang="scss">
	.cartcontrol{
		font-size: 0;		
		.cart-decrease{
			display: inline-block;
			padding: 6px;
			
			 &.move-enter-active, &.move-leave-active{
			 	transition: all 0.4s linear;
	         
	         }
	          &.move-enter, &.move-leave-active{
                    opacity:0;                  
                    transform: translate3D(40px,0,0);               
                   	transform: rotate(180deg);    
                    
            }
			.el-icon-minus{
			padding: 6px;
		    font-size: 12px;
			line-height: 12px;
		    background: rgb(0,160,220);
		    color: white;
	 	    border-radius: 50%;
	 	   
	        
		   }
		}
		.cart-count{
			display: inline-block;
			vertical-align: top;
			width: 18px;
			padding-top: 6px;
			line-height: 28px;
			text-align: center;
			font-size: 10px;
			color: rgb(147,153,159);
		}
		.cart-add{
			display: inline-block;
			padding: 6px;
			
		    .el-icon-plus{
		    padding: 6px;
		    font-size: 12px;
			line-height: 12px;
		    background: rgb(0,160,220);
		    color: white;
	 	    border-radius: 50%;
		    }
		}
	}
</style>