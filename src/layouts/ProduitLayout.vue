<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar style="background: #DC006B">
        <!-- Bouton permettant d'aller sur la page "Accueil" -->
        <q-btn class="boxshadow" @click="accueil" size="lg">
          <img src="~assets/back.png" width="12 " height="18">
        </q-btn>
        <q-toolbar-title class="flex flex-center" style="background: #DC006B">
          Gestion des produits
        </q-toolbar-title>
        <!-- Bouton de déconnexion -->
        <q-btn class="boxshadow" @click="deconnecter" size="lg">
          <img src="~assets/deconnexion.png" width="22" height="18">
        </q-btn>
      </q-toolbar>
      <q-toolbar style="background: #DC006B">
        <q-toolbar-title class="flex flex-center" style="background: #DC006B">
          <!-- Affiche selon la page un titre différent -->
          {{ $route.meta.titrePage }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ProduitLayout',
  computed: {
    ...mapActions('auth', ['deconnecterUtilisateur'])
  },
  // Methéode permettant la navigation entre les pages
  methods: {
    accueil () {
      this.$router.push({ path: '/accueil' })
    },
    deconnecter () {
      this.deconnecterUtilisateur()
    }
  }
}
</script>

<style scoped>
  .boxshadow
  ::before {
    content: none;
  }
</style>
