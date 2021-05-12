/* import { Loading, LocalStorage } from 'quasar'

// State : données du magasin
const state = {
  user: null,
  token: null
}
const mutations = {
  setUser ({ commit, dispatch, state }, data) {
    // Sauvegarde, commite, les données dans le magasin
    commit('setUser', data.user)
    commit('setToken', data.access_token)
    // Sauvegarde les données de l'utilisateur dans le localStorage
    LocalStorage.set('user', state.user)
    LocalStorage.set('token', state.token)
    // Redirige l'utilisateur vers la page des tâches
    this.$router.push('accueil')
    // Cache la fenêtre de chargement
    Loading.hide()
  },
  setToken (state, token) {
    state.token = token
  }
}
const actions = {
  setUser ({ commit, dispatch }, data) {
    commit('setUser', data.user)
    commit('setToken', data.access_token)
    this.$router.push('/')
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
*/
