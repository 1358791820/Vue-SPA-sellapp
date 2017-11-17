<template>
  <div id="header">
    <div class="content_wrapper">
    	<div class="avatar">
    		<img :src="seller.avatar" />
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="description">
    			<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
    		</div>
    		<div class="supports" v-if="seller.supports" >
    			<span class="icom" :class="classMap[seller.supports[0].type]"></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<div class="count" v-if="seller.supports" @click="show_detail">
    		<span class="num">{{seller.supports.length}}个</span>
    		<i class="fa fa-angle-right" aria-hidden="true"></i>
    	</div>

    </div>
    <div class="blullenti-wrapper" @click="show_detail">
    	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    	<i class="fa fa-angle-right" aria-hidden="true"></i>
    </div>

    <div class="header_bg">
    	<img :src="seller.avatar" alt="" />
    </div>

    <!--优惠详情页-->
    <transition name="fade">
      <div class="detail" v-show="detail_show">
    	<div class="detail_wrapper clearfix">
    		<div class="detail_main">
    			<h1 class="name">{{seller.name}}</h1>
    			<div class="star_wrapper">
    				<v-star :size="48" :score="seller.score">{{seller.name}}</v-star>
    			</div>
    			<div class="detail_infor">
    				<div class="line"></div>
    				<div class="title">优惠信息</div>
    				<div class="line"></div>
    			</div>
    			<ul class="supports_lists" v-if="seller.supports">
    				<li class="item" v-for="(item,index) in seller.supports">
    					<span class="icon" :class="classMap[seller.supports[index].type]"></span>
    					<span class="text">{{seller.supports[index].description}}</span>
    				</li>
    			</ul>
    			<div class="seller_notice">
    				<div class="line"></div>
    				<div class="title">商家公告</div>
    				<div class="line"></div>
    			</div>
    			<div class="bulletin_text">{{seller.bulletin}}</div>
    		</div>
    	</div>
    	<div class="detail_close">
        <i class="icon-close" aria-hidden="true" @click="hide_detail"></i>
    	</div>
    </div>
    </transition>

  </div>
</template>


<script type="text/ecmascript-6">
	import star from "../star/star.vue"

  export default {
  	data(){
  		return {
  			detail_show:false
  		}
  	},
  	methods:{
  		show_detail (){
  			this.detail_show = true;
  		},
  		hide_detail (){
  			this.detail_show = !true;
  		}
  	},
		props:{										//父组件传值给子组件
			seller:{
				type:Object
			}
		},
		created (){
			this.classMap = ["decrease","discount","special","invoice","guarantee"]//动态绑定class :class=classMap[0]==>:class=decrease
		},
		components:{
			"v-star":star
		}
  }
</script>

<style lang="scss" scoped="scoped">
  @import '../../../static/css/px2rem.scss';
		$designWidth : 750;
		@import "../../common/style/base.scss";

		#header{
			position:relative;
			overflow:hidden;
			background:rgba(7,17,27,0.5);
			.content_wrapper{
				position:relative;
				font-size:0;
				color:#fff;
				/*为了去除空白字符间隙*/
				padding:px2rem(48) px2rem(48) px2rem(36);
				.avatar{
					display: inline-block;
					vertical-align: top;
					img{
						width:px2rem(128);
						height:px2rem(128);
						border-radius: px2rem(5);
					}
				}
				.content{
					display: inline-block;
					margin-left: px2rem(32);
					font-size: px2rem(32);
					margin-top:px2rem(4);
					.title{
						.brand{
							display: inline-block;
							width:px2rem(60);
							height:px2rem(36);
							vertical-align: top;
							line-height: px2rem(36);
							@include bg-img ("brand");
						}
						.name{
							font-size: px2rem(32);
							color: rab(255 255 255);
							font-weight: blod;
							line-height: px2rem(36);
							margin-left: px2rem(12);
						}
					}
					.description{
						font-size:px2rem(24);
						line-height: px2rem(24);
						margin-top:px2rem(16);
					}
					.supports{
						margin-top:px2rem(20);
						.icom{
							display: inline-block;
							width:px2rem(24);
							height:px2rem(24);
							vertical-align: top;
							margin-bottom: px2rem(4);
							&.decrease{
								@include bg-img ("decrease_1");
							}
							&.discount{
								@include bg-img ("discount_1");
							}
							&.special{
								@include bg-img ("special_1");
							}
							&.invoice{
								@include bg-img ("invoice_1");
							}
							&.guarantee{
								@include bg-img ("guarantee_1");
							}

						}
						.text{
							font-size: px2rem(20);
							line-height:px2rem(24);
							vertical-align: top;
						}
					}
				}
				.count{
					position:absolute;
					right:px2rem(24);
					bottom: px2rem(36);
					background-color: rgba(0,0,0,0.2);
					padding:px2rem(14) px2rem(16);
					border-radius: px2rem(100);
					font-size:px2rem(20);
					line-height: px2rem(24);
					.num{
						display: inline-block;
						margin-right: px2rem(4);
					}
					.fa-angle-right{

					}

				}
			}
			.blullenti-wrapper{
					box-sizing: border-box;
					position: relative;
					box-sizing: border-box;
					width:100%;
					height:px2rem(56);
					background:rgba(7,17,27,0.2);
					padding: 0 px2rem(24) 0 px2rem(24);
					white-space:nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					color: rgb(255,255,255s);
					font-size:px2rem(20);
					vertical-align: bottom;
				.bulletin-title{
					vertical-align: middle;
					font-size:0;
					width:px2rem(44);
					height: px2rem(24);
					display: inline-block;
					@include bg-img("bulletin");

				}
				.bulletin-text{
					vertical-align: middle;
					font-size:px2rem(20);
					line-height:px2rem(56);
					color: rgb(255,255,255);
					margin-left:px2rem(8);

				}
				.fa-angle-right{
					position: absolute;
					right: px2rem(24);
					line-height: px2rem(56);
					margin-left: px2rem(8);
					font-size:px2rem(20);
				}
			}

			.header_bg{
				img{
					position:absolute;
					left: 0;
					top: px2rem(-200);
					z-index: -1;
					width: 100%;
					filter: blur(px2rem(10));

				}
			}



			.detail{
				position: fixed;
				top:0;
				left:0;
				z-index: 200;
				overflow: auto;
				width:100%;
				height:100%;
				color: #fff;
				font-size:px2rem(24);
				background:rgba(7,17,27,0.85);
				backdrop-filter:blur(px2rem(10));
        &.fade-enter-active,&.fade-leave-active {
          transition: all 0.5s;
          opacity: 1;
        }
        &.fade-enter,&.fade-leave{
          opacity: 0;
        }
					.detail_wrapper{
						min-height: 100%;
						width:100%;
						/*filter:blur(px2rem(10));*/
						.detail_main{
							margin-top:px2rem(128);
							padding-left:px2rem(72);
							padding-right:px2rem(72);
							padding-bottom: px2rem(128);
							.name{
								font-size:px2rem(32);
								line-height: px2rem(32);
								text-align: center;
							}
							.star_wrapper{
								margin-top:px2rem(32);
								text-align: center;
								padding: px2rem(4) 0;

							}
							.detail_infor{
								display: flex;
								margin:px2rem(56) 0 px2rem(48) 0;
								.line{
									flex: 1;
									position:relative;
									top:px2rem(-13);
									border-bottom:px2rem(1) solid rgba(255,255,255,0.2);
								}
								.title{
									margin: 0 px2rem(24);
									text-align: center;
									font-size: px2rem(28);
									font-weight: 700;
									line-height:px2rem(28);
								}
							}
							.supports_lists{
								.item{
									font-size:0;
									margin: 0 px2rem(24) ;
									margin-bottom: px2rem(24);
									line-height: px2rem(32);
									&:last-child{
										margin-bottom: 0;
									}
									.icon{
										display: inline-block;
										width:px2rem(32);
										height: px2rem(32);
										margin-right:px2rem(12);
										vertical-align: middle;
											&.decrease{
											@include bg-img ("decrease_2");
											}
											&.discount{
											@include bg-img ("discount_2");
											}
											&.special{
											@include bg-img ("special_2");
											}
											&.invoice{
											@include bg-img ("invoice_2");
											}
											&.guarantee{
											@include bg-img ("guarantee_2");
											}
									}
									.text{
										display: inline-block;
										font-size: px2rem(24);
										line-height: px2rem(24);
										vertical-align: middle;
									}
								}
							}
							.seller_notice{
								display: flex;
								margin:px2rem(56) 0 px2rem(48) 0;
								.line{
									flex:1;
									position:relative;
									top:px2rem(-13);
									border-bottom: px2rem(1) solid rgba(255,255,255,0.2);
								}
								.title{
									margin:0 px2rem(24);
									font-size:px2rem(28);
									font-weight: 700;
									line-height:px2rem(28);
								}
							}
							.bulletin_text{
								font-size:px2rem(24);
								line-height: px2rem(48);
								font-weight: 200;
							}

						}
					}
					.detail_close{
						position:relative;
						width:px2rem(64);
						height:px2rem(64);
						margin:px2rem(-128) auto;
						clear: both;
						.icon-close{
							font-size:px2rem(32);
							color:rgba(255,255,255,1);
						}
					}
			}


		}
</style>
