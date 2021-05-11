import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
Vue.use(VueRouter)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  const rmCheck = document.getElementById('rememberMe'), emailInput = document.getElementById('email')
  if (localStorage.checkbox && localStorage.checkbox !== '') {
    rmCheck.setAttribute('checked', 'checked')
    emailInput.value = localStorage.username
  } else {
    rmCheck.removeAttribute('checked')
    emailInput.value = ''
  }

  function lsRememberMe () {
    if (rmCheck.checked && emailInput.value !== '') {
      localStorage.username = emailInput.value
      localStorage.checkbox = rmCheck.value
    } else {
      localStorage.username = ''
      localStorage.checkbox = ''
    }
  }
  exports.lsRememberMe = () => { lsRememberMe() }

  return Router
}
