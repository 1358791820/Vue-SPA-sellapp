<template>
  <transition name="move">
    <div class="details-page" v-show="showFlag" ref="detailsPage">
      <div class="detail-content">
        <div class="detail-header">
          <img  :src="food.image" alt="" />
          <div class="back" @click="toBack">
            <i class="fa fa-angle-left" aria-hidden="true"></i>
          </div>
        </div>
        <div class="detail-food">
          <div class="name">{{food.name}}</div>
          <div class="sele-info">
            <span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now_price">￥{{food.price}}</span>
            <span class="old_price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartControl-wrapper">
            <v-cartControl :food = "food"></v-cartControl>
          </div>
          <div class="buy" @click.stop.prevent="addCart" v-show="!food.count || food.count ===0 "><span>加入购物车</span></div>
        </div>
        <div class="split-wrapper">
          <v-split></v-split>
        </div>
        <div class="food-introduce">
          <p class="title">商品介绍</p>
          <p class="text" v-show="food.info">{{food.info}}</p>
        </div>
        <div class="split-wrapper">
          <v-split></v-split>
        </div>
        <div class="food-ratings">
          <p class="title">商品评价</p>
          <div class="ratingSelect-wrapper">
            <v-ratingSelect @select-type='select' @toggle="toggleContent" :selectType="selectType" :ratings="food.ratings" :onlyContent="onlyContent" :desc="desc" :food="food.ratings"></v-ratingSelect>
          </div>
          <div class="ratings-list">
            <ul class="list" v-show="food.ratings && food.ratings.length">
              <li class="rating-item" v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings">
                <div class="user">
                  <span class="username">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <div class="text"><span :class="{'icon-thumb_down':rating.rateType == 1,'icon-thumb_up':rating.rateType == 0}"></span>{{rating.text}}</div>
              </li>
            </ul>
            <div class="no-ratings" v-show="!food.ratings || !food.ratings.length">暂时还没有评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
	import Vue from "vue"
  import Bscroll from "better-scroll"
	import cartControl from "../cartControl/cartControl.vue"
  import split from "../split/split.vue"
  import ratingSelect from "../ratingSelect/ratingSelect.vue"
  import {formatDate} from "../../common/js/date";

  const ALL = 2;
	export default{
		props:{
			food:{//foods里的
				type:Object
			}
		},
		data() {
			return {
				showFlag:false,
        selectType:ALL,
        onlyContent:true,
        desc:{
          "all":"全部",
          "positive":"推荐",
          "negative":"吐槽"
        }
			}
		},
		components:{
			"v-cartControl":cartControl,
      "v-split":split,
      "v-ratingSelect":ratingSelect
		},
    //时间戳转换
    filters:{
      formatDate(time){
        let date = new Date();
       /* 时间戳模块转换方法*/
        return formatDate(date,'yyyy-MM-dd hh:mm');
      }
    },
		methods:{
		  //监听子组件数据变化
      select (type) {
        this.selectType = type;
        //子组件数据变化dom未发生改变 因此在$nextTick里执行从新计算
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent(){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
			show() {
			  //初始化
			  this.selectType = ALL;
        this.onlyContent = false;
        this.desc = {
          "all":"全部",
            "positive":"推荐",
            "negative":"吐槽"
        };
				this.showFlag = true;
        this.$nextTick(() =>{
          if(!this.scroll){
            this.scroll = new Bscroll(this.$refs.detailsPage,{
              click:true
            });
          }else{
            //从新计算dom位置
            this.scroll.refresh();
          };
        });
			},
			toBack() {
				this.showFlag = false;
			},
      addCart(){
			  if(!this.food.count){
			    Vue.set(this.food,"count",1);
          //console.log(this.food.count)
        }else{
			    this.food.count++;
        }
      },
      needShow(type,text){
        //当只看内容评价时（点赞除外） ，并且评论中没有文本内容情况下 return false
        if(this.onlyContent && !text){
          return false;
        };
        //当选择全部，展示所有
        if(this.selectType === ALL){
          return true;
        }else{
          return type === this.selectType;
        }
      }
		}
	}
</script>

<style lang="scss" scoped="scoped">
  @import '../../../static/css/px2rem.scss';
	$designWidth : 750;
	@import "../../common/style/base.scss";

	.details-page{
		position: fixed;
		top:0;
		bottom:px2rem(96);
		z-index: 30;
		width:100%;
		background:#fff;
    &.move-enter-active{
      transition: all 0.3s linear;
    }
    &.move-leave-active{
      transition: all 0.4s ease;
      transform: translate3d(100%, 0, 0)
    }
    &.move-enter,&move-leave-to{
      transform: translate3d(100%, 0, 0)
    }
		.detail-content{
			.detail-header{
				position:relative;
				top:0;
				left: 0;
				width:100%;
				height:0;
				padding-top:100%;
				img{
					width:100%;
					height:100%;
					position:absolute;
					top:0;
					left:0;
				}
				.back{
					position:absolute;
					top:px2rem(20);
					left:px2rem(24);
					.fa-angle-left{
						display: block;
						padding:px2rem(10);
						color: #fff;
					}
				}

			}
			.detail-food{
					width:100%;
					padding:px2rem(36);
					box-sizing: border-box;
					position: relative;
					.name{
						font-size:px2rem(28);
						line-height:px2rem(28);
						color:rgb(7,17,27);
						font-weight:700;
					}
					.sele-info{
						font-size:px2rem(20);
						line-height:px2rem(20);
						margin:px2rem(16) 0 px2rem(36) 0;
						.sellCount,.rating{
							display: inline-block;
							color:rgb(147,153,159);
						}
						.sellCount{
							margin-right:px2rem(24);
						}
					}
					.price{
						margin-bottom:px2rem(36);
						.now_price{
							font-size:px2rem(28);
							font-weight:700;
							color:rgb(240,20,20);
							line-height:px2rem(48);
						}
						.old_price{
							font-size:px2rem(20);
							font-weight:700;
							line-height:px2rem(48);
							color:rgb(147,153,159);
							text-decoration: line-through;
						}
					}
					.cartControl-wrapper{
            position: absolute;
            right:px2rem(37);
            bottom:px2rem(45);
						width:px2rem(200);
						height:px2rem(40);
					}
          .buy{
            position: absolute;
            right:px2rem(36);
            bottom:px2rem(36);
            width:px2rem(148);
            background: rgb(0,160,220);
            border-radius: px2rem(24);
            text-align: center;
            z-index:100;
            span{
              vertical-align: middle;
              font-size:px2rem(20);
              line-height:px2rem(48);
              color:rgb(255,255,255);
            }
        }
				}
      .food-introduce{
        margin:px2rem(36) px2rem(36) px2rem(36) px2rem(36);
        .title{
          font-size:px2rem(28);
          line-height:px2rem(48);
          font-weight:700;
          color:rgb(7,17,27);
          margin-bottom:px2rem(12);
        }
        .text{
          font-size:px2rem(24);
          color:#999;
          line-height:px2rem(48);
        }
      }
      .food-ratings{
        .title{
          font-size:px2rem(28);
          line-height:px2rem(48);
          font-weight:700;
          color:rgb(7,17,27);
          padding-top:px2rem(36);
          margin-left:px2rem(36);
        }
        .ratings-list{
          .list{
            .rating-item{
              position: relative;
              margin:0 px2rem(36);
              border-bottom:px2rem(2) solid rgba(7,17,27,0.1);
              .user{
                font-size:0;
                position: absolute;
                top:px2rem(32);
                right:px2rem(0);
                vertical-align: middle;
                .username{
                  margin-right:px2rem(12);
                font-size:px2rem(20);
                line-height:px2rem(24);
                color:rgb(147,153,159);
                }
                img{
                  width:px2rem(24);
                  height:px2rem(24);
                  border-radius: 50%;
                }
              }
              .time{
                margin-top:px2rem(32);
                font-size:px2rem(20);
                line-height:px2rem(24);
                color:rgb(147,153,159);
              }
              .text{
                margin-top:px2rem(12);
                margin-bottom:px2rem(32);
                font-size:px2rem(24);
                line-height:px2rem(32);
                color:rgb(147,153,159);
                .icon-thumb_down,.icon-thumb_up{
                  font-size:px2rem(24);
                  line-height:px2rem(48);
                  margin-right:px2rem(8);
                }
                .icon-thumb_up{
                  color:rgb(0,160,220);
                }
              }
            }
          }
        }
        .no-ratings{
          padding-top:px2rem(24);
          text-align: center;
          font-size:px2rem(24);
          color:rgb(7,17,27);
        }
      }
		}
	}
</style>
