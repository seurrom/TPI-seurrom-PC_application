<template>
<div>
  <div class="q-gutter-md row items-start infoProduit q-pb-md">
    <!-- Affiche toutes les informations détaillées d'un produit -->
    <q-input  class="element"   outlined  v-model="produit.nom_fr"        label="Nom officiel"/>
    <q-input class="element"    outlined v-model="produit.nom_en"  label="Nom anglais"/>
    <q-input  class="element"   outlined  v-model="produit.autre_nom"       label="Autre nom"/>
  </div>
  <div class="q-gutter-md row items-start infoProduit q-pb-md">
    <q-input class="element"    outlined v-model="produit.autre_nom2"       label="Autre nom 2"/>
    <q-select class="element"  outlined  v-model="produit.sorte_produit"   label="Sorte de produit"  :options="options"/>
    <q-select class="element"  outlined  v-model="produit.concentration"  label="Concentration"     :options="optionsConcentration"/>
  </div>
  <div class="q-gutter-md row items-start infoProduit q-pb-md">
    <q-select class="element"  outlined  v-model="produit.famille.nom"        label="Famille"           :options="optionsFamille"/>
    <q-select class="element"  outlined  v-model="produit.purete"         label="Pureté"            :options="optionsPurete"/>
    <q-input class="element" outlined v-model="produit.masse_molaire"  label="Masse molaire"         suffix="g/mole" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
  </div>
  <div class="q-gutter-md row items-start infoProduit q-pb-md">
    <q-input class="element" outlined v-model="produit.temp_ebulition"      label="Température ébulition" suffix="g/mole" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
    <q-input class="element" outlined v-model="produit.temp_fusion"    label="Température fusion"    suffix="°C"     :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
    <q-input class="element" outlined v-model="produit.densite"       label="Densité" suffix="g/ml"                 :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
    <q-input class="element" outlined v-model="produit.formule" label="Formule brute" />
    <q-input class="element" outlined v-model="produit.formule_developee"   label="Formule développée" />
    <q-input class="element"  outlined v-model="produit.etat" label="État" disable/>
  </div>
   <div class="q-gutter-md row items-start infoProduit q-pb-md">
    <q-input class="element" outlined v-model="produit.formule" label="Formule brute" />
    <q-input class="element" outlined v-model="produit.formule_developee"   label="Formule développée" />
    <q-input class="element"  outlined v-model="produit.etat" label="État" disable/>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  // Appelle toutes les fonctionnalités des magasins utiles
  computed: {
    ...mapState('auth', ['auth']),
    ...mapState('produits', ['produits']),
    ...mapGetters('produits', ['getProduitById'])
  },
  methods: {
    // Appelle l'action getProduitsApi
    ...mapActions('produits', ['getProduitsApi']),
    ...mapActions('produits', ['supprimerProduit']),
    ...mapActions('produits', ['ajouterStockage']),
    // Permet de refuser les caractères ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateNumber (number) {
      const re = /^-?\d+(\.\d+)?$/
      return re.test(String(number).toLowerCase())
    }
  },
  // Appelle les produits de l'API avant que l'écran ne soit monté
  beforeMount () {
    this.getProduitsApi()
  },
  // Appelle les produits par l'ID fournit en paramètre pendant que l'écran soit monté
  mounted () {
    this.produit = this.getProduitById(parseInt(this.$route.params.id))
  },
  name: 'PageInfoProduit',
  data () {
    return {
      // Déclaration des variables
      produit: '',
      dense: false,
      group: null,
      show_dialog: false,
      show_dialog_supprimer: false,
      editedIndex: -1,
      editedItem: {
        salle: '',
        quantite: 0
      },
      defaultItem: {
        salle: '',
        quantite: 0
      },
      // Permet d'afficher plus d'élément dans le tableau
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      },
      // Option de la liste déroulante
      options: [
        'Minéral', 'Organique', 'Solution'
      ],
      optionsFamille: [
        'Acide', 'Acide aminé', 'Acide minéral', 'Alcool', 'Aldéhyde', 'Amide', 'Amine', 'Aucune', 'Cétone', 'Chimie minérale', 'Composé inorganique', 'Composé minéral', 'composé organique',
        'Déviré nitré', 'Détergent', 'Ester', 'Ester de glycérine', 'Ether', 'Fixanal', 'Gaz', 'Hydrate de carbone', 'Hydrocarbure', 'Hydrocarbure halogéné', 'Indicateur',
        'Mélange', 'Phénol', 'Polyol', 'Radioactif', 'Savon/Détergent', 'Sel', 'Sel double', 'Solution', 'Solution tritisol', 'Titrisol'
      ],
      optionsConcentration: [
        '0.00075M', '0.0002M', '0.001M', '0.002M', '0.005M', '0.008M', '0.01%', '0.01M', '0.025M', '0.02M', '0.04%', '0.04M', '0.05%', '0.05M', '0.1%', '0.12M', '0.15M', '0.1N', '0.2%',
        '0.25M', '0.2M', '0.3%', '0.3M', '0.4M', '0.5%', '0.5M', '0.6M', '0.7M', '1%', '1.25%', '1.5M', '1.75M', '1/1', '1/128M', '1/15M', '1/60', '10%', '10.8M', '100%', '10M',
        '12%', '12M', '130%', '15%', '16%', '1M', '2%', '2.2M', '2.5%', '20%', '23.5M', '23%', '24%', '2M', '3%', '30%', '32%', '36%', '37%', '3M', '4%', '40%', '45%', '48%', '5%',
        '50%', '55%', '5M', '60%', '66%', '6M', '7.5M', '75%', '7M', '8%', '80%', '85%', '95-97%', '98%', '99%', 'Aucune', 'Concentré', 'Saturé'
      ],
      optionsPurete: [
        'Aucune', 'Pour analyse', 'Pour synthèse', 'Pour usage biochimique', 'Puriss', 'Purum', 'Redistillé', 'Technique'
      ],
      optionsEtat: [
        'Commande en cours', 'Quantité de produit faible'
      ],
      // optionsArmoires: [
      //  'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'H1', 'H2', 'C1 - E1', 'C1 - E2', 'C1 - E3', 'C1 - E4', 'C1 - E5', 'C1 - E6', 'C2 - E1', 'C2 - E2', 'C2 - E3', 'C2 - E4', 'C2 - E5', 'C2 - E6'
      // ],
      // Affectation des colonnes
      columns: [
        {
          name: 'salle',
          required: true,
          label: 'Armoire',
          align: 'center',
          field: row => row.salle,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'quantite', align: 'center', label: 'Quantité', field: row => row.quantite, sortable: true }
      ]
    }
  }
}
</script>
<style scoped lang="sass">
  .infoProduit
    display: block
  .element
    display: inline-block
  .q-input, .q-select
    width: 250px
    height: 80px
</style>
