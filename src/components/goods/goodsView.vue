<template>
	<div class="goods">
    <!--右侧菜单栏-->
		<div class="menu-wrapper" ref="menuWrapper" >
			<ul>
				<li class="menu_item" :class="{'Cselected':currentIndex == index}" v-for="(val,index) in goods" @click="slectedMenu(index)">
					<span class="text">
						<span class="icon" :class="classMap[val.type]" v-show="val.type>0"></span>{{val.name}}
					</span>
				</li>
			</ul>
		</div>
    <!--商品列表-->
		<div class="food-wrapper" ref="foodsWrapper">
			<ul>
				<li class="food_lists food-list-hook" v-for="val in goods">
					<h1 class="title">{{val.name}}</h1>
					<ul>
						<li class="food_item" @click="foodDetail(food)" v-for="food in val.foods">
							<div class="icon">
								<img :src="food.icon" alt="" />
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<div class="description">{{food.description}}</div>
								<div class="extre">
									<span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now_price">￥{{food.price}}</span>
									<span class="old_price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
								</div>
                <!--添加food组件-->
								<div class="cartControl">
									<v-cartCtrl :food = "food"></v-cartCtrl><!--将遍历出来的food传给v-shopCart-->
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
    <!--底部购物车组件-->
    <v-shopCart :priceDelivery="seller.deliveryPrice" :deliveryBase="seller.minPrice" :selectFoods="selectFoods"></v-shopCart>
    <!--商品详情页-->
		<v-detPage :food="singleFood" ref="detail"></v-detPage>
	</div>
</template>

<script>
	import Bscroll from "better-scroll"
	import shopCart from "../shopCart/shopCart.vue"
	import cartControl from "../cartControl/cartControl.vue"
	import detailsPage from "../detailsPage/detailsPage.vue"

	const ERR_OK = 0;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				goods:[],
				listHeight:[],
				scrollY:0,
				singleFood:{}
			}
		},
		components:{
			"v-shopCart":shopCart,
			"v-cartCtrl":cartControl,
			"v-detPage":detailsPage
		},
		created (){
			var _this=this;
			_this.$http.get("/api/goods").then( (res) =>{
				res = res.body;
				if(res.errno == ERR_OK){
					_this.goods = res.data;

					_this.$nextTick(() => {
						_this._initScroll();
						_this.caculateHeight();
					});

				}
			});

			_this.classMap = ["decrease","discount","special","invoice","guarantee"];
		},
		methods:{
			_initScroll(){
				this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
					click:true //better-scroll会阻止默认的行为click事件  所以初始化时候要传入一个click:true
				});
				this.foodsScroll = new Bscroll(this.$refs.foodsWrapper, {
					click:true,
					probeType:3   //实施检测滚动的位置
				});
				this.foodsScroll.on("scroll",(pos)=>{
					this.scrollY =Math.abs( Math.round(pos.y) );//获取到了Y轴的滚动位置并存储起来
				})
			},
			caculateHeight(){
				let foodsList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0;i<foodsList.length;i++){
					let itemHeight = foodsList[i].clientHeight;//获取到每个li的高度
					height += itemHeight;						//累加到每个li的高度
					this.listHeight.push(height);
				}
			},
			slectedMenu(idx){
				//console.log("menu=======>"+idx);
				let foodsList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
				let el = foodsList[idx];
				this.foodsScroll.scrollToElement(el,300);
			},
			foodDetail (food) {
				this.singleFood = food;
				this.$refs.detail.show();//调用子组件show方法
			}
		},
		computed:{
      //获取foodlist的当li的索引位置
			currentIndex(){
				for(let i = 0;i<this.listHeight.length;i++){
					let preHeight = this.listHeight[i];
					let nexHeight = this.listHeight[i+1];
					if( (this.scrollY>=preHeight && this.scrollY<nexHeight) || !nexHeight){
						return i;
					}
				}
				return 0;//当listHeight.lenght为零时 返回0；
			},
			selectFoods (){	//获取 已选择的商品
				let selected = [];
				this.goods.forEach((good) =>{
					good.foods.forEach((food) =>{
						if(food.count){
							selected.push(food);
						}
					});
				});
				return selected;
			}
		}
	}


</script>

<style lang="scss" scoped="scoped">
  @import '../../../static/css/px2rem.scss';
	$designWidth : 750;
	@import "../../common/style/base.scss";

	.goods{
		display: flex;
		width:100%;
		position:absolute;
		top:px2rem(349);
		bottom: px2rem(96);
		overflow: hidden;
		.menu-wrapper{
			height:100%;
			flex:0 0 px2rem(160);
			width:px2rem(160);
			background:#f3f5f7;
			font-size:0;
			.menu_item{
				width: 100%;
				padding:0 px2rem(24);
				box-sizing: border-box;
				&.Cselected{
					position: relative;
					z-index: 10;
					margin-top:px2rem(-1);
					font-weight:700;
					background: skyblue;
          span{
            color:#fff;
          }
					.text{
						border:none;
					}
				}
				.text{
					display: table-cell;
					font-size:px2rem(24);
					color:rgb(0,20,20);
					width:px2rem(112);
					height:px2rem(108);
					line-height:px2rem(28);
					border-bottom:px2rem(1) solid rgba(7,17,27,0.1);
					vertical-align:middle;
					.icon{
						display: inline-block;
						width:px2rem(24);
						height:px2rem(24);
						vertical-align:top;
						margin-right:px2rem(4);
						&.decrease{
							@include bg-img ("decrease_3");
						}
						&.discount{
							@include bg-img ("discount_3");
						}
						&.special{
							@include bg-img ("special_3");
						}
						&.invoice{
							@include bg-img ("invoice_3");
						}
						&.guarantee{
							@include bg-img ("guarantee_3");
						}
					}
				}
			}
		}
		.food-wrapper{
			flex: 1;
			.food_lists{
				.title{
					background: #f3f5f7;
					font-size:px2rem(24);
					color:rgb(147,153,159);
					line-height:px2rem(52);
					padding:0 px2rem(36);
					border-left:px2rem(2) solid #d9dde1;
				}
				.food_item{
					display:flex;
					margin:0 px2rem(36);
					padding:px2rem(36) 0;
					border-bottom:px2rem(2) solid rgba(7,17,27,0.1);
					&:last-child{
						border-bottom: none;
					}
				}
				.icon{
					flex:0 0 px2rem(114);
					img{
						width:px2rem(114);
						height:px2rem(114);
						border-radius: px2rem(5);
					}
				}
				.content{
					position: relative;
					flex:1;
					padding-left:px2rem(20) ;
					font-size:px2rem(28);
					.name{
						font-size:px2rem(28);
						line-height: px2rem(28);
						color: rgb(7,17,27);
						margin:px2rem(4) 0 px2rem(16);
					}
					.description{
						font-size:px2rem(20);
						line-height: px2rem(20);
						color: rgb(147,153,159);
						margin-bottom: px2rem(16);
					}
					.extre{
						font-size:px2rem(20);
						line-height: px2rem(20);
						color: rgb(147,153,159);
						margin-bottom: px2rem(16);
						.sellCount{
							margin-right: px2rem(24);
						}
					}
					.price{
						font-size:0;
						line-height: px2rem(28);
						.now_price{
							font-size:px2rem(28);
							color:rgb(240,20,20);
							margin-right: px2rem(16);
						}
						.old_price{
							font-size:px2rem(24);
							color: rgb(147,153,159);
							text-decoration: line-through;
						}
					}
					.cartControl{
						position:absolute;
						width: 100%;;
						right:px2rem(0);
						bottom: px2rem(0);
						text-align: right;
						/*background:red;*/
					}
				}
			}
		}
	}
</style>
