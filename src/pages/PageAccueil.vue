<template>
  <div class="q-pa-md q-mx-auto template">
    <div class="btnAjoutTablBord">
      <!-- Input pour effectuer une recherche dans le tableau -->
      <q-input class="elementrecherche" color="grey-3" label-color="primary" outlined v-model="recherche" label="Recherche">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
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
  width: 70%
  margin-right: 10px

.styleBoutonAjoutTabl
  margin-right: 5px
  margin-bottom: 15px
  background: #DC006B

.template
  max-width: 1000px
</style>
