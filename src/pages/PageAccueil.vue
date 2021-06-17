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
    <!-- Tableau de produit chimique -->
    <!-- "filter" permet d'effectuer une recherche dans le tableau -->
    <!-- filterFn permet d'effectuer une recherche même si il y a des accents ou des masjucules -->
    <q-table
      title="Liste des produits"
      :data="produits.produits"
      :columns="columns"
      :filter="recherche"
      :filter-method="filterFn"
      row-key="nom_fr"
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
            <q-btn size="sm" color="pink" round dense @click="show_dialog = true" style="margin-right: 3px">
              <img src="~assets/imprimante.png" width="18" height="18">
            </q-btn>
            <router-link :to="'infoproduit/' + props.row.id"><q-btn size="sm" color="pink" round dense style="margin-right: 3px"> i </q-btn></router-link>
            <q-btn size="sm" color="pink" round dense style="margin-right: 3px"> FS </q-btn>
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
            <q-btn size="sm" color="pink" round dense @click="show_dialog = true" style="margin-right: 3px">
              <img src="~assets/imprimante.png" width="18" height="18">
            </q-btn>
            <router-link :to="'infoproduit/' + props.row.id"><q-btn size="sm" color="pink" round dense style="margin-right: 3px"> i </q-btn></router-link>
            <q-btn size="sm" color="pink" round dense style="margin-right: 3px"> FS </q-btn>
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
            <q-btn size="sm" color="pink" round dense @click="show_dialog = true" style="margin-right: 3px">
              <img src="~assets/imprimante.png" width="18" height="18">
            </q-btn>
            <router-link :to="'infoproduit/' + props.row.id"><q-btn size="sm" color="pink" round dense style="margin-right: 3px" class="boutontexte"> i </q-btn></router-link>
            <q-btn size="sm" color="pink" round dense style="margin-right: 3px"> FS </q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <!-- Affiche les armoires et les quantités dans l'expand -->
            <div class="salleQuantite q-gutter-md row">
              <q-table
                style="width: 100%"
                :data="props.row.armoires"
                :columns="columns2"
                row-key="salle"
                :pagination.sync="pagination"
                hide-bottom
              />
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="q-pa-sm q-gutter-sm">
      <q-dialog v-model="show_dialog">
      <q-card>
        <q-card-section>
          <div class="text-h6 titreEtiquette">Étiquette</div>
        </q-card-section>

        <q-card-section>
          <div class="etiquette">
            <q-input class="elementEtiquette"   v-model="nom_off"         label="Nom officiel"></q-input>
            <q-input class="elementEtiquette"   v-model="form_brute"      label="Formule brute"></q-input>
            <q-input class="elementEtiquette"   v-model="concentration"   label="Concentration"></q-input>
            <q-input class="elementEtiquette"   v-model="initiale"        label="Initiale"></q-input>
            <q-input class="elementEtiquette"   v-model="date"            label="Date"></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler"   color="primary"   v-close-popup></q-btn>
          <q-btn flat label="Imprimer"  color="primary"   v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  // Nom de la page
  name: 'PageAccueil',
  data () {
    return {
      // Déclaration des variables
      nom_off: '',
      form_brute: '',
      concentration: '',
      initiale: '',
      date: '',
      show_dialog: false,
      produit: '',
      recherche: '',
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
  width: 25px
  height: 25px
  vertical-align: middle

.styleBoutonAjoutTabl
  margin-right: 5px
  background: #DC006B

.etiquette
  display: block

.elementEtiquette
  display: inline-block
  margin-left: 10px
  margin-right: 80px
  margin-bottom: 20px
</style>
