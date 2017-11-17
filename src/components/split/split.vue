<template>
  <div class="split">
  </div>
</template>

<script>
  import Vue from "vue";
  export default{
    name:"split"
  }
</script>

<style lang="scss" scoped="scoped">
  @import '../../../static/css/px2rem.scss';
  $designWidth : 750;
  @import "../../common/style/base.scss";

  .split{
    width:100%;
    height:px2rem(50);
    border-top:px2rem(1) solid #ccc;
    border-bottom:px2rem(1) solid #ccc;
    background: rgba(7,17,27,0.1);
  }
</style>
