<template>
  <!--评价页-->
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
      <div class="overView">
        <div class="overView-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overView-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <v-star :size="36" :score="seller.serviceScore"></v-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <v-star :size="36" :score="seller.foodScore"></v-star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">送达时间</span>
            <span class="score">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingSelect @select-type='onSelectType' @toggle="toggleContent" :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent"></v-ratingSelect>
      <div class="ratings-list">
        <ul class="list">
          <li class="rating-item"  v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings">
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="username">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="36" :score="rating.score"></v-star>
                <span class="deliveryTime" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommond" v-show="rating.recommend && rating.recommend.length">
                <span :class="{'icon-thumb_down':rating.rateType == 1,'icon-thumb_up':rating.rateType == 0}"></span>
                <span class="txt" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
	</div>
</template>

<script>
  import Bscroll from "better-scroll"
  import star from "../star/star"
  import split from "../split/split.vue"
  import ratingSelect from "../ratingSelect/ratingSelect"
  import {formatDate} from "../../common/js/date";

  const ALL = 2;
  const ERR_OK = 0;
	export default{
    name:"ratings",
    data(){
      return {
        selectType:ALL,
        onlyContent:false,
        ratings:[]
      }
    },
    props:{
      seller:{
        type:Object
      }
    },
    components:{
      "v-star":star,
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
    created(){
      this.$http.get("/api/ratings").then( (res) =>{
        res = res.body;
        if(res.errno == ERR_OK){
         this.ratings = res.data;
        };
        this.$nextTick(()=>{
          this.scroll = new Bscroll(this.$refs.ratings,{
            click:true
          })
        })
        //console.log(this.ratings);
      })
    },
    methods:{
      //监听子组件数据变化
      onSelectType (type) {
        this.selectType = type;
        //子组件数据变化dom未发生改变 因此在$nextTick里执行从新计算
        this.$nextTick(()=>{
          this.scroll.refresh();
        });
      },
      toggleContent(){
        this.onlyContent = !this.onlyContent;
        this.$nextTick(()=>{
          this.scroll.refresh();
        });
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

<style scoped="scoped" lang="scss">
  @import '../../../static/css/px2rem.scss';
  $designWidth : 750;
  @import "../../common/style/base.scss";

  .ratings{
    width:100%;
    position:absolute;
    top:px2rem(349);
    bottom: px2rem(0);
    /*bottom: px2rem(96);*/
    overflow: hidden;
    .ratings-content{
      .overView{
        display: flex;
        .overView-left{
          flex:0 0 px2rem(257);
          margin:px2rem(36) 0;
          border-right:px2rem(1) solid rgba(7,17,27,0.1);
          text-align: center;
          .score{
            font-szie:px2rem(48);
            line-height:px2rem(56);
            color:rgb(255,153,0);
            text-align: center;
            margin-bottom:px2rem(12);
          }
          .title{
            font-size:px2rem(24);
            line-height:px2rem(24);
            margin-bottom:px2rem(16);
            color:rgb(7,17,27);
          }
          .rank{
            font-size:px2rem(20);
            line-height:px2rem(20);
            margin-bottom:px2rem(12);
          }
        }
        .overView-right{
          font-size:0;
          flex:1;
          margin-top:px2rem(36);
          .score-wrapper{
            margin-bottom:px2rem(16);
            text-align: left;
            .title{
              font-size:px2rem(24);
              line-height:px2rem(36);
              margin-left:px2rem(48);
              margin-right:px2rem(24);
              vertical-align: top;
            }
            .star{
              display: inline-block;
              margin-right:px2rem(24);
              vertical-align: top;
            }
            .score{
              font-size:px2rem(24);
              line-height:px2rem(36);
              color:rgb(255,153,0);
              vertical-align: top;
            }
          }
        }
      }
      .ratings-list{
        .list{
          .rating-item{
            position: relative;
            display: flex;
            padding:px2rem(36) 0;
            margin:0 px2rem(36);
            border-bottom:px2rem(1) solid rgba(7,17,27,0.1);
            .avatar{
              flex: 0 0 px2rem(56);
              margin-right:px2rem(24);
              img{
                width:px2rem(56);
                height:px2rem(56);
                border-radius:50%;
              }
            }
            .content{
              .username{
                font-size:px2rem(20);
                line-height:px2rem(24);
                color:rgb(7,17,27);
              }
              .star-wrapper{
                margin-top:px2rem(8);
                .star{
                  display: inline-block;
                }
                .deliveryTime{
                  font-size:px2rem(20);
                  line-height:px2rem(24);
                  color:rgb(147,153,159);
                  font-weight:200;
                  vertical-align: middle;
                }
              }
              .text{
                margin-top:px2rem(12);
                font-size:px2rem(24);
                line-height:px2rem(36);
                color:rgb(7,17,27);
              }
              .recommond{
                font-size:0;
                margin-top:px2rem(16);
                .icon-thumb_down{
                  font-size:px2rem(24);
                  color:rgb(183,187,191);
                  line-height:px2rem(32);
                }
                .icon-thumb_up{
                  font-size:px2rem(24);
                  color:rgb(0,160,220);
                  line-height:px2rem(32);
                }
                .txt{
                  margin-left:px2rem(16);
                  padding:0 px2rem(12);
                  font-size:px2rem(18);
                  color:rgb(147,153,159);
                  line-height:px2rem(32);
                  border:px2rem(1) solid rgba(7,17,27,0.1);
                }
              }
              .time{
                position: absolute;
                top:px2rem(36);
                right:0;
                font-size:px2rem(20);
                line-height:px2rem(24);
                color:rgb(147,153,159);
                font-weight:200;
              }
            }
          }
        }
      }
    }
  }
</style>
