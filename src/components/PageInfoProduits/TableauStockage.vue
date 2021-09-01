<template>
  <div class="q-pa-md q-mx-auto">
      <q-table
        class="tableauStockage"
        title="Stockage"
        :data="produit.armoires"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="salle" :props="props">
            {{ props.row.salle }}
            <q-popup-edit v-model="props.row.salle">
              <q-input v-model="props.row.salle" dense autofocus counter></q-input>
            </q-popup-edit>
          </q-td>
          <q-td key="quantite" :props="props">
            {{ props.row.quantite + "L"}}
            <q-popup-edit v-model="props.row.quantite">
              <q-input v-model="props.row.quantite" dense autofocus counter suffix="L"></q-input>
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
      </q-table>
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
    addRow () {
      this.ajouterStockage(this.produit.id)
      if (this.editedIndex > -1) {
        Object.assign(this.produit.armoires[this.editedIndex], this.editedItem)
      } else {
        this.produit.armoires.push(this.editedItem)
      }
      this.close()
    },
    close () {
      this.show_dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    supprimer () {
      this.supprimerProduit(this.produit.id)
      this.$router.push('/')
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
.tableauStockage
  width: 60%
</style>
