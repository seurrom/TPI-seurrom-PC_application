<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar style="background: #DC006B">
        <q-btn @click="retour" size="lg">
          <img src="~assets/back.png" width="10" height="18">
        </q-btn>
        <q-toolbar-title class="flex flex-center" style="background: #DC006B">
          Gestion des produits
        </q-toolbar-title>
        <q-btn @click="deconnexion" size="lg">
          <img src="~assets/deconnexion.png" width="22" height="18">
        </q-btn>
      </q-toolbar>
      <q-toolbar style="background: #DC006B">
        <q-toolbar-title class="flex flex-center" style="background: #DC006B">
          Produit
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'ProduitLayout',
  data () {
  }
}
</script>
