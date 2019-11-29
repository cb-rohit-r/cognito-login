import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login from '@/components/Login';
import Vuex from 'vuex'

import store from '../store/store'

Vue.use(Router);
Vue.use(Vuex)

const requiresAuth = true;

const router = new Router({
  mode: 'history',
  base: '/',
  fallback: true,
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresAuth,
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.isLoggedIn) {
//         next({
//           path: '/login',
//           params: { nextUrl: to.fullPath }
//         })
//     }
//   } else {
//     next()
//   } 
// });
export default router
