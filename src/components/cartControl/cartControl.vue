<template>
  <!--添加商品组件 - + -->
	<div class="cartControl">
    <transition name="move">
      <div class="descrea" @click.stop.prevent="decreaCart">
        <i class="fa fa-minus-circle" aria-hidden="true" v-show="food.count>0"></i>
      </div>
    </transition>
		<div class="food-count"><span class="text" v-show="food.count>0">{{food.count}}</span></div>
		<div class="add" @click.stop.prevent="addCart">
			<i class="fa fa-plus-circle" aria-hidden="true"></i>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	export default{
		props:{
			food:{//foods里的
				type:Object
			}
		},
		methods:{
			addCart(){
				if(!this.food.count){
					Vue.set(this.food,"count",1);//给food添加了一个count属性 ，这时父组件good中的food的也具有这个属性     Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
				}else{
					this.food.count++;
				}
			},
			decreaCart (){
				if(this.food.count>0){
					this.food.count--;
				}
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	@import '../../../static/css/px2rem.scss';
	$designWidth : 750;
	@import "../../common/style/base.scss";

	.cartControl{
		font-size:0;
    text-align: right;
    vertical-align: top;
		.descrea,.add{
			display: inline-block;
			font-size:px2rem(48);
			line-height: px2rem(48);
		}
		.descrea{
			.fa{
        color: rgb(0, 160, 220);
			}
		}
		.food-count{
      display: inline-block;
			padding:0 px2rem(12);
			text-align: center;
			.text{
				color: rgb(147,153,159);
				font-size:px2rem(24);
				text-align: center;
			}
		}
		.add{
			.fa{
        display: inline-block;
        color: rgb(0, 160, 220);
        transition: all 0.4s linear;
			}
		}
	}
</style>
