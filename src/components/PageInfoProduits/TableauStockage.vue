<template>
  <div class="q-pa-md q-mx-auto row">
      <q-table
        class="tableaustockage"
        title="Stockage"
        :data="produit.armoires"
        :columns="columns"
        row-key="name"
        :pagination.sync="pagination"
        hide-bottom
      >
      <template v-slot:top>
        <q-btn color="primary" class="boutonAjout" label="Nouveau stockage"  @click="show_dialog = true" no-caps />
        <q-space />
      </template>
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
      <div class="q-pa-sm q-gutter-sm">
        <q-dialog v-model="show_dialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Ajouter un nouveau lieu de stockage</div>
          </q-card-section>

          <q-card-section>
            <div class="row">
              <q-select class="element" :options="optionsArmoires" v-model="editedItem.salle" label="Armoire"></q-select>
              <q-input v-model="editedItem.quantite" label="Quantité"></q-input>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup @click="addRow" ></q-btn>
          </q-card-actions>
        </q-card>
        </q-dialog>
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
        rowsPerPage: 1000
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
      ],
      optionsArmoires: [
        'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'H1', 'H2', 'C1 - E1', 'C1 - E2', 'C1 - E3', 'C1 - E4', 'C1 - E5', 'C1 - E6', 'C2 - E1', 'C2 - E2', 'C2 - E3', 'C2 - E4', 'C2 - E5', 'C2 - E6'
      ]
    }
  }
}
</script>
<style scoped lang="sass">
.boutonAjout
  text-align: right
.tableaustockage
  width: 900px
</style>
