import { api } from 'boot/axios'

// State : données du magasin
const state = {
  produits: []
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  setProduits (state, produits) {
    state.produits = produits
  },
  setStocks (state, stock) {
    state.stock = stock
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  getProduitsApi ({ commit, rootState }) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api.get('/produits', config)
      .then(function (response) {
        commit('setProduits', response.data)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  },
  ajouterProduit ({ commit, rootState }) {
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    // API
    api.post('/produits', config)
      .then(function (response) {
        // Ajoute le stockage retournée par l'API au magasin
        console.log('cc2')
        commit('setProduits', response.data)
        console.log(response)
        console.log('OK')
      })
      .catch(function (error) {
        console.log(error.response)
      })
      .finally()
  },
  getStocksApi ({ commit, rootState }, id) {
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    api.get('/produits/' + id + '/stock', config)
      .then(function (response) {
        commit('setStocks', response.data)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  },
  ajouterStockage ({ commit, rootState }, id) {
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    // API
    api.post('/produits/' + id + '/stock', config)
      .then(function (response) {
        // Ajoute le stockage retournée par l'API au magasin
        commit('ajouterStockage', response.data)
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.response)
      })
      .finally()
  },
  supprimerProduit ({ commit, rootState }, id) {
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }

    api.delete('/produits/' + id, config)
      .then(function (response) {
        commit('supprimerProduit', id)
      })
      .catch(function (error) {
        console.log(error.response)
      })
      .finally()
  },
  modifierProduit ({ commit, rootState }, id) {
    // Configuration du header avec token
    const config = {
      headers: { Authorization: 'Bearer ' + rootState.auth.token }
    }
    // API
    api.put('/produits/' + id, config)
      .then(function (response) {
        // Ajoute les modifications par l'API au magasin
        commit('modifierProduit', response.data)
        console.log(response)
        console.log('OK')
      })
      .catch(function (error) {
        console.log(error.response)
      })
      .finally()
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  // Prend le state comme 1er paramètre
  produits: (state) => {
    return state.produits
  },
  getProduitById: (state) => (id) => {
    return state.produits.produits.find(prod => prod.id === id)
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
