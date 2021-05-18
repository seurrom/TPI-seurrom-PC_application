import { api } from 'boot/axios'

// State : données du magasin
const state = {
  produit: [],
  produitChargees: false
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setTaches (state, taches) {
    state.taches = taches
  },
  setproduitChargees (state, valeur) {
    state.produitChargees = valeur
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getProduitApi ({ commit, rootState }) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api.get('/produit', config)
      .then(function (response) {
        commit('setProduit', response.data)
        commit('setProduitChargees', true)
      })
      .catch(function (error) {

      })
  },
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  // Prend le state comme 1er paramètre
  taches: (state) => {
    return state.taches
  }
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
