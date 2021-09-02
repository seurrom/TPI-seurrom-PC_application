<template>
  <div class="q-pa-md q-mx-auto template">
    <div class="q-ml-xl">
       <div class="q-pa-sm q-gutter-sm">
        <q-dialog v-model="show_dialog_supprimer">
        <q-card>
          <q-card-section>
            <div class="text-h6">Supprimer</div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <label>Êtes-vous sûr de vouloir supprimer ?</label>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Oui" color="primary" v-close-popup @click="supprimer"></q-btn>
            <q-btn flat label="Non" color="primary" v-close-popup></q-btn>
          </q-card-actions>
        </q-card>
        </q-dialog>
      </div>
      <div>
        <!-- Titre de la page -->
        <h6>Information du produit</h6>
      </div>
      <Informationsproduits></Informationsproduits>
      <div class="boutons">
      <!-- Bouton supprimer Bouton enregistrer -->
      <q-btn class="btnEnregistrerSupprimer" style="background: #DC006B" text-color="white" @click="modifier" label="Enregistrer" />
      <q-btn class="btnEnregistrerSupprimer" style="background: #DC006B" text-color="white" @click="show_dialog_supprimer = true" label="Supprimer" />
    </div>
    </div>
  </div>
</template>
<script>
import Informationsproduits from 'src/components/PageInfoProduits/Informationsproduits.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  // Appelle toutes les fonctionnalités des magasins utiles
  computed: {
    ...mapState('auth', ['auth']),
    ...mapState('produits', ['produits']),
    ...mapGetters('produits', ['getProduitById'])
  },
  components: {
    Informationsproduits
  },
  methods: {
    ...mapActions('produits', ['getProduitsApi']),
    ...mapActions('produits', ['supprimerProduit']),
    ...mapActions('produits', ['modifierProduit']),
    supprimer () {
      this.supprimerProduit(this.produit.id)
      this.$router.push('/')
    },
    modifier () {
      this.modifierProduit(this.produit.id)
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
      dense: false,
      group: null,
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
      }
    }
  }
}
</script>
<style scoped lang="sass">
  .boutons
    text-align: right
  .btnEnregistrerSupprimer
    margin-right: 10px
  .q-input, .q-select
    width: 250px
    height: 80px
  .btnAjout
    display: block
  .elementTablBouton
    display: inline-block
  .bouton
    margin-left: 10px
  .template
    max-width: 1500px
</style>
