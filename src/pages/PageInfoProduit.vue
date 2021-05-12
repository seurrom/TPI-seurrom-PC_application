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
        <q-input  class="element"  outlined  v-model="nomOfficiel"   label="Nom officiel"/>
        <q-input class="element" outlined v-model="nomAnglais"    label="Nom anglais"/>
        <q-input  class="element"  outlined  v-model="autreNom"      label="Autre nom"/>
        <q-input class="element" outlined v-model="autreNom2"     label="Autre nom 2"/>
        <!-- Liste déroulante pour les sortes de produits -->
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-select class="element"  outlined  v-model="sorteproduit"  label="Sorte de produit" :options="options"/>
        <q-select class="element"  outlined  v-model="concentration"  label="Concentration" :options="optionsConcentration"/>
        <q-select class="element"  outlined  v-model="famille"  label="Famille" :options="optionsFamille"/>
        <q-select class="element"  outlined  v-model="purete"  label="Pureté" :options="optionsPurete"/>
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-input class="element" outlined v-model="masseMolaire" type="masseMolaire" label="Masse molaire" suffix="g/mole" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
        <q-input class="element" outlined v-model="tempEbul" type="tempEbul" label="Température ébulition" suffix="g/mole" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
        <q-input class="element" outlined v-model="tempFusion" type="tempFusion" label="Température fusion" suffix="°C" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
        <q-input class="element" outlined v-model="densite" type="densite" label="Densité" suffix="g/ml" :rules="[val =>validateNumber(val) || 'Uniquement des chiffres']" lazy-rules/>
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-input class="element" outlined v-model="formBrute" type="formBrute" label="Formule brute" />
        <q-input class="element" outlined v-model="formDev" type="formDev" label="Formule développée" />
      </div>
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
        :data="data"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
      />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    clickMethod () {
      this.$router.push('accueil')
    },
    // Permet de refuser les caractère ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateNumber (number) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^-?\d+(\.\d+)?$/
      return re.test(String(number).toLowerCase())
    }
  },
  name: 'PageInfoProduit',
  data () {
    return {
      // Déclaration des variables
      text: '',
      ph: '',
      nomOfficiel: 'Hexanol',
      autreNom: 'Alcool hexylique',
      autreNom2: 'Alcool C6',
      nomAnglais: '1-hexanole',
      formBrute: 'C6H14O',
      formDev: 'CH3(CH2)5OH',
      famille: 'Alcool',
      concentration: 'Aucune',
      purete: 'Purum',
      tempEbul: '102.17',
      masseMolaire: '102.17',
      tempFusion: '-52',
      densite: '0.814',
      dense: false,
      group: null,
      sorteproduit: 'Minéral',
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
      // A
      // Affectation des colonnes
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Salle',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'quantite', align: 'center', label: 'Quantité', field: 'quantite', sortable: true }
      ],
      // Affectation des lignes des quantités et des salles
      data: [
        {
          name: 'A2',
          quantite: '5L'
        },
        {
          name: 'B4',
          quantite: '35L'
        },
        {
          name: 'B8',
          quantite: '1L'
        },
        {
          name: 'K56',
          quantite: '5L'
        },
        {
          name: 'S34',
          quantite: '67L'
        },
        {
          name: 'T6',
          quantite: '2L'
        }
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
