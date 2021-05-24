import { api } from 'boot/axios'
import { Loading, LocalStorage } from 'quasar'

// State : données du magasin
const state = {
  user: null,
  token: null
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  connecterUtilisateur ({ commit, dispatch, state }, payload) {
    const that = this
    Loading.show()
    return api.post('/login', payload)
      .then(function (response) {
        console.log('CONNEXION OK', response)
        dispatch('setUser', response.data)
        commit('setUser', payload.email)
        LocalStorage.set('user', state.user)
        LocalStorage.set('token', state.token)
        dispatch('produits/getProduitsApi', null, { root: true })
        that.$router.push('/accueil')
        Loading.hide()
      })
      .catch(function (error) {
        Loading.hide()
        console.log(error.response)
        throw new Error('Identifiants invalides')
      })
  },
  setUser ({ commit, dispatch }, data) {
    // Sauvegarde les données de l'utilisater et le token dans le magasin
    commit('setUser', data.user)
    commit('setToken', data.token)
    // Redirige l'utilisateur vers la page des tâches
  },
  deconnecterUtilisateur ({ commit, state }) {
    Loading.show()
    const that = this
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + state.token }
    }
    // Déconnexion de l'API
    api.post('/logout', {}, config)
      .catch(function (error) {
        Loading.hide()
        console.log(error.response)
      })
      .finally(function () {
        // Réinitialise user et token
        commit('setUser', null)
        commit('setToken', null)
        // Vide le locaStorage
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        // Redirige l'utilisateur vers la page de connexion
        that.$router.push('/')
        // location.reload() // recharge la page du navigateur
        Loading.hide()
      })
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {

}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
