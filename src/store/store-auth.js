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
  // Permet de connecter l'utilisateur grâce à la méthode POST
  connecterUtilisateur ({ commit, dispatch, state }, payload) {
    const that = this
    // Affiche le logo de chargement
    Loading.show()
    return api.post('/login', payload)
      .then(function (response) {
        dispatch('setUser', response.data)
        // Commit l'utilisateur
        commit('setUser', payload.email)
        // Stock dans le Local Storage l'utilisateur et le token
        LocalStorage.set('user', state.user)
        LocalStorage.set('token', state.token)
        // Appelle l'action getProduitsApi afin de récupérer les produits de l'API
        dispatch('produits/getProduitsApi', null, { root: true })
        // Envoie l'utilisateur sur la page d'accueil
        that.$router.push('/')
        // Cache le logo de chargement
        Loading.hide()
      })
      .catch(function () {
        // Cache le logo de chargement
        Loading.hide()
        // En cas d'erreur affiche le message suivant
        throw new Error('Identifiants invalides')
      })
  },
  setUser ({ commit, dispatch }, data) {
    // Sauvegarde les données de l'utilisater et le token dans le magasin
    commit('setUser', data.user)
    commit('setToken', data.token)
  },
  // Permet de déconnecter un utilisateur
  deconnecterUtilisateur ({ commit, state }) {
    // Affiche le logo
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
        that.$router.push('/connexion')
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
