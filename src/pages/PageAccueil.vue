<template>
  <div class="q-pa-md">
    <div class="btnAjoutTablBord">
      <!-- Boutons "ajouter" et "tableau de bord" -->
      <q-btn @click="ajout" style="background: #DC006B" text-color="white" label="Ajouter" />
      <q-btn @click="tablbord">
        <img src="~assets/tabl_bord.png" width="18" height="18">
      </q-btn>
    </div>
    <div>
      <!-- Input pour effectuer une recherche dans le tableau -->
      <label>Nom officiel</label>
      <q-input class="form-control" v-model="filters.nomOff.value"/>
    </div>
    <!-- Tableau de produit chimique -->
    <q-table
      title="Liste des produits"
      :data="data"
      :filters="filters"
    >
      <q-thead slot="head">
        <!-- Affectation de chaque nom de colonne -->
          <q-th>N°CAS</q-th>
          <q-th>N° Interne</q-th>
          <q-th>Nom officiel</q-th>
          <q-th>Formule brute</q-th>
      </q-thead>
      <template v-slot-scope="data">
        <q-tr  v-for="row in data" :key="row.name">
        <!-- Affectation de chaque ligne -->
          <q-td>{{ row.name }}</q-td>
          <q-td>{{ row.ninterne }}</q-td>
          <q-td>{{ row.nomOff }}</q-td>
          <q-td>{{ row.formBrut }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  // Nom de la page
  name: 'PageAccueil',
  data () {
    return {
      filters: {
        nomOff: { value: '', keys: ['nomOff'] }
      },
      // Déclaration des variables
      nomOfficiel: '',
      numInterne: '',
      formuleBrute: '',
      salle: 'A2',
      quantite: '43L',
      // Retourne les noms des colonnes
      // Retourne les informations liées au produit
      data: [
        {
          name: '12030',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        },
        {
          name: '57653',
          ninterne: 300,
          nomOff: 'Albert',
          formBrute: '6H14O'
        },
        {
          name: '876655',
          ninterne: 300,
          nomOff: 'Bernard',
          formBrute: '6H14O'
        },
        {
          name: '5644535',
          ninterne: 300,
          nomOff: 'Claude',
          formBrute: '6H14O'
        },
        {
          name: '907656',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        },
        {
          name: '45890',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        },
        {
          name: '9876',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        },
        {
          name: '876543',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        },
        {
          name: '345678',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        }
      ]
    }
  },
  // Création des méthodes pour effectuer la navigation
  methods: {
    infoproduit () {
      this.$router.push('infoproduit')
    },
    ajout () {
      this.$router.push('/infoproduit')
    },
    etiquette () {
      this.$router.push('etiquette')
    },
    tablbord () {
      this.$router.push('tablbord')
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

.recherche2
  display: inline-block

.salleQuantite
  text-align: center

</style>
