<template>
  <div class="q-pa-md">
    <div class="q-ml-xl">
      <div class="supprimer">
        <q-btn style="background: #DC006B" text-color="white" size="lg"  label="Supprimer" />
      </div>
      <div>
        <!-- Titre de la page -->
        <h6>Information du produit</h6>
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <!-- Input des informations du produit -->
        <q-input  class="element"   outlined  v-model="produit.nom_fr"    label="Nom officiel"/>
        <!-- <q-input class="element"    outlined v-model="getIdProduits[$route.params.id].nom_en"      label="Nom anglais"/> -->
        <!-- <q-input  class="element"   outlined  v-model="produits[$route.params.id - 1].autreNom"       label="Autre nom"/>
        <q-input class="element"    outlined v-model="produits[$route.params.id - 1].autreNom2"       label="Autre nom 2"/>
        Liste déroulante pour les sortes de produits -->
      </div>
      <!-- <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-select class="element"  outlined  v-model="produits[$route.params.id - 1].sorteproduit"   label="Sorte de produit"  :options="options"/>
        <q-select class="element"  outlined  v-model="produits[$route.params.id - 1].concentration"  label="Concentration"     :options="optionsConcentration"/>
        <q-select class="element"  outlined  v-model="produits[$route.params.id - 1].famille"        label="Famille"           :options="optionsFamille"/>
        <q-select class="element"  outlined  v-model="produits[$route.params.id - 1].purete"         label="Pureté"            :options="optionsPurete"/>
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-input class="element" outlined v-model="produits[$route.params.id - 1].masseMolaire"  label="Masse molaire"         suffix="g/mole" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
        <q-input class="element" outlined v-model="produits[$route.params.id - 1].tempEbul"      label="Température ébulition" suffix="g/mole" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
        <q-input class="element" outlined v-model="produits[$route.params.id - 1].tempFusion"    label="Température fusion"    suffix="°C"     :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
        <q-input class="element" outlined v-model="produits[$route.params.id - 1].densite"       label="Densité" suffix="g/ml"                 :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-input class="element" outlined v-model="produits[$route.params.id - 1].formBrute" label="Formule brute" />
        <q-input class="element" outlined v-model="produits[$route.params.id - 1].formDev"   label="Formule développée" />
        <q-select class="element"  outlined  v-model="produits[$route.params.id - 1].etat" label="État" :options="optionsEtat"/>
      </div> -->
      <div class="btnEnregistrer">
        <!-- Bouton enregistrer -->
        <q-btn style="background: #DC006B" text-color="white"  size="lg"  label="Enregistrer" @submit="clickMethod" />
      </div>
    </div>
    <div class="q-pa-md">
      <!-- Tableau pour la salle ainsi que la quantité -->
      <q-table
        style="width: 800px"
        title="Stockage"
        :data="produits"
        :columns="columns"
        row-key="salle"
        :pagination.sync="pagination"
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['auth']),
    ...mapState('produits', ['produits']),
    ...mapGetters('produits', ['getProduitById']),
    ...mapActions('produits', ['getProduitsApi'])
  },
  methods: {
    clickMethod () {
      this.$router.push('accueil')
    },
    // Permet de refuser les caractère ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateNumber (number) {
      const re = /^-?\d+(\.\d+)?$/
      return re.test(String(number).toLowerCase())
    }
  },
  updated () {
    console.log("I'M UPDATEEEEEEEEEED")
    this.produit = this.getProduitById(parseInt(this.$route.params.id))
  },
  name: 'PageInfoProduit',
  data () {
    return {
      produit: '',
      /* data: [
        {
          id: '1',
          name: '12030',
          ninterne: 300,
          nomOfficiel: 'Hexanol',
          nomAnglais: '1-hexanole',
          autreNom: 'Alcool hexylique',
          autreNom2: 'Alcool C6',
          sorteProduit: 'Minéral',
          concentration: 'Aucune',
          famille: 'Alcool',
          purete: 'Purum',
          masseMolaire: '102.17',
          tempEbul: '102.17',
          tempFusion: '-52',
          densite: '0.814',
          formBrute: 'C6H14O',
          formDev: 'CH3(CH2)5OH',
          etat: 'Commande en cours',
          salle: ['A2'],
          quantite: ['B7']
        },
        {
          id: '2',
          name: '12030',
          ninterne: 300,
          nomOfficiel: 'Dioxame',
          nomAnglais: '1-hexanole',
          autreNom: 'Alcool hexylique',
          autreNom2: 'Alcool C6',
          sorteProduit: 'Minéral',
          concentration: 'Aucune',
          famille: 'Alcool',
          purete: 'Purum',
          masseMolaire: '102.17',
          tempEbul: '102.17',
          tempFusion: '-52',
          densite: '0.814',
          formBrute: 'C6H14O',
          formDev: 'CH3(CH2)5OH',
          etat: '',
          salle: ['A2'],
          quantite: ['B7']
        },
        {
          id: '3',
          name: '12030',
          ninterne: 300,
          nomOfficiel: 'Alcool',
          nomAnglais: '1-hexanole',
          autreNom: 'Alcool hexylique',
          autreNom2: 'Alcool C6',
          sorteProduit: 'Minéral',
          concentration: 'Aucune',
          famille: 'Alcool',
          purete: 'Purum',
          masseMolaire: '102.17',
          tempEbul: '102.17',
          tempFusion: '-52',
          densite: '0.814',
          formBrute: 'C6H14O',
          formDev: 'CH3(CH2)5OH',
          etat: '',
          salle: ['A2'],
          quantite: ['B7']
        },
        {
          id: '4',
          name: '12030',
          ninterne: 300,
          nomOfficiel: 'Chimie',
          nomAnglais: '1-hexanole',
          autreNom: 'Alcool hexylique',
          autreNom2: 'Alcool C6',
          sorteProduit: 'Minéral',
          concentration: 'Aucune',
          famille: 'Alcool',
          purete: 'Purum',
          masseMolaire: '102.17',
          tempEbul: '102.17',
          tempFusion: '-52',
          densite: '0.814',
          formBrute: 'C6H14O',
          formDev: 'CH3(CH2)5OH',
          etat: 'Quantité de produit faible',
          salle: ['A2'],
          quantite: ['B7']
        },
        {
          id: '5',
          name: '354345',
          ninterne: 3455,
          nomOfficiel: 'Produit chimique',
          nomAnglais: '1-hexanole',
          autreNom: 'Alcool hexylique',
          autreNom2: 'Alcool C6',
          sorteProduit: 'Minéral',
          concentration: 'Aucune',
          famille: 'Alcool',
          purete: 'Purum',
          masseMolaire: '102.17',
          tempEbul: '102.17',
          tempFusion: '-52',
          densite: '0.814',
          formBrute: 'C27H0',
          formDev: 'CH3(CH2)5OH',
          etat: '',
          salle: ['A2'],
          quantite: ['B7']
        },
        {
          id: '6',
          name: '23434',
          ninterne: 78667,
          nomOfficiel: 'Cindy',
          nomAnglais: '1-hexanole',
          autreNom: 'Alcool hexylique',
          autreNom2: 'Alcool C6',
          sorteProduit: 'Minéral',
          concentration: 'Aucune',
          famille: 'Alcool',
          purete: 'Purum',
          masseMolaire: '102.17',
          tempEbul: '102.17',
          tempFusion: '-52',
          densite: '0.814',
          formBrute: 'C6H14O',
          formDev: 'CH3(CH2)5OH',
          etat: 'Commande en cours',
          salle: ['A2'],
          quantite: ['B7']
        },
        {
          id: '7',
          name: '342234',
          ninterne: 76567,
          nomOfficiel: 'Charbon',
          nomAnglais: '1-hexanole',
          autreNom: 'Alcool hexylique',
          autreNom2: 'Alcool C6',
          sorteProduit: 'Minéral',
          concentration: 'Aucune',
          famille: 'Alcool',
          purete: 'Purum',
          masseMolaire: '102.17',
          tempEbul: '102.17',
          tempFusion: '-52',
          densite: '0.814',
          formBrute: 'C6H14O',
          formDev: 'CH3(CH2)5OH',
          etat: 'Quantité de produit faible',
          salle: ['A2'],
          quantite: ['B7']
        }
      ],
      */
      // Déclaration des variables
      dense: false,
      group: null,
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
      // Affectation des colonnes
      columns: [
        {
          name: 'salle',
          required: true,
          label: 'Salle',
          align: 'center',
          field: row => row.salle,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'quantite', align: 'center', label: 'Quantité', field: 'quantite', sortable: true }
      ]
    }
  }
}
</script>
<style scoped lang="sass">
  .btnEnregistrer
    text-align: right
  .infoProduit

    display: block
  .element
    display: inline-block
  .supprimer
    text-align: right
  .q-input, .q-select
    width: 250px
    height: 80px
</style>
