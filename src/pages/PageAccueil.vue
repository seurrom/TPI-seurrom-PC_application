<template>
  <div class="q-pa-md">
    <div class="btnAjoutTablBord">
      <!-- Boutons "ajouter" et "tableau de bord" -->
      <q-btn @click="ajout" style="background: #DC006B" text-color="white" label="Ajouter" />
      <q-btn @click="tablbord">
        <img src="~assets/tabl_bord.png" width="18" height="18">
      </q-btn>
    </div>
    <div class="recherche q-gutter-md row items-start">
      <img src="~assets/recherche.png" width="25" height="25" class="imgrecherche">
      <!-- Input pour effectuer une recherche dans le tableau -->
      <q-input class="elementrecherche" v-model="recherche" label="Recherche" />
    </div>
    <!-- Tableau de produit chimique -->
    <!-- "filter" permet d'effectuer une recherche dans le tableau -->
    <q-table
      title="Liste des produits"
      :data="data"
      :columns="columns"
      :filter="recherche"
      row-key="name"
      :pagination.sync="pagination"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <!-- Affectation de chaque nom de colonne -->
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" v-if="props.row.etat==='Commande en cours'">
          <q-td auto-width>
            <!-- Permet de dérouler une partie du tableau -->
            <q-btn size="sm" color="pink" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <!-- Affectation de chaque ligne -->
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="background-color: #ff5555"
            >
              {{ col.value }}
            </q-td>
          <q-td auto-width>
            <!-- Bouton de navigation par rapport au produit en question -->
            <q-btn size="sm" color="pink" round dense @click="etiquette" style="margin-right: 3px"> <img src="~assets/imprimante.png" width="18" height="18"> </q-btn>
            <router-link :to="'infoproduit/' + props.row.id"><q-btn size="sm" color="pink" round dense @click="infoproduit" style="margin-right: 3px"> i </q-btn></router-link>
            <q-btn size="sm" color="pink" round dense @click="infoproduit" style="margin-right: 3px"> FS </q-btn>
          </q-td>
        </q-tr>
        <q-tr :props="props" v-else-if="props.row.etat==='Quantité de produit faible'">
          <q-td auto-width>
            <!-- Permet de dérouler une partie du tableau -->
            <q-btn size="sm" color="pink" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <!-- Affectation de chaque ligne -->
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="background-color: #fffa54"
            >
              {{ col.value }}
            </q-td>
          <q-td auto-width>
            <!-- Bouton de navigation par rapport au produit en question -->
            <q-btn size="sm" color="pink" round dense @click="etiquette" style="margin-right: 3px"> <img src="~assets/imprimante.png" width="18" height="18"> </q-btn>
            <router-link :to="'infoproduit/' + props.row.id"><q-btn size="sm" color="pink" round dense @click="infoproduit" style="margin-right: 3px"> i </q-btn></router-link>
            <q-btn size="sm" color="pink" round dense @click="infoproduit" style="margin-right: 3px"> FS </q-btn>
          </q-td>
        </q-tr>
        <q-tr :props="props" v-else>
          <q-td auto-width>
            <!-- Permet de dérouler une partie du tableau -->
            <q-btn size="sm" color="pink" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <!-- Affectation de chaque ligne -->
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          <q-td auto-width>
            <!-- Bouton de navigation par rapport au produit en question -->
            <q-btn size="sm" color="pink" round dense @click="etiquette" style="margin-right: 3px"> <img src="~assets/imprimante.png" width="18" height="18"> </q-btn>
            <router-link :to="'infoproduit/' + props.row.id"><q-btn size="sm" color="pink" round dense style="margin-right: 3px" @click="infoproduit"> i </q-btn></router-link>
            <q-btn size="sm" color="pink" round dense @click="infoproduit" style="margin-right: 3px"> FS </q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <!-- Deuxième partie du tableau -->
            <div class="salleQuantite q-gutter-md row">
              <q-input v-model="salle" type="salle" label="Salle" />
              <q-input v-model="quantite" type="quantite" label="Quantité" />
            </div>
          </q-td>
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
      recherche: '',
      // Déclaration des variables
      nomOfficiel: '',
      numInterne: '',
      formuleBrute: '',
      salle: 'A2',
      quantite: '43L',
      // etat: 'Commande en coursdd',
      // Permet d'afficher + d'éléments dans le tableau
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      },
      // Retourne les noms des colonnes
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'N° CAS',
          align: 'center',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'ninterne', align: 'center', label: 'N° Interne', field: 'ninterne', sortable: true },
        { name: 'nomOff', label: 'Nom officiel', field: 'nomOfficiel', sortable: true, style: 'width: 10px' },
        { name: 'formBrute', label: 'Formule brute', field: 'formBrute' }
      ],
      // Retourne les informations liées au produit
      data: [
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
      this.$router.push('/ajout')
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

.elementrecherche
  display: inline-block

.salleQuantite
  text-align: center

.imgrecherche
  margin: 0px
  vertical-align: middle

</style>
