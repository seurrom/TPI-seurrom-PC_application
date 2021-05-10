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
        <q-input  class="element"  outlined  v-model="famille"       label="Famille"/>
        <q-input  class="element"  outlined  v-model="autreNom"      label="Autre nom"/>
        <!-- Liste déroulante pour les sortes de produits -->
        <q-select class="element"  outlined  v-model="sorteproduit"  label="Sorte de produit" :options="options"/>
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-input class="element" outlined v-model="concentration" label="Concentration"/>
        <q-input class="element" outlined v-model="autreNom2"     label="Autre nom 2"/>
        <q-input class="element" outlined v-model="purete"        label="Pureté"/>
        <q-input class="element" outlined v-model="nomAnglais"    label="Nom anglais"/>
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-input class="element" outlined v-model="masseMolaire" type="masseMolaire" label="Masse molaire" suffix="g/mole" />
        <q-input class="element" outlined v-model="formBrute" type="formBrute" label="Formule brute" />
        <q-input class="element" outlined v-model="tempEbul" type="tempEbul" label="Température ébulition" suffix="g/mole" />
        <q-input class="element" outlined v-model="formDev" type="formDev" label="Formule développée" />
      </div>
      <div class="q-gutter-md row items-start infoProduit q-pb-md">
        <q-input class="element" outlined v-model="tempFusion" type="tempFusion" label="Température fusion" suffix="°C" />
        <q-input class="element" outlined v-model="densite" type="densite" label="Densité" suffix="g/ml" />
      </div>
      <div class="btnEnregistrer">
        <!-- Bouton enregistrer -->
        <q-btn style="background: #DC006B" text-color="white"  size="lg"  label="Enregistrer" />
      </div>
    </div>
    <div class="q-pa-md">
      <!-- Tableau pour la salle ainsi que la quantité -->
      <q-table
        style="width: 800px"
        title="Stockage"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageInfoProduit',
  data () {
    return {
      // Déclaration des variables
      text: '',
      ph: '',
      nomOfficiel: '',
      autreNom: '',
      autreNom2: '',
      nomAnglais: '',
      formBrute: '',
      formDev: '',
      famille: '',
      concentration: '',
      purete: '',
      tempEbul: '',
      masseMolaire: '',
      tempFusion: '',
      densite: '',
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
      ]
      // Affectation des lignes des quantités et des salles
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
