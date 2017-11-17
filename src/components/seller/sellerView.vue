<template>
  <!--商家页-->
	<div class="seller" ref="seller">
		<div class="seller-content">
      <div class="overView">
        <div class="title">{{seller.name}}</div>
        <div class="desc">
          <v-star :size="36" :score="seller.score"></v-star>
          <span class="rating-count">（{{seller.ratingCount}}）</span>
          <span class="seller-count">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="block-title">起送价</h2>
            <div class="txt">{{seller.minPrice}}</div>
          </li>
          <li class="block">
            <h2 class="block-title">商家配送</h2>
            <div class="txt">{{seller.deliveryPrice}}</div>
          </li>
          <li class="block">
            <h2 class="block-title">平均配送时间</h2>
            <div class="txt">{{seller.deliveryTime}}</div>
          </li>
        </ul>
        <div class="favorite">
          <span class="icon-favorite" @click="toggleFavorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <v-split></v-split>
      <div class="bulletin">
        <div class="content-wrapper">
          <div class="title">公告及活动</div>
          <p class="text">{{seller.bulletin}}</p>
        </div>
      </div>
      <ul class="supports_lists" v-if="seller.supports">
        <li class="item" v-for="(item,index) in seller.supports">
          <span class="icon" :class="classMap[seller.supports[index].type]"></span>
          <span class="text">{{seller.supports[index].description}}</span>
        </li>
      </ul>
      <v-split></v-split>
      <div class="seller-scene">
        <div class="title">商家实景</div>
          <div class="pics-wrapper" ref="picsWrapper">
            <ul class="pics-list"  ref="picsList">
              <li class="pic-item" v-for="pic in seller.pics"><img :src="pic" alt=""></li>
            </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-info">
        <div class="title">商家信息</div>
        <ul class="content-list">
          <li class="item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
	</div>
</template>

<script>
  import {saveToLocal,localFromLocal} from "../../common/js/store"
  import Bscroll from "better-scroll"
  import star from "../star/star.vue"
  import split from "../split/split.vue"

	export default{
    props:{
      seller:{
        type:Object
      }
    },
    data(){
      return{
        favorite:(()=>{
          return localFromLocal(this.seller.id,'favorite',false);
        })()
      }
    },
    components:{
      "v-star":star,
      "v-split":split
    },
    computed:{
      favoriteText(){
        return this.favorite?"已收藏":"未收藏";
      }
    },
    created(){
      //动态绑定class :class=classMap[0]==>:class=decrease
      this.classMap = ["decrease","discount","special","invoice","guarantee"]
    },
    /* seller数据是异步加载获取,watch监听seller这个数据，一旦seller数据发生变化，就立即调用seller内部定义的方法，这里是this._initScroll();
      和this._initPics();*/
    watch:{
      'seller'(){
        this.$nextTick(() => {
          this._initScroll();
          this._initPicslist();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPicslist();
      });
    },
    methods:{
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPicslist(){
        //初始化pics-list宽度
        if(this.seller.pics){
          let picWidth = 415;
          let marginRight = 12;
          let width = (picWidth + marginRight)*this.seller.pics.length - marginRight;
          this.$refs.picsList.style.width = width + "px";
          this.$nextTick(()=>{
            if(!this.picScroll){
              this.picScroll = new Bscroll(this.$refs.picsWrapper,{
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            }else{
              this.scroll.refresh();
            }
          });
        };
      },
      toggleFavorite(){
        this.favorite=!this.favorite;
        //存储商家id
        saveToLocal(this.seller.id,'favorite',this.favorite);
      }
    }
	}
</script>

<style scoped="scoped" lang="scss">
  @import '../../../static/css/px2rem.scss';
  $designWidth : 750;
  @import "../../common/style/base.scss";

  .seller{
    width:100%;
    position:absolute;
    top:px2rem(349);
    bottom: px2rem(0);
   /* bottom: px2rem(96);;*/
    overflow: hidden;
    .seller-content{
      .overView{
        position: relative;
        .title{
          margin:px2rem(36) px2rem(36) 0 px2rem(36);
          font-size:px2rem(28);
          line-height:px2rem(28);
          color:rgb(7,17,27);
        }
        .desc{
          margin:px2rem(16) px2rem(36) 0 px2rem(36);
          padding-bottom:px2rem(36);
          font-size:0;
          border-bottom:px2rem(1) solid rgba(7,17,27,0.1);
          .star{
            display:inline-block;
            margin-right:px2rem(16);
            vertical-align: top;
          }
          .rating-count{
            font-size:px2rem(20);
            line-height:px2rem(36);
            color:rgb(77,85,93);
            margin-right:px2rem(24);
          }
          .seller-count{}
          font-size:px2rem(20);
          line-height:px2rem(36);
          color:rgb(77,85,93);
        }
        .remark{
          display: flex;
          padding:px2rem(36) 0;
          .block{
            flex:1;
            text-align: center;
            border-right:px2rem(1) solid rgba(7,17,27,0.1);
            &:last-child{
              border-right:none;
            }
            .block-title{
              font-size:px2rem(20);
              line-height:px2rem(20);
              color:rgb(147,153,159);
            }
            .txt{
              margin-top:px2rem(8);
              font-size:px2rem(48);
              line-height:px2rem(48);
              color:rgb(7,17,27);
              font-weight: 200;
            }
          }
        }
        .favorite{
          position:absolute;
          top:px2rem(0);
          right:px2rem(36);
          text-align: center;
          .icon-favorite{
            font-size:px2rem(48);
            line-height:px2rem(48);
            color:rgba(7,17,27,0.5);
            &.active{
              color:rgb(240,20,20);
            }
          }
          .text{
            display: block;
            margin-top:px2rem(8);
            text-align: center;
            font-size:px2rem(20);
            line-height:px2rem(20);
            color:rgb(77,85,93);

          }
        }
      }
      .bulletin{
        .content-wrapper{
          padding:px2rem(36) px2rem(36) 0 px2rem(32);
          .title{
            font-size:px2rem(28);
            line-height:px2rem(28);
            color:rgb(7,17,27);
          }
          .text{
            padding:px2rem(16) px2rem(24) px2rem(32) px2rem(24);
            font-size:px2rem(24);
            line-height:px2rem(48);
            color:rgb(240,20,20);
            font-weight:200;
            border-bottom:px2rem(1) solid rgba(7,17,27,0.1);
          }
        }
      }
      .supports_lists{
        .item{
          margin:0 px2rem(36);
          padding: px2rem(32) px2rem(24);
          font-size:0;
          line-height: px2rem(32);
          border-bottom:px2rem(1) solid rgba(7,17,27,0.1);
          &:last-child{
            margin-bottom: 0;
            border-bottom:none;
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
      .seller-scene{
        padding:px2rem(36) 0 px2rem(36) px2rem(36);
        .title{
          margin-bottom:px2rem(24);
          font-size:px2rem(28);
          line-height:px2rem(28);
          color:rgb(7,17,27);
        }
        .pics-wrapper{
          width:100%;
          overflow: hidden;
          white-space: nowrap;
          .pics-list{
            font-size:0;
            .pic-item{
              display: inline-block;
              width:px2rem(240);
              height:px2rem(180);
              margin-right:px2rem(12);
              &:last-child{
                margin-right:0;
              }
              img{
                width:px2rem(240);
                height:px2rem(180);
              }
            }
          }
        }
      }
      .seller-info{
        width:100%;
        padding:px2rem(36) 0;
        .title{
          margin-left:px2rem(36);
          margin-bottom:px2rem(24);
          font-size:px2rem(28);
          line-height:px2rem(28);
          color:rgb(7,17,27);
        }
        .content-list{
          .item{
            margin:0 px2rem(36);
            padding:px2rem(32) px2rem(24);
            font-size:px2rem(24);
            line-height:px2rem(32);
            font-weight:200;
            color:rgb(7,17,2);
            border-top:px2rem(1) solid rgba(7,17,2,0.1);
          }
        }
      }
    }
  }
</style>
