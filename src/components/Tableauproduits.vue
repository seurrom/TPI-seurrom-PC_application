<template>
  <q-table
    class="tableauProduit"
    :data="produits.produits"
    :columns="columns"
    :filter="recherche"
    :filter-method="filterFn"
    row-key="nom_fr"
    :pagination.sync="pagination"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th/>
        <!-- Affectation de chaque nom de colonne -->
        <q-th
          class="titreTableau"
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.label }}
        </q-th>
      </q-tr>
    </template>
    <template v-slot:body="props">
      <q-tr :props="props" :class="{rouge:props.row.etat==='Commande en cours', jaune:props.row.etat==='Quantité de produit faible'}">
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
          <q-btn size="sm" color="pink" round dense @click="show_dialog = true" style="margin-right: 3px">
            <img src="~assets/imprimante.png" width="18" height="18">
          </q-btn>
          <q-btn :to="'infoproduit/' + props.row.id" size="sm" color="pink" round dense style="margin-right: 3px"> i </q-btn>
          <q-btn size="sm" color="pink" round dense style="margin-right: 3px"> FS </q-btn>
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td v-if="props.row.armoires != ''" colspan="100%">
          <!-- Affiche les armoires et les quantités dans l'expand -->
          <div class="salleQuantite q-gutter-md row">
            <q-table
              class="tableauStockage"
              :data="props.row.armoires"
              :columns="columns2"
              row-key="salle"
              :pagination.sync="pagination"
              hide-bottom
            />
          </div>
        </q-td>
        <q-td v-else>
          <div class="salleQuantite q-gutter-md row">
            <label>Produit épuisé !</label>
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  // Nom de la page
  name: 'TableauProduits',
  props: {
    recherche: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // Déclaration des variables
      show_dialog: false,
      produit: '',
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
          field: row => row.num_cas,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'ninterne', align: 'center', label: 'N° Interne', field: 'num_interne', sortable: true },
        { name: 'nomOff', align: 'center', label: 'Nom officiel', field: 'nom_fr', sortable: true, style: 'width: 10px' },
        { name: 'formBrute', align: 'center', label: 'Formule brute', field: 'formule' }
      ],
      // Colonnes du tableau d'armoire et quantité
      columns2: [
        {
          name: 'salle',
          required: true,
          label: 'Armoire',
          align: 'center',
          field: row => row.salle,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'quantite', align: 'center', label: 'Quantité', field: 'quantite', sortable: true }
      ]
    }
  },
  methods: {
    // Importe l'action getProduitsApi du magasin produits
    ...mapActions('produits', ['getProduitsApi']),
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
  },
  // Permet de récupérer les produits
  computed: {
    ...mapState('produits', ['produits'])
  },
  // Appelle l'action getProduitsApi qui retourne tous les produits de l'API
  mounted () {
    this.getProduitsApi()
  }
}
</script>
<style scoped>
.rouge {
  background-color: #FF9B71;
}
.jaune {
  background-color: #FFFD82;
}
.tableauProduit {
  margin-top: 50px;
  box-shadow: none;
}
.tableauStockage {
  width: 30%;
  box-shadow: none;
}
.titreTableau {
  font-size: 18px;
}
</style>
