import Vue from 'vue'
import Vuex from 'vuex'
// Importe le store produit en lui donnant un nom
import produits from './store-produit'
// Importe le store auth en lui donnant un nom
import auth from './store-auth'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // Permet de lier le magasin store auth à l'application
      auth,
      // Permet de lier le magasin store produits à l'application
      produits
    },
    strict: process.env.DEV
  })

  return Store
}
