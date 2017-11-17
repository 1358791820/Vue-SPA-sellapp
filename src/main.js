// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import router from './router'
import VueRouter from 'vue-router'
import VueResousrce from "vue-resource"
Vue.use(VueResousrce)
Vue.use(VueRouter)

import sellerView from "./components/seller/sellerView.vue"
import goodsView from "./components/goods/goodsView.vue"
import ratingsView from "./components/ratings/ratingsView.vue"

//根据svg生成的图标
import "./common/style/icon.css"
//font-awesome
import 'font-awesome/css/font-awesome.css'


// 定义路由
const routes = [
  { path: '/goods', component: goodsView },
  { path: '/seller', component: sellerView },
  {path: '/ratings',component:ratingsView},
	{path: '*',redirect:'/goods'}//重定向
];

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes,
  linkActiveClass:"active"
});


Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})


//new Vue({
//	//el: '#app',
//	router,
//	render: h => h(App)
//			 /*render: x => x(App)
//			 这里的render: x => x(App)是es6的写法
//			 转换过来就是：  暂且可理解为是渲染App组件
//			 render:(function(x){
//			  return x(App);
//			 });*/
//})

/*new Vue({
	//el: '#app',
	router,
	template: '<App/>',
	components: { App }
}).$mount("#app");*/

