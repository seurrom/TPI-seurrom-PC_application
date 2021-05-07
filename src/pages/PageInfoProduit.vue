<template>
  <div class="q-pa-md">
    <div class="infoProduit">
      <div class="q-gutter-md row items-start">
        <!-- Input des informations du produit -->
        <q-input v-model="nomOfficiel" type="nomOff" label="Nom officiel" />
        <q-input v-model="famille" type="famille" label="Famille" />
        <!-- Bouton radio pour le choix "Sorte de produit" -->
        <q-option-group
        :options="options"
        type="radio"
        v-model="group"
        />
        <q-btn style="background: #DC006B" text-color="white" label="Supprimer" />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input v-model="autreNom" type="autreNom" label="Autre nom" />
        <q-input v-model="concentration" type="concentration" label="Concentration" />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input v-model="autreNom2" type="autreNom2" label="Autre nom 2" />
        <q-input v-model="purete" type="purete" label="Pureté" />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input v-model="nomAnglais" type="nomAnglais" label="Nom anglais" />
        <q-input v-model="masseMolaire" type="masseMolaire" label="Masse molaire" suffix="g/mole" />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input v-model="formBrute" type="formBrute" label="Formule brute" />
        <q-input v-model="tempEbul" type="tempEbul" label="Température ébulition" suffix="g/mole" />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input v-model="formDev" type="formDev" label="Formule développée" />
        <q-input v-model="tempFusion" type="tempFusion" label="Température fusion" suffix="°C" />
      </div>
      <div class="q-gutter-md row items-start">
        <q-input v-model="densite" type="densite" label="Densité" suffix="g/ml" />
        <q-btn class="btnEnregistrer" style="background: #DC006B" text-color="white" label="Enregistrer" />
      </div>
    </div>
    <div class="q-pa-md">
      <!-- Tableau pour la salle ainsi que la quantité -->
    <q-table
      title="Stockage"
      :data="data"
      :columns="columns"
      row-key="name"
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
      // Retourne les choix dans le bouton radio
      options: [
        { label: 'Minéral', value: 'mineral' },
        { label: 'Organique', value: 'organique' },
        { label: 'Solution', value: 'solution' }
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
<style scoped>
  .btnEnregistrer {
    text-align: right;
  }
  .infoProduit {
    text-align: center;
  }
</style>
