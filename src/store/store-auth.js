import { api } from 'boot/axios'
import { Loading, LocalStorage } from 'quasar'
import { afficherMessageErreur } from 'src/fonctions/message-erreur'

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
  connecterUtilisateur ({ commit, dispatch }, payload) {
    // Affiche le logo de chargement
    Loading.show()
    api.post('/login', payload)
      .then(function (response) {
        dispatch('setUser', response.data)
        console.log(response.data)
        // Appelle l'action getProduitsApi afin de récupérer les produits de l'API
        dispatch('produits/getProduitsApi', null, { root: true })
        // Cache le logo de chargement
        Loading.hide()
      })
      .catch(function (error) {
        // Cache le logo de chargement
        Loading.hide()
        // En cas d'erreur affiche le message suivant
        afficherMessageErreur(
          'Adresse e-mail et/ou mot de passe invalide(s) !'
        )
        throw error
      })
  },
  setUser ({ commit, dispatch, state }, data) {
    // Sauvegarde les données de l'utilisateur et le token dans le magasin
    commit('setUser', data.user.email)
    commit('setToken', data.token)
    // Stock dans le Local Storage l'utilisateur et le token
    LocalStorage.set('user', state.user)
    LocalStorage.set('token', state.token)
    // Envoie l'utilisateur sur la page d'accueil
    this.$router.push('/')
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
        afficherMessageErreur(
          'Déconnexion invalide !'
        )
        throw error
      })
      .finally(function () {
        // Réinitialise user et token
        commit('setUser', null)
        commit('setToken', null)
        // Vide le locaStorage
        LocalStorage.clear()
        // Redirige l'utilisateur vers la page de connexion
        that.$router.push('/connexion')
        // location.reload() // recharge la page du navigateur
        Loading.hide()
        console.log('déconnexion ok')
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
