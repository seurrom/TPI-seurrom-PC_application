<template>
  <div class="q-pa-md">
    <div class="btnAjoutTablBord">
      <!-- Boutons "ajouter" et "tableau de bord" -->
      <q-btn class="styleBoutonAjoutTabl" @click="ajout"      text-color="white" label="Ajouter"/>
      <q-btn class="styleBoutonAjoutTabl" @click="tablbord"   text-color="white" label="Tableau de bord"/>
    </div>
    <div class="recherche q-gutter-md row items-start">
      <img src="~assets/recherche.png" class="imgrecherche">
      <!-- Input pour effectuer une recherche dans le tableau -->
      <q-input class="elementrecherche" v-model="recherche" label="Recherche" />
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
      recherche: '',
      // Permet d'afficher + d'éléments dans le tableau
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      }
    }
  },
  methods: {
    // Navigation
    ajout () {
      this.$router.push('/ajout')
    },
    tablbord () {
      this.$router.push('tablbord')
    },
    // Permet de filter avec majuscule ou sans accent
    filterFn () {
      /* https://www.davidbcalhoun.com/2019/matching-accented-strings-in-javascript/ */
      if (this.recherche !== '') {
        const normalizedRecherche = this.recherche.normalize('NFD').toLowerCase().replace(/[\u0300-\u036f]/g, '')
        return this.produits.produits.filter(v => this.normalizeInput(v.nom_fr).indexOf(normalizedRecherche) > -1 ||
        this.normalizeInput(v.num_cas.toString()).indexOf(normalizedRecherche) > -1 ||
        this.normalizeInput(v.num_interne.toString()).indexOf(normalizedRecherche) > -1 ||
        this.normalizeInput(v.formule).indexOf(normalizedRecherche) > -1)
      }
    },
    normalizeInput (input) {
      return input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    }
  }
}
</script>

<style scoped lang="sass">
.btnAjoutTablBord
  text-align: right

.recherche
  text-align: center
  display: block
  margin-top: 0.3%
  margin-bottom: 3%

.elementrecherche
  display: inline-block

.imgrecherche
  margin: 0px
  width: 25px
  height: 25px
  vertical-align: middle

.styleBoutonAjoutTabl
  margin-right: 5px
  background: #DC006B
</style>
