import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// import connexion from './connexion'
Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    // connexion,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  return Router
}
