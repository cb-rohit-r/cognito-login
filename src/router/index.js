import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login2 from '@/components/Login2';
import Vuex from 'vuex'

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
      name: 'Login2',
      component: Login2
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     console.log(store.state.isLoggedIn)
//     if (!store.state.isLoggedIn) {
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
