<template>
	<div class="ratings"  ref="ratings">
		<div class="ratings-content" >
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于是周边商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<el-rate class="star" v-model="seller.serviceScore" disabled show-text text-color="#ff9900" text-template="{value}分"></el-rate>
						
					</div>
					<div class="score-wrapper">
						<span class="title">商品评分</span>
						<el-rate class="star" v-model="seller.foodScore" disabled show-text text-color="#ff9900" text-template="{value}分"></el-rate>
					
					</div>
					<div class="delivery-wrapper">
						<span class="title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
		    <ratingselect  @getselecttype="selectRating"  @toggle="toggleContent"  :selectType="selectType" :onlyContent="onlyContent"  :ratings="ratings"></ratingselect>
		    <div class="rating-wrapper">
			<ul>
				<li class="rating-item" v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings">
					<div class="avatar">
						<img :src="rating.avatar" width="28" height="28" alt="" />
					</div>
					<div class="content">
						<h1 class="name">{{rating.username}}</h1>
						<div class="star-warpper">
							<el-rate class="star" v-model="rating.score" disabled show-text text-color="#ff9900" text-template="{value}分"></el-rate>
							<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
						</div>
						<div class="text">{{rating.text}}</div>
						<div class="recommend" v-show="rating.recommend && rating.recommend.length">
							 <span class="icon-thumb_up"></span>
                             <span class="item" v-for="item in rating.recommend">{{item}}</span>
						</div>
						<div class="time">
                             {{rating.rateTime | formatDate}}
                        </div>
					</div>
				</li>
			</ul>
		    </div>
		</div>
		
		
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import split from '@/pages/split/split'
import ratingselect from '@/pages/ratingselect/ratingselect'
import {formatDate} from '@/common/js/date';

const ALL=2;
export default{
	props: {
		seller: {
			type:Object
		}
	},
	data() {
		return{
			ratings: [],
			selectType:ALL,
			onlyContent:true
		}
	},
	created() {
		axios.get('static/data.json').then((res) => {
			  this.ratings = res.data.ratings;
			 
			  this.$nextTick(() => {
			  	  this.scroll= new BScroll(this.$refs.ratings, {
			  	   click:true
			  })
			  })		
			 
		});
	},
	methods: {
		selectRating(type) {
			this.selectType = type;
			this.$nextTick(() => {
               this.scroll.refresh();
             })
		},
		toggleContent() {
			this.onlyContent = !this.onlyContent;
			this.$nextTick(() => {
                this.scroll.refresh();
             })
		},
		needShow(type,text){
			if(this.onlyContent && !text){
				return false;
			}
			if(this.selectType=== ALL){
				return true;
			} else {
				return type === this.selectType;
			}
		}
	},
	filters: {
		formatDate(time) {
			let date = new Date(time);
			return formatDate(date,'yyyy-MM-dd hh:mm')
		}
	},
	components: {
		split,
		ratingselect
	}
}
</script>

<style lang="scss">
	.ratings{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		.overview{
			display: flex;
			padding: 18px 0;
			.overview-left{
				flex: 0 0 137px;
				width: 137px;
				border-right: 1px solid rgba(7,17,27,0.1);
				text-align: center;
				padding: 6px 0;
				@media only screen and (max-width:320px)
				{
					flex: 0 0 120px;
				    width: 120px;
				}
				.score{
					margin-bottom: 6px;
					font-size: 24px;
					line-height: 28px;
					color: rgb(255,153,0);
				}
				.title{
					margin-bottom: 8px;
					font-size: 12px;
					line-height: 12px;
					color: rgb(7,17,27);
				}
				.rank{
					margin-top: 18px;
					line-height: 10px;
					font-size: 10px;
					color: rgb(147,153,159);
				}
			}
			.overview-right{
				flex: 1;
				padding: 6px 0 6px 24px;
				@media only screen and (max-width:320px)
				{
					padding: 6px 0 6px 6px;
				  
				}
				.score-wrapper{
					margin-bottom: 8px;
					
					font-size:0;
					.title{
						display: inline-block;
						vertical-align: top;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.star{
						display: inline-block;
						vertical-align: top;
						margin:3px 12px;
						font-size: 10px;
						.el-rate__icon{
							font-size: 12px;
						}
						.el-rate__text{
							font-size: 12px;
						}
						@media only screen and (max-width:320px)
				        {
					         margin:0 5px;
				  
				        }
					}
					
				}
				.delivery-wrapper{
					font-size: 0;
					.title{					
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.delivery{
						margin-left: 12px;
						font-size: 12px;
						color: rgb(147,153,159);
					}
				}
			}
			
		}
		.rating-wrapper{
			padding: 0 18px;
			.rating-item{
				display: flex;
				padding:18px 0;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.avatar{
					flex: 0 0 28px;
					width: 28px;
					margin-right: 12px;
					img{
						border-radius: 50%;
					}
				}
				.content{
					flex: 1;
					position: relative;
					.name{
						margin-bottom: 4px;
						line-height: 12px;
						font-size: 12px;
						color: rgb(7,17,27);
					}
					.star-warpper{
						margin-bottom: 6px;
						font-size: 0;
						.star{
							display: inline-block;
							vertical-align: top;
							margin-right: 6px;
							.el-rate__icon{
							font-size: 12px;
						    }
						    .el-rate__text{
							font-size: 12px;
						    }
						}
						.delivery{
							display: inline-block;
							vertical-align: top;
							line-height: 12px;
						    font-size: 12px;
						   color: rgb(147,153,159);
						}
						
					}
					.text{
							line-height: 18px;
							font-size: 12px;
							color: rgb(7,17,27);
							font-weight: 700;
							margin-bottom: 8px;
						}
					.recommend{
						line-height: 16px;
						.item{
							display: inline-block;
							margin: 0 8px 4px 0;
							font-size: 9px;
							padding: 0 6px;
							border: 1px solid rgba(7,17,27,0.1);
							border-radius: 1px;
							color: rgb(147,153,159);
						}
					}
					.time{
						position: absolute;
						top: 0;
						right: 0;
						font-size: 10px;
						color: rgb(147,153,159);
					}
				}
			}
		}
	}
</style>