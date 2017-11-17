<template>
  <div id="app">
    <div class="header">
      <v-header :seller = "seller"></v-header>
    </div>
    <div class="tab">
      <div class="tab_item">
      	<router-link to="/goods">商品</router-link>
      </div>
      <div class="tab_item">
      	<router-link to="/seller">商家</router-link>
      </div>
      <div class="tab_item">
      	<router-link to="/ratings">评价</router-link>
      </div>
    </div>
    <keep-alive>
    <router-view :seller = "seller" keep-alive></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  //解析url参数方法
  import {urlParse} from "./common/js/util"
  import header from "./components/header/header.vue"

	const ERR_OK = 0;
  export default {
    name: 'app',
    components: {
      "v-header": header
    },
    data(){
    	return {
    		seller:{
    		  id:(() =>{
    		    let queryParam = urlParse();
    		    return queryParam.id;
          })()
        },
    		goods:[],
    		ratings:{}
    	}
    },
    created(){
    	this.$http.get("/api/seller?id='+ this.seller.id + '").then( (res) =>{
    		res = res.body;
    		if(res.errno == ERR_OK){
          /*解析url，得到商家信息，包括id，name，在获取数据时，直接赋值，商家的id或name会被丢掉
          Object.assign(),拓展机制，不会覆盖原有数据*/
          this.seller = Object.assign({},this.seller,res.data);
    		}
    	});

      this.$http.get("/api/goods").then( (res) =>{
        res = res.body;
        if(res.errno == ERR_OK){
          this.goods = res.data;
        }
      });

    }
  }


</script>

<style lang="scss"  scoped>
	@import '../static/css/px2rem.scss';
	$designWidth : 750;

	body{
    width:100%;
    height:100%;
    margin:0;
    padding:0;
	}

	#app{
		.tab{
			display: flex;
      width: 100%;
      height:px2rem(80);
    	border-bottom: px2rem(1) solid rgba(7,17,27,0.1);
    	line-height: px2rem(80);
      .tab_item{
      	flex: 1;
      	text-align: center;

      	a{
      		display:block;
        	color:rgb(77,85,93);
        	font-size:px2rem(28);
        	&.active{
        		color:rgb(240,20,20);
        	}
      	}
      }
		}
	}

</style>
