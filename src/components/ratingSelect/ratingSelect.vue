<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span @click="select(2)" class="block all" :class="{'active':selectType == 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active':selectType == 0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active':selectType == 1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
    </div>
    <div class="switch">
      <span @click="toggleContent" class="icon-check_circle" :class="{'on':onlyContent}"></span><span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default{
    name:"ratingSelect",
    props:{
      ratings:{
        type:Array,
        default(){
          return []
        }
      },
      selectType:{
        type:Number,
        default: ALL
      },
      onlyContent:{
        type:Boolean,
        default:false
      },
      desc:{
        type:Object,
        default(){
          return {
            "all":"全部",
            "positive":"满意",
            "negative":"不满意"
          }
        }
      }
    },
    methods:{
      select(type){
        //不能在子组件直接修改父组件props传过来的数据
        this.$emit('select-type',type);
      },
      toggleContent(){
        this.$emit('toggle');
      }
    },
    computed:{
      //计算满意（推荐评论数）
      positive(){
        let positives = [];
        for(let i=0;i<this.ratings.length;i++){
          if(this.ratings[i].rateType === POSITIVE){
            let post = this.ratings[i].rateType;
            positives.push(post);
          };
        };
        return positives;
      },
      //不满意（差评评论数）
      negative(){
    let negatives = [];
    for(let i=0;i<this.ratings.length;i++){
      if(this.ratings[i].rateType === NEGATIVE){
        let nega = this.ratings[i].rateType;
        negatives.push(nega);
      };
    };
    return negatives;
  }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  @import '../../../static/css/px2rem.scss';
  $designWidth : 750;
  @import "../../common/style/base.scss";

  .ratingSelect{
    width:100%;
    padding:px2rem(36) 0 0 0;
    .rating-type{
      margin: 0 px2rem(36);
      padding-bottom: px2rem(36);
      border-bottom:px2rem(1) solid rgba(7,27,27,0.1);
      .block{
        font-size:0;
        display: inline-block;
        padding:px2rem(16) px2rem(24);
        line-height:px2rem(32);
        margin-right:px2rem(16);
        border-radius: px2rem(2);
        text-align: center;
        font-size:px2rem(24);
        color:rgb(77,85,93);
        .count{
          font-size:px2rem(16);
          line-height:px2rem(32);
          margin-left:px2rem(12);
        }
        &:last-child{
          margin-right: 0;
        }
        &.active{
          color:#fff;
        }
      }
      .all{
        background: rgba(0,160,220,0.2);
        &.active{
          background: rgb(0,160,220);
        }
      }
      .positive{
        background: rgba(0,160,220,0.2);
        &.active{
          background: rgb(0,160,220)
        }
      }
      .negative{
        background: rgba(77,85,93,0.2);
        &.active{
          background: rgb(77,85,93);
        }
      }
    }
    .switch{
      width:100%;
      padding-top:px2rem(24);
      padding-bottom:px2rem(24);
      border-bottom: px2rem(2) solid rgba(7,17,27,0.1);
      .icon-check_circle{
        margin-left:px2rem(36);
        margin-right:px2rem(8);
        font-size:px2rem(48);
        color:rgb(143,157,159);
        line-height:px2rem(48);
        &.on{
          color:green;
        }
      }
      .text{
        vertical-align: top;
        font-size:px2rem(24);
        color:rgb(143,157,159);
        line-height:px2rem(48);
      }
    }
  }
</style>
