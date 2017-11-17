<template>
	<div class="shopCart-wrapper">
		<div class="shopCart">
			<div class="content" @click="toggleList">
        <!--价格详情-->
				<div class="left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'height-light':totalCount>0}">
							<i class="fa fa-shopping-cart" aria-hidden="true"></i>
						</div>
						<div class="count" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'height-light':totalCount>0}">￥{{totalPrice}}</div>
					<div class="description">另需配送费{{priceDelivery}}元</div>
				</div>
        <!--结算-->
				<div class="right" :class="payBg">
					<span class="deliver-base" @click.stop.prevent="topay">{{payDsc}}</span>
				</div>
        <!--已加入购物车的商品-->
        <transition name="move">
				  <div class="shop-list"  v-show="listShow">
					<div class="shop-header">
						<div class="cart">购物车</div>
						<div class="clear" @click="clear">清空</div>
					</div>
					<div class="shop-content" ref="shopContent">
						<ul>
							<li class="select-list" v-for="food in selectFoods">
								<div class="name">
									<span>{{food.name}}</span>
								</div>
								<div class="price">
									<span>{{food.price*food.count}}</span>
								</div>
								<div class="cartControl-wrapper">
									<v-cartCtrl :food = "food"></v-cartCtrl>
								</div>
							</li>
						</ul>
					</div>
				</div>
        </transition>
			</div>
		</div>
    <!--bg蒙层-->
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
	</div>
</template>

<script>
	import Bscroll from "better-scroll"
	import cartControl from "../cartControl/cartControl.vue"

	export default{
		props:{
			priceDelivery:{
				type:Number
			},
			deliveryBase:{
				type:Number
			},
			selectFoods:{	//由父组件goods传递数据过来   购物车的数据都依赖于他  通过他将购物车和选择组建进行联动起来（food.count-->food-->selectfoods）
				type:Array,
				default (){
					return [
						{
							count:0,
							price:0
						}
					]
				}
			}
		},
		data(){
			return {
				fold:true //控制是否折叠
			}
		},
		components:{
			"v-cartCtrl":cartControl
		},
		methods:{
			toggleList (){
				if(!this.totalCount){
					return;
				}else{
					this.fold = !this.fold;
				}
			},
			clear () {
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			hideList () {
				this.fold = true;
			},
			topay () {
				if(this.totalPrice>=this.deliveryBase){
					window.alert(`支付￥${this.totalPrice}元`)
				}
			}
		},
		computed:{
			totalPrice (){
				let total=0;
				this.selectFoods.forEach((food) =>{
					total += food.price * food.count;
				});
				return total;
			},
			totalCount (){
				let count=0;
				this.selectFoods.forEach( (food) =>{
					count += food.count;
				});
				return count;
			},
			payDsc (){
				if(this.totalPrice == 0){
					return `￥${this.deliveryBase}元起送`;
				}else if(this.totalPrice<this.deliveryBase){
					let diff = this.deliveryBase - this.totalPrice;
					return `还差￥${diff}元起送`;
				}else{
					return "去结算";
				}
			},
			payBg (){
				if(this.totalPrice>=this.deliveryBase){
					return "enough";
				}else{
					return "not-enough";
				}
			},
			listShow (){
				if(!this.totalCount){//为零时
					this.fold = true;
					return false;
				}else{
					let show = !this.fold;
					if(show){ //初始化
						this.$nextTick(() => {
							if(!this.scroll){
								this.scroll = new Bscroll(this.$refs.shopContent,{
									click:true
								})
							}else{
								this.scroll.refresh();
							}
						})
					}
					return show;
				}
			}
		}
	}

</script>

<style lang="scss" scoped="scoped">
  @import '../../../static/css/px2rem.scss';
	$designWidth : 750;
	@import "../../common/style/base.scss";

  .shopCart-wrapper{
    .shopCart{
      position:fixed;
      left: 0;
      bottom:0;
      z-index: 100;
      width:100%;
      height:px2rem(96);
      .content{
        position:relative;
        display:flex;
        background: #141d27;
        .left{
          flex:1;
          font-size:0;
          .logo-wrapper{
            display: inline-block;
            background: #141d27;
            position: relative;
            top:px2rem(-16);
            margin: 0 px2rem(24) 0 px2rem(24);
            padding: px2rem(12);
            box-sizing:border-box;
            width:px2rem(112);
            height:px2rem(112);
            border-radius: 50%;
            .logo{
              width:100%;
              height:100%;
              background:rgba(255,255,255,0.2);
              border-radius: 50%;
              text-align: center;
              font-size:px2rem(48);
              color:rgb(128,133,138);
              line-height: px2rem(88);
              &.height-light{
                background:rgb(0,120,220);
                color:rgb(255,255,255);
              }
            }
            .count{
              position:absolute;
              top:px2rem(0);
              right:px2rem(0);
              width:px2rem(48);
              height:px2rem(32);
              background:rgb(240,20,20);
              padding:0 px2rem(12);
              box-sizing: border-box;
              font-size:px2rem(18);
              font-weight:700;
              color:rgb(255,255,255);
              line-height:px2rem(32);
              border-radius:px2rem(16);
              text-align:center;
              box-shadow:0 px2rem(4) px2rem(8) 0 rgba(0,0,0,0.4);
            }

          }
          .price{
            display: inline-block;
            font-size:px2rem(32);
            line-height: px2rem(48);
            font-weight:700;
            vertical-align: top;
            margin-top:px2rem(24);
            padding-right:px2rem(24);
            box-sizing:border-box;
            color:rgba(255,255,255,0.4);
            border-right:px2rem(1) solid rgba(255,255,255,0.1);
            &.height-light{
              color:rgb(255,255,255);
            }
          }
          .description{
            display: inline-block;
            font-size:px2rem(24);
            line-height: px2rem(48);
            vertical-align: top;
            margin-top:px2rem(24);
            color:rgba(255,255,255,0.4);
            padding:0 px2rem(24);
            box-sizing: border-box;
          }

        }

        .right{
          flex:0 0 px2rem(210);
          width:px2rem(210);
          background:rgba(255,255,255,0.2);
          color:rgba(255,255,255,0.4);
          text-align: center;
          padding:0 px2rem(16);
          box-sizing: border-box;
          &.not-enough{
            background:rgba(255,255,255,0.2);
            color:rgba(255,255,255,0.4);
          },
        &.enough{
          background:rgba(6,127,59,0.7);
          color:rgb(255,255,255);
        }
          .deliver-base{
            display: inline-block;
            font-size:px2rem(24);
            line-height: px2rem(48);
            font-weight: 700;
            vertical-align: top;
            margin-top:px2rem(24);
          }
        }
        .shop-list{
          width:100%;
          position:absolute;
          bottom:100%;
          left:0;
          z-index: -1;
          background: #fff;
          &.move-enter-active,&.move-leave-active{
            transition: all 0.4s ease;
          }
          &.move-enter,&.move-leave-to{
            transform: translate3d(0,100%,0);
          }
          .shop-header{
            font-size:px2rem(28);
            line-height: px2rem(80);
            color: rgb(7,17,27);
            padding: 0 px2rem(36) 0 px2rem(36);
            box-sizing: border-box;
            background: #F3F5F7;
            border-bottom:px2rem(1) solid rgba(7,17,27,0.1);
            .cart,.clear{
              display: inline-block;
            }
            .clear{
              float:right;
              font-size:px2rem(24);
              color: rgb(0,160,220);
            }
          }
          .shop-content{
            max-height: px2rem(434);
            overflow: auto;
            padding: 0 px2rem(36);
            .select-list{
              position: relative;
              border-bottom:px2rem(1) solid rgba(7,17,27,0.1);
              .name,.price,.cartControl-wrapper{
                display: inline-block;
                line-height: px2rem(48);
              }
              .name{
                font-size:px2rem(28);
                color:rgb(7,17,27);
                line-height: px2rem(48);
                margin: px2rem(24) 0;
              }
              .price{
                position: absolute;
                top:px2rem(24);
                right:px2rem(120);
                padding: 0 px2rem(24) 0 px2rem(36);
                color: rgb(240,20,20);
                font-size:px2rem(28);
                font-weight:700;
                span{
                  display: inline-block;
                  vertical-align: middle;
                }
              }
              .cartControl-wrapper{
                position: absolute;
                top:px2rem(11);
                right:0;


              }
            }
          }
        }
      }
    }
    .list-mask{
      position:fixed;
      top:0;
      left:0;
      z-index:40;
      width:100%;
      height:100%;
      background:  rgba(7,17,27,0.6);
      backdrop-filter:blur(px2rem(10));
      &.fade-enter-active,&.fade-leave-active{
        transition: all 0.5s linear;
      }
      &.fade-enter,&.fade-leave{
        opacity: 0;
      }
    }
  }
</style>
