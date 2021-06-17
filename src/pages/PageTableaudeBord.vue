<!-- Page tableau de bord non réalisé -->
<template>
  <div class="q-pa-md">
    <q-table
      style="width: 40%"
      title="Gestion de l'état d'un produit"
      :data="data"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>
<script>
export default {
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Produit à quantité faible',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'commande', align: 'center', label: 'Commande en cours', field: 'commande', sortable: true }
      ],
      data: [
        {
          name: 'Acide',
          commande: 'Alcool'
        }
      ]
    }
  }
}
</script>
