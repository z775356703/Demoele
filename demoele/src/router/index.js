import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/pages/goods/goods'
import ratings from '@/pages/ratings/ratings'
import seller from '@/pages/seller/seller'
Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [   
     {
      path: '/',
      redirect:'/goods'
    },
     {
      path: '/goods',
      name: 'goods',
      component: goods
    },
     {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
     {
      path: '/seller',
      name: 'seller',
      component: seller
    },
  ]
})
