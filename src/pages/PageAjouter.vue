<template>
  <div class="q-pa-md q-mx-auto template">
    <div class="q-ml-xl">
      <div>
        <!-- Titre de la page -->
        <h6>Ajout d'un nouveau produit</h6>
      </div>
       <Informationsproduits></Informationsproduits>
       <TableauStockage></TableauStockage>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Informationsproduits from 'src/components/PageInfoProduits/Informationsproduits.vue'
import TableauStockage from 'src/components/PageInfoProduits/TableauStockage.vue'
export default {
  components: {
    Informationsproduits,
    TableauStockage
  },
  computed: {
    ...mapState('auth', ['auth']),
    ...mapState('produits', ['produits']),
    ...mapGetters('produits', ['getProduitById'])
  },
  name: 'PageInfoProduit',
  data () {
    return {
      // Déclaration des variables
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
      text: '',
      ph: '',
      dense: false,
      group: null,
      sorteproduit: '',
      // Permet d'afficher plus d'élément dans le tableau
      pagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 10
      }
    }
  },
  methods: {
    ...mapActions('produits', ['getProduitsApi']),
    ...mapActions('produits', ['ajouterProduit']),
    ajouter () {
      console.log('cc')
      this.ajouterProduit(this.produit)
    },
    addRow () {
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem)
      } else {
        this.data.push(this.editedItem)
      }
      this.close()
    },
    close () {
      this.show_dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    }
  },
  // Appelle les produits de l'API avant que l'écran ne soit monté
  beforeMount () {
    this.getProduitsApi()
  },
  // Appelle les produits par l'ID fournit en paramètre pendant que l'écran soit monté
  mounted () {
    this.produit = this.getProduitById(86)
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
  .template
    max-width: 1000px
  .tableauStockage
    width: 60%
</style>
