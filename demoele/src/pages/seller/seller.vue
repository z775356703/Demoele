<template>
	<div class="seller"   ref="seller">
		<div class="seller-content">
			<div class="overview">
				<h1  class="title">{{seller.name}}</h1>
				<div class="desc">
					<el-rate class="star" v-model="seller.score" disabled  text-color="#ff9900" text-template="{value}分"></el-rate>
					<span class="text">({{seller.ratingCount}})</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}</span>元
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}</span>分钟
						</div>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告活动</h1>
				<div  class="content-warpper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul v-if="seller.supports" class="supports">
			 			<li class="support-item" v-for="(item,index) in seller.supports">
			 				<span class="icon" :class="classMap[seller.supports[index].type]"></span>
			 				<span class="text">{{seller.supports[index].description}}</span>
			 			</li>
			    </ul>			 	
			</div>	
			<split></split>
			<div class="pics">
				<h1 class="title">商品实景</h1>
				<div class="pic-wrapper" ref="picWrapper">
					<ul class="pic-list" ref="picList">
						<li class="pic-item" v-for="pic in seller.pics">
							<img :src="pic" width="120" height="90" alt="" />
						</li>
					</ul>
				</div>
			</div>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for="info in seller.infos">{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import split from '@/pages/split/split'
export default{
	props: {
		seller: {
			type:Object
		}
	},
	data() {
		return{
			ratings:[]
		}
	},
	created() {
		this.classMap=['decrease','discount','guarantee','invoice','special'];
        this.$nextTick(() => {
			this._initScroll();
		})
    },
    components: {
		split
	},
	watch: {
		'seller'() {
			this.$nextTick(() => {
				this._initScroll();
				this._initPics();
			})
		}
	},
	mounted() {
		this.$nextTick(() => {
			this._initScroll();
			this._initPics();
		})
	},
	methods: {
		_initScroll() {
			if(!this.scroll) {
				this.scroll = new BScroll(this.$refs.seller, {
					click: true
				});
			} else {
				this.scroll.refresh();
			}
		},
		_initPics() {
			if(this.seller.pics){
				let picwidth=120;
				let margin=6;
				let width=(picwidth+margin)*this.seller.pics.length;
				this.$refs.picList.style.width=width+'px';
				this.$nextTick(() => {
					if(!this.picscroll){
						this.picscroll = new BScroll(this.$refs.picWrapper,{
							scrollX: true,
							eventPassthrough:'vertical'
						})
					}else{
						this.picscroll.refresh();
					}
				})
			}
		}
	}
}
</script>

<style lang="scss">
	@import "../../../static/mixin";
	.seller{
		position: absolute;
		top: 174px;
		left: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		.overview{
			padding: 18px;
			.title{
				margin-bottom: 8px;
			    line-height: 14px;
			    color: rgb(7,17,27);
			    font-size: 14px;
			}
			.desc{
				padding-bottom: 18px;
				line-height: 18px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				font-size: 0;
				.star{
					display: inline-block;
					margin-right: 8px;
					
				    .el-rate__icon{
							font-size: 12px;
						}
					.el-rate__text{
							font-size: 12px;
						}
				}
				.text{
					display: inline-block;
					vertical-align: top;
					margin-right: 12px;
					font-size: 12px;
					color: rgb(77,85,93);
				}
			}
			.remark{
				display: flex; 
				padding-top: 18px;
				.block{
					flex: 1;
					text-align: center;
					border-right: 1px solid rgba(7,17,27,0.1);
					&:last-child{
						border: none;
					}
					h2{
						margin-bottom: 4px;
						line-height: 10px;
						font-size: 10px;
						color: rgb(147, 153, 159);
						
					}
					.content{
						line-height: 24px;
						font-size: 10px;
						color: rgb(7,17,27);
						.stress{
							font-size: 24px;
						}
					}
				}
			}
		}
		.bulletin{
			padding: 18px 18px 0 18px;
			.title{
				margin-bottom: 8px;
			    line-height: 14px;
			    color: rgb(7,17,27);
			    font-size: 14px;
			}
			.content-warpper{
				padding: 0 12px 16px 12px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				.content{
					line-height: 24px;
					font-size: 12px;
					color: rgb(240,20,20 );
				}
			}
			.supports{				
				.support-item{
					padding: 16px 12px;
					border-bottom: 1px solid rgba(7,17,27,0.1);
					font-size: 0;
					&:last-child{
						border: none;
					}
					.icon{
						display: inline-block;
						width: 16px;
						height: 16px;
						vertical-align: top;
						margin-right: 16px;
						background-size: 16px 16px;
						background-repeat: no-repeat;
						&.decrease{
						@include bg-image("./img/decrease_4")
						}
						&.discount{
						@include bg-image("./img/discount_4")
						 }
						&.guarantee{
						@include bg-image("./img/guarantee_4")
						}
						&.invoice{
						@include bg-image("./img/invoice_4")
						}
						&.special{
						@include bg-image("./img/special_4")
						} 						         
					}
					.text{
						line-height: 16px;
                        font-size: 12px ;
                        color: rgb(7, 17, 27);
					}
				}
			}
		}
		.pics{
		   padding: 18px;
		   .title{
		   	    margin-bottom: 12px;
			    line-height: 14px;
			    color: rgb(7,17,27);
			    font-size: 14px;
		   }
		   .pic-wrapper{
		   	width: 100%;
		   	overflow: hidden;
		   	white-space: nowrap;
		   	.pic-list{
		   		font-size: 0;
		   		.pic-item{
		   			display: inline-block;
		   			margin-right: 6px;
		   			width: 120px;
		   			height: 90px;
		   		}
		   	}
		   }
		}
		.info{
			padding: 18px;
			.title{
				padding-bottom: 12px;
				line-height: 14px;
				color: rgb(7,17,27);
				font-size: 14px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
			}
			.info-item{
				padding: 16px 12px;
				line-height: 16px;
				border-bottom: 1px solid rgba(7,17,27,0.1);
				font-size: 12px;
				&:last-child{
					border: none;
				}
			}
		}
	}
</style>