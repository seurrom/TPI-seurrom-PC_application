<template>
  <div class="q-pa-md">
    <div class="btnAjoutTablBord">
       <img src="~assets/recherche.png" class="imgrecherche">
      <!-- Input pour effectuer une recherche dans le tableau -->
      <q-input class="elementrecherche" v-model="recherche" label="Recherche" />
      <!-- Boutons "ajouter" et "tableau de bord" -->
      <q-btn class="styleBoutonAjoutTabl" to="/ajout" text-color="white" label="Ajouter"/>
      <q-btn class="styleBoutonAjoutTabl" to="/tablbord"   text-color="white" label="Tableau de bord"/>
    </div>
    <TableauProduits :recherche="recherche"></TableauProduits>
  </div>
</template>

<script>
import TableauProduits from 'src/components/Tableauproduits.vue'
export default {
  // Nom de la page
  name: 'PageAccueil',
  components: {
    TableauProduits
  },
  data () {
    return {
      // Déclaration des variables
      recherche: ''
    }
  }
}
</script>

<style scoped lang="sass">

.recherche
  text-align: center
  display: block
  margin-top: 0.3%
  margin-bottom: 3%

.elementrecherche
  display: inline-block
  width: 80%
  margin-right: 10px

.imgrecherche
  margin: 0px
  width: 25px
  height: 25px
  vertical-align: middle

.styleBoutonAjoutTabl
  margin-right: 5px
  background: #DC006B
</style>
