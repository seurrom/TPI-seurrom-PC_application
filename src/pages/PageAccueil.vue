<template>
  <div class="q-pa-md">
    <div class="btnAjoutTablBord">
      <q-btn @click="ajout" style="background: #DC006B" text-color="white" label="Ajouter" />
      <q-btn @click="tableauDeBord">
        <img src="~assets/tabl_bord.png" width="18" height="18">
      </q-btn>
    </div>
    <div class="recherche q-gutter-md row items-start">
      <q-input class="recherche2" v-model="nomOfficiel" type="nomOff" label="Nom officiel" />
      <q-input class="recherche2" v-model="numInterne" type="numInt" label="Numéro interne" />
      <q-input class="recherche2" v-model="formuleBrute" type="formBru" label="Formule brute" />
      <q-btn>
        <img src="~assets/recherche.png" width="18" height="18">
      </q-btn>
    </div>
    <q-table
      title="Liste des produits"
      :data="data"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
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
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="pink" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td auto-width>
            <q-btn size="sm" color="pink" round dense @click="infoproduit"> <img src="~assets/imprimante.png" width="18" height="18"> </q-btn>
            <q-btn size="sm" color="pink" round dense @click="infoproduit"> i </q-btn>
            <q-btn size="sm" color="pink" round dense @click="infoproduit"> FS </q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
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
  name: 'PageAccueil',
  data () {
    return {
      nomOfficiel: '',
      numInterne: '',
      formuleBrute: '',
      salle: 'A2',
      quantite: '43L',
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'N° CAS',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'ninterne', align: 'center', label: 'N° Interne', field: 'ninterne', sortable: true },
        { name: 'nomOff', label: 'Nom officiel', field: 'nomOff', sortable: true, style: 'width: 10px' },
        { name: 'formBrute', label: 'Formule brute', field: 'formBrute' }
      ],
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
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        },
        {
          name: '876655',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
          formBrute: '6H14O'
        },
        {
          name: '5644535',
          ninterne: 300,
          nomOff: 'Alcool Hexylique',
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
  methods: {
    infoproduit () {
      this.$router.push('infoproduit')
    },
    ajout () {
      this.$router.push('infoproduit')
    },
    tableauDeBord () {
      this.$router.push('infoproduit')
    }
  }
}
</script>

<style scoped>
  .btnAjoutTablBord {
    text-align: right;
  }
  .recherche {
    text-align: center;
    display: block;
    margin-top: 0.3%;
    margin-bottom: 3%;
  }
  .recherche2 {
    display: inline-block;
  }
  .salleQuantite {
    text-align: center;
  }

</style>
