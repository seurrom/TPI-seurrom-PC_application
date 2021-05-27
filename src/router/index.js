import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { LocalStorage } from 'quasar'
Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    // Récupère les données du localStorage
    const user = LocalStorage.getItem('user')
    // Si un utilisateur et un token exisent
    if (!user && to.path !== '/connexion') {
      // Redirige l'utilisateur la page de connexion
      next('/connexion')
    } else {
      // Sinon continue
      next()
    }
  })

  return Router
}
