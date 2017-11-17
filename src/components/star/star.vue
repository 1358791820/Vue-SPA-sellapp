<template>
	<div class="star" :class="star_type">
		<span class="star_item" :class="class_item" v-for="class_item in star_items" ></span>

	</div>
</template>

<script>
	const LENGTH = 5;
	const CLA_ON = "ON";
	const CLA_HALF = "HALF";
	const CLA_OFF = "OFF";

	export default {
		props:{
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			star_type() {
				return "star-" + this.size;

			},
			star_items() { //计算star的个数  然后再遍历
				let result = [];
				let score = Math.floor(this.score * 2) / 2;
				//eg获取分数 （4.6 * 2）/2 = 4.5
				let hasDecimal = score % 1 !== 0; //获取半星
				let integer = Math.floor(score); //获取全星
				for(let i = 0;i<integer;i++){
					result.push(CLA_ON);
				};
				if(hasDecimal){
					result.push(CLA_HALF);
				};
				while(result.length<LENGTH){
					result.push(CLA_OFF);
				};
				return result;
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
  @import '../../../static/css/px2rem.scss';
	$designWidth : 750;
	@import "../../common/style/base.scss";

	.star{
		font-size:0;
		.star_item{
			display: inline-block;
		}
	}

	.star{
		&.star-48{
			.star_item{
				width:px2rem(40);
				height:px2rem(40);
				margin-right:px2rem(44);
				&:last-child{
					margin-right: 0;
				}
				&.ON{
					@include bg-img("star48_on");
					background-size: 100%;
					background-repeat:no-repeat;
				}
				&.HALF{
					@include bg-img("star48_half");
					background-size: 100%;
					background-repeat:no-repeat;
				}
				&.OFF{
					@include bg_img("star48_off");
					background-size: 100%;
					background-repeat:no-repeat;
				}
			}
		}

		&.star-36{
			.star_item{
				width:px2rem(30);
				height:px2rem(30);
				margin-right:px2rem(12);
				&:last-child{
					margin-right: 0;
				}
				&.ON{
					@include bg-img("star36_on");
					background-size: 100%;
					background-repeat:no-repeat;
				}
				&.HALF{
					@include bg-img("star36_half");
					background-size: 100%;
					background-repeat:no-repeat;
				}
				&.OFF{
					@include bg_img("star36_off");
					background-size: 100%;
					background-repeat:no-repeat;
				}
			}
		}

		&.star-24{
			.star_item{
				width:px2rem(20);
				height:px2rem(20);
				margin-right:px2rem(4);
				&:last-child{
					margin-right: 0;
				}
				&.ON{
					@include bg-img("star24_on");
					background-size: 100%;
					background-repeat:no-repeat;
				}
				&.HALF{
					@include bg-img("star24_half");
					background-size: 100%;
					background-repeat:no-repeat;
				}
				&.OFF{
					@include bg_img("star24_off");
					background-size: 100%;
					background-repeat:no-repeat;
				}
			}
		}

	}
</style>
